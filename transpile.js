function transpile(originalCode) {
	var code = originalCode;

	// replacing field
	code = code.replace(/field(\s+)/g, "this.");

	// replacing method
	code = code.replace(/method(\s+)(\w+)/g, "this.$2 = function ");

	// replacing class without constructor
	code = code.replace(/class(\s+)(\w+)(\s+){/g, "function $2 () { ");

	// replacing class with constructor
	code = code.replace(/class(\s+)(\w+)/g, "function $2 ");

	// remove constructor
	code = code.replace(/constructor/g, '');

	// add ; to the end of }
	// code = code.replace(/}/g, "};");

	if (originalCode.match(/class(\s+)Main/))
		code += "\n;\n(new Main()).start();\n";
	return code;
}

function main() {
	process.stdin.resume();
	process.stdin.setEncoding("UTF8");
	var stream = "";
	process.stdin.on("data", function (input) { stream += input; });
	process.stdin.on("end", function () { console.log(transpile(stream)); });
}

main();
