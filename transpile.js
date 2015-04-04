function transpile(originalCode) {
	var code = originalCode;

	// extends A {
	code = code.replace(
		/(\s+)extends(\s+)(\w+)(\s*){/g,
		"{ $3.call(this); ");
	// extends A(p,q) {
	code = code.replace(
		/(\s+)extends(\s+)(\w+)(\s*)\(([\w,\s]*)\)(\s*){/g,
		"{ $3.call(this, $5); ");
	// extends A("literal") {

	// main class
	code = code.replace(/main(\s+)class(\s+)(\w+)(\s*){(\s*)member(\s+)(\w+)/g,
		"(new $3()).$7(); class $3 { $4 $5 member $6 $7 ");

	// class A { -> function A () {
	code = code.replace(/class(\s+)(\w+)(\s*){/g, "function $2 () { ");

	// class A(p) { -> function A(p) {
	code = code.replace(/class(\s+)(\w+)/g, "function $2 ");

	// member m(p) -> this.m = function(p)
	code = code.replace(/member(\s+)(\w+)(\s*)\(/g, "this.$2 = function (");

	// member m -> this.m
	code = code.replace(/member(\s+)(\w+)/g, "this.$2");


	// deprated features

	// remove all comments // /* */
	// code = code.replace(/\/\/.*\n/g, "\n");
	// code = code.replace(/\/\*[\w\'\s\r\n\*]*\*\//g, "");


	// use "extend" inside the class for multiple inheritance
	// transpile extend with parameter
	code = code.replace(/extend(\s*)(\w*)(\s*)\(/g, "$2.call(this, ");
	// transpile extend without parameter
	code = code.replace(/extend(\s*)(\w*)/g, "$2.call(this)");

	// constructor
	// code = code.replace(/constructor(\s+)/g, '');
	// code = code.replace(/constructor/g, '');

	// public method
	// code = code.replace(/public(\s+)method(\s+)(\w+)/g, "this.$3 = function ");
	// code = code.replace(/private(\s+)method(\s+)(\w+)/g, "function $3 ");

	// public / private
	// code = code.replace(/public(\s+)/g, "this.");
	// code = code.replace(/private(\s+)/g, "var ");

	var prefix = '"use strict;"; ';
	/*
	if (originalCode.match(/class(\s+)Main/))
		prefix += "(new Main()).start(); ";
	*/
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
