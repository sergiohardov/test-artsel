const { series, parallel } = require("gulp");
const requiredir = require("require-dir");
const tasks = requiredir("./tasks");

exports.init = tasks.init;
exports.cleaner = tasks.cleaner;
exports.html = tasks.html.html_compile;
exports.style = tasks.style;
exports.script = tasks.script;
exports.fonts = tasks.fonts.fonts_compile;
exports.images = tasks.images;
// exports.plugins = tasks.plugins;
exports.watch = tasks.watch;
exports.browsersync = tasks.browsersync;

exports.default = series(
  exports.cleaner,
  exports.html,
  exports.fonts,
  exports.style,
  exports.script,
  exports.images,
  // exports.plugins,
  parallel(exports.watch, exports.browsersync)
);
