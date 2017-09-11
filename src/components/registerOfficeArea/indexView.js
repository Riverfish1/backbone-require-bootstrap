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
            'click #btn_add': 'addOne',     //使用代理监听交互，好处是界面即使重新rander了，事件还能触发，不需要重新绑定。如果使用zepto手工逐个元素绑定，当元素刷新后，事件绑定就无效了
            'click #submitBtn': 'submitForm'
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
            var row = row.areaName ? row : {areaName: '', areaUsage: '', areaSize: '', areaAddress: '', areaPhotoAddress: '', areaDescription: ''}
            this.$officeDialog.modal('show');
            this.$officeDialog.modal({backdrop: 'static', keyboard: false});
            this.$officeDialogPanel.empty().html(this.getDialogContent(row))
            this.$editForm = this.$el.find('#editForm');
            this.initSubmitForm();
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
<<<<<<< HEAD
                        ncjwUtil.getData("/api/del/register/officeArea", {id: row.id}, function (res) {
                            if (res.success) {
                                ncjwUtil.showInfo(res.errorMsg);
                                that.table.refresh();
                            } else {
                                ncjwUtil.showError("删除失败：" + res.errorMsg);
=======
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
>>>>>>> ace8fc809d2e60b9c6c56bdfedb8d29db4733af1
                            }
                        }, {"contentType": "application/json"})
                    }
                }

            });
        },
        initSubmitForm: function () {
            this.$editForm.validate({
                errorElement: 'span',
                errorClass: 'help-block',
                focusInvalid: true,
                rules: {
                    areaName: {
                        required: true,
                        maxlength: 10
                    },

                    videoBitrate: {
                        required: true,
                        number: true,
                        maxlength: 4
                    }
                },
                messages: {
                    name: {
                        required: "请输入名称"
                    },
                    videoBitrate: {
                        required: "请输入数字",
                        number: "必须为数字"
                    }
                },
                highlight: function (element) {
                    $(element).closest('.form-group').addClass('has-error');
                },
                success: function (label) {
                    label.closest('.form-group').removeClass('has-error');
                    label.remove();
                },
                errorPlacement: function (error, element) {
                    element.parent('div').append(error);
                }
            });
        },
        submitForm: function (e) {
            if(this.$editForm.valid()){
                var that = this;
                $('#gmtCreate').val(new Date().getTime());
                $('#gmtModified').val(new Date().getTime());
                var $form = $(e.target).parents('.modal-content').find('#editForm');
                var data = $form.serialize();
                ncjwUtil.postData("/api/saveOrUpdate/register/officeArea",data, function (res) {
                // ncjwUtil.postData("/officeArea/insert",data, function (res) {
                    if (res.success) {
                        ncjwUtil.showInfo('保存成功！');
                        that.$officeDialog.modal('hide');
                        that.table.refresh();
                    } else {
                        ncjwUtil.showError("删除失败：" + res.errorMsg);
                    }
                })
            }
        }
    });
    return View;
});