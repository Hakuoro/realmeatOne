define([
    'jquery',
    'underscore',
    'backbone',
    'components/base/BaseView',
    'components/menu/top/MenuItemModel',
    'components/menu/top/MenuCollection',
    'text!components/menu/top/template.html'
], function ($, _, Backbone, BaseView, MenuItemModel, MenuCollection, MenuTemplate) {

    return BaseView.extend({
        el: $(".top-menu"),
        user : null,

        initialize: function(App) {
            BaseView.prototype.initialize.apply(this, arguments);

            this.menuCollection = new MenuCollection();
            this.menuCollection.init(App);

            this.template = _.template(MenuTemplate);

        },
        render: function () {
            this.$el.html(this.template());
        }

    });
});
