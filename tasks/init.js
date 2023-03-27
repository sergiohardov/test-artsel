const paths = require("./_paths");
const { notify } = require("./_helpers");
const fs = require("fs");

const messages = {
  html: "<!-- Базовый файл HTML, использовать !+tab что бы начать (пустой файл browsersync обновлять не будет) -->\n",
  scss: {
    base: "// Базовый файл стилей, все импорты подключаются тут.\n",
    imports: `@import "_variables";\n@import "_mixins";\n@import "_fonts";\n@import "../components/**/*.scss";\n`,
    variables: "// Базовый файл для переменных.\n",
    mixins: `// Базовый файл для миксинов.
@mixin font($font_name, $file_name, $weight, $style) {
  @font-face {
    font-family: $font_name;
    font-display: swap;
    src: url("../assets/fonts/#{$file_name}.woff") format("woff"),
      url("../assets/fonts/#{$file_name}.woff2") format("woff2");
    font-weight: #{$weight};
    font-style: #{$style};
  }
}\n`,
    fonts:
      "// Сюда автоматически будут добавляться с помощью миксина стили для шрифтов.\n",
  },
  js: "// Базовый файл скриптов, входящий.\n",
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

  if (!fs.existsSync(paths.src.scss_global + "/_fonts.scss")) {
    fs.writeFile(
      paths.src.scss_global + "/_fonts.scss",
      messages.scss.fonts,
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
