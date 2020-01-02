<template>
  <div class="form-elements">
    <div class="row">
      <div class="flex xs12">
        <va-card :title="$t('ADD STUDENT FORM')" >
<form @submit.prevent="onsubmit">
           <div class="row overflow--hidden">
              <div class="flex md8">
                <div class="row row-inside">
                  <div class="flex md4 sm6 xs12">
                   <va-input
                      :label="$t('NAME')"
                      v-model="name"
                      placeholder="Your name "
                    >
                    <va-icon
                      slot="prepend"
                      color="gray"
                      name="fa fa-user-circle-o"
                    />
                    </va-input>
                  </div>

                  <div class="flex md4 sm6 xs12">
                    <va-input
                      :label="$t('PASSWORD')"
                      v-model="password"
                      placeholder="Your password"
                    >
                    <va-icon
                      slot="prepend"
                      color="gray"
                      name="fa fa-lock"
                      />
                    </va-input>
                  </div>
                </div>
                <div class="row row-inside">
                  <div class="flex md4 sm6 xs12">
                    <va-input
                      :label="$t('PROMO')"
                      v-model="promo"
                      placeholder="Your promo"
                    >
                      <va-icon
                       slot="prepend"
                       color="gray"
                       name="fa fa-home"
                      />
                    </va-input>
                  </div>
                  <div class="flex md4 sm6 xs12">
                    <va-input
                      :label="$t('EMAIL')"
                      v-model="email"
                      placeholder="Your mail"
                    >
                    <va-icon
                      slot="prepend"
                      color="gray"
                      name="fa fa-envelope-o"
                    />
                  </va-input>
                </div>
              </div>
              <div class="row row-inside">
                <div class="flex md4 sm6 xs12">
                    <va-input
                      :label="$t('GROUPE')"
                      v-model="groupe"
                      placeholder="GROUPE"
                    >
                    <va-icon
                      slot="prepend"
                      color="gray"
                      name="fa fa-home"
                    />
                  </va-input>
                </div>
                <div class="flex md4 sm6 xs12">
                 <va-input
                      :label="$t('MATRICULE')"
                      v-model="matricule"
                      placeholder="MATRICULE"
                    >
                    <va-icon
                      slot="prepend"
                      color="gray"
                      name="fa fa-number"
                    />
                  </va-input>
                </div>

              </div>
              <div>
                <va-button type="submit"  slot="append" style="float:right;margin-right:35%" small>
                    IMPORT STUDENT
                </va-button>
              </div>

              </div>
            </div>
          </form>
        </va-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'form-elements',
  components: {},
  data () {
    return {
      email: '',
      password: '',
      promo: '',
      groupe: '',
      matricule: '',
      name: '',
      simple: '',
      withIcon: '',
      datepicker: {
        simple: '2018-05-09',
      },
    }
  },
  methods: {
    onsubmit () {
      axios.post('http://127.0.0.1:8000/etudiant/ajouteretudiant', {
        data: {
          email: this.email,
          password: this.password,
          groupe: this.groupe,
          matricule: this.matricule,
          promo: this.promo,
          name: this.name,
        },
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }).then((response) => {
        alert('new student have been added !!')
      }).catch(err => console.log(err))
    },
    clear (field) {
      this[field] = ''
    },
  },
  created () {
    this.$nextTick(() => {
      this.$validator.validateAll()
    })
  },
}
</script>

<style>
  .row.row-inside {
    max-width: none;
  }
</style>
