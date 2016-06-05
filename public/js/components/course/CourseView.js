define([
    'jquery',
    'underscore',
    'backbone',
    'components/base/BaseView',
    'components/course/CourseItemModel',
    'text!components/course/templates/courseItemTemplate.html',
    'text!components/course/templates/courseItemEditTemplate.html'
], function ($, _, Backbone, BaseView, CourseItemModel, CourseItemTemplate, CourseItemEditTemplate) {

    return BaseView.extend({
        section:'course',

        template: _.template(CourseItemTemplate),
        editTemplate:  _.template(CourseItemEditTemplate),

        events: {
            "click .course-update": "updateCourse",
            "click .iconChanger": "updateIcon",
            "click .imageChanger": "updateImage",
            "click .iconDeleter": "deleteIcon",
            "click .imageDeleter": "deleteImage"
        },

        render: function () {
            console.log('render course view');

            if (this.model.get('edit')) {
                this.$el.html(this.editTemplate(this.model.attributes));
            }else{
                this.$el.html(this.template(this.model.attributes));
            }

            if (document.getElementById("file-2") ) {
                this.app.uploader.listenOnInput(document.getElementById("file-2"));
            }

            if (document.getElementById("file-3")) {
                this.app.uploader.listenOnInput(document.getElementById("file-3"));
            }
            this.$el.scrollTop(0);
        },

        deleteIcon: function(event){

            if (event)
                event.preventDefault();

            this.model.set('iconUrl', '');
            this.model.set('redirect', false);
            this.updateCourse();
        },


        deleteImage: function(event){

            if (event)
                event.preventDefault();

            this.model.set('imageUrl', '');
            this.model.set('redirect', false);

            this.updateCourse();
        },

        updateIcon: function(event){

            if (event)
                event.preventDefault();

            this.$el.find('#file-2').click();
        },

        updateImage: function(event){

            if (event)
                event.preventDefault();

            this.$el.find('#file-3').click();
        },


        initialize: function(App) {

            BaseView.prototype.initialize.apply(this, arguments);

            this.model = new CourseItemModel({app:App});

            this.listenTo(this.model, 'change', _.debounce(this.render, 5));

            this.listenTo(this.model, 'set', _.debounce(this.render, 5));

            this.listenTo(App, 'courseView:newModel', function(){

                if (this.model){ // delete listeners from old model
                    this.model.destroy();
                }

                this.model = new CourseItemModel({app:App});

                this.listenTo(this.model, 'change', _.debounce(this.render, 5));

                this.listenTo(this.model, 'set', _.debounce(this.render, 5));

            });

            var view = this;

            this.app.uploader.addEventListener("start", function(event){
                event.file.meta.sessionId = view.app.sessionId;
                event.file.meta.courseId = view.model.get('euuid');
            });

            this.listenTo(App, 'course:ImageSaved',function(){
                this.model.set('redirect', false);
                this.updateCourse();
            });
        },

        updateCourse: function (event) {

            if (event)
                event.preventDefault();

            this.model.set('name',this.$('.course-name').val() );
            this.model.set('shortDescription',this.$('.course-description').val() );
            this.model.set('fullDescription',this.$('.course-full-description').val() );

            if (this.$('.course-uuid').val()){
                this.model.set('uuid',this.$('.course-uuid').val() );
            }

            this.model.updateCourse();
        }


    });

});
