/*global define*/
define([], function () {
    'use strict';
    //提示信息
    var showInfo = function(title, detail){
        $ ('#info-success-id').html("<strong>"+title+"</strong>" );
        $ ('#info-success-id').show ().delay (3000).fadeOut ();
    }
    var showError=function(title,detail){
        $ ('#info-error-id').html("<strong>"+title+"</strong>" );
        $ ('#info-error-id').show ().delay (3000).fadeOut ();
    }

    var ncjwUtil = {
        showInfo: showInfo,
        showError: showError
    }


    return ncjwUtil;
});