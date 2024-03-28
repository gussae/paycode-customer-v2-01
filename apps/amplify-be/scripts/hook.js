import { spawn } from 'child_process';

function runNpmScript(scriptName) {
  console.log(`Running ${scriptName}...`);

  const childProcess = spawn('npm', ['run', scriptName], {
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, FORCE_COLOR: '1' },
  });

  childProcess.on('exit', (code) => {
    console.log(`${scriptName} exited with code ${code}`);
    if (code !== 0) {
      console.error(`${scriptName} failed.`);
      process.exit(code);
    }
  });
}

// Example usage for prebuild and postbuild hooks
const scriptName = process.argv[2]; // Expecting 'prebuild' or 'postbuild'

if (scriptName === 'prebuild' || scriptName === 'postbuild') {
  runNpmScript(scriptName);
} else {
  console.error('Please specify "prebuild" or "postbuild" as an argument.');
  process.exit(1);
}
