function transpile(originalCode) {
	var code = originalCode;

	// remove all comments // /* */
	// code = code.replace(/\/\/.*\n/g, "\n");
	// code = code.replace(/\/\*[\w\'\s\r\n\*]*\*\//g, "");

	/* use keyword "extends"
	// transpile class with extends
	code = code.replace(/class(\s+)(\w+)(\s+)extends(\s+)(\w+)(\s+){/g,
		"function $2 () { $5.call(this); ");

	// transpile class with extends and parameters in constructor
	code = code.replace(
		/class(\s+)(\w+)(\s*)\(([\w,\s]*)\)(\s+)extends(\s+)(\w+)(\s+){/g,
		"function $2 ($4) { $7.call(this); ");
	*/

	// transpile mutate with parameter
	code = code.replace(/mutate(\s*)(\w*)(\s*)\(/g, "$2.call(this, ");

	// transpile mutate without parameter
	code = code.replace(/mutate(\s*)(\w*)/g, "$2.call(this)");

	// transpile class without parameters in constructor
	code = code.replace(/class(\s+)(\w+)(\s*){/g, "function $2 () { ");

	// transpile class with parameters in constructor
	code = code.replace(/class(\s+)(\w+)/g, "function $2 ");

	// remove constructor
	/*
	code = code.replace(/constructor(\s+)/g, '');
	code = code.replace(/constructor/g, '');
	*/

	// replacing public method
	/*
	code = code.replace(/public(\s+)method(\s+)(\w+)/g, "this.$3 = function ");
	code = code.replace(/private(\s+)method(\s+)(\w+)/g, "function $3 ");
	*/

	// transpile method
	code = code.replace(/method(\s+)(\w+)/g, "this.$2 = function ");

	// transpile member
	// code = code.replace(/field(\s+)/g, "this.");
	code = code.replace(/member(\s+)/g, "this.");

	// replacing public / private
	/*
	code = code.replace(/public(\s+)/g, "this.");
	code = code.replace(/private(\s+)/g, "var ");
	*/

	var prefix = '"use strict;"; ';
	if (originalCode.match(/class(\s+)Main/))
		prefix += "(new Main()).start(); ";
	if (code.indexOf("//") == 0) {
		code = prefix + code;
	} else {
		code = prefix + "\n" + code;
	}

	return code;
}

function main() {
	process.stdin.resume();
	process.stdin.setEncoding("UTF8");
	var stream = "";
	process.stdin.on("data", function (input) { stream += input; });
	process.stdin.on("end", function () {
		var fs = require('fs');
		stream += "\n" + fs.readFileSync(__dirname + "/library.cool");
		stream += "\n" + fs.readFileSync(__dirname + "/mvc.cool");
		console.log(transpile(stream));
	});
}

main();
