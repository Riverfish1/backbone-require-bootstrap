/* global define */
/* global require */
define(['backbone'], function (Backbone) {

	var routesMap = {
    'register/officeArea': 'src/components/registerOfficeArea/indexController.js',
		'work/department': 'src/components/list/listController.js',
		'login': 'src/components/login/indexController.js'
		// '*actions': 'defaultAction'
	};

	var Router = Backbone.Router.extend({

		routes: routesMap,

		defaultAction: function () {
			console.log('404');
			location.hash = 'module2';
		}

	});

	var router = new Router();
	//彻底用on route接管路由的逻辑，这里route是路由对应的value
	router.on('route', function (route, params) {
		console.log(route, params)
		require([route], function (controller) {
			console.log(controller);
			if(router.currentController && router.currentController !== controller){
				router.currentController.onRouteChange && router.currentController.onRouteChange();
			}
			router.currentController = controller;
			controller.apply(null, params);     //每个模块约定都返回controller
		});
	});

	return router;
});