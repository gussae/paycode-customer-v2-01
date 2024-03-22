import { spawn } from 'child_process';
import { dirname } from 'path';
import CONFIG from './config.js';
const {
  paths: { templateOutputPath },
  deploymentConfig: { deploymentEnv, profile },
  deploymentOptions: { noConfirmChangeSet, disableRollback },
} = CONFIG;

/**
 * Returns the command arguments for deployment.
 * @returns {string[]} The command arguments for deployment.
 */
function getDeployCommandArgs() {
  const baseArgs = [
    'deploy',
    '--template',
    `${templateOutputPath}`,
    '--resolve-s3',
    '--no-fail-on-empty-changeset',
    '--config-env',
    deploymentEnv,
  ];

  if (noConfirmChangeSet || process.env.CI == 'true')
    baseArgs.push('--no-confirm-changeset');

  if (disableRollback) baseArgs.push('--disable-rollback');

  return process.env.CI === 'true'
    ? [...baseArgs]
    : [...baseArgs, '--profile', profile, '--debug'];
}

/**
 * Deploys the application using the specified deployment command arguments.
 */
function deploy() {
  const args = getDeployCommandArgs();
  console.log(`sam ${args.join(' ')}`);
  const deployProcess = spawn('sam', args, {
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, FORCE_COLOR: '1' },
    cwd: dirname(templateOutputPath),
  });
  deployProcess.on('error', err => {
    console.error(`Failed to start deployment process: ${err}`);
  });

  deployProcess.on('close', code => {
    if (code === 0) {
      console.log(
        `Deployment successful to environment: ${process.env.CI === 'true' ? deploymentEnv : 'dev'}`,
      );
    } else {
      console.error(`Deployment failed with exit code ${code}`);
    }
  });
}

deploy();
