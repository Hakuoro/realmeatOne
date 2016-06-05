// Filename: app.js
define([
    'jquery',
    'underscore',
    'backbone',
    'router', // Request router.js
    'libs/js.cookie'
], function ($, _, Backbone, Router, Cookies) {

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
            console.log('zxcvzcv');
            Router.initialize(this);
        }

    };

    _.extend(app, Backbone.Events);

    return app;
});
