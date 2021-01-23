//import { ref } from 'vue';
import { registerAccount, loginAccount } from '../services/auth';

export function useAuth() {
  // const tags = ref<string[]>([]);

  async function submitRegister(registerCredential: RegisterCredential) {
    return await registerAccount(registerCredential);
  }

  async function submitLogin(loginCredential: LoginCredential) {
    return await loginAccount(loginCredential);
  }

  // watch(
  //   () => $store.isSuccessRegistration,
  //   if (isSuccessRegistration) {
  //     flashMessage.show({
  //         status: 'success',
  //         title: 'Success!',
  //         message: 'Successfully created an account!'
  //     });
  //     setTimeout(function(){
  //         self.$router.push({
  //             name: 'login'
  //         });
  //     }, 3000);
  // }
  //   },
  //   { immediate: true },
  // )

  return {
    submitRegister,
    submitLogin,
  };
}
