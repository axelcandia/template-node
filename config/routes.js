var home      = require('../app/controllers/home.server.controller');
var hubspot   = require('../app/controllers/hubspot.server.controller');
var events    = require('../app/controllers/events.server.controller');
var groups    = require('../app/controllers/groups.server.controller'); 
var attendee  = require('../app/controllers/attendee.server.controller');
var setup     = require('../app/controllers/setup.server.controller');
var security  = require('../app/controllers/security.server.controller');

const express   = require('express');
const passport  = require('passport');
//you can include all your controllers
//CREAR UN MODULO SECURITY PARA VER SI TIENEN ACCESO AL COMPANY ID!!!
module.exports = function (app, passport) {

    //HOME ROUTES
    app.get('/', home.redirect);
    app.get('/home', security.loggedIn,  home.home);//home
    app.get('/events', security.loggedIn, home.events);//Edit and create events
    app.get('/events/new', security.loggedIn, home.newevent);//preview
    app.get('/events/edit', security.loggedIn, home.editEvent);//preview
    app.get('/attendees', security.loggedIn, home.attendees);//attendees
    app.get('/attendees/new', security.loggedIn, home.newAttendee);//new attendee
    app.get('/settings', security.loggedIn, home.settings);//settings
    app.get('/onboarding', /*security.loggedIn,*/ home.onboarding);//onboarding
    app.get('/billing', security.loggedIn, home.billing);//billing
    app.get('/billing/changeplan', security.loggedIn, home.changePlan);//billing
    app.get('/checkout', security.loggedIn, home.checkout);//checkout
    app.get('/preview', security.loggedIn, home.preview);//preview
    app.get('/setup', security.loggedIn, home.websetup);//preview


    //Login and signup with Auth0
    app.get('/login', home.login);
    app.get('/logout', security.logout);
    app.get('/signup', home.signup);
    app.get('/callback',passport.authenticate('auth0', { failureRedirect: '/login' }),security.login);

    //Hubspot integration
    app.get('/hubspot', security.loggedIn,hubspot.integrate);
    app.get('/hubspot/callback*', security.loggedIn,hubspot.callback,home.onboarding); 

    //EVENTS
    app.get('/api/v1.0/events',events.getEvent);
    app.get('/api/v1.0/events/view',security.loggedIn,events.getAllEvents);
    app.post('/api/v1.0/events/new', security.loggedIn,events.createEvent);
    app.post('/api/v1.0/events/update', security.loggedIn,events.createEvent);
    app.delete('/api/v1.0/events/delete', security.loggedIn,events.deleteEvent);
    //GROUPS 
    app.get('/api/v1.0/groups',security.loggedIn,groups.getGroup);
    app.get('/api/v1.0/groups/view/',security.loggedIn,groups.getAllGroups);
    app.post('/api/v1.0/groups/new', security.loggedIn,groups.createGroup);
    app.post('/api/v1.0/groups/update', security.loggedIn,groups.createGroup);
    app.delete('/api/v1.0/groups/delete', security.loggedIn,groups.deleteGroup);
    //Attendee 
    app.get('/api/v1.0/attendees/view/all',/*security.loggedIn,*/attendee.getAllAttendees);
    app.get('/api/v1.0/attendees/view',/*security.loggedIn,*/attendee.getAttendee);
    app.post('/api/v1.0/attendees/update',  /*security.loggedIn,*/
                                            events.eventExist,
                                            attendee.isEventFull,
                                            attendee.updateAttendee,
                                            hubspot.getToken,
                                            hubspot.createContact);
    app.post('/api/v1.0/attendees/new', /*security.loggedIn,*/
                                        events.eventExist,
                                        attendee.isEventFull,
                                        attendee.newAttendee,
                                        hubspot.getToken,
                                        hubspot.createContact);
    app.delete('/api/v1.0/attendees/delete', /*security.loggedIn*/attendee.deleteAttendee); 

    //Setup
    app.post('/api/v1.0/setup/advanced', /*security.loggedIn,*/setup.setAttendeeConf,hubspot.getToken,hubspot.setContactProperty);
    app.post('/api/v1.0/setup/easy', /*security.loggedIn,*/setup.setSimpleAttendeeConf,hubspot.getToken,setup.setAttendeeConf,hubspot.setContactProperty);

}
