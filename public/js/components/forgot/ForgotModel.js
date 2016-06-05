define([
    'components/base/BaseModel'
], function(BaseModel){

    return BaseModel.extend({
        defaults: {
            error:'',
            login:'',
            success:''
        },
        initialize: function() {
            BaseModel.prototype.initialize.apply(this, arguments);

            this.listenTo(this.get('app'), 'userResponse:remindPasswordOk', function(data){
                this.set('success', 'Обновление успешно');
                setTimeout(_.bind(this.set, this, {success:''}), 1000);

            });
        },
        onForgot: function(){
            this.get('app').trigger("user:loginProceed", {
                type:'userProfile',
                action:'remindPassword',
                data:{
                    email:this.get('login')
                }
            });
        },
        onSuccess: function(){

        },
        onError: function(){

        }



    });
});