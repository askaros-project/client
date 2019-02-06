<template>
  <highcharts class="sentiment-chart" :constructor-type="'stockChart'" :options="getChartOptions()"></highcharts>
</template>

<script>
  import _ from 'lodash'
  import { observer } from 'mobx-vue'
  import moment from 'moment'
  import { VOTE_YES, VOTE_NO } from '~/constants'
  export default observer({
    props: {
      question: Object,
    },

    methods: {

      getChartOptions() {
        let options = {
          title: '',
          series: this.prepareSeries(this.question.votes.items),
          navigator: {
            enabled: false
          },
          exporting: {
            enabled: false
          },
          rangeSelector: {
            enabled: false
          },
          credits: {
            enabled: false
          },
          plotOptions: {
            spline: {
              marker: {
                  // enabled: false
              },
              // lineWidth: 2
            }
          },
          xAxis: {
            labels: {
              enabled: false
            },
          },
          yAxis: [{
            title: {
                text: null
            },
            min: -100,
            max: 100,
            tickInterval: 100,
            showLastLabel: true,
            height: '80%',
          },{
            top: '80%',
            height: '20%',
            offset: 0,
            labels: {
              enabled: false
            },
          }],
          tooltip: {
            formatter: function() {
              let p1 = this.points[0], p2 = this.points[1]
              return '<span style="font-size: 10px;color: rgba(0,0,0,0.4);">' + moment(new Date(p1.key)).format('MMM Do YY HH:mm') + '</span><br/><br/>' +
               `<span style="color:${p1.series.color}">${p1.series.name}</span>: <b>${parseInt(p1.y)}%</b><br/>` +
               `<span style="color:${p2.series.color}">${p2.series.name}</span>: <b>${parseInt(p2.y)}</b><br/>`
            }
          },
          legend: {
              enabled:false
          },
        }

        return options
      },

      prepareSeries(items) {

        // items = []
        // let fromDate = moment(new Date(this.question.createdAt))
        // let toDate = moment(new Date()).add(10000, 'minutes')
        // while(fromDate.format('YYYYMMDDHHmm') < toDate.format('YYYYMMDDHHmm')) {
        //   _.times(_.random(0,10), () => this.items.push({code: 1, createdAt: fromDate.startOf('minute').toString() }))
        //   _.times(_.random(0,10), () => this.items.push({code: 2, createdAt: fromDate.startOf('minute').toString() }))
        //   fromDate.add( _.random(1,24) , 'hours')
        // }

        let series = [{
          name: 'Sentiment',
          type: 'spline',
          data: []
        },{
          name: 'Votes',
          type: 'column',
          yAxis: 1,
          data: []
        }]

        if (items.length) {
          let groupedByTime = [],
            period,
            periodValue = 1,
            yesCount = 0,
            noCount = 0,
            currentTime = moment(new Date(this.question.createdAt)),
            lastItemDate = new Date( items[items.length-1].createdAt)
            
          if (lastItemDate - new Date(this.question.createdAt) <= 24*60*60*1000) {
            period = 'minute'
            periodValue = Math.ceil(( (lastItemDate - new Date(this.question.createdAt))/ (1000 *60 * 100)))
          } else if (lastItemDate - new Date(this.question.createdAt) <= 7*24*60*60*1000) {
            period = 'hour'
            periodValue = Math.ceil(( (lastItemDate - new Date(this.question.createdAt))/ (1000 *60*60 * 100)))
          } else {
            period = 'day'
            periodValue = Math.ceil(( (lastItemDate - new Date(this.question.createdAt))/ (1000 *24*60*60 * 100)))
          }

          groupedByTime = _.groupBy(items, (item) => moment(new Date(item.createdAt)).startOf(period))
          _.each(groupedByTime, (items, time) => {
            let itemTime = moment(new Date(time))
            let nextTime = currentTime.add(periodValue, period + 's')
            while(itemTime.format('YYYYMMDDHHmm') > nextTime.format('YYYYMMDDHHmm')) {
              if (yesCount + noCount > 0) {
                series[0].data.push( [nextTime.toString(), ((yesCount/(yesCount + noCount))*2 - 1)*100] )  
              } else {
                series[0].data.push( [nextTime.toString(), 0] )
              }
              series[1].data.push( [nextTime.toString(), 0] )
              nextTime = nextTime.add(periodValue, period + 's')
            }
            currentTime = itemTime
            let periodYesCount = 0, periodNoCount = 0
            _.each(items, (item) => {
              if (item.code === VOTE_YES) {
                periodYesCount++
              } else {
                periodNoCount++
              }
            })
            yesCount += periodYesCount
            noCount += periodNoCount
            if (yesCount + noCount > 0) {
              series[0].data.push([ time, ((yesCount/(yesCount + noCount))*2 - 1)*100 ])
            } else {
              series[0].data.push([ time, 0 ])
            }
            series[1].data.push([ time, periodYesCount + periodNoCount ])
          })
        }
        return series
      }
    }
  })
</script>
<style lang="less">
  .sentiment-chart {
    width: 100%;
    margin: 0 auto;
    height: 270px;
  }
  .highcharts-scrollbar {
    display: none;
  }
</style>