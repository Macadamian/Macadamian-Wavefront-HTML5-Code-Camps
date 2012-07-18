var localConn = null;
var socket = io.connect('/');


// -------------------------------------
// Various WebRTC utility functions
//

var createConnection = function(localStream) {
	
	// If you want this to work over the Internet, you'll need to point this
	// at a TURN/STUN server, e.g. pjturn, to punch through NATs. Since, for
	// demo purposes, this is over a local network, we don't need to do this.
	var iceInfo = "";

	localConn = new webkitPeerConnection00(iceInfo, function(candidate) {
		if (candidate) {
			socket.emit('candidate', candidate.label, candidate.toSdp());
		}
	});

	localConn.onaddstream = function(event) {
		var theirUrl = webkitURL.createObjectURL(event.stream);
		var theirVideo = $('#their-video')[0];
		theirVideo.src = theirUrl;
	};

	localConn.onconnecting = function(event) {
		console.log("Session connecting");
	}

	localConn.onopen = function(event) {
		console.log("Session opened");
	};

	localConn.onerror = function(event) {
		console.log("Error opening connection: ");
		console.log(event);
	};

	// Start playing back our own video
	var ourUrl = webkitURL.createObjectURL(localStream);
	var ourVideo = $('#our-video')[0];
	ourVideo.src = ourUrl;

	localConn.addStream(localStream);
};

var sendOffer = function() {
	var offer = localConn.createOffer({audio:true, video:true});
	localConn.setLocalDescription(localConn.SDP_OFFER, offer);
	localConn.startIce();

	console.log("Sending offer");
	console.log(offer);

	socket.emit('offer', offer.toSdp());
}

var acceptOffer = function(offer) {
	localConn.setRemoteDescription(localConn.SDP_OFFER, offer);
};

var acceptAnswer = function(answer) {
	localConn.setRemoteDescription(localConn.SDP_ANSWER, answer);
};

var acceptCandidate = function(candidate) {
	localConn.processIceMessage(candidate);
};

var sendAnswerToOffer = function(offer) {
	var answer = localConn.createAnswer(offer.toSdp(), { video: true, audio: true });
	localConn.setLocalDescription(localConn.SDP_ANSWER, answer);
	localConn.startIce();
	socket.emit('answer', answer.toSdp());
};



// -------------------------------------
// Server communication
//

socket.on('start', function() {
	// The server just matched us up with someone and has told us to start a call.
	// TODO: How do we start the call?
});

socket.on('offer', function(sdp) {
	console.log("Received offer");
	console.log(sdp);

	var offer = new SessionDescription(sdp);

	// We just received an offer from the server. 
	// TODO: What should we do with this offer?
});

socket.on('answer', function(sdp) {
	console.log("Received answer");
	console.log(sdp);

	var answer = new SessionDescription(sdp);

	// We just received an answer to our offer from the server. 
	// TODO: How should we start the call?
});

socket.on('candidate', function(label, candidateData) {
	console.log("Received candidate with label " + label);
	console.log(candidate);

	// An ICE candidate gives details about how to connect to a user, punching
	// through any firewalls or NATs in the way. The details aren't important
	// here.
	var candidate = new IceCandidate(label, candidateData);

	// We just received an candidate... 
	// TODO: What do we do with it?
});



// -------------------------------------
// Application startup
//

$(document).ready(function() {
	navigator.webkitGetUserMedia({video:true, audio:true}, function(stream) {
		createConnection(stream);
		socket.emit('connect');	
	}, function() {});
});
