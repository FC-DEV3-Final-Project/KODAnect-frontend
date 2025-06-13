import axios from "axios";
import type { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "http://koda1.elementsoft.biz:8080/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;

/*
 * 사용 예시:
 * import api from '@/shared/api/axios/axiosInstance';
 *
 * api.get('/recipientLetters')
 *  .then(response => console.log(response.data))
 *  .catch(error => console.error(error));
 */
