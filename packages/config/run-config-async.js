//!this is intended to be run as a script
const { getConfigAsync } = require('./config-async');

const currentPath = process.argv[2] || __dirname;

async function runConfigAsync() {
    try {
        const config = await getConfigAsync(currentPath);
        console.log(config)
        console.log(`CONFIG_OUTPUT:${JSON.stringify(config)}`);
    } catch (error) {
        console.error('Error running getConfigAsync:', error.message);
        process.exit(1);
    }
}

runConfigAsync();
