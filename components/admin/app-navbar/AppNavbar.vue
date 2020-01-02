<template>
  <va-navbar class="app-navbar">
    <header-selector slot="selector" :minimized.sync="minimizedProxy"/>
    <template slot="logo">
     <va-icon-vuestic/>
    </template>
    <div class="app-navbar__actions row flex-nowrap align--center">
      <message-dropdown class="va-navbar__item"/>
      <notification-dropdown class="va-navbar__item"/>
      <profile-dropdown class="va-navbar__item">
        <span>{{userName}}</span>
      </profile-dropdown>
    </div>
  </va-navbar>
</template>

<script>
import VaIconVuestic from 'vuestic-ui/src/components/vuestic-components/va-icon/va-iconset/VaIconVuestic'
import HeaderSelector from './components/HeaderSelector'
import ProfileDropdown from './components/dropdowns/ProfileDropdown'
import NotificationDropdown from './components/dropdowns/NotificationDropdown'
import MessageDropdown from './components/dropdowns/MessageDropdown'

export default {
  name: 'app-navbar',
  components: {
    VaIconVuestic,
    HeaderSelector,
    MessageDropdown,
    NotificationDropdown,
    ProfileDropdown,
  },
  props: {
    minimized: {
      type: Boolean,
      required: true,
    },
  },
  data () {
    return {
      userName: 'Captain Teemo on duty',
    }
  },
  computed: {
    minimizedProxy: {
      get () {
        return this.minimized
      },
      set (minimized) {
        this.$emit('update:minimized', minimized)
      },
    },
  },
}
</script>
<style lang="scss">
.app-navbar {
  &__button {
    width: 10.8125rem;
    .va-button__content__icon-left.fa-github {
      font-size: 1.5rem;
    }
  }
  &__actions {
    justify-content: flex-end;
  }
  &__mailto-link:hover {
    filter: brightness(85%);
  }
  @include media-breakpoint-down(lg) {
    &__button {
      display: none !important;
    }
    .profile-dropdown {
      margin: auto 0 auto .75rem;
    }
  }
  @include media-breakpoint-down(md) {
    @at-root .va-navbar__text {
      display: none !important;
    }
  }
  @include media-breakpoint-down(sm) {
    &__button {
      display: none !important;
    }
    &__actions {
      justify-content: space-around;
      padding: 0 .5rem;
    }
    .profile-dropdown {
      position: absolute;
      right: .75rem;
      top: 1.25rem;
      height: fit-content;
      margin: auto;
    }
  }
}
</style>
