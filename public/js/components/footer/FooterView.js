define([
    'jquery',
    'underscore',
    'backbone',
    'components/base/BaseView',
    'text!components/footer/footerTemplate.html'
], function ($, _, Backbone, BaseView, footerTemplate) {

    return BaseView.extend({

        template: _.template(footerTemplate),

        initialize: function(App) {
            BaseView.prototype.initialize.apply(this, arguments);
        }

    });
});