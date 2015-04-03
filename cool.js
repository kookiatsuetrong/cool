var scripts = document.getElementsByTagName('script');

for (var i = 0; i < scripts.length; i++) {
	if (scripts[i].attributes['type'] != null) {
		if (scripts[i].attributes['type'].value === 'text/cool') {
			if (scripts[i].attributes['src'] == null) {
				eval(transpile(scripts[i].text));
			} else {
				request(scripts[i].attributes['src'].value);
			}
		}
	}
}

function request(url) {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function () {
		var DONE = 4;
		var OK = 200;
		if (request.readyState === DONE) {
			if (request.status === OK) {
				var text = request.responseText;
				eval(transpile(text));
			}
		}
	}
	request.open('get', url, true);
	request.send();
}

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

function System() {
	this.execute = function(x) {
		return eval(x);
	}
	this.exit = function() {
	}
	this.log = function(x) {
		console.log(x);
	}
	this.parse = function(x) {
		return JSON.parse(x);
	}
}

function File () {
	this.read = function(name) {
		return "";
	}
	this.write = function(name, data) {
	}
}

function Float() {
	this.parse = function(x) {
		return parseFloat(x);
	}
}

function Integer() {
	this.parse = function(x) {
		return parseInt(x);
	}
}

function Page() {
	this.select = function(x) {
		return document.querySelectorAll(x);
	}
	// alert,
}

function Web() {
	this.get = function(url, data, callback) {
		var request = new XMLHttpRequest();
		request.onreadystatechange = function () {
			var DONE = 4;
			var OK = 200;
			if (request.readyState === DONE) {
				if (request.status === OK) {
					var text = request.responseText;
					callback(text);
				}
			}
		}
		request.open('get', url, true);
		request.send(data);
	}

	this.post = function(url, data, callback) {
		var request = new XMLHttpRequest();
		request.onreadystatechange = function () {
			var DONE = 4;
			var OK = 200;
			if (request.readyState === DONE) {
				if (request.status === OK) {
					var text = request.responseText;
					callback(text);
				}
			}
		}
		request.open('post', url, true);
		request.setRequestHeader('Content-Type',
			'application/x-www-form-urlencoded; charset=UTF-8');

		request.send(data);
	}
}


















//
