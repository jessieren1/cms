import { dealResponse } from "./base-api";
import { axiosReq } from "./base-api"; 



  export const getCourses = (params: any) => {
    return axiosReq
      .get('courses', { params })
      .then((res) => dealResponse(res))
  };
  
  export const getSingleCourse = (params: any) => {
    return axiosReq
      .get('courses/detail', { params })
      .then((res) => dealResponse(res))
  };
  