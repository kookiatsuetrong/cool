module.exports.execute = function(x) {
	return eval(x);
}

module.exports.exit = function() {
	process.exit();
}

module.exports.parse = function(x) {
	return JSON.parse(x);
}

module.exports.print = function(x) {
	process.stdout.write(x);
}
