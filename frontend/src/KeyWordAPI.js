import axios from 'axios'
const API_URL = 'http://localhost:8000/api/v1/lib/key_word/';

export default class KeyWordManager {

  getKeyWords(){
    return axios.get(API_URL).then(response => response.data);
  }
  getKeyWord(key_word){
    const url = API_URL + key_word + '/';
    return axios.get(url).then(response => response.data);
  }
  createKeyWord(key_word){
    return axios.post(API_URL,key_word)
  }
  updateKeyWord(key_word){
    const url = API_URL + key_word.pk +'/';
    return axios.patch(url,key_word)
  }
  deleteKeyWord(key_word){
    const url = API_URL + key_word + '/';
    return axios.delete(url)
  }
}
