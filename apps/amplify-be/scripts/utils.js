import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import awsExports from '../src/aws-exports.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function runNpmScript(scriptName) {
  console.log(`Running ${scriptName}...`);

  const childProcess = spawn('npm', ['run', scriptName], {
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, FORCE_COLOR: '1' },
    cwd: path.resolve(__dirname, '../'),
  });

  childProcess.on('exit', code => {
    console.log(`${scriptName} exited with code ${code}`);
    if (code !== 0) {
      console.error(`${scriptName} failed.`);
      process.exit(code);
    }
  });
}

