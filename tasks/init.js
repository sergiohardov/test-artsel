const paths = require("./_paths");
const { notify } = require("./_helpers");
const fs = require("fs");

const messages = {
  html: "<!-- Базовый файл HTML, использовать !+tab что бы начать (пустой файл browsersync обновлять не будет) -->\r\n",
};

module.exports = function init(done) {
  fs.mkdirSync(paths.src.html, { recursive: true });
  fs.mkdirSync(paths.src.html_components, { recursive: true });
  fs.mkdirSync(paths.src.html_pages, { recursive: true });

  if (!fs.existsSync(paths.src.html_pages + "/index.html")) {
    fs.writeFile(paths.src.html_pages + "/index.html", messages.html, (err) => {
      if (err) throw err;
    });
  }

  notify(["init"], "ok", "Базовые папки и файлы были созданы.");
  done();
};
