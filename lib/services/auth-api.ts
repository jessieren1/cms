import { req } from './base-api';
import Cryptojs from 'crypto-js';
import { message } from 'antd';

const dealResponse = (res: any, isShowSuccess = true) => {
  console.log('attach res');
  return new Promise((resolve,reject) => {
    if (res.code >= 400 && res.code < 600) {
      message.error(res.msg);
      return reject('error')
    } else {
      isShowSuccess && message.success(res.msg);
      return resolve(res);
    }
    
  });
};



export const login = (values: any) => {
  const params = {
    email: values.email,
    password: Cryptojs.AES.encrypt(values.password, 'cms').toString(),
    role: values.role.toLowerCase(),
  };
  return req
    .post('/login', params)
    .then((res) => dealResponse(res))
};
