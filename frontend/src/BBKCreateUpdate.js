import React, { Component } from 'react';
import BBKManager from './BBKApi';

const bbkManager = new BBKManager();

class BBKCreateUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id:null,
        code:'',
        description:'',
      }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    const {match: {params}} = this.props;
    if(params && params.pk) {
      bbkManager.getBBK(params.pk).then((a)=>{
        this.setState({
          code:a.code,
          description:a.description
        })
      })
    }
  }

  handleUpdate(pk){
    bbkManager.updateBBK({
      "pk": pk,
      "code": this.state.code,
      "description": this.state.description,
    }).then((result)=>{
        alert("Код отредактирован!");
      }).catch(()=>{
        alert("Ошибка! Проверь форму!");
      });
  }

  handleCreate(){
    bbkManager.createBBK({
      "code": this.state.code,
      "description": this.state.description,
    }).then((result)=>{
        alert("Код создан!");
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
          <label>Код</label>
          <input onChange={this.handleChange} id="code" className="form-control" type="text" value={this.state.code}/>

          <label>Описание</label>
          <input className="form-control" id="description" type="text" value={this.state.description} onChange={this.handleChange}/>

          <input className="btn btn-primary" type="submit" value="Сохранить"/>

        </div>
      </form>
      </div>
    );
  }

}
export default BBKCreateUpdate;
