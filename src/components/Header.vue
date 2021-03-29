<template>
  <!-- <header class="w-full px-6 bg-white" v-if="isAuthenticated">
    <div
      class="container mx-auto max-w-4xl md:flex justify-between items-center"
    >
      <a
        href="#"
        class="block py-6 w-full text-center md:text-left md:w-auto text-gray-600 no-underline flex justify-center items-center"
      >
        Vertigo
      </a>
      <div class="w-full md:w-auto mb-6 md:mb-0 text-center md:text-right">
        <router-link
          class="inline-block no-underline bg-black text-white text-sm py-2 px-3 mr-2"
          to="/login"
          v-if="!isAuthenticated"
        >
          Login
        </router-link>
        <router-link
          v-if="isAuthenticated"
          class="inline-block no-underline bg-black text-white text-sm py-2 px-3 mr-2"
          to="/power-rates"
        >
          Power Rates
        </router-link>

        <a
          v-if="isAuthenticated"
          class="inline-block no-underline bg-black text-white text-sm py-2 px-3 mr-2"
          @click="logout()"
        >
          Logout
        </a>

        <router-link
          v-if="!isAuthenticated"
          class="inline-block no-underline bg-black text-white text-sm py-2 px-3 mr-2"
          to="/register"
        >
          Register
        </router-link>
      </div>
    </div>
  </header> -->

  <div class="container mx-auto page-container">
    <TabMenu v-if="isAuthenticated" :model="authItems" />
    <TabMenu v-else :model="publicItems" />
  </div>
</template>

<script lang="ts">
  import { ref, onMounted } from 'vue';
  import { routerPush } from '../router';
  import { useAuth } from '../composable/useAuth';

  export default {
    name: 'Header',
    setup() {
      const auth = useAuth();
      let isAuthenticated = ref(auth.isAuthenticated);

      onMounted(() => {
        isAuthenticated = ref(auth.isAuthenticated);
      });

      const logout = () => {
        auth.doLogout();
        routerPush('home');
      };

      const authItems = [
        {
          label: 'Power Rates',
          class: 'sign-up-tab-item flex-1',
          icon: 'pi pi-fw pi-list',
          visible: () => isAuthenticated.value,
          to: '/power-rates',
        },
        {
          label: 'Tenants',
          icon: 'pi pi-fw pi-users',
          visible: () => isAuthenticated.value,
          class: 'tenants-tab-item flex-1',
          to: '/tenants',
        },
        {
          label: 'Sign Out',
          icon: 'pi pi-fw pi-sign-out',
          class: 'sign-out-tab-item flex-1',
          visible: () => isAuthenticated.value,
          command: () => {
            logout();
          },
        },
      ];

      const publicItems = [
        {
          label: 'Sign-Up',
          class: 'sign-up-tab-item flex-1',
          icon: 'pi pi-fw pi-user-edit',
          visible: () => !isAuthenticated.value,
          to: '/register',
        },
        {
          label: 'Home',
          icon: 'pi pi-fw pi-home',
          to: '/home',
          visible: () => !isAuthenticated.value,
          class: 'home-tab-item flex-1',
        },
        {
          label: 'Sign In',
          icon: 'pi pi-fw pi-sign-in',
          class: 'sign-in-tab-item flex-1',
          visible: () => !isAuthenticated.value,
          to: '/login',
        },
      ];

      return {
        logout,
        isAuthenticated,
        publicItems,
        authItems,
      };
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .p-tabmenu {
    ul > li a.p-menuitem-link {
      justify-content: center;
      text-align: center;
      margin: auto;
      display: contents;
    }
    a.p-menuitem-link {
      justify-content: center;
      text-align: center;
      margin: auto;
      display: contents;
    }
  }
</style>
