const paths = require("./_paths");
const { notify } = require("./_helpers");
const { watch, parallel } = require("gulp");
const html = require("./html");

module.exports = function watching(done) {
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

  notify(["watch"], "ok", "Включено слежение за файлами.");
  done();
};
