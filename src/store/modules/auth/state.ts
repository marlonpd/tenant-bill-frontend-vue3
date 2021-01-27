export type State = {
  errors: any | undefined;
  user: User;
  isAuthenticated: boolean;
  isSuccessRegistration: boolean;
};

const state: State = {
  errors: null,
  user: { id: '', email: '', name: '' },
  isAuthenticated: false,
  isSuccessRegistration: false,
};

export default state;
