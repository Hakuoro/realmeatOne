define([
    'jquery',
    'underscore',
    'components/base/BaseView',
    'components/index/IndexModel',
    'components/menu/left/MenuView',
    'text!components/index/IndexTemplate.html'
], function ($, _, BaseView, IndexModel, LeftMenuView, IndexTemplate) {

    return BaseView.extend({

        template: _.template(IndexTemplate),

        initialize: function(App) {
            BaseView.prototype.initialize.apply(this, arguments);
            this.model = new IndexModel({app:App});

            this.leftMenuView = new LeftMenuView(App);

        },

        render: function() {

            BaseView.prototype.render.apply(this, arguments);

            this.leftMenuView.innerRender(this.$('.storemenu'));
        }

    });
});
