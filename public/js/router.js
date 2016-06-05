// Filename: router.js
define([
    'jquery',
    'underscore',
    'backbone',
    'socketClient',
    'components/container/ContainerView'
], function ($, _, Backbone, SocketClient, ContainerView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            // Define some URL routes
            '(/)' : 'frontPage',

            // Default
            //    '(/)(:lang)': 'index'
        }
    });

    var initialize = function (App) {

        var app_router = new AppRouter;

        var page = new ContainerView(App);

        app_router.on('route:frontPage', function () {

            page.setPageView('IndexView', {showCarusel:true});
        });

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});
