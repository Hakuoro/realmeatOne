define([
    'jquery',
    'underscore',
    'backbone',
    'components/base/BaseView',
    'components/container/ContainerModel',
    'text!components/container/containerTemplate.html',
    'components/menu/top/MenuView',
    'components/footer/FooterView',
    // page view
    'components/index/IndexView'
], function ($, _, Backbone, BaseView, ContainerModel, ContainerTemplate, MenuView, FooterView,
             IndexView
) {

    return BaseView.extend({
        pageView:'',
        footerView:'',
        showCarusel:true,
        el: $(".site"),
        views:{},

        template: _.template(ContainerTemplate),

        render: function() {

            //BaseView.prototype.render.apply(this, arguments);
            this.$el.html(this.template({showCarusel:this.showCarusel}));

            this.pageView.innerRender(this.$('.onlinestore'));
            //this.pageView.delegateEvents();

            this.topMenuView.innerRender(this.$('.top-menu'));
            //this.topMenuView.delegateEvents();

            this.footerView.innerRender(this.$('.copyrights'));
            //this.footerView.delegateEvents();
        },

        initialize: function(App) {
            BaseView.prototype.initialize.apply(this, arguments);

            this.model = new ContainerModel({app:App});

            this.topMenuView = new MenuView(App);
            this.footerView = new FooterView(App);


        },

        setPageView : function(view, opts){

            if (this.pageView) {
                this.pageView.undelegateEvents();
                this.pageView.stopListening();
                if (this.pageView.model)
                    this.pageView.model.stopListening();
            }


            this.pageView = eval ('new ' + view +'(this.app)');

            if (this.pageView.model && opts) {
                this.pageView.model.set(opts);
            }

            this.pageView.init();

            this.render();
        }
    });

});