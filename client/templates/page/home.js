var makeSound = function(note, dur){
    synth.triggerAttackRelease(note, dur);
}


Template.home.created = function() {
	console.log("home created");

};

Template.home.helpers({
	p5_init: function () { // NOT USING
		console.log("init p5");
		p5_object = new p5();
	}
});

Template.home.events({
  'submit form': function(e, template) {
    // console.log("click submit");
    e.preventDefault();


    Meteor.call('bgImgURLUpdate', bgImgUrl, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);
      if (result){
        // console.log(result);
        template.find('#submitResultBG').textContent = getSubmittedURL_BG();
      }

      // Router.go('postPage', {_id: result._id});
    });

  }
});


Template.home.rendered = function() {
	console.log("Home rendered()");

	tonejs();
	p5js();

};



Template.home.destroyed = function() {
	if (p5_object) {
		console.log("Erase p5_object");
		p5_object = null;
	}
};


var tonejs = function() {

	//pass in some initial values for the filter and filter envelope
	var synth = new Tone.Synth({
		"oscillator" : {
			"type" : "pwm",
			"modulationFrequency" : 0.2
	        // "type" : "sine"
		},
		"envelope" : {
			"attack" : 0.02,
			"decay" : 0.1, "sustain" : 2.2,
			"release" : 0.9,
		}
	}).toMaster();

	var poly = new Tone.PolySynth(4, Tone.Synth).toMaster();
    synth.triggerAttackRelease("C4", "8n");

}


var p5js = function() {

	var bug;
	var bugs = [];
	var n = 10;

    // var p5_object = new p5();
    setup = function () {
        console.log("setup()");
        createCanvas(710, 400);
        // createCanvas(window.innerWidth, window.innerHeight);
        // Create object

        for (var i = 0; i < n; i++){
            var bug = new Jitter();
			// console.log(bug);
            bugs.push(bug);
        }

    };

	p5_object = new p5();

    draw = function () {
        // console.log("draw()");
    	background(0, 40);

        // stroke(255, 255, 0);
        // ellipse(width/2, height/2, 100, 100);

    	for(var i = 0; i < bugs.length; i++){
    		var bug = bugs[i];
			// console.log(bug);
    		bug.move();
    		bug.beating();
    		bug.display();
    	}

    }

    // console.log(window.setup);
    // console.log(window.draw);
    // console.log(document.readyState);

	// Jitter class
	function Jitter() {
	  this.x = random(width);
	  this.y = random(height);
  	this.r = random(20.0, 26.0);
		this.bps = 0.01;
	  this.diameter = random(10, 30);
	  this.speed = 1;

	  this.move = function() {
		//   console.log("move");
	    this.x += random(-this.speed, this.speed);
	    this.y += random(-this.speed, this.speed);
	  };

	  this.beating = function() {
		//   console.log("beating");
	 	this.diameter = this.r * (2 + sin( (millis()/(1000/TWO_PI)*this.bps) % TWO_PI)); // float
	  };

	  this.display = function() {
		//   console.log("display");
		  stroke(255);
	    ellipse(this.x, this.y, this.diameter, this.diameter);
	  }
	};

}
