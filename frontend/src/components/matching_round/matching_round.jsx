import React, { Component } from 'react';
import './matching_round.css';

class MatchingRound extends Component{
  constructor(props){
    super(props);
    this.handleX = this.handleX.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleX(e){
    e.preventDefault();
    e.target.parentElement.previousElementSibling.setAttribute("id", "HIDDEN-LEFT");
    e.target.parentElement.nextElementSibling.setAttribute("id", "BYE-LI");
    e.target.parentElement.setAttribute("id", "BYE-LI");
  }
  
  handleCheck(e){
    e.preventDefault();
    e.target.parentElement.previousElementSibling.previousElementSibling.setAttribute("id", "HIDDEN-RIGHT");
    e.target.parentElement.previousElementSibling.setAttribute("id", "BYE-LI");
    e.target.parentElement.setAttribute("id", "BYE-LI");
  }

  render(){
    const cats = [
      "tacos",
      "pizza",
      "sushi",
      "thai",
      'burgers',
      "soup dumplings",
      "subs",
      "bbq",
      "pho",
      "ramen",
      "tapas"
    ];

    const cards = cats.map((food) => {
      return (
        <li key={`${food}${Date.now()}`} className="cards">
          <span className="food-info">
            <h2>{food}</h2>
            <h3>New York, NY</h3>
            <p>Here are some details about the food. I mean I dunno what should go here but I also couldn't find lorem ipsum so this is whatchu got.</p>
          </span>
          <button className="x-out" onClick={this.handleX}><img src={window.xMark} /></button>
          <button className="check" onClick={this.handleCheck}><img src={window.checkMark} /></button>
        </li>
      )
    });

    return (
      <div className="matching-round">
        <h1>Matching Round</h1>
        <ul>{cards}</ul>
      </div>
      )
  }
}

export default MatchingRound;