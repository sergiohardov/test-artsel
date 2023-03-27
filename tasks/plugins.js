const paths = require("./_paths");
const { notify } = require("./_helpers");
const libs = require("./_plugins");
const fs = require("fs");
const { src, dest } = require("gulp");

module.exports = function plugins(done) {
  // Проверка на наличие плагинов в json
  if (Object.keys(libs).length === 0) {
    // Если плагинов нет:
    notify(["plugins"], "info", "Плагины не найдены.");
    done();
  } else {
    // Если плагины есть:
    for (lib in libs) {
      let plugin_name = lib;
      const filesArr = [...libs[lib].css, ...libs[lib].js];
      const filesEmpty = [];

      // Проверка на существование файлов плагина
      filesArr.forEach((item) => {
        if (!fs.existsSync(item)) {
          filesEmpty.push(item);
          notify(["plugins"], "warning", `Файл: ${item} не найден`);
        }
      });

      if (filesEmpty.length > 0) {
        // Если у плагина отсутствуют файлы:
        notify(
          ["plugins"],
          "warning",
          `Файлы плагина (${plugin_name}) не импортированы`
        );
        notify(
          ["plugins"],
          "warning",
          `Проверьте правильность путей в файле _plugins.json, и перезапустите комманду "gulp".`
        );
      } else {
        // Если у плагина есть файлы:

        // Обработка CSS
        src(libs[lib].css).pipe(
          dest(paths.dist.folder + "/libs/" + plugin_name)
        );

        // Обработка JS
        src(libs[lib].js).pipe(
          dest(paths.dist.folder + "/libs/" + plugin_name)
        );

        notify(
          ["plugins"],
          "add",
          ` Плагин (${plugin_name}) добавлен в ${
            paths.dist.folder + "/libs/" + plugin_name
          }`
        );
      }
    }

    done();
  }
};
