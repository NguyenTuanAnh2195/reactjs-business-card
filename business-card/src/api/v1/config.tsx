import { BASE_URL, ACTUAL_URL } from "../../utils/constants";
import axios, { AxiosRequestConfig } from "axios";

const DEFAULT_API_CONFIG: AxiosRequestConfig = {
  baseURL: ACTUAL_URL,
  timeout: 30000,
};

export default class APIV1 {
  client;
  constructor(config: Object) {
    this.client = axios.create({
      ...DEFAULT_API_CONFIG,
      ...config
    })
  }
}
