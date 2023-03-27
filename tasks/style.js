const paths = require("./_paths");
const { notify } = require("./_helpers");
const { src, dest } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const bulk = require("gulp-sass-bulk-importer");
const media = require("gulp-group-css-media-queries");
const prefixer = require("gulp-autoprefixer");
const clean = require("gulp-clean-css");
const rename = require("gulp-rename");
const browsersync = require("browser-sync");

module.exports = function style() {
  return src(paths.src.scss_global + "/style.scss")
    .pipe(bulk())
    .pipe(
      sass({
        outputStyle: "compressed",
      }).on("error", sass.logError)
    )
    .pipe(media())
    .pipe(
      prefixer({
        overrideBrowserslist: ["last 8 versions"],
        browsers: [
          "Android >= 4",
          "Chrome >= 20",
          "Firefox >= 24",
          "Explorer >= 11",
          "iOS >= 6",
          "Opera >= 12",
          "Safari >= 6",
        ],
      })
    )
    .pipe(
      clean({
        level: 2,
      })
    )
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(dest(paths.dist.css))
    .on("finish", function () {
      notify(["scss"], "ok", "Все файлы стилей скомпилированы.");
    })
    .pipe(browsersync.stream());
};
