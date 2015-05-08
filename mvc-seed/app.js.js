"use strict;"; 
function Simple () {
	Controller.call(this);

	this.index = function (context) {
		context.response.end("Cool!");
	}
}

var simple = new Simple();
var server = new Server(simple);
server.port = 2003;
server.start();

// Standard Library

/*
Standard
9 Classes:
Root, Exception, System, Engine, Web, Integer, Float, File, TextFile
11 Methods
text, read, write, append, log, execute, select, list, get, post, parse

MVC
4 Classes
Model View Controller Server
4 Methods
render index error start (execute)
*/

function Root () { 
	this.class = "Root";
	this.text = function () {
		return this.class;
	}
}

function Exception () {  Root.call(this); 
	this.class = "Exception";
}

function System () {  Root.call(this); 
	this.class = "System";

	this.log = function (data) {
		console.log(data);
	}
	this.write = function (data) {
		process.stdout.write(data);
	}
	this.execute = function (name) {
		var child = require("child_process");
		child.exec(name).unref();
	}
}

function Web () {  Root.call(this); 
	this.class = "Web";

	this.list = function (x) {
		return [];
	}
	this.get = function (url, data, callback) {
		callback();
	}
	this.post = function (url, data, callback) {
		callback();
	}
}

// JavaScript Engine
function Engine () {  Root.call(this); 
	this.class = "Engine";

	this.execute = function (code) {
		eval(code);
	}
	this.parse = function (data) {
		return JSON.parse(data);
	}
	this.text = function (data) {
		return JSON.stringify(data);
	}
}

function Integer () {  Root.call(this); 
	this.class = "Integer";
	this.parse = function (n) { return parseInt(n); }
}

function Float () {  Root.call(this); 
	this.class = "Float";
	this.parse = function (f) { return parseFloat(f); }
}

function File (name){ Root.call(this); 
	this.class = "File";
	this.fs = require("fs");
	{
		this.name = name;
	}
	this.read = function () {
		var result = null;
		try {
			result = this.fs.readFileSync(this.name);
		} catch (e) { /* throw new Exception(); */ }
		return result;
	}
	this.write = function (data) {
		this.fs.writeFileSync(this.name, data);
	}
}

function TextFile (name){ File.call(this, name); 
	this.class = "TextFile";

	this.read = function () {
		var result = null;
		try {
			result = this.fs.readFileSync(this.name, {encoding: "utf8"});
		} catch (e) { /* throw new Exception(); */ }
		return result;
	}
	this.write = function (data) {
		this.fs.writeFileSync(this.name, data);
	}
	this.append = function (data) {
		this.fs.appendFileSync(this.name, data);
	}
}

/*
this.exists = function (name) {
	return this.fs.existsSync(name);
}
this.list = function (name) {
	return this.fs.readdirSync(name);
}
this.isDirectory = function (name) {
	var info = this.fs.statsSync(name);
	return info.isDirectory();
}
*/

// DEPRECATED
function Console () {  Root.call(this); 
	this.class = "Console";
	this.data = "";
	this.index = 0;

	this.write = function (data) {
		process.stdout.write(data + "");
	}
	this.read = function (callback) {
		// process.stdin.resume();
		// process.stdin.setEncoding("UTF8");
		// process.stdin.on("data", function (chunk) { this.data += chunk; });

		process.stdin.on("readable", function() {
			var chunk = process.stdin.read();
			this.data += chunk;
		});
		process.stdin.on("end", function() { callback(this.data); });
	}
	/*
	this.readLine = function () {
		process.stdin.pause();
		var lines = this.data.split("\n");
		process.stdin.resume();
		// return lines[this.index++];
	}
	*/
}

// Web MVC Framework

function Model () {  Root.call(this); 
	this.mysql  = require("mysql");
	this.pool   = this.mysql.createPool({
		host      : "localhost",
		user      : "user",
		password  : "password",
		database  : "db"
		});

	this.execute = function (sql, callback) {
		this.pool.getConnection(function(error, db) {
			if (error) {
				callback(null);
			} else {
				db.query(sql, function(error, data) {
					if (error) {
						callback(null);
					} else {
						callback(data);
					}
					db.release();
				});
			}
		});
	}
}

