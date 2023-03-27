const requiredir = require("require-dir");
const tasks = requiredir("./tasks");

exports.init = tasks.init;
exports.cleaner = tasks.cleaner;
exports.browsersync = tasks.browsersync;
exports.html = tasks.html;
exports.watch = tasks.watch;
