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

module.exports = {
  notify,
};
