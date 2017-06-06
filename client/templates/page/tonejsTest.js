var synth = null;
var poly = null;
var loop = null;
var synthA, synthB;
var pwm = null;
var player = null;

Template.tonejsTest.created = function() {
    console.log("tonejsTest created()");

};


Template.tonejsTest.helpers({

});

Template.tonejsTest.events({
    'click .o': function(){
        console.log("click o!");
        updateTime();
        scheduleSynth();
    },
    'change .t': function(e){
        console.log(e.target.checked);
        console.log("t: " + e.target.checked);
        if (e.target.checked){
            // Tone.Transport.start('+0.1');
            // pwm.start();
            player.start()
        } else {
            // Tone.Transport.stop();
            // pwm.stop()
            player.stop()
        }
    },
    'mousedown #synthA' : function(){
        console.log("synthA down");
        synthA.triggerAttack('C4');
    },
    'mouseup #synthA': function(){
        console.log("synthA up");
        synthA.triggerRelease();
    },
    'mousedown #synthB' : function(){
        console.log("synthB down");
        synthB.triggerAttack('C4');
    },
    'mouseup #synthB': function(){
        console.log("synthB up");
        synthB.triggerRelease();
    },
    'mousedown #chord' : function(){
        poly.triggerAttack(['C4', 'E4', 'G4', 'B4']);
    },
    'mouseup #chord': function(){
        poly.triggerRelease(['C4', 'E4', 'G4', 'B4']);
    },
    // 'mousedown': function(){
    //     console.log("mouse down");
    //     // synth.triggerAttack(440);
    // },
    // 'mouseup': function(){
    //     console.log("mouse up");
    //     // synth.triggerAttack();
    // },
    'input #bpm': function(e) {
        Tone.Transport.bpm.value = parseInt(e.target.value)
    }
});

var updateTime = function(){
    console.log("updateTime()");
    document.getElementById("second").textContent = Tone.Transport.seconds.toFixed(2);
    document.getElementById("time").textContent = Tone.now().toFixed(3);
};

var scheduleSynth = function(){
    updateTime();
    synth.triggerAttackRelease('C4', 0.5, 4);
    synth.triggerAttackRelease('E4', 0.5, 5);
    synth.triggerAttackRelease('G4', 0.5, 6);
    synth.triggerAttackRelease('B4', 0.5, 7);

    synth.triggerAttackRelease('C4', '4n', '8n')
    synth.triggerAttackRelease('E4', '8n', '4n + 8n')
    synth.triggerAttackRelease('G4', '16n', '2n')
    synth.triggerAttackRelease('B4', '16n', '2n + 8t')
    synth.triggerAttackRelease('G4', '16','2n + 8t * 2')
    synth.triggerAttackRelease('E4', '2n', '0:3')
}



Template.tonejsTest.rendered = function() {

    console.log("tonejsTest randered()");

    tonejs(); // Tone.js for sound
    // p5js(); // p5.js for drawing

    updateTime();
    // scheduleSynth();
    scheduleTransport();
};


Template.tonejsTest.destroyed = function() {
    if (p5_object) {
		console.log("Erase p5_object");
		p5_object = null;
	}
};


var triggerSynth = function(time) {
    synth.triggerAttackRelease('16n', time);
}

var scheduleTransport = function() {
    Tone.Transport.schedule(triggerSynth, 0)
    Tone.Transport.schedule(triggerSynth, '2*8t')
    Tone.Transport.schedule(triggerSynth, '4n + 8t')
    Tone.Transport.schedule(triggerSynth, '4n + 2*8t')
    Tone.Transport.schedule(triggerSynth, '0:2 + 8t')
    Tone.Transport.schedule(triggerSynth, '0:3 + 8t')

    // Tone.Transport.schedule(triggerSynth, 0);
    // Tone.Transport.schedule(triggerSynth, '0:2');
    // Tone.Transport.schedule(triggerSynth, '0:2:2.5');
    //
    Tone.Transport.loopEnd = '1m';
    Tone.Transport.loop = true;
}


var tonejs = function() {

    var distortion = new Tone.Distortion(0.2);
    var tremolo = new Tone.Tremolo().start();

	//pass in some initial values for the filter and filter envelope
	// synth = new Tone.Synth({
	// 	"oscillator" : {
	// 		"type" : "sine",
	//         // "type" : "sine"
	// 	},
	// 	"envelope" : {
	// 		"attack" : 0.02,
	// 		"decay" : 0.1,
	// 		"sustain" : 0.2,
	// 		"release" : 0.9,
	// 	}
	// }).toMaster();

    // synth = new Tone.MetalSynth().toMaster();
    // synth = new Tone.MembraneSynth().toMaster();
    // synth = new Tone.Synth().toMaster();
    synthA = new Tone.Synth({
        oscillator : {
            type : 'fmsquare',
            modulationType : 'sawtooth',
            modulationIndex : 6,
            harmonicity: 3.4
        },
        envelope : {
          	attack : 0.001,
            decay : 0.1,
            sustain: 0.1,
            release: 0.1
        }
    }).toMaster();

    synthB = new Tone.Synth({
        oscillator : {
           type : 'triangle8'
       },
       envelope : {
           attack : 2,
           decay : 1,
           sustain: 0.4,
           release: 4
       }
   }).toMaster()

	// poly = new Tone.PolySynth(4, Tone.Synth).toMaster();
    // synth.triggerAttackRelease("A4", "8n");

    synth = new Tone.MembraneSynth();

    // loop = new Tone.Loop(function(time){
    //     synth.triggerAttackRelease("C1", "8n", time)
    // }, "4n");
    //
    // loop.start(0).stop('2m');

	poly = new Tone.PolySynth(4, Tone.synth).chain(distortion, tremolo, Tone.Master);

    //pass in an array of events
    var part = new Tone.Part(function(time, event){
    	//the events will be given to the callback with the time they occur
    	synth.triggerAttackRelease(event.note, event.dur, time)

    },
    [{ time : 0, note : 'C4', dur : '4n'},
	{ time : '4n + 8n', note : 'E4', dur : '8n'},
	{ time : '2n', note : 'G4', dur : '16n'},
	{ time : '2n + 8t', note : 'B4', dur : '4n'}]);

    part.start(0);

    part.loop = 3;
    part.loopEnd = '1m';

    pwm = new Tone.PWMOscillator("Bb3").chain(tremolo, Tone.Master);

    player = new Tone.Player("http://mp3s.nc.u-tokyo.ac.jp/OTSUCHI_CyberForest.mp3",
    function(){
        console.log("player loaded");
    }
).toMaster();

    buf = new Tone.Buffer("http://mp3s.nc.u-tokyo.ac.jp/OTSUCHI_CyberForest.mp3",
    function(){
        var buff = buf.get()
        console.log("loaded");
    }
);

    var filter = new Tone.Filter({
        type : 'bandpass',
        Q : 12
    }).toMaster();

    // filter.frequency.setValueAtTime('C5', 0)
    // filter.frequency.setValueAtTime('E5', 0.5)
    // filter.frequency.setValueAtTime('G5', 1)
    // filter.frequency.setValueAtTime('B5', 1.5)
    // filter.frequency.setValueAtTime('C6', 2)
    // filter.frequency.linearRampToValueAtTime('C1', 6)

    // var noise = new Tone.Noise("brown").connect(filter).start(0).stop(6)

    // noise.volume.setValueAtTime(-20, 0);
    // noise.volume.linearRampToValueAtTime(20, 1);
    // noise.volume.linearRampToValueAtTime(-Infinity, 6);

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
