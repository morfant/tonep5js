Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/', {
  name: 'home',
});

Router.route('/randomWalk', {
  name: 'randomWalk'
  // controller: 'NewPostsListController'
});

Router.route('/adminSetup', {
    name: 'adminSetup'
});


var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
        this.render(this.loadingTemplate);
    } else {
        this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: ['postSubmit', 'settings', 'postEdit', 'postPage', 'postsList']});
