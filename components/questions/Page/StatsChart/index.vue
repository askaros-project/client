<template>
  <div class="stats-chart">
    <div class="type-selector">
      <span>select by</span>
      <ul>
        <li v-for="type in types"
          v-on:click="selectType(type.type)"
          v-bind:class="{selected: type.type === selectedType }">
          <a-icon type="right"></a-icon>
          {{type.label}}
        </li>
      </ul>
    </div>
    <highcharts class="chart" :options="getChartOptions()"></highcharts>
  </div>
</template>

<script>
  import _ from 'lodash'
  import { reaction } from 'mobx'
  import { observer } from 'mobx-vue'
  import moment from 'moment'
  import {
    VOTE_YES,
    VOTE_NO,
    SEX_MALE,
    SEX_FEMALE,
    EDUCATION_LEVEL_SPECIALIST,
    EDUCATION_LEVEL_BACHELOR,
    EDUCATION_LEVEL_MASTER,
    EDUCATION_LEVEL_DOCTOR,
    INCOME_LEVEL_MIN,
    INCOME_LEVEL_MAX,
    INCOME_LEVEL_MIDDLE } from '~/constants'

  const generateTestData = () => {
    let items = []
    let countries = ['USA', 'Albania', 'Irak', 'Ukraine', 'Germany', 'Saudy', 'India', 'Morokko', 'Nepal', 'Canada', 'France','USAC', 'AlbaniaC', 'IrakC', 'UkraineC', 'GermanyC', 'SaudyC', 'IndiaC', 'MorokkoC', 'NepalC', 'CanadaC', 'FranceC']
    let education = [EDUCATION_LEVEL_SPECIALIST, EDUCATION_LEVEL_BACHELOR, EDUCATION_LEVEL_MASTER, EDUCATION_LEVEL_DOCTOR]

    let income = [INCOME_LEVEL_MIN, INCOME_LEVEL_MAX, INCOME_LEVEL_MIDDLE]

    for(var i = 0; i < 100; i++) {
      items.push({
        code: _.random(1,2),
        owner: {
          birthyear: _.random(1927, 2010),
          education: education[_.random(0, education.length-1)],
          income: income[_.random(0, income.length-1)],
          sex: [SEX_MALE, SEX_FEMALE][_.random(0,1)],
          place: {
            address_components: [{
              long_name: countries[_.random(0, countries.length-1)],
              types: ['country']
            }]
          }
        }
      })
    }
    return items
  }

  const getCountryFromPLace = (place) => {
    if (place && place.address_components) {
      const countryComponent = _.find(place.address_components, (ac) => {
        return ac.types[0] === 'country'
      })
      if (countryComponent) {
        return countryComponent.long_name
      }
    }
  }

  export default observer({
    props: {
      'question': Object,
    },

    data() {
      return {
        selectedType: 'age',
        types: [{
          type: 'age', label: 'Age'
        },{
          type: 'sex', label: 'Sex'
        },{
          type: 'country', label: 'Country'
        },{
          type: 'education', label: 'Education'
        },{
          type: 'income', label: 'Income'
        }],
        votesItems: []
      }
    },

    mounted() {
      this.fetch()
      const throttledFetch = _.debounce(this.fetch.bind(this), 500)
      reaction(() => this.question.votes.items,
        length => {
          throttledFetch()
        })
    },

    methods: {

      fetch() {
        this.$http.get('questions/' + this.question._id + '/votes').then((resp) => {
          this.votesItems = resp.body.votes
          // this.votes = generateTestData()
        })
      },

      selectType(type) {
        this.selectedType = type
      },

      getChartOptions(voteCode) {
        let options = {
          chart: {
            type: 'column'
          },
          title: '',
          xAxis: {
            categories: _.map(this.getCategories(), 'label'),
            crosshair: true
          },
          yAxis: {
            title: {text: "Votes"},
            opposite: true,
            min: 0
          },
          series: this.prepareSeries(),
        }

        return options
      },

      getCategories() {
        if (this.selectedType === 'age') {
          return [{
            label: '0-15',
            maxAge: 15
          },{
            label: '16-24',
            maxAge: 24
          },{
            label: '25-34',
            maxAge: 34
          },{
            label: '35-44',
            maxAge: 44
          }, {
            label: '45-54',
            maxAge: 54
          },{
            label: '55-64',
            maxAge: 64
          }, {
            label: '65-74',
            maxAge: 74
          },{
            label: '75-84',
            maxAge: 84
          }, {
            label: '85+',
            maxAge: 1000
          }]
        } else if (this.selectedType === 'sex') {
          return [{
            label: this.$messages.SEX[SEX_MALE],
            type: SEX_MALE
          },{
            label: this.$messages.SEX[SEX_FEMALE],
            type: SEX_FEMALE
          }]
        } else if (this.selectedType === 'country') {
          let countriesMap = {}
          _.each(this.votesItems, (item) => {
            const country = getCountryFromPLace(item.owner.place)
            if (country) {
              if (!countriesMap[country]) {
                countriesMap[country] = {label: country, count: 0}
              }
              countriesMap[country].count++
            }
          })
          let countries = _.sortBy(countriesMap, (c) => -c.count)
          return countries
        } else if (this.selectedType === 'education') {
          return [{
            label: this.$messages.EDUCATION[EDUCATION_LEVEL_SPECIALIST],
            type: EDUCATION_LEVEL_SPECIALIST
          },{
            label: this.$messages.EDUCATION[EDUCATION_LEVEL_BACHELOR],
            type: EDUCATION_LEVEL_BACHELOR
          },{
            label: this.$messages.EDUCATION[EDUCATION_LEVEL_MASTER],
            type: EDUCATION_LEVEL_MASTER
          },{
            label: this.$messages.EDUCATION[EDUCATION_LEVEL_DOCTOR],
            type: EDUCATION_LEVEL_DOCTOR
          }]
        } else if (this.selectedType === 'income') {
          return [{
            label: this.$messages.INCOME[INCOME_LEVEL_MIN],
            type: INCOME_LEVEL_MIN
          },{
            label: this.$messages.INCOME[INCOME_LEVEL_MIDDLE],
            type: INCOME_LEVEL_MIDDLE
          },{
            label: this.$messages.INCOME[INCOME_LEVEL_MAX],
            type: INCOME_LEVEL_MAX
          }]
        }
      },

      prepareSeries() {
        const categories = this.getCategories()

        let series = [{
          name: 'Yes',
          data: _.map(categories, () => 0)
        }, {
          name: 'No',
          data: _.map(categories, () => 0)
        }]

        if (this.selectedType === 'age') {
          const currentYear = (new Date()).getFullYear()
          _.each(this.votesItems, (item) => {
            if (item.owner.birthyear) {
              const age = currentYear - item.owner.birthyear
              for(let i = 0; i < categories.length; i++) {
                if (categories[i].maxAge >= age) {
                  series[ item.code === VOTE_YES ? 0 : 1 ].data[i]++
                  break
                }
              }
            }
          })
        } else if (this.selectedType === 'sex') {
          _.each(this.votesItems, (item) => {
            if (item.owner.sex) {
              if (item.owner.sex === categories[0].type) {
                series[ item.code === VOTE_YES ? 0 : 1 ].data[0]++
              } else {
                series[ item.code === VOTE_YES ? 0 : 1 ].data[1]++
              }
            }
          })
        } else if (this.selectedType === 'country') {
          _.each(this.votesItems, (item) => {
            const country = getCountryFromPLace(item.owner.place)
            if (country) {
              const countryIndex = _.findIndex(categories, (cat) => cat.label === country)
              if (countryIndex !== -1) {
                series[ item.code === VOTE_YES ? 0 : 1 ].data[countryIndex]++
              }
            }
          })
        } else if (this.selectedType === 'education') {
          _.each(this.votesItems, (item) => {
            if (item.owner.education) {
              const index = _.findIndex(categories, (cat) => cat.type === item.owner.education)
              if (index !== -1) {
                series[ item.code === VOTE_YES ? 0 : 1 ].data[index]++
              }
            }
          })
        } else if (this.selectedType === 'income') {
          _.each(this.votesItems, (item) => {
            if (item.owner.income) {
              const index = _.findIndex(categories, (cat) => cat.type === item.owner.income)
              if (index !== -1) {
                series[ item.code === VOTE_YES ? 0 : 1 ].data[index]++
              }
            }
          })
        }

        return series
      }
    }
  })
</script>
<style lang="less">
  .stats-chart {
    display: flex;
    flex-direction: row;
    .chart {
      flex: 1;
      width: calc(100% - 150px);
      margin: 0 auto;
      height: 270px;
    }
    .type-selector {
      font-size: 14px;
      width: 150px;
      padding: 0px 0 0 0px;
      > span {
        color: rgba(0,0,0,0.4);
        font-style: italic;
      }
      ul {
        margin-top: 20px;
      }
      li {
        margin: 10px 0;
        cursor: pointer;
        color: rgba(0,0,0,0.4);
        .anticon {
          color: transparent;
        }
        &.selected {
          font-weight: bold;
          color: rgba(0,0,0,0.8);
          .anticon {
            color: rgba(0,0,0,0.8);
          }
        }
      }
    }
  }
  .highcharts-scrollbar {
    display: none;
  }
</style>