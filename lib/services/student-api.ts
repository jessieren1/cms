import { dealResponse } from "./base-api";
import { axiosReq } from "./base-api"; 


export const getStudents = (params: any) => {
    return axiosReq
      .get('students', { params })
      .then((res) => dealResponse(res))
  };
  
  export const getSingleStudent = (id: number) => {
    return axiosReq
      .get(`students/${id}`, {})
      .then((res) => dealResponse(res))
  };
  
  export const addStudent = (params:any) => {
    return axiosReq
      .post('students', params)
      .then((res) => dealResponse(res))
  };
  
  export const editStudent = (params:any) => {
    return axiosReq
      .put('students', params)
      .then((res) => dealResponse(res))
  };
  
  export const deleteStudent = (id:number) => {
    return axiosReq
      .delete(`students/${id}`)
      .then((res) => dealResponse(res))
  };