var http = require('http');
var paperboy = require('paperboy');

// Serve the static content

var app = http.createServer(function(req, res) {
	var ip = req.connection.remoteAddress;
	paperboy
		.deliver(".", req, res)
		.addHeader('Expires', 300)
		.after(function(status) {
			console.log(status + " - " + req.url + " - " + ip);
		})
		.error(function(status, message) {
			res.writeHead(status, {'Content-Type': 'text/plain'});
			res.end("Error " + status + ": " + message);
			console.log(status + " - " + req.url + " - " + ip);
		})
		.otherwise(function(error) {
			res.writeHead(404, {'Content-Type': 'text/plain'});
			res.end("404: Not found");
			console.log(404 + " - " + req.url + " - " + ip);
		});
});

app.listen(3000);


var io = require('socket.io').listen(app);

var last_socket = null;
var matches = {};

io.sockets.on('connection', function (socket) {
	socket.on('connect', function() {
		if(last_socket == null) {
			last_socket = socket;
		} else {
			console.log("Connecting socket " + socket.id + " to " + last_socket.id);

			// Match up the two sides
			socket.set('match', last_socket);
			last_socket.set('match', socket);
			last_socket = null;

			// Tell one side to start a call
			socket.emit('start');
		}
	});

	socket.on('offer', function (offer) {
		console.log("Received offer from " + socket.id + ":\n" + offer);
		socket.get('match', function(err, match) {
			console.log("Routing to socket " + match.id);
			match.emit('offer', offer);
		});
	});

	socket.on('answer', function(answer) {
		console.log("Received answer:\n" + answer);

		// Pass it onto the other side
		socket.get('match', function(err, match) {
			console.log("Routing to socket " + match.id);
			match.emit('answer', answer);
		});
	});

	socket.on('candidate', function(label, candidate) {
		console.log("Received candidate with label " + label + ":\n" + candidate);

		socket.get('match', function(err, match) {
			console.log("Routing to socket " + match.id);
			match.emit('candidate', label, candidate);
		});

	})
});
