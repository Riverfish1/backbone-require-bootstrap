/* global define */
/* global require */
define(['backbone'], function (Backbone) {

    var routesMap = {
        'register/officeArea': 'src/components/registerOfficeArea/indexController.js',
        'register/workArea': 'src/components/list/listController.js',
        'work/department': 'src/components/list/listController.js',
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
    var oldHashFirst = null;
    //彻底用on route接管路由的逻辑，这里route是路由对应的value
    router.on('route', function (route, params) {
        require([route], function (controller) {
            if (router.currentController && router.currentController !== controller) {
                router.currentController.onRouteChange && router.currentController.onRouteChange();
            }
            // // debugger;
            // //根据url路径，导航条添加active类
            // var hash = "#" + window.location.href.split('#')[1];
            // var firstHash = hash.split('/')[1];
            // var $sidebar = $('#sidebar');
            // var $navbar = $('#navbar');
            // $sidebar.find('li').removeClass('active');
            // $sidebar.find('a').each(function (k,el) {
            //     var $el = $(el);
            //     if($el.prop('href').indexOf(hash) > -1){
            //         $el.addClass('active')
            //     }
            // });
            // debugger;
            var hash = window.location.href.split('#')[1];
            var hashFirst = hash.split('/')[1]
            if(hashFirst != oldHashFirst){
                Backbone.trigger('routeChange', hash);
            }
            oldHashFirst = hashFirst;

            router.currentController = controller;
            controller.apply(null, params);     //每个模块约定都返回controller
        });
    });

    return router;
});