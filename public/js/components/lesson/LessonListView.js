define([
    'jquery',
    'underscore',
    'backbone',
    'components/lesson/LessonListModel',
    'components/lesson/LessonView',
    'components/lesson/LessonItemModel',
    'text!components/lesson/templates/lessonListTemplate.html',
    'text!components/lesson/templates/lessonListPageTemplate.html'
], function ($, _, Backbone, LessonListModel, LessonView, LessonItemModel, LessonListTemplate, LessonListPageTemplate) {

    return Backbone.View.extend({
        el: $("#page"),
        lessonList:[],
        events: {
        },

        render: function() {
            this.$el.html(this.template(this.model.attributes));
            return this;
        },

        template:  _.template(LessonListPageTemplate),
        lessonListTemplate:  _.template(LessonListTemplate),

        initialize: function(App) {

            this.app = App;

            this.model = new LessonListModel(App);

            this.listenTo(this.model, 'change:lessons', _.debounce(this.renderLessons, 5));

            this.listenTo(App, this.model.get('translateTrigger'), function(){
                this.render();
            });
        },
        renderlessonList: function(){

            this.$('lesson-list').html(this.lessonListTemplate(this.model.attributes));

            return this;
        }
    });

});
