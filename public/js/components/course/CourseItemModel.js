define([
    'jquery',
    'underscore',
    'backbone',
    'components/base/BaseModel'
], function ($, _, Backbone, BaseModel) {

    return BaseModel.extend({
        defaults: {
            authorEuuid: '',
            name: '',
            fullDescription: '',
            shortDescription: '',
            euuid: null,
            edit: true,
            result: '',
            courseId: null,
            lessons:[],
            iconUrl:'',
            imageUrl:'',
            redirect:true
        },
        initialize: function () {

            BaseModel.prototype.initialize.apply(this, arguments);


            this.listenTo(this.get('app'), 'courseResponse:getItem', function(data){

                this.set('authorEuuid', data.authorEuuid);
                this.set('name', data.name);
                this.set('fullDescription', data.fullDescription);
                this.set('shortDescription', data.shortDescription);
                this.set('euuid', data.euuid);
                this.set('iconUrl', data.iconUrl);
                this.set('imageUrl', data.imageUrl);

                // получения списка уроков курса
                if (!this.get('edit')){
                    this.getLessonList(data.euuid);
                }
            });

            this.listenTo(this.get('app'), 'course:getItem', function(courseId){
                console.log('course:getItem');
                this.getCourse(courseId);
            });

            this.listenTo(this.get('app'), 'lessonResponse:getList', function(data){
                this.set('lessons', data.lessons);

            });

            this.listenTo(this.get('app'), 'courseResponse:updateItem', function(data){

                console.log('courseResponse:updateItem');

                if (this.get('redirect')) {
                    Backbone.history.navigate("#course/show/" + data.euuid, {trigger: true});
                }else{

                    this.set('redirect', true);
                    this.set('result', 'Обновление успешно');
                    setTimeout(_.bind(this.set, this, {result:''}), 1000);
                }

            });


            this.listenTo(this.get('app'), 'courseResponse:addItem', function(data){

                console.log('courseResponse:addItem');

                this.set('euuid', data.euuid);

                if (this.get('redirect')) {
                    Backbone.history.navigate("#course/show/" + data.euuid, {trigger: true});
                }else{
                    this.set('result', 'Обновление успешно');
                    this.set('redirect', true);
                    setTimeout(_.bind(this.set, this, {result:''}), 1000);
                }
            });

            this.listenTo(this.get('app'), 'fileResponse:saved', function(data){

                if (data.meta.fileSelector == 'icon') {
                    this.set('iconUrl', data.file);
                }else if (data.meta.fileSelector == 'image') {
                    this.set('imageUrl', data.file);
                }

                this.get('app').trigger('course:ImageSaved');

            });

        },

        getLessonList: function(courseUuid){
            this.get('app').trigger("sendMessage", {
                type:'lesson',
                action:'getList',
                data:{
                    courseEuuid:courseUuid,
                    sortProperty :'createdAt',
                    sortType: 'desc'
                }
            }, this);
        },

        getCourse: function (courseId) {
            this.get('app').trigger("sendMessage", {
                type: 'course',
                action: 'getItem',
                data: {
                    euuid: courseId
                }
            }, this);
        },

        updateIcon:function(){

        },
        updateImage:function(){

        },

        updateCourse: function () {

            if (this.has('euuid')) {
                this.get('app').trigger("sendMessage", {
                    type: 'course',
                    action: 'updateItem',
                    data: {
                        authorEuuid: this.get('app').uuid,
                        name: this.get('name'),
                        shortDescription: this.get('shortDescription'),
                        fullDescription: this.get('fullDescription'),
                        euuid: this.get('euuid'),
                        iconUrl: this.get('iconUrl'),
                        imageUrl: this.get('imageUrl')
                    }
                }, this);
            } else {

                this.set('authorUuid', this.get('app').uuid);

                this.get('app').trigger("sendMessage", {
                    type: 'course',
                    action: 'addItem',
                    data: {
                        authorEuuid: this.get('app').uuid,
                        name: this.get('name'),
                        shortDescription: this.get('shortDescription'),
                        fullDescription: this.get('fullDescription'),
                        iconUrl: this.get('iconUrl'),
                        imageUrl: this.get('imageUrl')
                    }
                }, this);
            }
        }
    });
});



