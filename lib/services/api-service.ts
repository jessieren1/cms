import axios, { AxiosError, AxiosResponse } from 'axios';

export interface IResponse<T = any> {
  code: number;
  msg: string;
  data?: T;
}
const baseURL = 'http://cms.chtoma.com/api';
const instance = axios.create({
  baseURL,
  withCredentials: true,
  responseType: 'json',
});

const responseBody = (response: AxiosResponse) => response.data;
const responseErr = (err:AxiosError) => err

instance.interceptors.request.use((config) => {
  if (!config.url.includes('login')) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: localStorage.getItem('token') ?  `Bearer  ${localStorage.getItem('token')}` : ''
      },
    };
  }

  return config;
});

const req = {
	get: (url: string,body:{}) => instance.get(url,body).then(responseBody).catch(responseErr),
	post: (url: string, body: {}) => instance.post(url, body).then(responseBody).catch(responseErr),
	put: (url: string, body: {}) => instance.put(url, body).then(responseBody).catch(responseErr),
	delete: (url: string,) => instance.delete(url).then(responseBody).catch(responseErr),
};


export const apiService = {
  login: (params:{}) =>req.post('login',params),

	logout: () => req.post('logout', {}),
  
  getStudents: (params:{}) => req.get('students',{params}),

  getSingleStudent: (id:number) => req.get(`students/${id}`,{}),

  addStudent: (params:{}) => req.post('students',params) ,

  editStudent: (params:{}) => req.put('students',params) ,

  deleteStudent : (id:number) => req.delete(`students/${id}`)
  
  };