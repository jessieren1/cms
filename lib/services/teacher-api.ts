import { dealResponse } from "./base-api";
import { axiosReq } from "./base-api"; 


export const getTeachers = (params: any) => {
    return axiosReq
      .get('teachers', { params })
      .then((res) => dealResponse(res))
  };