import React, { Component } from 'react';
import './matching_round.css';

class MatchingRound extends Component{
  constructor(props){
    super(props);
    this.handleX = this.handleX.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.rejections = [];
  }

  handleX(e){
    e.preventDefault();
    const newRejs = [...this.rejections, e.target.parentElement.previousElementSibling.firstElementChild.textContent];
    this.rejections = newRejs;
    
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

  handleSubmit(e){
    e.preventDefault();

    const sessionData = {
      sessionId: this.props.session.id,
      completedUsers: [...this.props.session.completedUsers,this.props.currentUser.email]
    };

    this.props.updateSession(sessionData)
      .then(this.props.history.push('/success'));
  }

  componentDidMount(){
    if(this.props.session === undefined){
      const sessionId = this.props.history.location.search.split(1);
      this.props.fetchSession(sessionId);
    }
  }

  render(){

    if(this.props.session === undefined) return <h1>Loading Session...</h1>;

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

    const cards = cats.reverse().map((food, idx) => {
      if(idx === cats.length - 1){
        return (
          <span>
            <li key={`LAST${Date.now()}`} className="cards" id="last-card">
              <span className="food-info">
                <h2>DONE!</h2>
                <h3>Thank you for participating!</h3>
                <p>Please wait for the others to finish, an email will be sent out with the final decision within the hour</p>
                <button onClick={this.handleSubmit} id="submit-session">Submit Choices</button>
              </span>
            </li>
            <li key={`${food}${Date.now()}`} className="cards">
              <span className="food-info">
                <h2>{food}</h2>
                <h3>New York, NY</h3>
                <p>Here are some details about the food. I mean I dunno what should go here but I also couldn't find lorem ipsum so this is whatchu got.</p>
              </span>
              <button className="x-out" onClick={this.handleX}><img src={window.xMark} alt="x-mark"/></button>
              <button className="check" onClick={this.handleCheck}><img src={window.checkMark} alt="check-mark"/></button>
            </li>
          </span>
        )
      } else {
        return (
          <li key={`${food}${Date.now()}`} className="cards">
            <span className="food-info">
              <h2>{food}</h2>
              <h3>New York, NY</h3>
              <p>Here are some details about the food. I mean I dunno what should go here but I also couldn't find lorem ipsum so this is whatchu got.</p>
            </span>
            <button className="x-out" onClick={this.handleX}><img src={window.xMark} alt="x-mark"/></button>
            <button className="check" onClick={this.handleCheck}><img src={window.checkMark} alt="check-mark"/></button>
          </li>
        )
      }
    }).reverse();

    return (
      <div className="matching-round">
        <h1>Matching Round</h1>
        <ul>
          {cards}
        </ul>
      </div>
      )
  }
}

export default MatchingRound;