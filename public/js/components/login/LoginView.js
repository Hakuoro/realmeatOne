define([
    'jquery',
    'underscore',
    'backbone',
    'components/base/BaseView',
    'components/login/LoginModel',
    'text!components/login/loginTemplate.html',
], function ($, _, Backbone, BaseView, LoginModel, loginTemplate) {

    return BaseView.extend({
        section:'login',

        template: _.template(loginTemplate),

        events: {
            "click #loginButton": "onLogin"
        },

        initialize: function(App) {
            BaseView.prototype.initialize.apply(this, arguments);
            this.model = new LoginModel({app:App});


            this.listenTo(App, 'flash:loginError', function(data){
                this.model.set('error', data);
                this.render();
            });
        },

        onLogin: function (event) {

            event.preventDefault();

            $('#login-error').hide();

            this.model.set('login',this.$('#login').val() );
            this.model.set('password',this.$('#password').val() );

            this.model.onLogin();

            return this;
        }


    });
});