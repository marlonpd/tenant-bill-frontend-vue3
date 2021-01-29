<template>
  <!-- header -->
  <header class="w-full px-6 bg-white">
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
  </header>
  <!-- /header -->

  <!-- navigation -->
  <nav
    class="w-full bg-white md:pt-0 px-6 shadow-lg relative z-20 border-t border-b border-gray-400"
  >
    <div
      class="container mx-auto max-w-4xl md:flex justify-between items-center text-sm md:text-md md:justify-start"
    >
      <div
        class="w-full md:w-1/2 text-center md:text-left py-4 flex flex-wrap justify-center items-stretch md:justify-start md:items-start"
      >
        <a
          href="#"
          class="px-2 md:pl-0 md:mr-3 md:pr-3 text-gray-700 no-underline md:border-r border-gray-400"
          >Home</a
        >
        <a
          href="#"
          class="px-2 md:pl-0 md:mr-3 md:pr-3 text-gray-700 no-underline md:border-r border-gray-400"
          >Products</a
        >
        <a
          href="#"
          class="px-2 md:pl-0 md:mr-3 md:pr-3 text-gray-700 no-underline md:border-r border-gray-400"
          >About Us</a
        >
        <a
          href="#"
          class="px-2 md:pl-0 md:mr-3 md:pr-3 text-gray-700 no-underline md:border-r border-gray-400"
          >News</a
        >
        <a
          href="#"
          class="px-2 md:pl-0 md:mr-3 md:pr-3 text-gray-700 no-underline"
          >Contact</a
        >
      </div>
      <div class="w-full md:w-1/2 text-center md:text-right pb-4 md:p-0">
        <input
          type="search"
          placeholder="Search..."
          class="bg-gray-300 border text-sm p-1"
        />
      </div>
    </div>
  </nav>
  <!-- /navigation -->
</template>

<script lang="ts">
  import { routerPush } from '../router';
  import { useAuth } from '../composable/useAuth';

  export default {
    name: 'Header',
    setup() {
      const auth = useAuth();
      const isAuthenticated = auth.isAuthenticated;

      const logout = () => {
        auth.doLogout();
        routerPush('home');
      };

      return {
        logout,
        isAuthenticated,
      };
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
