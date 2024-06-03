import React, {Component} from "react";

class TOC extends Component{
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        /*console.log(">>>>>>> TOC Render shouldComponentUpdate"
        , nextProps.data, this.props.data
        );*/
        /**
         * shouldComponentUpdate에서 props 데이터 비교 할 수 있고, 랜더링 할지 말지 판단이 가능
         * */
        if(nextProps.data === this.props.data){
            return false;
        }
        return true;

    }

    render() {
        console.log(">>>>>>>> TOC Render");
        let lists = [];
        let data = this.props.data;
        for(let i = 0; i<data.length; i++){
            lists.push(<li key={data[i].id}>
                <a href={"/content/"+data[i].id}
                    data-id = {data[i].id}
                    onClick={function (e){
                        e.preventDefault();
                        console.log(e.target.dataset.id);
                        this.props.onChangePage(e.target.dataset.id);
                }.bind(this)}>{data[i].title}</a>
            </li>);
        }

        return (
            <nav>
                <ul>
                    {lists}
                </ul>
            </nav>
        )
    }
}

export default TOC;
