import Vue from 'vue'
import Highcharts from 'highcharts'
import HighchartsVue from 'highcharts-vue'
import stockInit from 'highcharts/modules/stock'
import variablePieInit from 'highcharts/modules/variable-pie'

// hot fix (should be officialy fixed since 7.0.3 version)
;(function(H) {
	var animObject = H.animObject,
		color = H.color,
		extend = H.extend,
		defined = H.defined,
		isNumber = H.isNumber,
		LegendSymbolMixin = H.LegendSymbolMixin,
		merge = H.merge,
		noop = H.noop,
		pick = H.pick,
		Series = H.Series,
		seriesType = H.seriesType,
		svg = H.svg

	H.seriesTypes.column.prototype.animate = function(init) {
		var series = this,
			yAxis = this.yAxis,
			options = series.options,
			inverted = this.chart.inverted,
			attr = {},
			translateProp = inverted ? 'translateX' : 'translateY',
			translateStart,
			translatedThreshold

		if (svg) {
			// VML is too slow anyway
			if (init) {
				attr.scaleY = 0.001
				translatedThreshold = Math.min(
					yAxis.pos + yAxis.len,
					Math.max(yAxis.pos, yAxis.toPixels(options.threshold))
				)
				if (inverted) {
					attr.translateX = translatedThreshold - yAxis.len
				} else {
					attr.translateY = translatedThreshold
				}

				// apply finnal clipping (used in Highstock) (#7083)
				// animation is done by scaleY, so cliping is for panes
				if (series.clipBox) {
					series.setClip()
				}

				series.group.attr(attr)
			} else {
				// run the animation
				translateStart = series.group.attr(translateProp)
				series.group.animate(
					{ scaleY: 1 },
					extend(animObject(series.options.animation), {
						// Do the scale synchronously to ensure smooth
						// updating (#5030, #7228)
						step: function(val, fx) {
							attr[translateProp] =
								translateStart +
								H.pick(fx && fx.pos, 1) * (yAxis.pos - translateStart)
							series.group.attr(attr)
						}
					})
				)

				// delete this function to allow it only once
				series.animate = null
			}
		}
	}
})(Highcharts)

stockInit(Highcharts)
variablePieInit(Highcharts)
Vue.use(HighchartsVue)
