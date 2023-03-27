const paths = require("./_paths");
const { notify } = require("./_helpers");
const { src, dest, series } = require("gulp");
const fs = require("fs");
const ttf2woff = require("gulp-ttf2woff");
const ttf2woff2 = require("gulp-ttf2woff2");

function fonts_woff(file) {
  return src(file)
    .pipe(ttf2woff())
    .pipe(dest(paths.dist.fonts))
    .on("data", function (data) {
      notify(
        ["fonts", "woff"],
        "ok",
        `Шрифт: ${data.stem} сконвертирован в ${data.extname}`
      );
    });
}

function fonts_woff2(file) {
  return src(file)
    .pipe(ttf2woff2())
    .pipe(dest(paths.dist.fonts))
    .on("data", function (data) {
      notify(
        ["fonts", "woff2"],
        "ok",
        `Шрифт: ${data.stem} сконвертирован в ${data.extname}`
      );
    });
}

function fonts_compile(done) {
  if (fs.readdirSync(paths.src.fonts).length !== 0) {
    fonts_woff(paths.src.fonts + "/**/*.ttf").on("finish", function () {
      fonts_woff2(paths.src.fonts + "/**/*.ttf").on("finish", function () {
        done();
      });
    });
  } else {
    notify(
      ["fonts", "compile"],
      "info",
      "Папка с шрифтами пуста, нечего конвертировать."
    );
    done();
  }
}

module.exports = {
  fonts_woff,
  fonts_woff2,
  fonts_compile,
};
