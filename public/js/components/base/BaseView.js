define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {

    return Backbone.View.extend({
        section:'',

        initialize: function(App) {
            this.app = App;

        },
        render: function () {
            this.$el.html(this.template(this.model.attributes));
        },
        init:function(data){
        },
        innerRender: function(el){
            this.$el = el;
            this.delegateEvents();
            this.render();
        }
    });
});