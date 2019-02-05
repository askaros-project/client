import Vue from 'vue'
import Highcharts from 'highcharts'
import HighchartsVue from 'highcharts-vue'
import stockInit from 'highcharts/modules/stock'
import variablePieInit from 'highcharts/modules/variable-pie'

stockInit(Highcharts)
variablePieInit(Highcharts)
Vue.use(HighchartsVue)
