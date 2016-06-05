define([
    'jquery',
    'underscore',
    'backbone',
    'components/base/BaseView',
    'components/registration/RegistrationModel',
    'text!components/registration/registrationTemplate.html'
], function ($, _, Backbone, BaseView, RegistrationModel, registrationTemplate) {

    return BaseView.extend({

        section:'registration',

        template: _.template(registrationTemplate),

        events: {
            "click #regButton": "onReg"
        },

        initialize: function(App) {
            BaseView.prototype.initialize.apply(this, arguments);
            this.model = new RegistrationModel({app:App});

        },

        onReg: function () {


            $('#login-error').hide();

            this.model.set('login',this.$('#login').val() );
            this.model.set('password',this.$('#password').val() );

            this.model.onLogin();
        }


    });
});