import axios, { AxiosResponse } from 'axios';


const baseURL = 'http://cms.chtoma.com/api';
const instance = axios.create({
  baseURL,
  withCredentials: true,
  responseType: 'json',
});

const responseBody = (response: AxiosResponse) => response.data;


let header ={} ;
if (typeof window !== 'undefined') {
  header = {headers: {
    Authorization: `Bearer  ${localStorage.getItem('token')}`
  }}
}


const req = {
	get: (url: string,body:{}) => instance.get(url,body).then(responseBody),
	post: (url: string, body: {}, header:{}) => instance.post(url, body,header).then(responseBody),
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