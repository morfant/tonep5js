
Template.randomWalk.created = function() {
    console.log("randomWalk created()");

};


Template.randomWalk.helpers({

});

Template.randomWalk.events({

});


Template.randomWalk.rendered = function() {

    console.log("randomWalk randered()");

    tonejs();
    p5js();
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

    setup = function () {
        // console.log("setup()");
        createCanvas(800, 400);
        background(100, 200, 100);
    };

    p5_object = new p5();

    draw = function () {
    	background(255, 40);
        stroke(255, 0, 0);
        ellipse(width/2, height/2, 100, 100);
    }

}
