Ext.define('ETFramework.app.Controller', {
    extend: 'Ext.app.Controller',
    requires: [
        'ETFramework.Backend'
    ],

    _enter: true,

    init: function () {
        this.setRoutes(this.configRoutes(this.getRoutes()));
        this.callParent(arguments);
    },

    isEnter: function () {
        return this._enter;
    },

    setEnter: function (enter) {
        this._enter = enter;
    },

    isFirstRun: function () {
        return localStorage._run;
    },

    setFirstRun: function (run) {
        localStorage._run = run;
    },

    configRoutes: function (routes) {
        routes[''] = 'entry';
        return routes;
    },

    back: function () {
        history.back();
    },

    showView: function (xtype) {
        if (Ext.isObject(xtype)) {
            return Ext.Viewport.setActiveItem(xtype);
        };

        var view = Ext.Viewport.query(xtype)[0] || {
            xtype: xtype
        };
        return Ext.Viewport.setActiveItem(view);
    },

    request: function () {
        ETFramework.Backend.request.apply(ETFramework.Backend, arguments);
    },

    // abstrast
    entry: Ext.emptyFn
});