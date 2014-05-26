(function() {
  Ext.define('Focus.view.Main', {
    extend: 'Ext.Container',
    xtype: 'main',
    requires: ['Ext.TitleBar', 'Focus.model.Test', 'Focus.view.ColumnChart'],
    config: {
      layout: 'vbox',
      items: [
        {
          xtype: 'titlebar',
          title: 'title',
          docked: 'top'
        }, {
          flex: 1,
          xtype: 'columnchart',
          store: {
            model: 'Focus.model.Test',
            data: [
              {
                day: 'Sun',
                count1: 1,
                count2: 4
              }, {
                day: 'Mon',
                count1: 5,
                count2: 4
              }, {
                day: 'Tue',
                count1: 7,
                count2: 4
              }, {
                day: 'Wed',
                count1: 3,
                count2: 4
              }, {
                day: 'Thu',
                count1: 9,
                count2: 4
              }, {
                day: 'Fri',
                count1: 8,
                count2: 4
              }, {
                day: 'Sat',
                count1: 2,
                count2: 4
              }
            ]
          }
        }
      ]
    }
  });

}).call(this);
