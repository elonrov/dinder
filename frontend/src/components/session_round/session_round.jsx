import React, { Component } from 'react';
import './session_round.css';

class SessionRound extends Component{
  constructor(props){
    super(props);
    this.handleX = this.handleX.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkCode = this.checkCode.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.rejections = [];
    this.state = {
      sessionCode: ""
    };
  }

  handleInput(e){
    this.setState({
      sessionCode: e.target.value
    });
  }

  checkCode(e){
    e.preventDefault();
    const session = this.props.session;
    const userVerificationData = {
      sessionId: session._id,
      sessionCode: this.state.sessionCode
    };
    this.props.verifyUser(userVerificationData) // should update state to currentUser but will test
      .then (user => { 
        if (session.completedUsers.includes(user.email)) {
          this.props.history.push(`/sessions/${session._id}/winner`);
        }
      });
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
      sessionId: this.props.session._id,
      completedUsers: [...this.props.session.completedUsers,this.props.currentUser.email]
    };

    const userData = {
      userId: this.props.currentUser._id,
      rejections: this.rejections
    };

    // this.props.updateSession(sessionData)
    //       .then(this.props.history.push('/success'));

    this.props.updateUser(userData)
      .then(() => {
        if(this.props.session.winningCuisine){
          const completionData = {
            cuisine: this.props.session.winningCuisine,
            location: this.props.session.location
          };
          this.props.fetchRestaurants(completionData)
            .then(() => {
              const completeSessionData = Object.assign({},sessionData, completionData);
              this.props.updateSession(completeSessionData)
                .then(this.props.history.push(`/sessions/${this.props.session._id}/winner`));
            });
        } else {
          this.props.updateSession(sessionData)
            .then(this.props.history.push(`/sessions/${this.props.session._id}/winner`));
        }
      });    
  }

  componentDidMount(){
    if (Object.keys(this.props.session).length === 0) {
      const sessionId = this.props.history.location.search.slice(1);
      this.props.fetchSession(sessionId);
    }
  }

  render(){
    if (Object.keys(this.props.session).length === 0) return <h1>Loading Session...</h1>;

    if (Object.keys(this.props.currentUser).length === 0) {
      return (
        <form onSubmit={this.checkCode} id="verify-user-form">
          <label> Please enter your verification code:
            <input onChange={this.handleInput} type="text"/>
            <button>Submit</button>
          </label>
        </form>
      )
    }

    const cats = this.props.session.choices;

    const cards = cats.reverse().map((food, idx) => {
      if(idx === cats.length - 1){
        return (
          <span key={`LastoCardo`}>
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
      <div className="session-round">
        {/* <h1>Cuisine Round</h1> */}
        <ul>
          {cards}
        </ul>
      </div>
      )
  }
}

export default SessionRound;