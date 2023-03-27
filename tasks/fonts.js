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

// TODO Сообщения о добавлении шрифтов происходят после завершения функции
function fonts_enqueue(file) {
  return src(file).on("data", function (file) {
    const fontInfo = file.stem.split("_");
    const fontName = fontInfo[0];
    const fontWeight = fontInfo[1];
    const fontStyle = fontInfo[2];

    const importStr = `@include font("${fontName}", "${fontName}", ${fontWeight}, ${fontStyle});\n`;
    const regexStr = new RegExp(
      `"${fontName}", "${fontName}", ${fontWeight}, ${fontStyle}`,
      "g"
    );

    fs.readFile(paths.src.scss_global + "/_fonts.scss", (err, data) => {
      if (err) throw err;

      const fileContent = data.toString();
      const matches = fileContent.match(regexStr);

      if (matches === null) {
        fs.appendFile(paths.src.scss_global + "/_fonts.scss", importStr, () => {
          notify(
            ["fonts", "enqueue"],
            "add",
            `Добавлен новый шрифт: ${fontName}`
          );
          notify(
            ["fonts", "enqueue"],
            "info",
            "Можно использовать следующие свойства:"
          );
          console.log("-------------------------");
          console.log(
            `font-family: ${fontName}\nfont-weight: ${fontWeight}\nfont-weight: ${fontStyle}`
          );
          console.log("-------------------------");
        });
      }
    });
  });
}

// TODO если будет время сделать отлов ошибок
function fonts_compile(done, filePath = paths.src.fonts + "/*.ttf") {
  if (fs.readdirSync(paths.src.fonts).length !== 0) {
    fonts_woff(filePath).on("finish", function () {
      fonts_woff2(filePath).on("finish", function () {
        fonts_enqueue(filePath).on("end", function () {
          done();
        });
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
