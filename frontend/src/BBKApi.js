import axios from 'axios'
const API_URL = 'http://localhost:8000/api/v1/lib/bbk/';

export default class BBKManager {

  getBBKs(){
    return axios.get(API_URL).then(response => response.data);
  }
  getBBK(bbk){
    const url = API_URL + bbk + '/';
    return axios.get(url).then(response => response.data);
  }
  createBBK(bbk){
    return axios.post(API_URL,bbk)
  }
  updateBBK(bbk){
    const url = API_URL + bbk.pk +'/';
    return axios.patch(url,bbk)
  }
  deleteBBK(bbk){
    const url = API_URL + bbk + '/';
    return axios.delete(url)
  }
}
