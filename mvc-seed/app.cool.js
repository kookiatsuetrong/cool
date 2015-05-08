"use strict;"; // Web MVC Demo

function MyController () {  Controller.call(this); 
	this.view  = new View();
	this.database = new Database("mysql://user:password@localhost/db");

	{
		this.view.header = "header.html";
		this.view.footer = "footer.html";
	}

	this.error = function (context) {
		var page = this.view.render("error.html", {
			title: "Error " + context.request.url
		});
		context.response.end(page);
	}

	this.index = function (context) {
		var page = this.view.render("index.html", {
			title: "Cool!"
		});
		context.response.end(page);
	}

	this.query = function (context) {
		var view = this.view;
		this.database.execute("select * from users", function(records) {
			var model = {title: "Query", records: records};
			var page  = "";
			try {
				page = view.render("query.html", model);
			} catch (e) {}
			context.response.end(page);
		});
	}

	this.test = function (context) {
		var info = {
			name: "name",
			data: [
				{email: "email0@email.com"},
				{email: "email1@email.com"},
				{email: "email2@email.com"},
			]
		};
		var engine = new Engine();
		context.response.end(engine.text(info));
	}
}

new Test(); function Test () { 
	{
		var controller = new MyController();
		var server = new Server(controller);
		// server.middleware.push(new Logger());
		server.middleware.push(new Less());
		server.start();
		var system = new System();
		system.write(server.text());
	}
}

new Simple(); function Simple () {  Controller.call(this); 
	{
		var server = new Server(this);
		server.port = 2001;
		server.start();
		var system = new System();
		system.write(server.text());
	}

	this.index = function (context) {
		context.response.end("Cool!");
	}
}













//

// Standard Library

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

	this.write = function (data) {
		console.log(data);
	}
	this.execute = function (name) {
		var child = require("child_process");
		child.exec(name).unref();
	}
}

// JavaScript Engine
function Engine () {  Root.call(this); 
	this.class = "Engine";

	this.execute = function (code) {
		return eval(code);
	}
	this.parse = function (data) {
		return JSON.parse(data);
	}
	this.text = function (data) {
		return JSON.stringify(data);
	}
}

function Web () {  Root.call(this); 
	this.class = "Web";
	this.select = function (x) {
		return [];
	}
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

function Integer () {  Root.call(this); 
	this.class = "Integer";
	this.parse = function (n) { return parseInt(n); }
}

function Float () {  Root.call(this); 
	this.class = "Float";
	this.parse = function (f) { return parseFloat(f); }
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

function Database (connection){ Root.call(this); 
	this.connection = "";
		/*
		{
		host     : "localhost",
		database : "db",
		user     : "user",
		password : "password"
		};
		*/

	{
		this.connection = connection;
	}

	this.mysql = require("mysql");
	this.pool  = this.mysql.createPool(this.connection);

	this.execute = function (sql, callback) {
		this.pool.getConnection(function(error, server) {
			if (error) {
				callback(null);
			} else {
				server.query(sql, function(error, data) {
					callback(data);
					server.release();
				});
			}
		});
	}
}

function View () {  Root.call(this); 
	this.fs     = require("fs");
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
		// TODO: add caching here for production server
		return engine.render(html, data);
	}
}

function Server (controller){ Root.call(this); 
	this.port    = 2000;
	this.address = "0.0.0.0";
	this.http    = require("http");
	this.folder  = "./public"
	this.storage = require("fs");

	{
		this.controller = controller;
	}

	this.middleware = [];

	this.start = function () {
		var controller = this.controller;
		var server     = this;

		var http = this.http.createServer(function (request, response) {
			var context = {request:request, response:response, server:server};

			for (var i = 0; i < server.middleware.length; i++) {
				if (typeof server.middleware[i].request == "function") {
					server.middleware[i].request(context);
				}
			}

			var tokens = request.url.split(/\/|\?/g);
			var callee = tokens[1];
			if (callee == "") callee = "index";

			if (server.exception.indexOf(callee) >= 0) {
				response.statusCode = 404;
				response.setHeader("Content-Type", "text/html");
				controller.error(context);
			} else if (typeof controller[callee] == "function") {
				response.statusCode = 200;
				response.setHeader("Content-Type", "text/html");
				controller[callee](context);
			} else {
				// TODO: check existing here then send(file) or 404
				server.send(context);
			}
		});

		http.listen(this.port, this.address);
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
					server.storage.readFile(path, {encoding:"utf8"},
					function(error, data) {
						response.end(data);
					});
				} else {
					response.end(data);
				}
			}
		});
	}

	this.text = function () {
		return "Running at http://" + this.address + ":" + this.port;
	}

	this.exception = [
		"__defineGetter__",
		"__defineSetter__",
		"__lookupGetter__",
		"__lookupSetter__",
		"constructor",
		"hasOwnProperty",
		"isPrototypeOf",
		"propertyIsEnumerable",
		"toLocaleString",
		"toString",
		"valueOf"
	];

	this.mime = {
		"html" : { text: true , type: "text/html"  },
		"js"   : { text: true , type: "text/javascript"  },
		"css"  : { text: true , type: "text/css"         },
		"cool" : { text: true , type: "text/cool"        },
		"txt"  : { text: true , type: "text/plain"       },
		"map"  : { text: true , type: "text/plain"       },
		"json" : { text: true , type: "application/json" },
		"xml"  : { text: true , type: "application/xml"  },
	};
}

function Controller () {  Root.call(this); 
	this.index = function (context) {context.response.end(); }
	this.error = function (context) {context.response.end(); }
}

function Middleware () {  Root.call(this); 
	this.request = function (context) {
	}
}

function Logger () {  Middleware.call(this); 
	this.request = function (context) {
		var system = new System();
		system.write(context.request.url);
	}
}

function Less () {  Middleware.call(this); 
	this.less = require('less');

	this.request = function (context) {
		var urlTokens  = context.request.url.split("/");
		var path       = context.server.folder + context.request.url;
		var pathTokens = path.split(".");
		var fileType   = pathTokens[pathTokens.length-1];
		var less       = this.less;
		if (fileType == "css") {
			var old = path.replace(/\.css$/g, ".less");
			context.server.storage.readFile(old, {encoding:"utf8"},
			function(error, data) {
				if (!error) {
					less.render(data, function(error, css) {
						if (!error) {
							context.server.storage.writeFile(path, css.css);
						}
					});
				}
			});
		}
	}
}

// TODO: On production server, .html, .js, .css must be minified
// or create minified middleware

