<template>
  <va-card :title="$t('Students table') ">
    <div class="row align--center mb-1">
      <div class="flex xs12 sm6">
          <va-input
            class="ma-0"
            :value="term"
            :placeholder="$t('tables.searchByName')"
            @input="search"
          >
            <va-icon name="fa fa-search" slot="prepend" />
          </va-input>
      </div>
    </div>

    <va-data-table
      :fields="fields"
      :data="filteredData"
      hoverable
    >
    </va-data-table>
  </va-card>
</template>

<script>
import { debounce } from 'lodash'
// import data from '../markup-tables/data.json'
import axios from 'axios'

export default {
  data () {
    return {
      users: [],
      loading: false,
      term: null,
      mode: 0,
    }
  },
  created: function () {
    axios.get('http://127.0.0.1:8000/afficher', {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }).then((response) => {
      this.users = response.data.slice()
    }).catch(err => console.log(err))
  },
  computed: {
    fields () {
      return [{
        name: '__slot:icon',
        width: '50px',
        dataClass: 'text-center',
      },
      {
        name: 'matricule',
        title: this.$t('matricule'),
        width: '-50%',
      }, {
        name: 'name',
        title: this.$t('tables.headings.name'),
        width: '-50%',
      }, {
        name: 'email',
        title: this.$t('tables.headings.email'),
        width: '30%',

      }, {
        name: 'promo',
        title: this.$t('promo'),
        width: '30%',

      },
      {
        name: 'groupe',
        title: this.$t('groupe'),
        width: '30%',

      },

      {
        name: '__slot:actions',
        dataClass: 'text-right',
      }]
    },
    filteredData () {
      if (!this.term || this.term.length < 1) {
        return this.users
      }

      return this.users.filter(item => {
        return item.name.toLowerCase().startsWith(this.term.toLowerCase())
      })
    },
  },
  methods: {
    search: debounce(function (term) {
      this.term = term
    }, 400),
  },
}
</script>

<style lang="scss">
</style>
