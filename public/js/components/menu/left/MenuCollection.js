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
        }
    });
});
