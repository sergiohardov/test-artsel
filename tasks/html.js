const paths = require("./_paths");
const { notify } = require("./_helpers");
const { src, dest } = require("gulp");
const include = require("gulp-file-include");
const prettify = require("gulp-prettify");
const browsersync = require("browser-sync");

module.exports = function html() {
  let hasError = false;
  return src(paths.src.html_pages + "/**/*.html")
    .pipe(include())
    .on("error", function (err) {
      notify(["html", "compile"], "error", `Ошибка компиляции. Сообщение:`);
      console.log(err.message);
      hasError = true;
      this.emit("end");
    })
    .pipe(prettify({ indent_size: 2 }))
    .pipe(dest(paths.dist.folder))
    .on("finish", function () {
      if (!hasError) {
        notify(["html", "compile"], "ok", "Все файлы скомпилированы.");
      }
    })
    .pipe(browsersync.stream());
};
