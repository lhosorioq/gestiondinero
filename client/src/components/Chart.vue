<template>
  <v-container>
    <highcharts class="chart" :options="chartOptions" :updateArgs="updateArgs"></highcharts>      
  </v-container>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'chart',
  data: () => ({
      arrayTime: [],

      title: '',
      numNum: Number,
      durationOptions: [0, 500, 1000, 2000],
      points: [10, 0, 8, 2, 6, 4, 5, 5],
      chartType: 'Spline',
      seriesColor: '#6fcd98',
      colorInputIsSupported: null,
      animationDuration: 1000,
      updateArgs: [true, true, {duration: 1000}],
      chartOptions: {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Gestion Dinero'
        }, 
        xAxis: {
        categories: [
        ]},
        yAxis: {
            title: {
                text: 'Money unit'
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' units'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
        },
        series: [{
            name: 'Ingresos',
            data: [],
            color: '#6fcd98'
        }, {
            name: 'Egresos',
            data: [],
            color: '#de0d22'
        }]
      }
    }),

  computed:{

        ...mapState(['user']),

        },

  methods: {

      loadData(){
        this.user.movimientos.forEach(element => {
          this.chartOptions.xAxis.categories.push(element.fecha.substr(0, 10));
          if (parseInt(element.value, 10) > 0) {
            this.chartOptions.series[0].data.push(parseInt(element.value, 10));
          } else {
            this.chartOptions.series[1].data.push(parseInt(element.value, 10) * -1);
          }
        });
      }
  },

  created () {
    this.loadData();

    this.chartOptions.title.text = this.user.username;

    const i = document.createElement('input')
    i.setAttribute('type', 'color');
    (i.type === 'color') ? this.colorInputIsSupported = true : this.colorInputIsSupported = false;
    
  },
  watch: {
    title (newValue) {
      this.chartOptions.title.text = newValue
    },
    points: {
      handler(newValue) {
        this.chartOptions.series[0].data = newValue
      },
      deep: true
    },
    chartType (newValue) {
      this.chartOptions.chart.type = newValue.toLowerCase()
    },
    seriesColor (newValue) {
      this.chartOptions.series[0].color = newValue.toLowerCase()
    },
    animationDuration (newValue) {
      this.updateArgs[2].duration = Number(newValue)
    }
  }
}
</script>

<style scoped>

</style>
