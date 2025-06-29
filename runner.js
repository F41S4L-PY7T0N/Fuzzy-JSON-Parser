// root-runner.js
// Runs both the API and Website concurrently in the same console

const { spawn } = require('child_process');

// Start API server
const api = spawn('node', ['index.js'], {
  cwd: require('path').join(__dirname, 'api'),
  stdio: 'inherit',
  shell: false
});

// Start Website (Vite dev server)
const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const website = spawn(npmCmd, ['run', 'dev'], {
  cwd: require('path').join(__dirname, 'website'),
  stdio: 'inherit',
  shell: true // Use shell for npm on Windows
});

api.on('error', err => {
  console.error('Failed to start API process:', err);
});
website.on('error', err => {
  console.error('Failed to start Website process:', err);
});

let apiStarted = false;
let websiteStarted = false;

function printPanel() {
  if (apiStarted && websiteStarted) {
    const apiUrl = 'http://localhost:3001';
    const webUrl = 'http://localhost:5173';
    const panel = `\n==============================\n` +
      `🚀 Fuzzy JSON Parser Running\n` +
      `------------------------------\n` +
      `API:      ${apiUrl}/fuzzy-parse\n` +
      `Website:  ${webUrl}\n` +
      `==============================\n`;
    console.log(panel);
  }
}

api.stdout?.on('data', (data) => {
  if (data.toString().includes('Fuzzy JSON Parser API running')) {
    apiStarted = true;
    printPanel();
  }
});

website.stdout?.on('data', (data) => {
  if (data.toString().toLowerCase().includes('local:') || data.toString().toLowerCase().includes('vite')) {
    websiteStarted = true;
    printPanel();
  }
});

api.on('close', code => {
  console.log(`API process exited with code ${code}`);
});

website.on('close', code => {
  console.log(`Website process exited with code ${code}`);
});

process.on('SIGINT', () => {
  api.kill('SIGINT');
  website.kill('SIGINT');
  process.exit();
});
