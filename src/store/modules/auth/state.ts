import JwtService from '../../../services/jwt';

export type State = {
  errors: any | undefined;
  user: User;
  isAuthenticated: boolean;
  isSuccessRegistration: boolean;
};

console.log('JwtService.getToken()test');
console.log(JwtService.getToken() !== undefined);

const state: State = {
  errors: null,
  user: { id: '', email: '', name: '', token: JwtService.getToken() || '' },
  isAuthenticated: JwtService.getToken() !== undefined,
  isSuccessRegistration: false,
};

export default state;
