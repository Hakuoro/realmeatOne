define([
    'jquery',
    'underscore',
    'backbone',
    'components/menu/left/MenuItemModel'
], function($, _, Backbone, MenuItemModel){
    return Backbone.Collection.extend({
        model: MenuItemModel,
        url:'/api/categories'
    });
});
