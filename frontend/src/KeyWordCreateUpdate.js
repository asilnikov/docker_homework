import React, { Component } from 'react';
import KeyWordManager from './KeyWordAPI';

const keyWordManager = new KeyWordManager();

class KeyWordCreateUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id:null,
        name:'',
      }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    const {match: {params}} = this.props;
    if(params && params.pk) {
      keyWordManager.getKeyWord(params.pk).then((a)=>{
        this.setState({
          name: a.name
        })
      })
    }
  }

  handleUpdate(pk){
    keyWordManager.updateKeyWord({
      "pk": pk,
      "name": this.state.name,
    }).then((result)=>{
        alert("Ключевое слово отредактировано!");
      }).catch(()=>{
        alert("Ошибка! Проверь форму!");
      });
  }

  handleCreate(){
    keyWordManager.createKeyWord({
      "name": this.state.name,
    }).then((result)=>{
        alert("Ключевое слово создано!");
      }).catch(()=>{
        alert("Ошибка! Проверь форму!");
      });
  }

  handleSubmit(e){
    const { match: { params } } = this.props;
    if (params && params.pk){
      this.handleUpdate(params.pk);
    }
    else {
      this.handleCreate(params);
    }
    e.preventDefault();
  }

  handleChange(e){
    this.setState({
        [e.target.id]:e.target.value
      })
  }

  render() {
    return (
      <div className="container">
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>Ключевое слово</label>
          <input onChange={this.handleChange} id="name" className="form-control" type="text" value={this.state.name}/>

          <input className="btn btn-primary" type="submit" value="Сохранить"/>

        </div>
      </form>
      </div>
    );
  }

}
export default KeyWordCreateUpdate;
