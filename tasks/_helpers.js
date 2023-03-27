const chalk = require("chalk");

function notify(
  moduleName = ["notify"],
  status = "info",
  text = "Text notify"
) {
  let message = "";

  moduleName.forEach((module) => {
    message += chalk.bgBlue("[" + module.toUpperCase() + "]") + " ";
  });

  switch (status.toLowerCase()) {
    case "info":
      message += chalk.bgWhite("[" + status.toUpperCase() + "]") + " ";
      message += text;
      break;
    case "ok":
      message += chalk.bgGreen("[" + status.toUpperCase() + "]") + " ";
      message += chalk.green(text);
      break;
    case "del":
      message += chalk.bgRed("[" + status.toUpperCase() + "]") + " ";
      message += chalk.green(text);
      break;
    case "add":
      message += chalk.bgGreen("[" + status.toUpperCase() + "]") + " ";
      message += chalk.green(text);
      break;
    case "warning":
      message += chalk.bgYellow("[" + status.toUpperCase() + "]") + " ";
      message += text;
      break;
    case "error":
      message += chalk.bgRed("[" + status.toUpperCase() + "]") + " ";
      message += chalk.red(text);
      break;
    default:
      message += chalk.bgWhite("[" + status.toUpperCase() + "]") + " ";
      message += text;
      break;
  }
  console.log(message);
  return null;
}

function help_path(path) {
  const resultPath = {
    arr: [],
    path: "",
    basedir: "",
    parentdir: "",
    fullname: "",
    basename: "",
    ext: "",
  };

  if (path.includes("\\") || path.includes("/")) {
    if (path.includes("\\")) {
      // arr
      resultPath.arr = path.split("\\");
    }
    if (path.includes("/")) {
      // arr
      resultPath.arr = path.split("/");
    }
    // path
    resultPath.path = resultPath.arr.join("/");

    // basedir
    resultPath.basedir = resultPath.arr
      .slice(0, resultPath.arr.length - 1)
      .join("/");

    // parentdir
    resultPath.parentdir = resultPath.arr
      .slice(1, resultPath.arr.length - 1)
      .join("/");

    // fullname
    resultPath.fullname = resultPath.arr[resultPath.arr.length - 1];

    // basename
    resultPath.basename = resultPath.fullname.split(".").slice(0, -1).join("");

    // ext
    resultPath.ext = resultPath.fullname.split(".");
    resultPath.ext = resultPath.ext[resultPath.ext.length - 1];

    return resultPath;
  } else {
    return path;
  }
}

module.exports = {
  notify,
  help_path,
};
