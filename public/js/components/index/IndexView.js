define([
    'jquery',
    'underscore',
    'backbone',
    'components/base/BaseView',
    'components/index/IndexModel',
    'components/menu/left/MenuView',
    'text!components/index/IndexTemplate.html'
], function ($, _, Backbone, BaseView, IndexModel, LeftMenuView, IndexTemplate) {

    return BaseView.extend({

        template: _.template(IndexTemplate),

        initialize: function(App) {
            BaseView.prototype.initialize.apply(this, arguments);

            this.model = new IndexModel({app:App});

            this.viewCollection = Backbone.Collection.extend({
                url:'/api/products'
            });


            this.leftMenuView = new LeftMenuView(App);

        },
        init: function(){

            console.log("asdasdasd");
            console.log(this.model.get('category'));

            console.log(this.viewCollection);

        },

        render: function() {

            BaseView.prototype.render.apply(this, arguments);

            this.leftMenuView.innerRender(this.$('.storemenu'));
        }

    });
});
