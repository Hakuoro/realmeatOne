define([
    'jquery',
    'underscore',
    'backbone',
    'components/menu/top/MenuItemModel'
], function($, _, Backbone, MenuItemModel){
    return Backbone.Collection.extend({
        model: MenuItemModel,
        lang:'',
        init:function(App){
            App.on("hideMenuItem", function (url) {
                this.setVisibility(url,'none');
            },this);

            App.on("showMenuItem", function (url) {
                this.setVisibility(url,'inline');
            },this);

            App.on("setActiveMenu", function (url) {
                this.setActive(url);
            },this);
        },

        setVisibility: function(url, visibility){

            var e = this.findWhere({url:url});
            if (e){
                e.set('visibility', visibility);
            }
        },

        setActive: function (url) {
            var e = '';

            if (e = this.findWhere({selected:'active'})){
                e.set('selected', '');
            }

            if (e = this.findWhere({url:url || '#'})){
                e.set('selected', 'active');
            }
        }
    });
});
