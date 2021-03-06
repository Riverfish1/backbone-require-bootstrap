/*global define*/
define([], function () {
    'use strict';
    var Table = Backbone.View.extend({
        el: '#tb_officeArea',
        initialize: function () {
            // this.$el.bootstrapTable();
            // this.on('loading', this.showLoading);
            // this.on('hideLoading', this.hideLoading);
        },
        showLoading: function () {
            this.$el.bootstrapTable('load', []);
            this.$el.bootstrapTable('showLoading');
        },

        hideLoading: function () {
            this.$el.bootstrapTable('hideLoading');
        },
        // render:function(){
        //     debugger;
        //     this.$el.bootstrapTable('load', this.collection.toJSON());
        //     this.hideLoading();
        //     return this;
        // },
        render: function () {
            this.init();
        },
        refresh: function () {
            this.$el.bootstrapTable('refresh');
        },
        init: function () {
            this.$el.bootstrapTable({
                url: '/api/register/officeArea', //请求后台的URL（*）
                method: 'get', //请求方式（*）
                toolbar: '#toolbar', //工具按钮用哪个容器
                striped: true, //是否显示行间隔色
                cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: true, //是否显示分页（*）
                sortable: false, //是否启用排序
                sortOrder: "asc", //排序方式
                queryParams: this.queryParams,//传递参数（*）
                sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
                pageNumber: 1, //初始化加载第一页，默认第一页
                pageSize: 10, //每页的记录行数（*）
                pageList: [10, 25, 50, 100], //可供选择的每页的行数（*）
                search: false, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
                strictSearch: true,
                showColumns: true, //是否显示所有的列
                showRefresh: true, //是否显示刷新按钮
                minimumCountColumns: 2, //最少允许的列数
                clickToSelect: true, //是否启用点击选中行
                // height: 500, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
                uniqueId: "ID", //每一行的唯一标识，一般为主键列
                showToggle: true, //是否显示详细视图和列表视图的切换按钮
                cardView: false, //是否显示详细视图
                detailView: false, //是否显示父子表
                columns: [{
                    field: 'areaName',
                    title: '办公区名称',
                    align: 'center',
                    valign: "middle"
                }, {
                    field: 'areaUsage',
                    title: '用途'
                    ,
                    align: 'center',
                    valign: "middle",
                }, {
                    field: 'areaSize',
                    title: '面积',
                    align: 'center',
                    valign: "middle",
                    formatter: function (value, row, index) {
                        return value ? value + "㎡" : "";
                    }
                }, {
                    field: 'areaAddress',
                    title: '地址'
                    ,
                    align: 'center',
                    valign: "middle",
                }, {
                    field: 'areaPhotoAddress',
                    title: '图片',
                    align: 'center',
                    valign: "middle",
                    formatter: function (value, row, index) {
                        return value ? "<img class='view' style='width:100px; height:100px' src='" + value + "'/>" : "";
                    }
                }, {
                    field: 'areaDescription',
                    title: '描述'
                    ,
                    align: 'center',
                    valign: "middle",
                }, {
                    field: 'status',
                    title: '操作',
                    align: 'center',
                    valign: "middle",
                    events: this.operateEvents,
                    formatter: function (value, row, index) {
                        var str = '';
                        str += '<p class="grid-command-p btn-edit">修改</p>';
                        str += '<p class="grid-command-p btn-delete">删除</p>';
                        return str;
                    }
                }],
                onPostBody: function (data) {
                    $('.view').viewer();
                }
            });
            // this.hideLoading();
        },
        queryParams: function (params) {
            var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                limit: params.limit, //页面大小
                offset: params.offset, //页码
                // departmentname: $("#txt_search_departmentname").val(),
                // statu: $("#txt_search_statu").val()
            };
            return temp;
        },
        operateEvents: {
            'click .btn-edit': function (e, value, row, index) {
                Backbone.trigger('itemEdit', row);
            },
            'click .btn-delete': function (e, value, row, index) {
                Backbone.trigger('itemDelete', row);
            }
        }
    });
    return Table;
});