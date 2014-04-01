Ext.define('AAAA.view.Main', {
    extend: 'Ext.Container',
    alias: 'widget.main',
    requires: [
        'Ext.TitleBar'
    ],
    config: {
        items: [{
            xtype: 'titlebar',
            title: 'Helloworld'
        }, {
            xtype: 'button',
            text: 'push me',
            margin: '.5em'
        }]
    }
});