define([
    'jquery',
    'underscore',
    'backbone',
    'components/base/BaseView',
    'components/lesson/LessonItemModel',
    'text!components/lesson/templates/lessonItemTemplate.html'
], function ($, _, Backbone, BaseView, LessonItemModel, LessonItemTemplate) {

    return BaseView.extend({

        section:'lesson',

        template: _.template(LessonItemTemplate),

        events: {
            "click .lesson-update": "updateLesson",
            "click .add_vid": "showVideo",
            "click .add_ico": "updateImage",
            "click .imageChanger": "updateImage",
            "click .imageDeleter": "deleteImage"
        },

        updateImage: function(event){

            if (event)
                event.preventDefault();

            this.$el.find('#lesson-image').click();
        },

        deleteImage: function(event){

            if (event)
                event.preventDefault();

            this.model.set('imageUrl', '');
            this.model.set('redirect', false);
            this.updateLesson();
        },



        initialize: function(App) {
               BaseView.prototype.initialize.apply(this, arguments);


                this.model = new LessonItemModel({app:App});

                this.listenTo(this.model, 'change', _.debounce(this.render, 5));
                this.listenTo(this.model, 'set', _.debounce(this.render, 5));

                this.listenTo(App, 'lessonView:newModel', function(data){
                    data.app = App;

                    if (this.model){ // delete listeners from old model
                        this.model.destroy();
                    }

                    this.model = new LessonItemModel(data);

                    this.listenTo(this.model, 'change', _.debounce(this.render, 5));
                    this.listenTo(this.model, 'set', _.debounce(this.render, 5));

                });


                var view = this;

                this.app.uploader.addEventListener("start", function(event){
                   event.file.meta.sessionId = view.app.sessionId;
                   event.file.meta.lessonId = view.model.get('euuid');
                });


                this.listenTo(App, 'lesson:ImageSaved',function(){
                   this.model.set('redirect', false);
                   this.updateLesson();
                });

        },

        render: function () {
            console.log('render lesson');
            this.$el.html(this.template(this.model.attributes));

            if (document.getElementById("lesson-image")) {
                this.app.uploader.listenOnInput(document.getElementById("lesson-image"));
            }
        },

        showVideo: function(event){

            if (event)
                event.preventDefault();

            if (this.$('.lesson-videoLink').val()) {
                var link = this.$('.lesson-videoLink').val().split('v=')[1];
                this.$('#ytplayer').show().attr('src', 'http://www.youtube.com/embed/' + link);
                this.model.set('videoLink',link);
            }

        },

        updateLesson: function (event) {

            if (event)
                event.preventDefault();

            this.model.set('name',this.$('.lesson-name').val() );
            this.model.set('shortDescription',this.$('.lesson-shortDescription').val() );
            this.model.set('fullDescription',this.$('.lesson-fullDescription').val() );
            //this.model.set('videoLink',this.$('.lesson-videoLink').val() );

            if (this.$('.lesson-itemUuid').val()){
                this.model.set('euuid',this.$('.lesson-itemUuid').val() );
            }

            this.model.set('courseEuuid',this.$('.lesson-courseUuid').val() );

            this.model.updateLesson();
        }
    });

});
