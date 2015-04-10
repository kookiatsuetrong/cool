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
