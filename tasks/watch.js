const paths = require("./_paths");
const { notify } = require("./_helpers");
const { watch, parallel } = require("gulp");

module.exports = function watching(done) {
  watch(paths.watch.html, parallel("html"));

  notify(["watch"], "ok", "Включено слежение за файлами.");
  done();
};
