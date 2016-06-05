define([
    'jquery',
    'underscore',
    'backbone',
    'components/base/BaseView',
    'components/footer/FooterModel',
    'text!components/footer/footerTemplate.html'
], function ($, _, Backbone, BaseView, FooterModel, footerTemplate) {

    return BaseView.extend({

        template: _.template(footerTemplate),

        initialize: function(App) {
            BaseView.prototype.initialize.apply(this, arguments);
            this.model = new FooterModel({app:App});
        }

    });
});