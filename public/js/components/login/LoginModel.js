define([
    'components/base/BaseModel'
], function(BaseModel){

    return BaseModel.extend({
        defaults: {
            error:'',
            login:'',
            password:'',
            success:''
        },
        initialize: function() {
            BaseModel.prototype.initialize.apply(this, arguments);
        },
        onLogin: function(){
            this.get('app').trigger("user:loginProceed", {
                type:'security',
                action:'authenticate',
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