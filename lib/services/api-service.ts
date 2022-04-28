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
const errorHandler = (err: AxiosError<IResponse>): IResponse =>{
  const msg = err.response?.data.msg ?? 'unknown error';
  const code = err.response?.status ?? -1;

  if (!err.response) {
    console.error('%c [ err ]-149', 'font-size:13px; background:pink; color:#bf2c9f;', err);
  }

  return { msg, code };
}

let header ={} ;
if (typeof window !== 'undefined') {
  header = {headers: {
    Authorization: `Bearer  ${localStorage.getItem('token')}`
  }}
}


const req = {
	get: (url: string,body:{}) => instance.get(url,body).then(responseBody),
	post: (url: string, body: {}, header:{}) => instance.post(url, body,header).then(responseBody).catch(),
	put: (url: string, body: {}, header:{}) => instance.put(url, body,header).then(responseBody),
	delete: (url: string,header:{}) => instance.delete(url,header).then(responseBody),
};


export const apiService = {
  login: (params:{}) =>req.post('login',params,{}),

	logout: () => req.post('logout', {}, header),
  
  getStudents: (params:{}) => req.get('students',{...header,params}),

  addStudent: (params:{}) => req.post('students',params,header) ,

  editStudent: (params:{}) => req.put('students',params,header) ,

  deleteStudent : (id:number) => req.delete(`students/${id}`,header)
  
  };