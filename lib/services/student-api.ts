import { dealResponse } from "./base-api";
import { AxiosReq } from "./base-api"; 

export const getStudents = (params: any) => {
    return AxiosReq
      .get('students', { params })
      .then((res) => dealResponse(res))
  };
  
  export const getSingleStudent = (id: number) => {
    return AxiosReq
      .get(`students/${id}`, {})
      .then((res) => dealResponse(res))
  };
  
  export const addStudent = (params:any) => {
    return AxiosReq
      .post('students', params)
      .then((res) => dealResponse(res))
  };
  
  export const editStudent = (params:any) => {
    return AxiosReq
      .put('students', params)
      .then((res) => dealResponse(res))
  };
  
  export const deleteStudent = (id:number) => {
    return AxiosReq
      .delete(`students/${id}`)
      .then((res) => dealResponse(res))
  };