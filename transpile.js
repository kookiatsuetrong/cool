function transpile(originalCode) {
	var code = originalCode;

	// remove all comments // /* */
	// code = code.replace(/\/\/.*\n/g, "\n");
	// code = code.replace(/\/\*[\w\'\s\r\n\*]*\*\//g, "");

	// class B extends A {
	code = code.replace(
		/class(\s+)(\w+)(\s+)extends(\s+)(\w+)(\s*){/g,
		"function $2 () { $5.call(this); ");
	// class B(p, q) extends A {
	code = code.replace(
		/class(\s+)(\w+)(\s*)\(([\w,\s]*)\)(\s+)extends(\s+)(\w+)(\s*){/g,
		"function $2 ($4) { $7.call(this); ");
	// class B(p) extends A(p) {
	code = code.replace(
		/class(\s+)(\w+)(\s*)\(([\w,\s]*)\)(\s+)extends(\s+)(\w+)(\s*)\(([\w,\s]*)\)(\s*){/g,
		"function $2 ($4) { $7.call(this, $9); ");
	// class B extends A("literal") {
	/*
	code = code.replace(
		/class(\s+)(\w+)(\s*)\(([\w,\s]*)\)(\s+)extends(\s+)(\w+)(\s*)\((.*?)\)(\s*){/g,
		"function $2 ($4) { $7.call(this, $9); ");
	*/

	// use "extend" inside the class for multiple inheritance
	// transpile extend with parameter
	code = code.replace(/extend(\s*)(\w*)(\s*)\(/g, "$2.call(this, ");
	// transpile extend without parameter
	code = code.replace(/extend(\s*)(\w*)/g, "$2.call(this)");

	// class A {} -> function A {}
	code = code.replace(/class(\s+)(\w+)(\s*){/g, "function $2 () { ");

	// class A(p) {} -> function A(p) {}
	code = code.replace(/class(\s+)(\w+)/g, "function $2 ");

	// remove constructor
	// code = code.replace(/constructor(\s+)/g, '');
	// code = code.replace(/constructor/g, '');

	// replacing public method
	// code = code.replace(/public(\s+)method(\s+)(\w+)/g, "this.$3 = function ");
	// code = code.replace(/private(\s+)method(\s+)(\w+)/g, "function $3 ");

	// method m(p) -> this.m = function(p)
	code = code.replace(/method(\s+)(\w+)/g, "this.$2 = function ");

	// member m -> this.m
	// code = code.replace(/field(\s+)/g, "this.");
	code = code.replace(/member(\s+)(\w+)/g, "this.$2");

	// replacing public / private
	// code = code.replace(/public(\s+)/g, "this.");
	// code = code.replace(/private(\s+)/g, "var ");

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
