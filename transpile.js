/*
public  item -> this.item
private item -> var item

public  method sum() -> this.sum = function()
private method sum() -> function sum()

*/

function transpile(originalCode) {
	var code = originalCode;

	// remove all comments // /* */
	code = code.replace(/\/\/.*\n/g, "\n");
	code = code.replace(/\/\*[\w\'\s\r\n\*]*\*\//g, "");

	// replacing field
	code = code.replace(/field(\s+)/g, "this.");
	code = code.replace(/property(\s+)/g, "this.");

	// replacing method
	code = code.replace(/method(\s+)(\w+)/g, "this.$2 = function ");

	// replacing class without constructor
	code = code.replace(/class(\s+)(\w+)(\s*){/g, "function $2 () { ");

	// replacing class with constructor
	code = code.replace(/class(\s+)(\w+)/g, "function $2 ");

	// remove constructor
	code = code.replace(/constructor(\s+)/g, '');
	code = code.replace(/constructor/g, '');

	if (originalCode.match(/class(\s+)Main/))
		code += "\n;\n(new Main()).start();\n";
	return code;
}

function main() {
	process.stdin.resume();
	process.stdin.setEncoding("UTF8");
	var stream = "";
	process.stdin.on("data", function (input) { stream += input; });
	process.stdin.on("end", function () {
		var fs = require('fs');
		stream += "\n" + fs.readFileSync("library.cool");
		console.log(transpile(stream));
	});
}

main();
