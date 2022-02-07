import React, { Component } from 'react';
import Card from './Card';

class Dealer extends Component {
    constructor(props){
        super(props); 
        this.state = {
            cards: [],
            deckId: undefined
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.draw = this.draw.bind(this);
        console.log(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
    }

    async componentDidMount() {
        let deck = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/');
        deck = await deck.json();
        this.setState({ deckId: deck.deck_id });
        console.log(deck);
    }

    async draw(){
        let card = await fetch(`https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/`);
        card = await card.json();
        card = card.cards[0];

        card.transformDegree = Math.random() * 30 - 5;
        this.setState(st => {
            return {cards: [...st.cards, card]};
        })
    }

    render(){
        let buttonStyle = {position: 'absolute', right: 0, left: 0, margin: '0 auto', width: '100px'};
        return (
            <div className="Dealer">
                { this.state.cards.map(c => <Card cardObject={c} />) }

                <button onClick={this.draw} style={buttonStyle}>Gimme a card!</button>
            </div>
        );
    }
}

export default Dealer;
