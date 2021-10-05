import React, {Component} from 'react';
import CityManager from './CityApi';

const cityManager = new CityManager();

class CityList extends Component {

  constructor(props){
    super(props);
    this.state = {
      cities:[],
    };
    this.handleDelete = this.handleDelete.bind(this);
  };

  componentDidMount() {
    var self = this;
    cityManager.getCities().then(function(result) {
      self.setState({cities: result});
    });
  }

  handleDelete(city) {
    var self = this;
    cityManager.deleteCity(city).then(() => {
      var newArr = self.state.cities.filter(function(obj){
        return obj.id !== city.id;
      });
      self.setState({authors: newArr})
    });
  }

  render() {
    var self = this
    return (
      <div className="container">
      <div className="cities--list">
        <table className="table">
          <thead key="thead">
          <tr>
            <th>#</th>
            <th>Город</th>
            <th>Действия</th>
            <th><a className="btn btn-sm btn-outline-dark delete" href="/cities/manage/">Создать город</a></th>
          </tr>
          </thead>
          <tbody>
            {this.state.cities.map(function(c){
              return (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>
                    <a href={"/cities/manage/" + c.id} className="btn btn-sm btn-outline-light delete">Изменить</a>
                    <button onClick={()=> self.handleDelete(c)} className="btn btn-sm btn-outline-light delete">Удалить</button>
                  </td>
                </tr>
              )
            }
            )}
          </tbody>
        </table>
      </div>
      </div>
    );
  }
}
export default CityList;
