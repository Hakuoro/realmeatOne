define([
    'jquery',
    'underscore',
    'backbone',
    'components/base/BaseModel'
], function ($, _, Backbone, BaseModel) {

    return BaseModel.extend({
        defaults: {
            edit: false,
            euuid: null,
            courseEuuid: null,
            name:'',
            shortDescription:'',
            fullDescription:'',
            videoLink:'',
            courseUuid:'',
            createdAt:'',
            modifiedAt:'',
            result:'',
            imageUrl:'',
            redirect:true
        },
        initialize: function () {
            BaseModel.prototype.initialize.apply(this, arguments);


            this.listenTo(this.get('app'), 'lessonResponse:getItem', function(data){
                this.set(data);
            });

            this.listenTo(this.get('app'), 'lessonResponse:updateItem', function(data){

                if (this.get('redirect')) {
                    Backbone.history.navigate("#course/show/" + this.get('courseEuuid'), {trigger: true});
                }else{
                    this.set('result', 'Обновление успешно');
                    setTimeout(_.bind(this.set, this, {result:''}), 1000);
                    this.set('redirect', true);
                }
            });

            this.listenTo(this.get('app'), 'lessonResponse:addItem', function(data){

                this.set('euuid', data.euuid);

                if (this.get('redirect')) {
                    Backbone.history.navigate("#course/show/" + this.get('courseEuuid'), {trigger: true});
                }else{
                    this.set('result', 'Обновление успешно');
                    setTimeout(_.bind(this.set, this, {result:''}), 1000);
                    this.set('redirect', true);
                }
            });



            this.listenTo(this.get('app'), 'lesson:getItem', function(lessonId){
                this.getLesson(lessonId);
            });


            console.log('setting fileResponse:saved lesson');
            this.listenTo(this.get('app'), 'fileResponse:saved', function(data){
                console.log(data);
                this.set('imageUrl', data.file);
                this.get('app').trigger('lesson:ImageSaved');

            });


        },


        getLesson: function (lessonId) {
            this.get('app').trigger("sendMessage", {
                type: 'lesson',
                action: 'getItem',
                data: {
                    euuid: lessonId
                }
            }, this);
        },

        updateLesson: function () {

            if (this.has('euuid')) {
                this.get('app').trigger("sendMessage", {
                    type: 'lesson',
                    action: 'updateItem',
                    data: {
                        fullDescription: this.get('fullDescription'),
                        videoLink: this.get('videoLink'),
                        name: this.get('name'),
                        shortDescription: this.get('shortDescription'),
                        courseEuuid: this.get('courseEuuid'),
                        euuid: this.get('euuid'),
                        imageUrl: this.get('imageUrl')
                    }
                }, this);
            } else {

                this.get('app').trigger("sendMessage", {
                    type: 'lesson',
                    action: 'addItem',
                    data: {
                        fullDescription: this.get('fullDescription'),
                        videoLink: this.get('videoLink'),
                        name: this.get('name'),
                        shortDescription: this.get('shortDescription'),
                        courseEuuid: this.get('courseEuuid'),
                        imageUrl: this.get('imageUrl')
                    }
                }, this);
            }
        }
    });
});



