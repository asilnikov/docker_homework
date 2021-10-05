import React, { Component, useState } from 'react';

import BookManager from './BookApi';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import BBKManager from './BBKApi';
import CityManager from './CitiesApi';
import PubManager from './PubApi';
import KeyWordManager from './KeyWordAPI';
import AuthorManager from './AuthorApi'

import Select, { components } from "react-select";
import Popup from "reactjs-popup";


const bookManager = new BookManager();
const bbkManager = new BBKManager();
const cityManager = new CityManager();
const pubManager = new PubManager();
const key_wordManager = new KeyWordManager();
const authorManager = new AuthorManager();

const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
        const [value, setValue] = useState('');

    return (
        <div
            ref={ref}
            style={style}
            className={className}
            aria-labelledby={labeledBy}
        >
        <input
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
        />
        <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
                (child) =>
                !value || child.props.children.toLowerCase().includes(value.toLowerCase()),
            )}
        </ul>
        </div>
        );
    },
);

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <button
        className="btn btn-sm btn-outline-light delete"
        ref={ref}
        onClick={(e) => {
        e.preventDefault();
        onClick(e);
        }}
    >
    {children}
    &#x25bc;
    </button>
));

class BookCreateUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentBook:{
                id:null,
                name:'',
                author:[],
                description:'',
                author_sign:'',
                issue_year:'',
                issue_city: '',
                publishing_house: '',
                bbk:[],
                key_words:[],
                place: '',
                pages: '',
                series: '',
                additional_data: '',
            },
            cities:[],
            publishing_houses:[],
            issue_city: {
                id:null,
                name:''
            },
            publishing_house: {
                id:null,
                name:''
            },
            new_city: {
                id:'',
                name:'',
            },
            bbk:[],
            key_words: [],
            authors: [],
            new_author: {
                id: '',
                fname: '',
                lname: '',
                author_code: '',
                addition: ''
            },
            new_BBK:{
                id: '',
                code:'',
                description:''
            },
            new_pub:{
                id:'',
                name:'',
            },
            new_key_word:{
                id:'',
                name:'',
            },
            redirect: false
        };
    // добавить для получения списков данных
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCitiesDropdown = this.handleCitiesDropdown.bind(this);
    this.handleHouseDropdown = this.handleHouseDropdown.bind(this);
    this.handleKeyWordDropdown = this.handleKeyWordDropdown.bind(this);
    this.handleBookKeyWordDropDown = this.handleBookKeyWordDropDown.bind(this);
    this.handleBookBBKDropDown = this.handleBookBBKDropDown.bind(this);
    this.handleBookAuthorsDropDown = this.handleBookAuthorsDropDown.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleAuthorCreate = this.handleAuthorCreate.bind(this);
    this.handleBBKChange = this.handleBBKChange.bind(this);
    this.handleBBKCreate = this.handleBBKCreate.bind(this);
    this.handlePubChange = this.handlePubChange.bind(this);
    this.handlePubCreate = this.handlePubCreate.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleCityCreate = this.handleCityCreate.bind(this);
    this.handleKeyWordChange = this.handleKeyWordChange.bind(this);
    this.handleKeyWordCreate = this.handleKeyWordCreate.bind(this);
    this.handleBookCityDropDown = this.handleBookCityDropDown.bind(this);
    this.handleBookPubDropDown = this.handleBookPubDropDown.bind(this);

    }

    componentDidMount(){
        cityManager.getCities().then(function(result) {
            self.setState({cities:result})});
        pubManager.getPubs().then(function(result) {
            self.setState({publishing_houses:result})});
        bbkManager.getBBKs().then(function(result) {
            self.setState({bbk:result})});
        key_wordManager.getKeyWords().then(function(result){
            self.setState({key_words:result})});
        authorManager.getAuthors().then(function(result){
            self.setState({authors:result})});
        const {match: {params}} = this.props;
        let self = this;
        if(params && params.pk) {
            bookManager.getBook(params.pk).then((a)=>{
                this.setState({
                    currentBook:{
                        name:a.name,
                        author:a.author,
                        description:a.description,
                        author_sign: a.author_sign,
                        issue_year: a.issue_year,
                        issue_city: a.issue_city,
                        publishing_house: a.publishing_house,
                        bbk: a.bbk,
                        key_words: a.keywords,
                        place: a.place,
                        pages: a.pages,
                        additional_data: a.additional_data,
                        series: a.series,
                    },
                    issue_city: a.issue_city,
                    publishing_house: a.publishing_house,
                })
            });
        }
    }



    handleUpdate(pk){
        bookManager.updateBook({
            "pk": pk,
            "name": this.state.currentBook.name,
            "author": this.state.currentBook.author,
            "description": this.state.currentBook.description,
            "author_sign": this.state.currentBook.author_sign,
            "issue_year": this.state.currentBook.issue_year,
            "bbk": this.state.currentBook.bbk,
            "keywords": this.state.currentBook.key_words,
            "issue_city": this.state.issue_city,
            "publishing_house": this.state.publishing_house,
            "place": this.state.currentBook.place,
            "additional_data": this.state.currentBook.additional_data,
            "series": this.state.currentBook.series,
        }).then((result)=>{
            alert("Книга отредактирована!");
        }).catch(()=>{
            alert("Ошибка! Проверь форму!");
        });
    }

    handleCreate(){
        bookManager.createBook({
            "name": this.state.currentBook.name,
            "author": this.state.currentBook.author,
            "description": this.state.currentBook.description,
            "author_sign": this.state.currentBook.author_sign,
            "issue_year": this.state.currentBook.issue_year,
            "bbk": this.state.currentBook.bbk,
            "keywords": this.state.currentBook.key_words,
            "issue_city": this.state.issue_city,
            "publishing_house": this.state.publishing_house,
            "place": this.state.currentBook.place,
            "pages": this.state.currentBook.pages,
            "additional_data": this.state.currentBook.additional_data,
            "series": this.state.currentBook.series,
        }).then((result)=>{
            alert("Книга создана!");
        }).catch((err)=>{
            alert(err.message);
        });
    }

    handleSubmit(e){
        const { match: { params } } = this.props;
        if (params && params.pk){
            this.handleUpdate(params.pk);
        } else {
            this.handleCreate(params);
        }
        e.preventDefault();
    }

    handleChange(e){
        this.setState({
            currentBook:{...this.state.currentBook,
                [e.target.id]:e.target.value
            }
        })
    }

    handleAuthorChange(e){
        this.setState({
            new_author:{...this.state.new_author,
                [e.target.id]:e.target.value
            }
        })
    }

    handleAuthorCreate(e) {
        console.log(this.state.authors);
        authorManager.createAuthor({
            "fname": this.state.new_author.fname,
            "lname": this.state.new_author.lname,
            "author_code": this.state.new_author.author_code,
            "addition": this.state.new_author.addition
        }).then(()=>authorManager.getAuthors().then(res=>{
        this.setState({authors: res});
        alert('Автор создан')
    }))};


    handleBBKChange(e){
        this.setState({
            new_BBK:{...this.state.new_BBK,
                [e.target.id]:e.target.value
            }
        })
    }

    handleBBKCreate(e) {
        bbkManager.createBBK({
            "code": this.state.new_BBK.code,
            "description": this.state.new_BBK.description,
        }).then(()=>{bbkManager.getBBK().then(res=> {
            this.setState({bbk: res});
            alert("Код создан")
        })});
    }

    handlePubChange(e){
        this.setState({
            new_pub:{...this.state.new_pub,
                [e.target.id]:e.target.value
            }
        })
    }

    handlePubCreate(e) {
        pubManager.createPub({
            "name": this.state.new_pub.name,
        }).then(()=>{pubManager.getPubs().then(res=>{
            this.setState({publishing_houses: res});
            alert("Издательство создано")
        })});

    }

    handleCityChange(e){
        this.setState({
            new_city:{...this.state.new_city,
                [e.target.id]:e.target.value
            }
        })
    }

    handleCityCreate(e) {
        console.log(this.state.cities);
        cityManager.createCity({
            "name": this.state.new_city.name,
        }).then(()=>{cityManager.getCities().then(res=> {
            this.setState({cities: res});
            alert("Город создан")
        })});
    }

    handleKeyWordChange(e){
        this.setState({
            new_key_word:{...this.state.new_key_word,
                [e.target.id]:e.target.value
            }
        })
    }

    handleKeyWordCreate(e) {
        console.log(this.state.key_words);
        key_wordManager.createKeyWord({
            "name": this.state.new_key_word.name,
        }).then(()=>{key_wordManager.getKeyWords().then(res=> {
            this.setState({key_words: res});
            alert("Слово создано")
        })});
    }


    handleCitiesDropdown(e){
        this.setState({
            issue_city:{
                name:e.target.innerText,
                id: e.target.id
            }
        });
    }

    handleHouseDropdown(e){
        this.setState({
            publishing_house:{
                name:e.target.innerText,
                id: e.target.id
            }
        });
    }

    handleKeyWordDropdown(e){
        this.setState({
            key_words:{
                name:e.target.innerText,
                id: e.target.id
            }
        });
    }

    handleBookKeyWordDropDown (key_wor)  {
        let keys;
        if (key_wor !== null) {
            keys = key_wor;
        } else {
            keys = []
        };
        this.setState({
            currentBook:{...this.state.currentBook,
                        key_words: keys
                    }
        });
    }

    handleBookPubDropDown (key_wor)  {
        this.setState({
            publishing_house:key_wor
        });
        console.log(this.state.publishing_house);
    }

    handleBookCityDropDown (key_wor)  {
        this.setState({
            issue_city: key_wor}
        );
    }

    handleBookBBKDropDown (bbks)  {
        let bks;
        if (bbks !== null) {
            bks = bbks;
        } else {
            bks = []
        };
        this.setState({
            currentBook:{...this.state.currentBook,
                bbk: bks
            }
        });
    }

    handleBookAuthorsDropDown (book_author) {
        let just_authors;
        if (book_author !== null) {
            just_authors = book_author;
        } else {
            just_authors = []
        };
        this.setState({
            currentBook:{...this.state.currentBook,
                author: just_authors
            }
        });
        if (this.state.currentBook.author_sign === []) {
            this.setState({
                currentBook:{...this.state.currentBook,
                            author_sign: just_authors[0].author_code
                        }
        })}

    }

    render() {
        var self = this;
        return (

        <div className="container">
            <form id="bookForm" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <div className="row justify-content-end">
                        <div className="col-2">
                            <label>ББК:</label>
                        </div>
                        <div className="col-7">
                            <Select
                                closeMenuOnSelect={false}
                                options={this.state.bbk}
                                value={this.state.currentBook.bbk}
                                getOptionLabel={ x => (x.code+' '+x.description)}
                                getOptionValue={ x => x.id}
                                onChange={this.handleBookBBKDropDown}
                                isMulti
                                isSearchable
                                placeholder="Выберите ББК"
                            />
                        </div>
                        <div className="col-3">
                            <Popup trigger={<input className="btn btn-sm btn-outline-light delete" value="Создать ББК"/>} modal>
                                {close => (
                                    <div className="form-group">

                                        <label>Код</label>
                                            <input onChange={this.handleBBKChange} id="code" className="form-control" type="text" />

                                        <label>Описание</label>
                                        <input className="form-control" id="description" type="text"  onChange={this.handleBBKChange}/>

                                        <div className="row justify-content-center">
                                            <div className ="col-4">
                                                <input className="btn btn-primary"
                                                    type="submit"
                                                    form="BBKForm"
                                                    value="Сохранить"
                                                    onClick={this.handleBBKCreate}
                                                />
                                            </div>
                                            <div className ="col-4">
                                                <input className="btn btn-primary" value="Закрыть" type="submit" onClick={()=> {close();}}/>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Popup>
                        </div>

                    </div>
                    <div className="row justify-content-mid">
                        <div className="col-2"><label>Авторский знак</label></div>
                        <div className="col-7"><input className="form-control" id="author_sign" type="text" value={this.state.currentBook.author_sign} onChange={this.handleChange}/></div>
                    </div>


                    <div className="row justify-content-end">
                        <div className="col-2">
                            <label>Автор/Авторы:</label>
                        </div>
                        <div className="col-7">

                            <Select
                                closeMenuOnSelect={false}
                                options={this.state.authors}
                                value={this.state.currentBook.author}
                                getOptionLabel={ x => (x.lname+' '+x.fname)}
                                getOptionValue={ x => x.id}
                                onChange={this.handleBookAuthorsDropDown}
                                onClick={this.getAuthors}
                                isMulti
                                isSearchable
                                placeholder="Выберите авторов"
                            />
                        </div>
                        <div className="col-3">
                            <Popup trigger={<input className="btn btn-sm btn-outline-light delete" value="Создать автора"/>} modal>
                                {close => (
                                    <div className="form-group">

                                        <label>Фамилия</label>
                                            <input onChange={this.handleAuthorChange} id="lname" className="form-control" type="text" />

                                        <label>Имя</label>
                                        <input className="form-control" id="fname" type="text"  onChange={this.handleAuthorChange}/>

                                        <label>Авторский знак</label>
                                        <input className="form-control" id="author_code" type="text"  onChange={this.handleAuthorChange}/>

                                        <label>Справочная информация</label>
                                        <textarea className="form-control" id="addition" rows="4" type="text"  onChange={this.handleAuthorChange}/>

                                        <div className="row justify-content-center">
                                            <div className ="col-4">
                                                <input className="btn btn-primary"
                                                    type="submit"
                                                    form="authorForm"
                                                    value="Сохранить"
                                                    onClick={this.handleAuthorCreate}
                                                />
                                            </div>
                                            <div className ="col-4">
                                                <input className="btn btn-primary" value="Закрыть" type="submit" onClick={()=> {close();}}/>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Popup>
                        </div>
                    </div>

                    <div className="row justify-content-mid">
                        <div className="col-2"><label>Название</label></div>
                        <div className="col-7"><input onChange={this.handleChange} id="name" className="form-control" type="text" value={this.state.currentBook.name}/></div>
                    </div>

                    <div className="row justify-content-mid">
                        <div className="col-2"><label>Дополнительные сведения</label></div>
                        <div className="col-7"><input onChange={this.handleChange} id="additional_data" className="form-control" type="text" value={this.state.currentBook.additional_data}/></div>
                    </div>

                    <div className="row justify-content-end">
                        <div className="col-2">
                            <label>Город издательства: </label>
                        </div>
                        <div className="col-7">
                            <Select
                                options={this.state.cities}
                                value={this.state.issue_city}
                                getOptionLabel={ x => x.name}
                                getOptionValue={ x => x.id}
                                onChange={this.handleBookCityDropDown}
                                isSearchable
                                placeholder="Выберите город"
                            />
                        </div>
                        <div className="col-3">
                            <Popup trigger={<input className="btn btn-sm btn-outline-light delete" value="Создать город"/>} modal>
                                {close => (
                                    <div className="form-group">

                                        <label>Город издательства</label>
                                            <input onChange={this.handleCityChange} id="name" className="form-control" type="text" />

                                        <div className="row justify-content-center">
                                            <div className ="col-4">
                                                <input className="btn btn-primary"
                                                    type="submit"
                                                    form="CityForm"
                                                    value="Сохранить"
                                                    onClick={this.handleCityCreate}
                                                />
                                            </div>
                                            <div className ="col-4">
                                                <input className="btn btn-primary" value="Закрыть" type="submit" onClick={()=> {close();}}/>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Popup>
                        </div>
                    </div>

                    <div className="row justify-content-end">
                        <div className="col-2">
                            <label>Издательство:</label>
                        </div>
                        <div className="col-7">
                            <Select
                                options={this.state.publishing_houses}
                                value={this.state.publishing_house}
                                getOptionLabel={ x => x.name}
                                getOptionValue={ x => x.id}
                                onChange={this.handleBookPubDropDown}
                                isSearchable
                                placeholder="Выберите издательство"
                            />
                        </div>
                        <div className="col-3">
                            <Popup trigger={<input className="btn btn-sm btn-outline-light delete" value="Создать издательство"/>} modal>
                                {close => (
                                    <div className="form-group">

                                        <label>Город издательства</label>
                                            <input onChange={this.handlePubChange} id="name" className="form-control" type="text" />

                                        <div className="row justify-content-center">
                                            <div className ="col-4">
                                                <input className="btn btn-primary"
                                                    type="submit"
                                                    form="PubForm"
                                                    value="Сохранить"
                                                    onClick={this.handlePubCreate}
                                                />
                                            </div>
                                            <div className ="col-4">
                                                <input className="btn btn-primary" value="Закрыть" type="submit" onClick={()=> {close();}}/>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Popup>
                        </div>
                    </div>

                    <div className="row justify-content-mid">
                        <div className="col-2"><label>Год издания</label></div>
                        <div className="col-7"><input className="form-control" id="issue_year" type="text" value={this.state.currentBook.issue_year} onChange={this.handleChange}/></div>
                    </div>

                    <div className="row justify-content-mid">
                        <div className="col-2"><label>Количество страниц</label></div>
                        <div className="col-7"><input className="form-control" id="pages" type="text" value={this.state.currentBook.pages} onChange={this.handleChange}/></div>
                    </div>

                    <div className="row justify-content-mid">
                        <div className="col-2"><label>Серия</label></div>
                        <div className="col-7"><input onChange={this.handleChange} id="series" className="form-control" type="text" value={this.state.currentBook.series}/></div>
                    </div>

                    <div className="row justify-content-mid">
                        <div className="col-2"><label>Аннотация</label></div>
                        <div className="col-7"><textarea className="form-control" id="description" rows="3" style={{fontStyle: 'italic'}} value={this.state.currentBook.description} onChange={this.handleChange}/></div>
                    </div>

                    <div className="row justify-content-mid">
                        <div className="col-2"><label>Расположение</label></div>
                        <div className="col-7"><input className="form-control" id="place" type="text" value={this.state.currentBook.place} onChange={this.handleChange}/></div>
                    </div>

                    <div className="row justify-content-end">
                        <div className="col-2">
                            <label>Ключевые слова:
                            </label>
                        </div>
                        <div className="col-7">
                            <Select
                                closeMenuOnSelect={false}
                                options={this.state.key_words}
                                value={this.state.currentBook.key_words}
                                getOptionLabel={ x => x.name}
                                getOptionValue={ x => x.id}
                                onChange={this.handleBookKeyWordDropDown}
                                isMulti
                                isSearchable
                                placeholder="Выберите ключевые слова"
                            />
                        </div>
                        <div className="col-3">
                            <Popup trigger={<input className="btn btn-sm btn-outline-light delete" value="Создать слово"/>} modal>
                                {close => (
                                    <div className="form-group">

                                        <label>Город издательства</label>
                                            <input onChange={this.handleKeyWordChange} id="name" className="form-control" type="text" />

                                        <div className="row justify-content-center">
                                            <div className ="col-4">
                                                <input className="btn btn-primary"
                                                    type="submit"
                                                    form="KeyWordForm"
                                                    value="Сохранить"
                                                    onClick={this.handleKeyWordCreate}
                                                />
                                            </div>
                                            <div className ="col-4">
                                                <input className="btn btn-primary" value="Закрыть" type="submit" onClick={()=> {close();}}/>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Popup>
                        </div>
                    </div>
                </div>

            <input className="btn btn-primary" form ="bookForm" type="submit" value="Сохранить"/>


        </form>
    </div>
    );
  }

}
export default BookCreateUpdate;


