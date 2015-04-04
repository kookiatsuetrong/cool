![](https://raw.githubusercontent.com/kookiatsuetrong/cool/master/logo/cool.jpg)

# The Cool! programming language () {

Cool! is a purely object-oriented programming language. It has been designed for
transpile to JavaScript easily. The syntax is similar to JavaScript and Java.
It supports encapsulation, abstraction, inheritance and polymorphism for the
current version. I'm consider to add static and other features to this language
in the near future.

The another benefit of the Cool! programming language is its small library or
framework. So developer can easily to remember and no need to use any IDE. A
large framework language like Java or C# is very hard to remember even doing a
common task. The Cool! programming language will have only 20-30 basic methods
such as File.read(), Integer.parse(), System.log().

The Cool! programming language is similar to CoffeeScript, Dart, and TypeScript
in term of "transpile" to JavaScript. It can run both browser-side and
server-side.

# The first program
Program written by the Cool! programming language starts from the constructor
of any any main class. So let's start by writing the first Cool! program:
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
The you can run this program by execute this command:
```
node hello.cool.js
```

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

# Writing class with constructor
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
```es6
// Demo of Inheritance and Polymorphism

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
main class Simple extends Server {
	member index(context) {
		context.response.end("Cool!");
	}
	new {
		this.start();
	}
}
```
Then navigate to http://localhost:2000, you will see a greeting!

# MVC Template Engine
```es6
class MyServer extends Server {
	member system = new System();
	member engine = new Engine();

	new {
		this.engine.header = "header.html";
		this.engine.footer = "footer.html";
	}

	member error(context) {
		this.system.log('error ' + context.request.url);
		var page = this.engine.render("error.html", {
			title: "Cool!"
		});
		context.response.end(page);
	}

	member index(context) {
		var page = this.engine.render("index.html", {
			title: "Cool!"
		});
		context.response.end(page);
	}
}

main class Main {
	new {
		var server = new MyServer();
		server.start();
	}
}
```

The default template engine is EJS.
```html
<%
	for (var i = 0; i < users.length; i++) {
%>
	<%= users[i].email %><br/>
<%
	}
%>

```


# Additional Information
The "function" keyword uses for an internal or private function as well as
call back function. But the "method" keyword uses to declare a member method of
class.

Similar to the "var" keyword for private and local variable, the "member"
keyword are required when creating a member variable.

# To Do
```
- Annotate and 2-way binding
- New way of multiple inheritance
- Static member
- Nested class
- import vs require
- Syntax checking
```




# }
