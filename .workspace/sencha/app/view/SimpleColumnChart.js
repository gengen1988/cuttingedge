(function() {
  Ext.define('Focus.view.SimpleColumnChart', {
    extend: 'Ext.chart.CartesianChart',
    xtype: 'columnchart',
    requires: ['Ext.chart.axis.Numeric', 'Ext.chart.axis.Category', 'Ext.chart.series.Bar'],
    config: {
      series: [
        {
          type: 'bar',
          xField: 'day',
          yField: ['count'],
          labelField: ['count'],
          style: {
            stroke: 'black'
          }
        }
      ],
      axes: [
        {
          type: 'numeric',
          position: 'left',
          fields: ['count'],
          maximum: 10
        }, {
          type: 'category',
          position: 'bottom',
          fields: 'day'
        }
      ],
      store: {
        model: 'Focus.model.Test',
        data: [
          {
            day: 'Sun',
            count: 1
          }, {
            day: 'Mon',
            count: 5
          }, {
            day: 'Tue',
            count: 7
          }, {
            day: 'Wed',
            count: 3
          }, {
            day: 'Thu',
            count: 9
          }, {
            day: 'Fri',
            count: 8
          }, {
            day: 'Sat',
            count: 2
          }
        ]
      }
    }
  });

}).call(this);
