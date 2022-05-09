import { message } from 'antd';
import axios from 'axios';


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

export const dealResponse = (res: any) => {
  return new Promise((resolve,reject) => {
    if (res.code >= 400 && res.code < 600) {
      message.error(res.msg);
      return reject('error')
    } else {
      return resolve(res);
    }
    
  });
};


export const axiosReq = {
  get: (url: string, body: {}) => 
  instance.get(url, body).
  then(res=>res.data).
  catch(err=>errorHandler(err)),

  post: (url: string, body: {}) => 
  instance.post(url, body).
  then(res=>res.data).
  catch(err=>errorHandler(err)),

  put: (url: string, body: {}) => 
  instance.put(url, body).
  then(res=>res.data).
  catch(err=>errorHandler(err)),

  delete: (url: string) => 
  instance.delete(url).
  then(res=>res.data).
  catch(err=>errorHandler(err)),
};


