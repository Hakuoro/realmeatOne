define([
    'components/base/BaseModel',
    'backbone'
], function(BaseModel, Backbone){

    return BaseModel.extend({
        defaults: {
            error:'',
            login:'',
            password:'',
            success:'',
        },
        initialize: function(App) {
            BaseModel.prototype.initialize.apply(this, arguments);

            this.listenTo(App, "regSuccessful", function () {

                App.trigger("hideMenuItem", "#login-form");
                App.trigger("hideMenuItem", "#reg");
                App.trigger("showMenuItem", "#dash");
                App.trigger("showMenuItem", "#logout");

                Backbone.history.navigate("/profile", {trigger: true});

            });
        },
        onLogin: function(){
            this.get('app').trigger("sendMessage", {
                type:'security',
                action:'register',
                data:{
                    login:this.get('login'),
                    password:this.get('password')
                }
            });
        },
        onSuccess: function(){

        },
        onError: function(){

        }

    });
});