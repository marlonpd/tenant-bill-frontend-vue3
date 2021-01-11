<template>
  <div class="container">
    <div id="formContent" class="mx-auto">
      <!-- Tabs Titles -->

      <!-- Icon -->
      <div class="fadeIn first m-6">
        <h4>Welcome</h4>
        <ul v-if="errors" class="error-messages">
          <li v-for="(v, k) in errors" :key="k">{{ v | error }}</li>
        </ul>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="onSubmit">
        <input
          type="text"
          id="email"
          class="fadeIn second"
          v-model="email"
          name="email"
          placeholder="email"
        />
        <input
          type="password"
          id="password"
          class="fadeIn third"
          v-model="password"
          name="password"
          placeholder="password"
        />
        <input type="submit" class="fadeIn fourth" value="Log In" />
      </form>

      <!-- Remind Passowrd -->
      <div id="formFooter">
        <p class="text-xs-center">
          <router-link :to="{ name: 'register' }">
            Need an account?
          </router-link>
        </p>
        <a class="underlineHover" href="#">Forgot Password?</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'HomePage',
    components: {},
  });
</script>
