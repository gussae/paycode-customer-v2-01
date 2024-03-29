import { spawn } from 'child_process';

const envName = process.argv[2];

if (!envName) {
  console.error('Please specify an Amplify environment name.');
  process.exit(1);
}

const runCommand = (command, args, env) => {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      env: { ...process.env, ...env },
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command "${command} ${args.join(' ')}" exited with code ${code}`));
      }
    });
  });
};

console.log(`Switching to Amplify environment: ${envName}`);

runCommand('amplify', ['env', 'checkout', envName], { FORCE_COLOR: '1' })
  .then(() => runCommand('npm', ['run', 'export-to-param-store'], { FORCE_COLOR: '1' }))
  .then(() => console.log(`Successfully switched to environment: ${envName}`))
  .catch((error) => {
    console.error(`Failed to switch Amplify environment: ${error}`);
    process.exit(1);
  });
