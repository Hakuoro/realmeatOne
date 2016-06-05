define([
    'jquery',
    'underscore',
    'backbone',
    'text!components/index/IndexTemplate.html'
], function ($, _, Backbone, IndexTemplate) {

    return BaseView.extend({

        template: _.template(IndexTemplate),

        initialize: function() {
        }


    });
});
