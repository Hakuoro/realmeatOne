define([
    'jquery',
    'underscore',
    'backbone',
    'components/base/BaseView',
    'components/dashboard/DashboardModel',
    'text!components/dashboard/dashboardTemplate.html'
], function ($, _, Backbone, BaseView, DashboardModel, DashboardTemplate) {

    return BaseView.extend({

        section:'dashboard',

        template: _.template(DashboardTemplate),

        events: {
            "click .dash-update": "updateUser",
            "click .passwd-update": "updatePasswd"
        },


        initialize: function(App) {

            BaseView.prototype.initialize.apply(this, arguments);

            this.model = new DashboardModel({app:App});

            this.listenTo(this.model, 'change', _.debounce(this.render, 5));

            this.model.getUser(App.uuid);

            /*App.on('user:login', function(){
                this.model.getUser(App.uuid);
            },this);*/
        },

        updateUser: function (event) {

            if (event)
                event.preventDefault();

            this.model.set('firstName',this.$('.dash-firstName').val() );
            this.model.set('phone',this.$('.dash-phone').val() );

            this.model.updateUser();
        },

        updatePasswd: function (event) {


            if (event)
                event.preventDefault();


            var pass1 = this.$('.dash-pass1').val();
            var pass2 = this.$('.dash-pass2').val();


            this.model.set('pass1', pass1);
            this.model.set('pass2', pass2);

            if (!pass1) {
                this.model.showWarn('Ведите пароль');
                return true;
            }

            if (pass1 != pass2) {
                this.model.showWarn('Пароли не одинаковые');
                return true;
            }

            this.model.updatePass();
        }
    });
});