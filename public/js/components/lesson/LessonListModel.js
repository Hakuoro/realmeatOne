define([
    'components/base/BaseModel'
], function(BaseModel){

    return BaseModel.extend({
        defaults: {
            lessons:[],
            courseEuuid:''
        },
        initialize: function() {
            BaseModel.prototype.initialize.apply(this, arguments);

            this.listenTo(this.get('app'), 'lessonResponse:getList', function(data){
                console.log(data.lessons);

                this.set('lessons', data.lessons);
            });

        },
        getLessonList: function(courseEuuid){
            this.get('app').trigger("sendMessage", {
                type:'lesson',
                action:'getList',
                data:{
                    courseEuuid:courseEuuid,
                    sortProperty :'createdAt',
                    sortType: 'desc'
                }
            }, this);
        }

    });
});