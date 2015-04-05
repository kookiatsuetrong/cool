![](https://raw.githubusercontent.com/kookiatsuetrong/cool/master/logo/cool.jpg)

# The Cool! programming language () {

Cool! is a purely object-oriented programming language. It has been designed for
transpile to JavaScript directly. The syntax is similar to JavaScript and Java.
It supports encapsulation, abstraction, inheritance, polymorphism and many
features. Some feature such as static member are considering to implement in
the near future.

The another benefit of the Cool! programming language is it comes with a small
library or framework. So developer can easily to remember and no need to use
any IDE. A large framework language like Java or C# is very hard to remember
even doing a common task such as reading database. Cool! will have only 20-30
basic methods such as File.read() or Database.execute().

The Cool! programming language is similar to CoffeeScript, Dart, and TypeScript
in term of "transpile" to JavaScript. It can run both browser-side and
server-side. And of course it is a superset of JavaScript, it can load Node.js
module directly.

# The first program
A Cool! program starts from the constructor of any main class. So let's start
by writing the first Cool! program:
```es6
main class Hello {
	new {
		var system = new System();
		system.log("Cool!");
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

# The Member keyword
A class consist of property and method, both can be declared using keyword
"member". If you want to access these member please use this. follow by the
identifier of member.

# Writing a recursion method
```es6
main class Fibonacci {
	new {
		var system = new System();
		system.log(this.calculate(40));
	}
	member calculate(n) {
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
	member toString() {
		return this.name + ' ' + this.dob;
	}
}
main class Main {
	new {
		var system = new System();
		var students = [];
		students[0] = new Student("James", "1980-01-01");
		students[1] = new Student("Smith", "1980-03-01");
		for (var i = 0; i < students.length; i++) {
			system.log(students[i].toString());
		}
	}
}
```

# Inheritance and Polymorphism
Similar to Java.
```es6
class A {
	member system = new System();
	member aaa() { this.system.log("A.aaa()"); }
}
class B {
	member system = new System();
	member bbb() { this.system.log("B.bbb()"); }
}
class C(p) extends A {
	member p = p;
	member aaa() {
		// do something polymorphism here
	}
	member ccc() {
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
```html
<script type="text/cool">
main class Main {
	new {
		var page = new Page();
		var body = page.select('body');
		body[0].onscroll = this.onScroll;
		body[0].onclick  = this.onClick;
	}
	member onClick(e) {
		var system = new System();
		system.log(e);
	}
	member onScroll(e) {
		var system = new System();
		system.log(this.scrollY);
	}
}
</script>
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

		var system = new System();

		pool.getConnection(function (error, db) {
			db.query("select * from users", [], function (error, records) {
				if (!error) {
					system.log(records);
				}
				db.release();
				system.exit();
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

	member index(context) {
		context.response.end("Cool!");
	}
}
```
Then navigate to http://localhost:2000, you will see a greeting!

# MVC View Engine and Database
```es6
class MyController extends Controller {
	member view  = new View();
	member model = new Model();

	new {
		this.view.header = "header.html";
		this.view.footer = "footer.html";
	}

	member error(context) {
		var page = this.view.render("error.html", {
			title: "Error " + context.request.url
		});
		context.response.end(page);
	}

	member index(context) {
		var page = this.view.render("index.html", {
			title: "Cool!"
		});
		context.response.end(page);
	}

	member query(context) {
		var view = this.view;
		this.model.query("select * from users", function(data) {
			var page = view.render("query.html", {
				title: "MySQL",
				data: data
			});
			context.response.end(page);
		});
	}
}

main class Test {
	new {
		var controller = new MyController();
		var server = new Server(controller);
		server.start();
	}
}
```

The default template engine is EJS.
```html
<% for (var i = 0; i < data.length; i++) { %>
		<%= data[i].email %><br/>
<% } %>
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
- 2-way binding (similar to Angular.js)
- New way of multiple inheritance
- Static member (similar to Java / C#)
- Nested class
- Partial class (C#)
- import vs require
- Syntax checking
```

# }
