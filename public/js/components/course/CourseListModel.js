define([
    'components/base/BaseModel'
], function(BaseModel){

    return BaseModel.extend({
        defaults:{
            courseList:[],
            showAdd:'none'
        },
        initialize: function(App) {
            BaseModel.prototype.initialize.apply(this, arguments);

            this.listenTo(this.get('app'), 'courseResponse:getListForAuthor', function(data){
                this.set('courseList', data.courses);
                if (!data.courses.length){
                    this.set('showAdd', 'block');
                }
            });

        },
        reInit: function(){
            this.getCourseList();
        },
        getCourseList: function(){
            this.get('app').trigger("sendMessage", {
                type:'course',
                action:'getListForAuthor',
                data:{
                    authorEuuid:this.get('app').uuid,
                    sortProperty :'createdAt',
                    sortType: 'desc'
                }
            }, this);
        }

    });
});