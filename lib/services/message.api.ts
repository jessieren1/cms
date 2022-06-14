import { GetMessageRequest, GetMessageStaticsRequest, MarkMessageAsReadRequest } from "model/message";
import { dealResponse } from "./base-api";
import { axiosReq } from "./base-api"; 



  export const getMessages = (params: GetMessageRequest) => {
  return axiosReq
      .get('message', params)
      .then((res) => dealResponse(res))
  };

  export const markMessageAsRead = ( params: MarkMessageAsReadRequest) => {
    return axiosReq
    .put('message', params)
    .then((res) => dealResponse(res)) 
  }

  export const getMessageStatics = ( params: GetMessageStaticsRequest) => {
    return axiosReq
      .get('message/statistics', params)
      .then((res) => dealResponse(res))
  }