import React, {Component} from "react";
import './App.css';
import TOC from "./components/TOC";
import Subject from "./components/Subject";
import Control from "./components/Control";
import CreateContent from "./components/CreateContent";
import ReadContent from "./components/ReadContent";
import UpdateContent from "./components/UpdateContent";

class App extends Component{
    constructor(props) {
        super(props);
        this.max_content_id = 3;
        this.state = {
            mode : "create"
            , selected_content_id : 0
            , subject:{title:"WEB", sub:"world wide web!"}
            , welcome:{title:"Welcome", desc:"Welcome React!"}
            , contents:[
                {id:1, title:"HTML" , desc:"HTML is HyperText MarkUp Language."}
                , {id:2, title:"CSS" , desc:"CSS is for Design"}
                , {id:3, title:"JS" , desc:"JS is for interactive"}
            ], control:[
                {id:1, dmlTitle:"Create", url:"/create", mode:"create"}
                , {id:2, dmlTitle:"Update", url:"/update", mode:"update"}
                , {id:3, dmlTitle:"Delete", mode:"delete"}
            ]
        }
    }

    getSelectedContent(){
        let i = 0;
        while (i < this.state.contents.length) {
            let data = this.state.contents[i];
            if (data.id === this.state.selected_content_id) {
                return data;
            }
            i = i + 1;
        }
    }

    getContent(){
        let _title, _desc, _article = null;
        if (this.state.mode === "welcome"){
            _title = this.state.welcome.title;
            _desc = this.state.welcome.desc;
            _article = <ReadContent title={_title} desc={_desc}></ReadContent>
        } else if(this.state.mode === "read") {
            let resContent = this.getSelectedContent();
            _article = <ReadContent title={resContent.title} desc={resContent.desc}></ReadContent>
        } else if (this.state.mode === "create"){
            _article = <CreateContent onSubmit={function (_title, _desc){
                console.log(_title, _desc);
                this.max_content_id = this.max_content_id + 1;
                // 1. this.state.contents.push({id:this.max_content_id, artTitle:_title, artSub:_desc});
                /* 2. 배열을 바꾸고 싶은 경우는 아래와 같이
                let newContents = Array.from(this.state.contents);
                newContents.push({id:this.max_content_id, artTitle:_title, artSub:_desc});*/
                /* 3. 객체를 바꾸고 싶은 경우는 Object.assign({}, obj)*/
                // immutable 은 성능에 대한 이슈를 컨트롤 할 때에 활용하면 좋다.
                let _contents = Array.from(this.state.contents);
                _contents.push({id:this.max_content_id, title:_title, desc:_desc});
                //_contents = this.state.contents.concat({id:this.max_content_id, title:_title, desc:_desc});
                /**
                 * concat을 활용해야 원본이 아닌 복제본으로 활용이 가능하기에 concat을 써야함
                 */
                this.setState({
                    contents : _contents
                })
            }.bind(this)}></CreateContent>
        } else if (this.state.mode === "update"){
            let resContent = this.getSelectedContent();
            _article = <UpdateContent data={resContent} onSubmit={function (_id, _title, _desc) {
                // 불변한 데이터
                if(this.state.selected_content_id !== 0){
                    let _contents = Array.from(this.state.contents);
                    let contentIdx = 0;
                    while (contentIdx < _contents.length) {
                        if (_contents[contentIdx].id === _id) {
                            _contents[contentIdx] = {id: _id, title: _title, desc: _desc};
                            break;
                        }
                        contentIdx = contentIdx + 1;
                    }
                    this.setState({
                        contents: _contents
                    })
                }
            }.bind(this)}></UpdateContent>
        }

        return _article;
    }
    render() {
        console.log("App Render");

        return (
            <div className="App">
                <Subject title={this.state.subject.title}
                         sub={this.state.subject.sub}
                         onChangePage={function (){
                             this.setState({mode:"welcome"})
                         }.bind(this)}>
                </Subject>
                {/*20240529*/}
                    {/*<header>
                        <h1><a href="/" onClick={function (e){
                            e.preventDefault();
                            this.setState(this.state.mode==="welcome" ? {mode:"read"} : {mode:"welcome"});
                        }.bind(this)}>{this.state.subject.title}</a></h1>
                        {this.state.subject.sub}
                    </header>*/}
                {/*20240529*/}
                <Control data={this.state.control} selectId={this.state.selected_content_id} onChangeMode={function (_mode, _selectId){
                    if(_mode === "delete" && _selectId !== 0){
                        if(window.confirm("정말로 삭제???")){
                            let _contents = Array.from(this.state.contents);
                            let i = 0;
                            while (i < _contents.length){
                                if(_contents[i].id === this.state.selected_content_id){
                                    _contents.splice(i, 1);
                                    break;
                                }
                                i = i + 1;
                            }
                            this.setState({
                                mode: "welcome"
                                , contents: _contents
                                , selected_content_id: 0
                            });
                        }
                    }else {
                        this.setState({
                            mode: _mode
                        });
                    }
                }.bind(this)}></Control>
                <TOC data={this.state.contents} onChangePage={function (id){
                    this.setState({
                        mode:"read",
                        selected_content_id : Number(id)
                    });
                }.bind(this)}></TOC>
                {this.getContent()}
            </div>
        );
    }
}

export default App;
