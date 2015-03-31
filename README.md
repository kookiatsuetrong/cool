# The Cool! programming language

Cool! is a purely object-oriented programming language.

# The Hello World program
Program written by the Cool! programming language starts from the class "Main"
and start() method. So let's start by writing the first Hello World program:
```scala
class Main {
	method start() {
		var system = new System();
		system.print("Hello World!");
	}
}
```
To transpile the above code to JavaScript, you have to issue this command:
```
node transpile.js < hello.cool > hello.cool.js
```
Or run the code by issue this command:
```
node transpile.js < hello.cool > hello.cool.js; node hello.cool.js
```

# Writing a class with constructor
```scala
class Student(name, dob) {

	object name;
	object dob;

	constructor {
		this.name = name;
		this.dob = dob;
	}

	method toString() {
		return this.name + ' ' + this.dob;
	}
}
```

# Using Cool! in a web page
You can put your Cool! code in a separated .cool file like this:
```html
<script language='cool' src='/test.cool'></script>
```
Or using it as an inline code:
```html
<script language='cool'>
... Your code here ...
</script>
```
At the end of the page, it needs this code:
```html
<script src='/cool.js'></script>
```

# Import JavaScript Code
You can use your existing JavaScript with Cool! by using require(). The
following code reads data from MySQL server using Node.js library:
```scala
class Main {
	method start() {
		var mysql = require("mysql");
		var pool  = mysql.createPool({
			host     : "localhost",
			user     : "user",
			password : "password",
			database : "database"
		});

		pool.getConnection(function (error, db) {
			db.query("select * from users", [], function (error, records) {
				if (!error) {
					console.log(records);
				}
				db.release();
			});
		});
	}
}
```

# Recursion
```scala
class Main {
	method fib(n) {
		if (n <= 1) return n;
		return this.fib(n-1) + this.fib(n-2);
	}
	method start() {
		var c = require('./console');
		c.print(this.fib(40));
	}
}
```




















# End
