define([
    'jquery',
    'underscore',
    'backbone',
    'components/base/BaseModel',
    'libs/js.cookie'
], function($, _, Backbone, BaseModel, Cookies){
    return Backbone.Model.extend({
        defaults: {
            euuid:'',
            firstName:'',
            familyName:'',
            nickName:'',
            email:'',
            phone:'',
            edit: true,
            success: '',
            warn:'',
            successPasssword:''
        },
        initialize: function() {
            BaseModel.prototype.initialize.apply(this, arguments);

            var self = this;

            this.listenTo(this.get('app'), 'userResponse:getData', function(data){
                this.set('euuid', data.euuid);
                this.set('firstName', data.firstName);
                this.set('familyName', data.familyName);
                this.set('nickName', data.nickName);
                this.set('email', data.email);
                this.set('phone', data.phone);
            });

            this.listenTo(this.get('app'), 'userResponse:updateOk', function(data){
                this.set('success', 'Обновление успешно');
                setTimeout(_.bind(this.set, this, {success:''}), 1000);

                Cookies.set('firstName', this.get('firstName'), {expires: 20});
                Cookies.set('familyName', this.get('familyName'), {expires: 20});

                this.get('app').user.firstName = this.get('firstName');
                this.get('app').user.familyName = this.get('familyName');

                this.get('app').trigger('app:userChange');

            });

            this.listenTo(this.get('app'), 'userResponse:updatePasswordOk', function(data){
                this.set('successPasssword', 'Обновление успешно');
                setTimeout(_.bind(this.set, this, {successPasssword:''}), 1000);

            });

        },
        getUser: function (userId){
            this.get('app').trigger("sendMessage", {
                type:'userProfile',
                action:'getUser',
                data:{
                     euuid:userId
                }
            });
        },
        updateUser: function (){
            this.get('app').trigger("sendMessage", {
                type:'userProfile',
                action:'updateUser',
                data:{
                    euuid:this.get('euuid'),
                    firstName:this.get('firstName'),
                    familyName:this.get('familyName'),
                    nickName:this.get('nickName'),
                    //email:this.get('email'),
                    phone:this.get('phone')
                }
            });
        },
        updatePass: function (){
            this.get('app').trigger("sendMessage", {
                type:'userProfile',
                action:'updatePassword',
                data:{
                    plainTextPassword:this.get('pass1')
                }
            });
        },
        showWarn: function(warn){
            this.set('warn', warn);
            setTimeout(_.bind(this.set, this, {warn:''}), 1000);
        }
    });
});



