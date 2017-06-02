import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


// var synth = new Tone.Synth().toMaster();


//pass in some initial values for the filter and filter envelope
var synth = new Tone.Synth({
	"oscillator" : {
		"type" : "pwm",
		"modulationFrequency" : 0.2
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

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
      event.preventDefault();

    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);

    var freq = instance.find('#freq').value;
    var time = instance.find('#time').value;
    // console.log(freq);

    makeSound(freq, time);




  },
});


var makeSound = function(note, dur){

    synth.triggerAttackRelease(note, dur);

}


Template.hello.onRendered(function helloOnRendered() {
    console.log("onRendered()!");



    // poly.triggerAttackRelease(["C4", "E4", "A4"], "4n");
    synth.triggerAttackRelease("C4", "8n");

    // new p5(sketch, "sketch");
	// console.log(springHeight);





});
