define([], function() {

    var Model = Backbone.Model.extend({
        defaults : {
            title : '交警去除警务科',
            use : '24242',
            area: '25',
            address: '南充市',
            picture: 'http://www.baidu.com/abc.png',
            des: '办公区很大'
        }
    });

    return Model;

});