
Template.randomWalk.created = function() {
    console.log("randomWalk created()");

};


Template.randomWalk.helpers({

});

Template.randomWalk.events({

});


Template.randomWalk.rendered = function() {

    console.log("randomWalk randered()");

    tonejs(); // Tone.js for sound
    p5js(); // p5.js for drawing
};


Template.randomWalk.destroyed = function() {
    if (p5_object) {
		console.log("Erase p5_object");
		p5_object = null;
	}
};





var tonejs = function() {

	//pass in some initial values for the filter and filter envelope
	var synth = new Tone.Synth({
		"oscillator" : {
			"type" : "sine",
	        // "type" : "sine"
		},
		"envelope" : {
			"attack" : 0.02,
			"decay" : 0.1,
			"sustain" : 0.2,
			"release" : 0.9,
		}
	}).toMaster();


	// var poly = new Tone.PolySynth(4, synth).toMaster();
	var poly = new Tone.PolySynth(4, Tone.Synth).toMaster();
    synth.triggerAttackRelease("A4", "8n");

}




var p5js = function() {

    setup = function() {
        createCanvas(400, 400);

    }
    p5_object = new p5();

    // Constructor
    var Walker = function() {
        this.x = width/2;
        this.y = height/2;
    }

    // method
    Walker.prototype.display = function() {
        stroke(0, 0, 0);
        point(this.x, this.y);
    }

    Walker.prototype.walk = function() {
        var choice = floor(random(4));
        if (choice === 0) {
            this.x++;
        } else if (choice === 1) {
            this.x--;
        } else if (choice === 2) {
            this.y++;
        } else {
            this.y--;
        }
    }

    // make instance
    var w = new Walker();

    draw = function() {
        drawBoundary();
        w.walk();
        w.display();
    }

    var drawBoundary = function() {
        stroke(0);
        noFill();
        rect(0, 0, width - 1, height - 1);
    }

}
