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

  export const getCourseType = () => {
    return axiosReq
      .get('courses/type', {})
      .then((res) => dealResponse(res))
  };
  
  export const getCourseCode = () => {
    return axiosReq
      .get('courses/code', {})
      .then((res) => dealResponse(res))
  };

  
  export const getCourseSchedule = (params: any) => {
    return axiosReq
      .get('courses/schedule', {params})
      .then((res) => dealResponse(res))
  };

  export const addCourse = (params: any) => {
    return axiosReq
      .post('courses', params )
      .then((res) => dealResponse(res))
  };

  export const updateCourse = (params: any) => {
    return axiosReq
      .put('courses', params )
      .then((res) => dealResponse(res))
  };

  export const updateCourseSchedule = (params: any) => {
    return axiosReq
      .put('courses/schedule', params )
      .then((res) => dealResponse(res))
  };
