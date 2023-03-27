const requiredir = require("require-dir");
const tasks = requiredir("./tasks");

exports.init = tasks.init;
