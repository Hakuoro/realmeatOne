define([
    'jquery',
    'underscore',
    'backbone',
    'components/base/BaseView',
    'components/course/CourseListModel',
    'components/course/CourseView',
    'components/course/CourseItemModel',

    'text!components/course/templates/courseListTemplate.html',
], function ($, _, Backbone, BaseView, CourseListModel,  CourseView, CourseItemModel, CourseListTemplate) {

    return BaseView.extend({
        section:'course',
        events: {
        },

        template:  _.template(CourseListTemplate),


        initialize: function(App) {
            BaseView.prototype.initialize.apply(this, arguments);

            this.model = new CourseListModel({app:App});

            this.listenTo(this.model, 'change', _.debounce(this.render, 5));

        },
        init:function(data){
            this.model.getCourseList();
        }
    });
});
