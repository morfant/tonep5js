Template.loading.created = function() {


};

Template.loading.helpers({
 stopCheckerInterval: function() {
    if (checkerInterval) Meteor.clearInterval(checkerInterval);
    console.log("stopCheckerInterval()");
  }
});

Template.loading.rendered = function() {

};

Template.loading.destroyed = function () {

};
