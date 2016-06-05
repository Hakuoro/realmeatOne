define([
    'backbone'
], function(Backbone){
    return Backbone.Model.extend({
        defaults: {
            menu: {
                'login-form': {'uri':'showLogin', show:true},
                'echo': {'uri':'showEcho', show:false},
                'dash': {'uri':'showDash', show:true},
                'logout': {'uri':'logout', show:false}
            },
            container_class: 'content_container',
            showHeader:false
        }
    });
});