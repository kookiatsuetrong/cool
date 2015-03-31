var scripts = document.getElementsByTagName('script');

for (var i = 0; i < scripts.length; i++) {
	if (scripts[i].attributes['language'] != null) {
		if (scripts[i].attributes['language'].value === 'cool') {
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
	request.open('GET', url, true);

	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			var text = request.responseText;
			eval(transpile(text));
		}
	};

	request.send();
}

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

	if (originalCode.match(/class(\s+)Main/))
		code += "\n;\n(new Main()).start();\n";
	return code;
}


// Use static method ?

function System() {

	this.execute = function(x) {
		return eval(x);
	}

	this.parse = function(x) {
		return JSON.parse(x);
	}

	this.print = function(x) {
		console.log(x);
	}

	this.exit = function() {
	}
}

function Number() {
	this.parseInt = function(x) {
		return parseInt(x);
	}

	this.parseFloat = function(x) {
		return parseFloat(x);
	}
}






















//
