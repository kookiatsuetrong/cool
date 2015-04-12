var scripts = document.getElementsByTagName('script');

for (var i = 0; i < scripts.length; i++) {
	var cool = false;
	if (scripts[i].attributes['type'] != null) {
		if (scripts[i].attributes['type'].value === 'text/cool') {
			cool = true;
		}
	}
	if (scripts[i].attributes['language'] != null) {
		if (scripts[i].attributes['language'].value = "cool") {
			cool = true;
		}
	}

	if (cool) {
		if (scripts[i].attributes['src'] == null) {
			eval(transpile(scripts[i].text));
		} else {
			request(scripts[i].attributes['src'].value);
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

	// extends A {
	code = code.replace(
		/(\s+)extends(\s+)(\w+)(\s*){/g,
		"{ $3.call(this); ");
	// extends A(p,q) {
	code = code.replace(
		/(\s+)extends(\s+)(\w+)(\s*)\(([^)]*)\)(\s*){/g,
		"{ $3.call(this, $5); ");

	// main class
	code = code.replace(
		/main(\s+)class(\s+)(\w+)/g,
		"new $3();$1class$2$3");

	// class A { -> function A () {
	code = code.replace(/class(\s+)(\w+)(\s*){/g, "function $2 () { ");

	// class A(p) { -> function A(p) {
	code = code.replace(/class(\s+)(\w+)/g, "function $2 ");

	// member m(p) -> this.m = function(p)
	code = code.replace(/method(\s+)(\w+)(\s*)\(/g, "this.$2 = function (");
	code = code.replace(/member(\s+)(\w+)(\s*)\(/g, "this.$2 = function (");

	// member m -> this.m
	code = code.replace(/member(\s+)(\w+)/g, "this.$2");

	// new { -> {
	code = code.replace(/new(\s*){/g, "{");

	// deprated features

	// remove all comments // /* */
	// code = code.replace(/\/\/.*\n/g, "\n");
	// code = code.replace(/\/\*[\w\'\s\r\n\*]*\*\//g, "");

	// use "extend" inside the class for multiple inheritance
	// transpile extend with parameter
	code = code.replace(/extend(\s*)(\w*)(\s*)\(/g, "$2.call(this, ");
	// transpile extend without parameter
	code = code.replace(/extend(\s*)(\w*)/g, "$2.call(this)");

	// public method
	// code = code.replace(/public(\s+)method(\s+)(\w+)/g, "this.$3 = function ");
	// code = code.replace(/private(\s+)method(\s+)(\w+)/g, "function $3 ");

	// public / private
	// code = code.replace(/public(\s+)/g, "this.");
	// code = code.replace(/private(\s+)/g, "var ");

	var prefix = '"use strict;"; ';
	code = prefix + code;
	/*
	if (code.indexOf("//") == 0) {
		code = prefix + code;
	} else {
		code = prefix + "\n" + code;
	}
	*/

	return code;
}


function Root() {
	this.class = "Root";
	this.text = function() {
		return this.class;
	}
}

function Exception() {
	Root.call(this);
	this.class = "Exception";
}

function System() {
	Root.call(this);
	this.class = "System";
	this.execute = function(x) {
	}
	this.write = function(data) {
		console.log(data);
	}
}

function Engine () {
	Root.call(this);
	this.class = "Engine";

	this.execute = function(code) {
		return eval(code);
	}
	this.parse = function(data) {
		return JSON.parse(data);
	}
	this.text = function(data) {
		return JSON.stringify(data);
	}
}

function Web() {
	Root.call(this);
	thisclass = "Web";

	this.select = function(x) {
		return document.querySelector(x);
	}
	this.list = function(x) {
		return document.querySelectorAll(x);
	}

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
		var str = "?";
		for (var key in data) {
			str += key + "=" + data[key] + "&";
		}
		request.open('get', url + str, true);
		request.send();
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
		var str = "";
		for (var key in data) {
			str += key + "=" + data[key] + "&";
		}
		request.open('post', url, true);
		request.setRequestHeader('Content-Type',
			'application/x-www-form-urlencoded; charset=UTF-8');
		request.send(str);
	}
}

function File (name) {
	Root.call(this);
	this.class = "File";
	this.name = name;
	this.read = function() {
		return "";
	}
	this.write = function(data) {
	}
}
function TextFile (name) {
	File.call(this);
	this.class = "TextFile";
	this.append = function(data) {
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























//