function View () {  Root.call(this); 
	this.fs     = require('fs');
	this.engine = require("ejs");
	this.folder = "./views/";
	this.header = "";
	this.footer = "";

	this.render = function (name, data) {
		var engine = this.engine;
		var header = this.fs.readFileSync(this.folder + this.header);
		var footer = this.fs.readFileSync(this.folder + this.footer);
		var center = this.fs.readFileSync(this.folder + name);
		var html = header + center + footer;
		// TODO: add hashing here for production server
		return engine.render(html, data);
	}
}

function Controller () {  Root.call(this); 
	this.index = function (context) {context.response.end(); }
	this.error = function (context) {context.response.end(); }
}

// TODO: On production server, .html, .js, .css must be minified
function Server (controller){ Root.call(this); 
	this.port    = 2000;
	this.address = "0.0.0.0";
	this.http    = require("http");
	this.system  = new System();
	this.folder  = "./public"
	this.storage = require('fs');
	this.less    = require('less');

	{
		this.controller = controller;
	}

	this.start = function () {
		var controller = this.controller;
		var server  = this;

		var http = this.http.createServer(function (request, response) {
			var context    = {request:request, response:response};
			var urlTokens  = request.url.split("/");
			var callee     = urlTokens[1];
			if (callee == "") callee = "index";

			if (typeof controller[callee] == "function") {
				response.statusCode = 200;
				response.setHeader("Content-Type", "text/html");
				controller[callee](context);
			} else {
				// TODO: check existing here then send(file) or 404
				server.send(context);
			}
		});

		http.listen(this.port, this.address);
		console.log("Running at http://" + this.address + ":" + this.port);
	}

	this.send = function (context) {
		var response   = context.response;
		var request    = context.request;
		var server     = this;
		var controller = this.controller;

		var urlTokens  = request.url.split("/");
		var path       = server.folder + request.url;
		var pathTokens = path.split(".");
		var fileType   = pathTokens[pathTokens.length-1];

		if (fileType == "css") {
			// TODO: add production code, compile only first time
			// TODO: support other CSS preprocessor e.g. sass, scss
			response.setHeader("Content-Type", "text/css");
			var oldPath = path.replace(/\.css$/g, ".less");
			server.storage.readFile(oldPath, {encoding:"utf8"},
			function(error, oldData) {
				if (error) {
					server.storage.readFile(path, {encoding:"utf8"},
					function(error, data) {
						if (error) {
							response.statusCode = 404;
							response.setHeader("Content-Type", "text/html");
							controller.error(context);
						} else {
							response.statusCode = 200;
							response.end(data);
						}
					});
				} else {
					server.less.render(oldData, function(error, css) {
						var data = oldData;
						if (!error) data = css.css;
						server.storage.writeFile(path, data);
						response.statusCode = 200;
						response.end(data);
					});
				}
			});
		} else {
			server.storage.readFile(path, function(error, data) {
				if (error) {
					response.statusCode = 404;
					response.setHeader("Content-Type", "text/html");
					controller.error(context);
				} else {
					var mime   = server.mime[fileType] == null ?
									"application/octet-stream" :
									server.mime[fileType].type;
					var isText = server.mime[fileType] == null ?
									false :
									server.mime[fileType].text;

					response.statusCode = 200;
					response.setHeader("Content-Type", mime);

					if (isText) {
						server.storage.readFile(path,{encoding:"utf8"},
						function(error, data) {
							response.end(data);
						});
					} else {
						response.end(data);
					}
				}
			});
		}
	}

	this.mime = {
		"js"   : { text: true , type: "text/javascript"  },
		"css"  : { text: true , type: "text/css"         },
		"cool" : { text: true , type: "text/cool"        },
		"txt"  : { text: true , type: "text/plain"       },
		"map"  : { text: true , type: "text/plain"       },
		"json" : { text: true , type: "application/json" },
		"xml"  : { text: true , type: "application/xml"  },
	};
}

