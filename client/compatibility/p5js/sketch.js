// var bug;  // Declare object
var bugs = [];
var n = 100;

function setup() {
  createCanvas(710, 400);
  // createCanvas(window.innerWidth, window.innerHeight);
  // Create object

  for (var i = 0; i < n; i++){
	  var bug = new Jitter();
	  bugs.push(bug);
  }

}

function draw() {
	// background(0, 40);
	background(255, 40);

	for(var i = 0; i < bugs.length; i++){
		var bug = bugs[i];
		bug.move();
		bug.beating();
		bug.display();
	}

}

// Jitter class
function Jitter() {
	this.x = random(width);
  	this.y = random(height);
	this.r = random(20.0, 26.0);
	this.bps = 0.01;
  	this.diameter = random(10, 30);
  	this.speed = 1;

	this.move = function() {
		this.x += random(-this.speed, this.speed);
		this.y += random(-this.speed, this.speed);
	};

	this.beating = function() {
		 this.diameter = this.r * (2 + sin( (millis()/(1000/TWO_PI)*this.bps) % TWO_PI)); // float
	}

	this.display = function() {
		noFill();
		stroke(0, 255 * noise(this.y));
		strokeWeight(noise(this.x))
		ellipse(this.x, this.y, this.diameter, this.diameter);
		line(this.x - this.diameter/2, this.y - this.diameter/2, this.x + this.diameter/2, this.y + this.diameter/2);
		rect(this.x, this.y, this.diameter, this.diameter);
	}

};
