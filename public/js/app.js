// Filename: app.js
define([
    'jquery',
    'underscore',
    'backbone',
    'router', // Request router.js
    'libs/js.cookie'
], function ($, _, Backbone, Router, Polyglot, Cookies) {

    var app = {

        sessionId:Cookies.get('sessionId') || '',
        user:{
            firstName: Cookies.get('firstName') || '',
            familyName:Cookies.get('familyName') || ''
        },

        checkAuth:function(){
            if (this.sessionId) {
                return true;
            }
            return false;
        },

        initialize: function () {
            Router.initialize(this);
        }

    };

    _.extend(app, Backbone.Events);

    return app;
});
