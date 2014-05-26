Ext.application({
    name: 'Focus',
    profiles: ['Main'],
    launch: function () {
        Ext.fly('appLoadingIndicator').destroy();
        if (Ext.browser.is.Cordova) {
            navigator.splashscreen.hide();
        }
    }
});