const paths = require("./_paths");
const { notify } = require("./_helpers");
const fs = require("fs");
const browser_sync = require("browser-sync");

module.exports = function browsersync(done) {
  if (fs.existsSync(paths.dist.folder)) {
    browser_sync.init({
      server: {
        baseDir: paths.dist.folder,
      },
      notify: true,
    });
    notify(["browsersync"], "ok", "Сервер запущен.");
    done();
  } else {
    notify(
      ["browsersync"],
      "error",
      `Папка: /${paths.dist.folder} - не найдена.`
    );
    done();
  }
};
