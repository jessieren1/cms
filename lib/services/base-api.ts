import { message } from 'antd';
import axios, { AxiosError, AxiosResponse } from 'axios';
import Cryptojs from 'crypto-js';

const baseURL = 'http://cms.chtoma.com/api';
const instance = axios.create({
  baseURL,
  withCredentials: true,
  responseType: 'json',
});

instance.interceptors.request.use((config) => {
  if (config.url != '/login') {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: localStorage.getItem('token')
          ? `Bearer  ${localStorage.getItem('token')}`
          : '',
      },
    };
  }
  return config;
});

const errorHandler = (err: any) => {
  console.log('attach error');
  if (err.isAxiosError) {
    if (err.response) {
      console.error('[API Error]:', err.response.data);
      return { msg: err.response.data.msg, code: err.response.data.code };
    } else {
      console.error('[Network Error]: NO Response', err);
    }
  } else {
    console.error('[Non-Http Error]:', err);
  }
};

export const req = {
  get: (url: string, body: {}) => instance.get(url, body).then(res=>res.data).catch(err=>errorHandler(err)),
  post: (url: string, body: {}) => instance.post(url, body).then(res=>res.data).catch(err=>errorHandler(err)),
  put: (url: string, body: {}) => instance.put(url, body).then(res=>res.data).catch(err=>errorHandler(err)),
  delete: (url: string) => instance.delete(url).then(res=>res.data).catch(err=>errorHandler(err)),
};



export const apiService = {
  //  login: (params:{}) =>req.post('login',params).then().catch(),

  logout: () => req.post('logout', {}),

  getStudents: (params: {}) => req.get('students', { params }),

  getSingleStudent: (id: number) => req.get(`students/${id}`, {}),

  addStudent: (params: {}) => req.post('students', params),

  editStudent: (params: {}) => req.put('students', params),

  deleteStudent: (id: number) => req.delete(`students/${id}`),
};
