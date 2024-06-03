import React, {Component} from "react";

class Content extends Component{
    render() {
        return (
            <article>
                <h2>{this.props.artTitle}</h2>
                {this.props.artSub}
            </article>
        )
    }
}
export default Content;
