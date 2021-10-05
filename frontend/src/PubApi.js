import axios from 'axios'
const API_URL = 'http://localhost:8000/api/v1/lib/publishing_house/';

export default class PubManager {

  getPubs(){
    return axios.get(API_URL).then(response => response.data);
  }
  getPub(pub){
    const url = API_URL + pub + '/';
    return axios.get(url).then(response => response.data);
  }
  createPub(pub){
    return axios.post(API_URL,pub)
  }
  updatePub(pub){
    const url = API_URL + pub.pk +'/';
    return axios.patch(url,pub)
  }
  deletePub(pub){
    const url = API_URL + pub.id + '/';
    return axios.delete(url)
  }
}
