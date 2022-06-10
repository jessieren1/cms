import { MessagesRequest } from "model/message";
import { dealResponse } from "./base-api";
import { axiosReq } from "./base-api"; 


export function getMessages(params: MessagesRequest) {
  return axiosReq
      .get('message', params)
      .then((res) => dealResponse(res))
  };