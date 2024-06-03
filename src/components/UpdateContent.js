import React, {Component} from "react";

class UpdateContent extends Component{

    constructor(props) {
        super(props);
        console.log(">>>>>>Update constructor : ", this.props.data);
        if(this.props.data !== undefined) {
            this.state = {
                id: this.props.data.id
                , title: this.props.data.title
                , desc: this.props.data.desc
            }
        }else{
            this.state = {}
        }
        this.inputFormHandler = this.inputFormHandler.bind(this);
    }

    inputFormHandler(e){
        this.setState(
            // 공통으로 사용할 수 있게 하려면 대괄호를 써야함
            {[e.target.name] : e.target.value}
        );
    }
    render() {
        console.log(">>>>>>Update Content");
        console.log("this.state : ", this.state);
        if(Object.keys(this.state).length === 0){
            alert("TOC 선택");
            return
        }else {
            return (
                <article>
                    <h2>Update</h2>
                    <form action="/update_process" method="post"
                          onSubmit={function (e) {
                              e.preventDefault();
                              this.props.onSubmit(
                                  this.state.id
                                  , this.state.title
                                  , this.state.desc
                              );
                          }.bind(this)}
                    >
                        <input type="hidden" name="id" value={this.state.id}/>
                        <p>
                            <input type="text" name="title"
                                   placeholder="title"
                                   value={this.state.title}
                                   onChange={this.inputFormHandler}>
                            </input>
                        </p>
                        <p><textarea name="desc"
                                     placeholder="content"
                                     value={this.state.desc}
                                     onChange={this.inputFormHandler}>
                        </textarea></p>
                        <p><input type="submit"></input></p>
                    </form>
                </article>
            )
        }
    }
}

export default UpdateContent;
