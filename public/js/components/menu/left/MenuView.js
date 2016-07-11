define([
    'jquery',
    'underscore',
    'backbone',
    'components/base/BaseView',
    'components/menu/left/MenuItemModel',
    'components/menu/left/MenuCollection',
    'text!components/menu/left/template.html'
], function ($, _, Backbone, BaseView, MenuItemModel, MenuCollection, MenuTemplate) {

    return BaseView.extend({
        el: $(".left-menu"),

        initialize: function(App) {
            BaseView.prototype.initialize.apply(this, arguments);

            this.menuCollection = new MenuCollection();
            //this.menuCollection.init(App);
            this.menuCollection.fetch();

            this.template = _.template(MenuTemplate);

            this.listenTo(this.menuCollection, 'change', _.debounce(this.render, 5));
            this.listenTo(this.user, 'change', _.debounce(this.render, 5));
            this.listenTo(this.menu_class, 'change', _.debounce(this.render, 5));
        },
        render: function () {
            this.$el.html(this.template({menuItems: this.menuCollection.models,_: _}));
        }


    });
});
