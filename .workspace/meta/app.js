Ext.application({
    name: '{{appname}}',
    profiles: ['Main'],
    launch: function () {
        Ext.fly('appLoadingIndicator').destroy();
        if (Ext.browser.is.Cordova) {
            navigator.splashscreen.hide();
        }
    }
});