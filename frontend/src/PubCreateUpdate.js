import React, {Component} from 'react';
import PubManager from './PubApi';

const pubManager = new PubManager();

class PubCreateUpdate extends Component {
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
      pubManager.getPub(params.pk).then((c) => {
        this.setState({
          name:c.name,
        })
      })
    }
  }

  handleChange(e){
    this.setState({
        name:e.target.value,
      })
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

  handleCreate(){
    pubManager.createPub({
      "name": this.state.name,
    }).then((result)=>{
        alert("Издательство создано!");
      }).catch(()=>{
        alert("Ошибка! Проверь форму!");
      });
  }

  handleUpdate(pk){
    pubManager.updatePub({
      "pk": pk,
      "name": this.state.name,
    }).then((result)=>{
        alert("Издательство отредактировано!");
      }).catch(()=>{
        alert("Ошибка! Проверь форму!");
      });
  }

  render() {
    return (
      <div className="container">
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>Издательство</label>
          <input onChange={this.handleChange} id="name" className="form-control" type="text" value={this.state.name}/>
          <input className="btn btn-primary" type="submit" value="Сохранить"/>
        </div>
      </form>
      </div>
    );
  }
}
export default PubCreateUpdate;
