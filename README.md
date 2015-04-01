![](https://raw.githubusercontent.com/kookiatsuetrong/cool/master/cool.jpg)

# The Cool! programming language () {

Cool! is a purely object-oriented programming language. It has been designed for
transpile to JavaScript easily. The syntax is similar to JavaScript and Java.
It supports only encapsulation and abstraction, no inheritance or polymorphism
for the current version.

# The Hello World program
Program written by the Cool! programming language starts from the start() method
of the Main class. So let's start by writing the first Hello World program:
```es6
class Main {
	method start() {
		var system = new System();
		system.print("Hello World!");
	}
}
```
To transpile the above code to JavaScript, you have to execute this command:
```
node transpile.js < hello.cool > hello.cool.js
```
Or run the code by run this command:
```
node transpile.js < hello.cool > hello.cool.js; node hello.cool.js
```

# Using Cool! in a web page
You can put your Cool! code in a separated .cool file like this:
```html
<script language="cool" src="/test.cool"></script>
```
Or using it as an inline code:
```html
<script language="cool">
... Your Cool! code here ...
</script>
```
Of course at the end of the page, you will need to include the "cool.js" file:
```html
<script src="/cool.js"></script>
```

# Importing JavaScript Code
You can use your existing JavaScript with Cool! by using require(). The
following code reads data from MySQL server using Node.js library:
```es6
class Main {
	method start() {
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

# Writing Recursion
```es6
class Main {
	method fib(n) {
		if (n <= 1) return n;
		return this.fib(n-1) + this.fib(n-2);
	}
	method start() {
		var system = new System();
		system.log(this.fib(40));
	}
}
```


# Writing class with constructor
```es6
class Student(name, dob) {
	member name;
	member dob;
	
	constructor {
		this.name = name;
		this.dob = dob;
	}
	method toString() {
		return this.name + ' ' + this.dob;
	}
}

class Main {
	method start() {
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


# Web MVC Framework
```javascript
class MyApp {
	member system = new System();
	member engine = new Engine();

	method error(context) {
		var page = this.engine.render("error.html");
		context.response.end(page);
	}

	method index(context) {
		var page = this.engine.render("index.html");
		context.response.end(page);
	}
}

class Main {
	method start() {
		var app = new App();
		app.run(new MyApp());
	}
}
```

# Building Web API
```javascript
class MyApp {
	member system = new System();

	method index(context) {
		var tokens = context.request.url.split("/");
		var integer = new Integer();
		var data = {result: integer.parse(tokens[2]) * 2};
		var result = this.system.stringify(data);
		context.response.end(result);
	}
}

class Main {
	method start() {
		var app = new App();
		app.run(new MyApp());
	}
}
```

# To Do







# }
