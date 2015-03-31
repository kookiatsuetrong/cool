# Cool!

The Cool Programming Language

# Hello World
Program written by the Cool programming language starts from the class "Main"
and method "start". So let's start by writing the first Hello World program:
```
class Main {
  method start() {
    var system = new System();
    system.print("Hello World!");
  }
}
```
To transpile the above code to JavaScript, you have to issue this command:
node transpile.js < hello.cool > hello.cool.js

Or transpile and run by one line command:
node transpile.js < hello.cool > hello.cool.js; node hello.cool.js

# Class with constructor
```
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

# Using Cool in web page
```html
<script language='cool' src='/test.cool'></script>
```
Or
```html
<script language='cool'>
... Your code here
</script>
```
Both needs this code:
```html
<script src='/cool.js'></script>
```
















# End
