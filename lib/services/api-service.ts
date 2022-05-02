import { message } from 'antd';
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



let header ={} ;
if (typeof window !== 'undefined') {
  header = {headers: {
    Authorization: `Bearer  ${localStorage.getItem('token')}`
  }}
}


const req = {
	get: (url: string,body:{}) => instance.get(url,body).then(responseBody).catch(responseErr),
	post: (url: string, body: {}, header:{}) => instance.post(url, body,header).then(responseBody).catch(responseErr),
	put: (url: string, body: {}, header:{}) => instance.put(url, body,header).then(responseBody).catch(responseErr),
	delete: (url: string,header:{}) => instance.delete(url,header).then(responseBody).catch(responseErr),
};


export const apiService = {
  login: (params:{}) =>req.post('login',params,{}),

	logout: () => req.post('logout', {}, header),
  
  getStudents: (params:{}) => req.get('students',{...header,params}),

  addStudent: (params:{}) => req.post('students',params,header) ,

  editStudent: (params:{}) => req.put('students',params,header) ,

  deleteStudent : (id:number) => req.delete(`students/${id}`,header)
  
  };