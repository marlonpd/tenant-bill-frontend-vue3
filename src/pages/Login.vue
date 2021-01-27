<template>
  <div class="min-h-screen w-full p-6 flex justify-center items-center">
    <div class="w-full max-w-xs">
      <div class="bg-white border p-8 shadow rounded w-full mb-6">
        <h1 class="mb-6 text-lg text-gray-900 font-thin">
          Login to your account
        </h1>

        <form @submit.prevent="login">
          <fieldset class="mb-4">
            <label class="block text-sm text-gray-900 mb-2"
              >Email address</label
            >
            <input
              v-model="form.email"
              id="email"
              type="email"
              class="block w-full rounded-sm border bg-white py-2 px-3 text-sm"
              name="email"
              required
              autofocus
            />
          </fieldset>

          <fieldset class="mb-4">
            <div class="w-full flex justify-between items-center">
              <label for="password" class="block text-sm text-gray-900 mb-2"
                >Password</label
              >
              <a
                class="text-xs font-thin text-blue no-underline hover:underline"
                href="#"
              >
                Forgotten password?
              </a>
            </div>
            <input
              v-model="form.password"
              id="password"
              type="password"
              class="block w-full rounded-sm border bg-white py-2 px-3 text-sm"
              name="password"
              required
            />
          </fieldset>

          <div class="pt-1 pb-5 text-sm text-gray-darker font-thin">
            <label
              ><input
                class="mr-1"
                type="checkbox"
                name="remember"
                id="remember"
              />
              Remember me</label
            >
          </div>

          <button
            type="submit"
            class="block w-full bg-blue-600 text-white rounded-sm py-3 text-sm tracking-wide"
          >
            Sign in
          </button>
        </form>
      </div>

      <p class="text-center text-sm text-gray-600 font-thin">
        Don't have an account yet?
        <a href="/register" class="text-blue-500 no-underline hover:underline"
          >Sign up</a
        >
      </p>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue';
  import { useAuth } from '../composable/useAuth';
  import { useStore } from 'vuex';
  import { LOGIN } from '../store/actions.type';
  import { routerPush } from '../router';
  export default defineComponent({
    name: 'LoginPage',
    components: {},
    async setup() {
      const auth = useAuth();
      const formRef = ref<HTMLFormElement | null>(null);
      const form = reactive<LoginCredential>({
        email: '',
        password: '',
      });

      const store = useStore();

      const login = async () => {
        console.log('called login');
        const result = await store.dispatch(LOGIN, form);

        console.log(' second then ');
        console.log(result);
        await routerPush('tenants');
        // await auth.submitLogin(form);
      };
      // const errors = ref<PostRegisterErrors>({});

      // const register = async () => {
      //   if (!formRef.value?.checkValidity()) return;

      //   const result = await postRegister(form);
      //   if (result.isOk()) {
      //     updateUser(result.value);
      //     await routerPush('global-feed');
      //   } else {
      //     errors.value = await result.value.getErrors();
      //   }
      // };

      return {
        formRef,
        form,
        login,
      };
    },
  });
</script>
