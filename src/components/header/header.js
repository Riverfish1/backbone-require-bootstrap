/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'text!src/components/header/header.html'
], function ($, _, Backbone, tpl) {
	'use strict';
	var HeaderView = Backbone.View.extend({
		tagName:  'div',
		template: _.template(tpl),
        events: {
            'click a':	'updateNavSideBar'
        },
		initialize:function(){

		},
        updateNavSideBar: function (e) {
			var $el = $(e.target);
            Backbone.trigger('headerClick', $el.attr('href').split('/')[1]);
        },
		render:function(){
			this.$el.html(this.template());
			return this;
		}
	});
	return HeaderView;
});