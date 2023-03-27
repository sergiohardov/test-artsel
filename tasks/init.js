const paths = require("./_paths");
const { notify } = require("./_helpers");
const fs = require("fs");

const messages = {
  html: "<!-- Базовый файл HTML, использовать !+tab что бы начать (пустой файл browsersync обновлять не будет) -->\r\n",
  scss: {
    base: "// Базовый файл стилей, все импорты подключаются тут.\r\n",
    imports: `@import "_variables";\n@import "_mixins";\n@import "../components/**/*.scss";\n`,
    variables: "// Базовый файл для переменных.\r\n",
    mixins: "// Базовый файл для миксинов.\r\n",
  },
  js: "// Базовый файл скриптов, входящий.\r\n",
};

module.exports = function init(done) {
  fs.mkdirSync(paths.src.html, { recursive: true });
  fs.mkdirSync(paths.src.html_components, { recursive: true });
  fs.mkdirSync(paths.src.html_pages, { recursive: true });
  fs.mkdirSync(paths.src.scss, { recursive: true });
  fs.mkdirSync(paths.src.scss_components, { recursive: true });
  fs.mkdirSync(paths.src.scss_global, { recursive: true });
  fs.mkdirSync(paths.src.js, { recursive: true });
  fs.mkdirSync(paths.src.fonts, { recursive: true });

  if (!fs.existsSync(paths.src.html_pages + "/index.html")) {
    fs.writeFile(paths.src.html_pages + "/index.html", messages.html, (err) => {
      if (err) throw err;
    });
  }

  if (!fs.existsSync(paths.src.scss_global + "/style.scss")) {
    fs.writeFile(
      paths.src.scss_global + "/style.scss",
      messages.scss.base + messages.scss.imports,
      (err) => {
        if (err) throw err;
      }
    );
  }

  if (!fs.existsSync(paths.src.scss_global + "/_variables.scss")) {
    fs.writeFile(
      paths.src.scss_global + "/_variables.scss",
      messages.scss.variables,
      (err) => {
        if (err) throw err;
      }
    );
  }

  if (!fs.existsSync(paths.src.scss_global + "/_mixins.scss")) {
    fs.writeFile(
      paths.src.scss_global + "/_mixins.scss",
      messages.scss.mixins,
      (err) => {
        if (err) throw err;
      }
    );
  }

  if (!fs.existsSync(paths.src.js + "/script.js")) {
    fs.writeFile(paths.src.js + "/script.js", messages.js, (err) => {
      if (err) throw err;
    });
  }

  notify(["init"], "ok", "Базовые папки и файлы были созданы.");
  done();
};
