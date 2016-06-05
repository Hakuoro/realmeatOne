define([
    'jquery',
    'underscore',
    'backbone',
    'components/base/BaseView',
    'components/forgot/ForgotModel',
    'text!components/forgot/forgotTemplate.html'
], function ($, _, Backbone, BaseView, ForgotModel, forgotTemplate) {

    return BaseView.extend({
        section:'forgot',

        template: _.template(forgotTemplate),

        events: {
            "click #forgotButton": "onForgot"
        },

        initialize: function(App) {
            BaseView.prototype.initialize.apply(this, arguments);
            this.model = new ForgotModel({app:App});
        },

        onForgot: function () {

            $('#login-error').hide();

            this.model.set('login',this.$('#login').val() );

            this.model.onForgot();
        }


    });
});