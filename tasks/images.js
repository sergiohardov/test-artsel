const paths = require("./_paths");
const { notify } = require("./_helpers");
const { src, dest } = require("gulp");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const browsersync = require("browser-sync");

// TODO оптимизировать, не запускать сжатие когда файлов нет
module.exports = function images(done, file = paths.watch.images) {
  return src(file)
    .pipe(
      webp({
        quality: 80,
      })
    )
    .pipe(dest(paths.dist.images))
    .pipe(src(file))
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 3,
      })
    )
    .pipe(dest(paths.dist.images))
    .on("finish", function () {
      notify(["images"], "ok", "Все файлы картинок скомпилированы.");
      done();
    })
    .pipe(browsersync.stream());
};
