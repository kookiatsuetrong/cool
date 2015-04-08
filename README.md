![](https://raw.githubusercontent.com/kookiatsuetrong/cool/master/logo/cool.jpg)

# The Cool! programming language () {

Cool! is a purely object-oriented programming language. It has been designed for
transpiling to JavaScript directly. The syntax is very similar to JavaScript,
Java and C#. It supports abstraction, encapsulation, inheritance, polymorphism
and many features. Some feature such as static member or big number are
considering to implement in the future.

The another benefit of the Cool! programming language is the built-in small
library or framework. So developer can easily remember method name and no need
to use any IDE. A large framework like ASP.net MVC, is very hard to remember
even doing a common task such as reading database. Cool! will have only 20-30
basic methods such as File.read() or Database.execute().

Cool! is similar to CoffeeScript, Dart, and TypeScript in term of they're
"transpile" their code to JavaScript. It can run both browser-side and
server-side. And of course it is a superset of JavaScript, so everything in
JavaScript is valid in Cool!. And of course it can load and run Node.js module
directly.

Philosophies of the Cool! programming language:
- SAB - Server And Browser - Use only one language from server to browser
- TOI - Text editor Over IDE - You can use any text editor to write Cool!
- LIS - Life Is Short - Don't spend 10000 hours learning large framework.
- LOE - Learn Online Easily - No installation required. Cool! has online editor.

# The first program
A Cool! program starts from the constructor of any main class. So let's start
by writing the first Cool! program:
```es6
main class Hello {
	new {
		var system = new System();
		system.write("Cool!");
	}
}
```
To transpile the above code to JavaScript, you have to execute this command:
```
node transpile.js < hello.cool > hello.cool.js
```
Then you can run this program by execute this command:
```
node hello.cool.js
```

# Writing a recursion method
```es6
main class Fibonacci {
	new {
		var system = new System();
		system.write(this.calculate(40));
	}
	method calculate(n) {
		if (n <= 1) return n;
		return this.calculate(n-1) + this.calculate(n-2);
	}
}
```

# More complex constructor
Creating an object in Cool! is easy like Java / C# by writing new ClassName()
```es6
class Student(name, dob) extends Root {
	member name;
	member dob;
	new {
		this.name = name;
		this.dob = dob;
	}
	method text() {
		return this.name + " " + this.dob;
	}
}

main class Main {
	new {
		var system = new System();
		var students = [];
		students[0] = new Student("James", "1980-01-01");
		students[1] = new Student("Smith", "1980-03-01");
		for (var i = 0; i < students.length; i++) {
			system.write(students[i].text() + "\n");
		}
	}
}
```

# Inheritance and Polymorphism
Similar to Java.
```es6
class A {
	member system = new System();
	method aaa() { this.system.log("A.aaa()"); }
}
class B {
	member system = new System();
	method bbb() { this.system.log("B.bbb()"); }
}
class C(p) extends A {
	member p = p;
	method aaa() {
		// do something polymorphism here
	}
	method ccc() {
	}
}
class D(p) extends C(p) {}
class E extends B {}
```

If you want to use multiple inheritance please use extend keyword for example:
```es6
class F(p) {
	extend C(p);
	extend E;
}
```

# The Root class
The Root class is the base class for every class, please explicitly extends
from this class. Unlike Java or C# that automatically extends from the Object
class. For example:
```es6
class Root {
	...
}
class System extends Root {
	...
}
```

# Exception
```es6
try {
	...
} catch (error) {
	throw new Exception();
}
```

# Using Cool! in a web page
You can put your Cool! code in a separated .cool file like this:
```html
<script type="text/cool" src="/test.cool"></script>
```
Or using it as an inline code:
```html
<script type="text/cool">
... Your Cool! code here ...
</script>
```
Of course at the end of the page, you will need to include the "cool.js" file:
```html
<script src="/cool.js"></script>
```

# HTML Event Handling
```es6
<script type="text/cool">
main class Main {
	method scroll(e) {
		var system = new System();
		system.log("Scrolling " + this.scrollY);
	}
	method resize(e) {
		var page = new Web();
		var body = page.select("body");
		var footer = page.select("footer");

		if (window.innerHeight > body.clientHeight) {
			footer.style.position = "absolute";
		} else {
			footer.style.position = "relative";
		}
	}
	new {
		var system = new System();
		var page = new Web();
		var body = page.select('body');
		body.onscroll = this.scroll;
		body.onresize = this.resize;
		this.resize();
	}
}
</script>
```

# More Complicate Event Handling
```es6
main class Start {
	method keydown(event) {
		var TAB = 9;
		if (event.keyCode == TAB) {
			var start = this.selectionStart;
			var end = this.selectionEnd;
			var target = event.target;
			var value = target.value;
			target.value = value.substring(0, start)
				+ "\t"
				+ value.substring(end);
			this.selectionStart = this.selectionEnd = start + 1;
			event.preventDefault();
		}
	}

	new {
		var web = new Web();
		var editor = web.select("#cool-code");
		editor.onkeydown = this.keydown;
	}

}

```

# Reading Data from AJAX
```es6
var web = new Web();
web.get("/test", {}, function (data) {
	var engine = new Engine();
	var system = new System();
	system.write(engine.parse(data));
});
```

# Importing JavaScript Code
You can use your existing JavaScript with Cool! by using require(). The
following code reads data from MySQL server using Node.js library:
```es6
main class Main {
	new {
		var mysql = require("mysql");
		var pool  = mysql.createPool({
			host     : "localhost",
			user     : "user",
			password : "password",
			database : "db"
		});
		pool.getConnection(function (error, db) {
			db.query("select * from users", function (error, records) {
				if (!error) {
					var system = new System();
					system.log(records);
				}
				db.release();
				pool.end();
			});
		});
	}
}
```

# Web MVC Framework
```es6
main class Simple extends Controller {
	new {
		var server = new Server(this);
		server.start();
	}

	method index(context) {
		context.response.end("Cool!");
	}
}
```
Then navigate to http://localhost:2000, you will see a greeting!

# Using View and Database
```es6
class MyController extends Controller {
	member view  = new View();
	member database = new Database();

	new {
		this.view.header = "header.html";
		this.view.footer = "footer.html";
	}

	method error(context) {
		var page = this.view.render("error.html", {
			title: "Error " + context.request.url
		});
		context.response.end(page);
	}

	method index(context) {
		var page = this.view.render("index.html", {
			title: "Cool!"
		});
		context.response.end(page);
	}

	method query(context) {
		var view = this.view;
		this.database.execute("select * from users", function(records) {
			var model = {title: "Query", records: records};
			var page  = view.render("query.html", model);
			context.response.end(page);
		});
	}
}
```

The default template engine is EJS. You can also change to your preferred
template engine.
```html
<% for (var i = 0; i < data.length; i++) { %>
		<%= data[i].email %><br/>
<% } %>
```

If you want to build the sample MVC application, please go to the "mvc-seed"
directory and install Node.js modules by execute this command:
```
npm install ejs less mysql
```

And you can run the application by this command:
```
node ../transpile.js < app.cool > app.cool.js ; node app.cool.js
```

What you will see is here:
![](https://raw.githubusercontent.com/kookiatsuetrong/cool/master/logo/mvc-seed.png)

# Using Middleware
All middleware are processing request before the controller. There are some
built-in middleware, e.g. Logger for logging the request, Less for compiling
CSS files.
```es6
main class Test {
	new {
		var controller = new MyController();
		var server = new Server(controller);
		server.middleware.push(new Logger());
		server.middleware.push(new Less());
		server.start();
		var system = new System();
		system.write(server.text());
	}
}
```

# Writing Your Own Middleware (Advanced)
If you wan to build your own middleware, you can do it by inherit the
Middleware class and override the request() method.
```es6
class Logger extends Middleware {
	method request(context) {
		var system = new System();
		system.write(context.request.url);
	}
}
```

# Using MVC with JavaScript or ES6
You can also use Cool! MVC from JavaScript or ES6, for example:
```es6
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
```


# Additional Information
Currently Cool! is a superset of JavaScript, but something e.g. using global
object will be invalid in the future.

The "function" keyword uses for an internal or private function as well as
call back function. But the "method" keyword uses to declare a member method of
class.

Similar to the "var" keyword for private and local variable, the "member"
keyword are required when creating a member variable.

# To Do
```
- Annotation (similar to Java)
- 2-way data binding (similar to Angular.js)
- New way of multiple inheritance
- Static member (similar to Java, C# and ES6)
- Nested class
- Partial class (C#)
- Using import vs require
- Syntax checking
- Transpile Directive
- Canvas Demo
- Online Editor
- Transpile to ES6
```

# }
