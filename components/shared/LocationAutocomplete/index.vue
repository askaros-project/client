<template>
  <a-input
    placeholder='Location'
    ref="autocomplete"
    :default-value="defaultValue"
    ></a-input>
</template>

<script>
export default {
  name: "location-autocomplete",
  props: {
  	defaultValue: String,
  },
  mounted() {
  	if (window.google) {
			this.autocomplete = new google.maps.places.Autocomplete(
	      (this.$refs.autocomplete.$el),
	      {types: ['(cities)']}
	    )
	    this.autocomplete.addListener('place_changed', () => {
			  const place = this.autocomplete.getPlace()
			  this.$emit('change', place)
			})
	  }
  }
}

</script>

<style lang="less" scoped>
	
</style>
