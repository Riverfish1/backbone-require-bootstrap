/*global define*/
define([
    'src/components/baseTable/indexCollection',
    'src/components/baseTable/indexView',
    'text!src/components/registerOfficeArea/index.html',
    'text!src/components/registerOfficeArea/dialog.html'
], function (BaseTableCollection, BaseTableView, tpl, dialogTpl) {
    'use strict';
    var View = Backbone.View.extend({
        el: '#main',
        template: _.template(tpl),
        getDialogContent: _.template(dialogTpl),
        events: {
            'click #btn_add': 'addOne'     //使用代理监听交互，好处是界面即使重新rander了，事件还能触发，不需要重新绑定。如果使用zepto手工逐个元素绑定，当元素刷新后，事件绑定就无效了
        },
        initialize: function () {
            // var that = this;
            // var onDataHandler = function (res) {
            //     that.render();
            // }
            // that.collection  = new  BaseTableCollection([]);
            // that.collection.fetch({success: onDataHandler});
            // this.table = new BaseTableView();
            Backbone.on('itemEdit', this.addOne, this);
            Backbone.on('itemDelete', this.delOne, this);
        },
        render: function () {
            // debugger;
            //main view
            this.$el.html(this.template(this.model.toJSON()));
            this.$officeDialog = this.$el.find('#encoding-library-dialog');
            this.$officeDialogPanel = this.$el.find('#encodingLibrary-panl');
            //table view
            // this.table = new BaseTableView({collection: this.collection});
            // this.table.trigger('loading');
            this.table = new BaseTableView();
            this.table.render();
            return this;
        },
        addOne: function (row) {
            var row = row.title ? row : {title: '', use: '', area: '', address: '', picture: '', des: ''}
            this.$officeDialog.modal('show');
            this.$officeDialog.modal({backdrop: 'static', keyboard: false});
            this.$officeDialogPanel.empty().html(this.getDialogContent(row))
            // initFormSubmit(row, '/live/template/update');
        },
        delOne: function (row) {
            var that = this;
            bootbox.confirm({
                buttons: {
                    confirm: {
                        label: '确认'
                    },
                    cancel: {
                        label: '取消'
                    }
                },
                title: "温馨提示",
                message: '执行删除后将无法恢复，确定继续吗？',
                callback: function (result) {
                    if (result) {
                        $.ajax({
                            type: "post",
                            url: "/api/saveOrUpdate/register/officeArea",
                            dataType: 'json',
                            data: {id: row.id, defaultVideo: row.defaultVideo},
                            success: function (res, textStatus) {
                                if (res.rc == 0) {
                                    bootbox.alert(res.msg);
                                    that.table.render();
                                    // Info.showInfo(result.message);
                                    // window.location.href=APPNAME+"/template/VR/index";
                                    // $("#table-pagination").bootstrapTable('refresh', {});
                                } else {
                                    bootbox.alert("删除失败：" + res.msg);
                                    // Info.showError("删除失败：" + result.message);
                                }
                            }
                        });
                    } else {

                    }
                }

            });
        }
    });
    return View;
});