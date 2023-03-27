const paths = require("./_paths");
const fs = require("fs");
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
        if (currentFile.path.includes(paths.src.html_pages)) {
          notify(
            ["html", "compile"],
            "info",
            `Страница: ${currentFile.fullname} - была изменена.`
          );
        } else {
          notify(
            ["html", "compile"],
            "info",
            `Компонент: ${currentFile.fullname} - был изменен.`
          );
        }
      }
      if (!hasError) {
        notify(["html", "compile"], "ok", "Все файлы скомпилированы.");
      }
    })
    .pipe(browsersync.stream());
}

function html_remove(done, file) {
  let devPath = help_path(paths.src.html_pages).arr;
  let srcPath = paths.dist.folder;
  let filePath = help_path(file).arr;
  let fileFolder = null;

  filePath.splice(0, devPath.length);

  filePath = [srcPath, ...filePath];
  fileFolder = filePath.slice(0, filePath.length - 1);
  filePath = filePath.join("/");
  fileFolder = fileFolder.join("/");

  // Удаление файла из src
  fs.unlink(filePath, function () {
    // Если файл был в папке и она пуста
    // TODO Удаление пустой папки из src вызывает ошибку
    if (
      fs.existsSync(fileFolder) &&
      fs.readdirSync(fileFolder).length === 0 &&
      fileFolder != paths.dist.folder
    ) {
      fs.rmdir(fileFolder, function () {
        notify(
          ["html", "remove"],
          "del",
          `Папка: ${fileFolder} удалена успешно.`
        );
      });
    }
    notify(["html", "remove"], "del", `Файл: ${filePath} удален успешно.`);
  });

  done();
}

module.exports = {
  html_compile,
  html_remove,
};
