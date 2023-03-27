const paths = require("./_paths");
const { notify } = require("./_helpers");
const { src, dest } = require("gulp");
const uglify = require("gulp-uglify-es").default;
const rename = require("gulp-rename");
const browsersync = require("browser-sync");

module.exports = function script() {
  return src(paths.src.js + "/**/*.js")
    .pipe(uglify())
    .pipe(
      rename({
        extname: ".min.js",
      })
    )
    .pipe(dest(paths.dist.js))
    .on("finish", function () {
      notify(["JS"], "ok", "Все файлы скриптов скомпилированы..");
    })
    .pipe(browsersync.stream());
};
