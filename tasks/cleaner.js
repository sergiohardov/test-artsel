const paths = require("./_paths");
const { notify } = require("./_helpers");
const fs = require("fs");
const del = require("del");

module.exports = function cleaner(done) {
  if (fs.existsSync(paths.dist.folder)) {
    del(paths.dist.folder).then(() => {
      notify(["cleaner"], "ok", "Конечная папка удалена.");
      done();
    });
  } else {
    notify(["cleaner"], "info", "Конечная папка не найдена, удалять нечего.");
    done();
  }
};
