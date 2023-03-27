const paths = require("./_paths");
const { notify, help_path } = require("./_helpers");
const { src, dest } = require("gulp");
const include = require("gulp-file-include");
const prettify = require("gulp-prettify");
const browsersync = require("browser-sync");

function html_compile(file = null) {
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
      if (file !== null && typeof file !== "function") {
        const currentFile = help_path(file);
        console.log(file);

        if (currentFile.path.includes(paths.src.html_pages)) {
          notify(
            ["html", "compile"],
            "info",
            `Страница: ${currentFile.basename} - была изменена.`
          );
        } else {
          notify(
            ["html", "compile"],
            "info",
            `Компонент: ${currentFile.basename} - был изменен.`
          );
        }
      }
      if (!hasError) {
        notify(["html", "compile"], "ok", "Все файлы скомпилированы.");
      }
    })
    .pipe(browsersync.stream());
}

module.exports = {
  html_compile,
};
