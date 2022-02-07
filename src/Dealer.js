import React, { Component } from 'react';
import Card from './Card';
import { v4 as uuid } from 'uuid';

class Dealer extends Component {
    constructor(props){
        super(props); 
        this.state = {
            cards: [],
            deckId: undefined,
            cardsRemaining: 52
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.draw = this.draw.bind(this);
    }

    async componentDidMount() {
        let deck = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/');
        deck = await deck.json();
        this.setState({ deckId: deck.deck_id });
        console.log(deck);
    }

    async draw(){
        let deckInfo = await fetch(`https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/`);
        deckInfo = await deckInfo.json();
        console.log(deckInfo);
        let card = deckInfo.cards[0];

        card.transformDegree = Math.random() * 30 - 5;
        card.uuid = uuid();
        this.setState(st => {
            return {cards: [...st.cards, card], cardsRemaining: deckInfo.remaining};
        })
    }

    render(){
        let buttonStyle = {position: 'absolute', right: 0, left: 0, margin: '0 auto', width: '100px'};
        return (
            <div className="Dealer">
                { this.state.cards.map(c => <Card cardObject={c} key={c.uuid}/>) }

                { this.state.cardsRemaining > 0 ? 
                        <button onClick={this.draw} style={buttonStyle}>Gimme a card!</button> :
                        ''
                }
            </div>
        );
    }
}

export default Dealer;
