(function() {
  Ext.define('Focus.view.ColumnChart', {
    extend: 'Ext.chart.CartesianChart',
    xtype: 'columnchart',
    requires: ['Ext.chart.axis.Numeric', 'Ext.chart.axis.Category', 'Ext.chart.series.Bar'],
    config: {
      flipXY: true,
      series: [
        {
          stacked: false,
          type: 'bar',
          xField: 'day',
          yField: ['count1', 'count2'],
          colors: ['green', 'blue'],
          label: {
            color: '#fff',
            display: 'insideEnd',
            field: ['count1', 'count2'],
            orientation: 'horizontal'
          },
          style: {
            inGroupGapWidth: 0,
            minGapWidth: 10,
            lineWidth: 0
          }
        }
      ],
      axes: [
        {
          type: 'numeric',
          position: 'bottom',
          fields: ['count1', 'count2']
        }, {
          type: 'category',
          position: 'left',
          fields: 'day'
        }
      ]
    }
  });

}).call(this);
