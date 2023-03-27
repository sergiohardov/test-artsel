const { series, parallel } = require("gulp");
const requiredir = require("require-dir");
const tasks = requiredir("./tasks");

exports.init = tasks.init;
exports.cleaner = tasks.cleaner;
exports.html = tasks.html.html_compile;
exports.style = tasks.style;
exports.watch = tasks.watch;
exports.browsersync = tasks.browsersync;

exports.default = series(
  exports.cleaner,
  exports.html,
  exports.style,
  parallel(exports.watch, exports.browsersync)
);
