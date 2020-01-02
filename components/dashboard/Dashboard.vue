<template>
  <div class="dashboard">
    <div class="row">
      <div class="flex xs12">
        <dashboard-table />
      </div>
    </div>
  </div>
</template>

<script>
import DashboardTable from './DashboardTable'

export default {
  name: 'dashboard',
  components: {
    DashboardTable,
  },

}
</script>

<style lang="scss">
  .row-equal .flex {
    .va-card {
      height: 100%;
    }
  }
  .dashboard {
    .va-card {
      margin-bottom: 0 !important;
    }
  }
</style>
