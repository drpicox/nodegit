var fork = require("child_process").fork;
var path = require("path");

var bin = "./node_modules/.bin/istanbul";
var cov = "cover --report=lcov _mocha --".split(" ");

if (process.platform === 'win32') {
  bin = "./node_modules/.bin/mocha";
  cov = [];
}

var args = cov.concat([
  "test/runner.js",
  "test/tests",
  "--expose-gc"
]);

fork(bin, args, {
  cwd: path.join(__dirname, "../")
}).on("close", function(code) {
  process.exit(code);
});
