import { ActionContext, ActionTree } from 'vuex';
import {
  LOGIN,
  LOGOUT,
  REGISTER,
  CHECK_AUTH,
  UPDATE_USER,
} from '../../actions.type';
import {
  SET_AUTH,
  PURGE_AUTH,
  SET_ERROR,
  SET_SUCCESS_REGISTRATION,
} from '../../mutations.type';
import { State } from './state';
import { registerAccount, loginAccount } from '../../../services/auth';

export type Actions = {
  [LOGIN](
    context: ActionContext<State, State>,
    loginCredential: LoginCredential
  ): void;
  [LOGOUT](context: ActionContext<State, State>): void;
  [REGISTER](
    context: ActionContext<State, State>,
    registerCredential: RegisterCredential
  ): void;
  [CHECK_AUTH](context: ActionContext<State, State>): void;
  [UPDATE_USER](context: ActionContext<State, State>, payload: any): void;
};

const actions: ActionTree<State, State> & Actions = {
  [LOGIN](
    context: ActionContext<State, State>,
    loginCredential: LoginCredential
  ) {
    return new Promise((resolve, reject) =>
      loginAccount(loginCredential)
        .then((response: any) => {
          context.commit(SET_AUTH, response);
          resolve(response);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, [response.data.error]);
          reject();
        })
    );
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
  },
  async [REGISTER](
    context: ActionContext<State, State>,
    registerCredential: RegisterCredential
  ) {
    return await registerAccount(registerCredential)
      .then(() => {
        context.commit(SET_ERROR, '');
        context.commit(SET_SUCCESS_REGISTRATION);
      })
      .catch(({ response }) => {
        context.commit(SET_ERROR, response.data.error);
      });
  },
  [CHECK_AUTH](context: ActionContext<State, State>) {
    // if (JwtService.getToken()) {
    //   ApiService.setHeader();
    //   /*ApiService.get("user")
    //     .then(({ data }) => {
    //       context.commit(SET_AUTH, data.user);
    //     })
    //     .catch(({ response }) => {
    //       context.commit(SET_ERROR, response.data.errors);
    //     });*/
    // } else {
    //   context.commit(PURGE_AUTH);
    // }
  },
  [UPDATE_USER](context: ActionContext<State, State>, payload: any) {
    const { email, username, image, bio } = payload;
  },
};

export default actions;
