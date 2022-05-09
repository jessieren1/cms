import { axiosReq } from './base-api';
import Cryptojs from 'crypto-js';
import { dealResponse } from './base-api';



export const login = (values: any) => {
  const params = {
    email: values.email,
    password: Cryptojs.AES.encrypt(values.password, 'cms').toString(),
    role: values.role.toLowerCase(),
  };
  return axiosReq
    .post('login', params)
    .then((res) => dealResponse(res))
};

export const logout = () => {
  return axiosReq
    .post('logout', {})
    .then((res) => dealResponse(res))
};

