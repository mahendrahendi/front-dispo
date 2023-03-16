<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import KorlantasDashboard from './korlantas'
import AutentikaDashboard from './autentika'

export default {
  name: 'Dashboard',
  components: { KorlantasDashboard, AutentikaDashboard },
  data() {
    return {
      currentRole: 'KorlantasDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (this.roles.includes('USR_ADM')) {
      this.currentRole = 'AutentikaDashboard'
    }
  }
}
</script>
