import React, {Component} from "react";

class Control extends Component{
    render() {
        let lists = [];
        let data = this.props.data;
        let selectId = this.props.selectId;
        console.log("selectId : ", selectId);
        for(let i = 0; i<data.length-1; i++){
            lists.push(<li key={data[i].id}>
                <a href={data[i].url}
                   data-id = {data[i].id}
                   onClick={function (e){
                       e.preventDefault();
                       console.log(e.target.dataset.id);
                       this.props.onChangeMode(data[i].mode);
                   }.bind(this)}>{data[i].dmlTitle}</a>
            </li>);
        }
        //delete만 맨 마지막에 push
        let lastIdx = data.length-1;
        lists.push(<li key={data[lastIdx].id}>
            <input type="button"
                   data-id={data[lastIdx].id}
                   value={data[lastIdx].dmlTitle}
                   onClick={function (e){
                       e.preventDefault();
                       console.log(e.target.dataset.id);
                       this.props.onChangeMode(data[lastIdx].mode, selectId);
                   }.bind(this)}></input>
        </li>);

        return (
            <nav>
                <ul>
                    {lists}
                </ul>
            </nav>
        )
    }
}

export default Control;
