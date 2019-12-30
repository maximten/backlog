const path = require('path');

module.exports = {
    webpack: (config) => {
        config.resolve.modules.push(path.resolve(__dirname))
        return config
    }
}