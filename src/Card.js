import React, { Component } from 'react';

class Card extends Component {
    render(){
        let transform = 'rotate(' + this.props.cardObject.transformDegree + 'deg) scale(1.25)';
        let style = {position: 'absolute', top: '150px', left: 0, right: 0, margin: '0 auto', transform: transform};
        return <img className="Card" src={this.props.cardObject.image} style={style}/>;
    }
}

export default Card;
