const paths = require("./_paths");
const { notify, help_path } = require("./_helpers");
const { watch, parallel } = require("gulp");
const html = require("./html");
const { fonts_compile, fonts_remove } = require("./fonts");

module.exports = function watching(done) {
  // HTML
  watch(paths.watch.html)
    .on("change", function (file) {
      html.html_compile(file);
    })
    .on("add", function (file) {
      html.html_compile(file);
    })
    .on("unlink", function (file) {
      html.html_remove(done, file);
    });

  // SCSS
  watch(paths.watch.scss, parallel("style"));

  // JS
  watch(paths.watch.js, parallel("script"));

  // FONTS
  watch(paths.watch.fonts)
    .on("add", function (file) {
      let filePath = help_path(file).path;
      fonts_compile(done, filePath);
    })
    .on("unlink", function (file) {
      fonts_remove(done, help_path(file));
    });

  notify(["watch"], "ok", "Включено слежение за файлами.");
  done();
};
