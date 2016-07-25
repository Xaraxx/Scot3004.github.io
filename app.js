/**
 * Require Browsersync
 */
var bs = require('browser-sync').create();

/**
 * Run Browsersync with server config
 */
bs.init({
    server: "_site",
    files: ["_site/**"],
    plugins: [
        {
            module: "bs-html-injector",
            options: {
                files: ["./*.html"]
            }
        }
    ]
});