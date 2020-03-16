import React, { Component } from 'react';
import '../session_round.css';

class RestaurantRound extends Component{
  constructor(props){
    super(props);
    this.handleX = this.handleX.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkCode = this.checkCode.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.pickWinner = this.pickWinner.bind(this);
    this.rejections = [];
    this.state = {
      sessionCode: ""
    };
    this.troll = {
      name: "McDonald's",
      imgUrl: "https://i.cbc.ca/1.4598664.1522334234!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/i-m-lovin-it.jpg",
      sauceUrl: "https://www.mcdonalds.com/us/en-us.html",
      reviews: 1000000,
      rating: 2.5,
      dollarSigns: "$",
      street: "Um...",
      city: "Everywhere"
    };
  }

  handleInput(e){
    this.setState({
      sessionCode: e.target.value
    });
  }

  checkCode(e){
    e.preventDefault();
    const userVerificationData = {
      sessionId: this.props.session._id,
      sessionCode: this.state.sessionCode
    };
    
    this.props.verifyUser(userVerificationData) // should update state to currentUser but will test
      .then (() => { 
        let emails = this.props.session.completedUsers.map((user) => user.email);
          if (emails.includes(this.props.currentUser.email)) {
            this.props.history.push(`/session/${this.props.session._id}/thankyou`);
          } else {
            const sessionId = this.props.history.location.search.slice(1);
            if (this.props.session.restaurants.length === 0) {
              this.props.fetchRestaurants(this.props.session)
                .then(() => this.props.fetchSession(sessionId));
            } else {
              this.props.fetchSession(sessionId);
            }
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
    const targ = e.currentTarget.previousSibling;
    setTimeout(() => targ.classList.add("none"), 500);
    // after .5 secs sets card to display none so page doesn't get wider from ele being moved
  }
  
  handleCheck(e){
    e.preventDefault();
    e.target.parentElement.previousElementSibling.previousElementSibling.setAttribute("id", "HIDDEN-RIGHT");
    e.target.parentElement.previousElementSibling.setAttribute("id", "BYE-LI");
    e.target.parentElement.setAttribute("id", "BYE-LI");
    const targ = e.currentTarget.previousSibling.previousSibling;
    setTimeout(() => targ.classList.add("none"), 500);
    // after .5 secs sets card to display none so page doesn't get wider from ele being moved
  }

  handleSubmit(e){
    e.preventDefault();
    
    const userData = {
      userId: this.props.currentUser._id,
      // rejections: this.props.currentUser.rejections
      rejections: this.rejections
    };
    
    // this.props.updateSession(sessionData)
    //       .then(this.props.history.push('/success'));
    
    this.props.updateUser(userData)
    .then(() => {

      let currentUser = this.props.currentUser; 
      currentUser.rejections = this.rejections;
      const sessionData = {
        sessionId: this.props.session._id,
        // completedUsers: [...this.props.session.completedUsers,this.props.currentUser.email]
        completedUsers: [...this.props.session.completedUsers, currentUser]
      };
      // if (this.props.session.winner) {
        //   const completionData = {
        //     restaurant: this.props.session.winningRestaurant,
        //     location: this.props.session.location
        //   };
        //   const completeSessionData = Object.assign({}, sessionData, completionData);
        //   this.props.updateSession(completeSessionData)
        //     .then(this.props.history.push(`/sessions/${this.props.session._id}/thankyou`));
        // } else {
          this.props.updateSession(sessionData)
            .then(() => {
              this.props.fetchSession(this.props.session._id)
              .then( () => {
                this.pickWinner();
              })
              // this.props.history.push(`/session/${this.props.session._id}/thankyou`)
            });
        // }
      });    
  }

  pickWinner() { //update state to iterate through all users in this session
    // if total users equals completed users, concat an array of everyone's rejections without duplicates
    if (this.props.session.numUsers === this.props.session.completedUsers.length) {
      let rejects = [];
      this.props.session.completedUsers.forEach(user => {
        user.rejections.forEach(rejection => {
          if (!rejects.includes(rejection)) {
            rejects.push(rejection);
          }
        })
      });

      // console.log(rejects);
      // iterate through all choices, adding them to new array if no one has rejected them
      let potentialWinners = [];
      this.props.session.restaurants.forEach(restaurant => {
        if (!rejects.includes(restaurant.name)) {
          potentialWinners.push(restaurant.name);
        }
      });
      // console.log(potentialWinners);
      // pick a winner from the potentialwinners array, depending on how many options everyone all agreed on
      let winner = '';
      if (potentialWinners.length === 1) {
        winner = potentialWinners[0];
      } else if (potentialWinners.length === 0) {
        winner = this.troll;
      } else {
        winner = potentialWinners[Math.floor(Math.random() * (potentialWinners.length - 1))]
      }
      // console.log(winner);
      // send winner up with updateSession request
      this.props.updateSession({ sessionId: this.props.session._id, completedUsers: this.props.session.completedUsers, winner: winner });
      this.props.history.push(`/session/${this.props.session._id}/thankyou`);
    } else {
      // if no winner (aka round isn't over) but someone tries to go to /winner, redirect them
      this.props.history.push(`/session/${this.props.session._id}/thankyou`)
    }
  };

  componentDidMount(){
      //implement redirect for invalid query string

    // if(this.props.session === undefined){
    if (Object.keys(this.props.session).length === 0) {
      const sessionId = this.props.history.location.search.slice(1);
      this.props.fetchSession(sessionId);
    }
  }

  render(){
    let sessionErrors = null;
    if (this.props.errors) {
      sessionErrors = this.props.errors.map(err => {
        return <li className="error-li">{err}</li>
      });
    }

    // pre session load
    if(this.props.session.numUsers === undefined) return <h1>Loading Session...</h1>;
    // pre verify user
    if(this.props.currentUser._id === undefined) {
      return (
        <>
          <form onSubmit={this.checkCode} id="verify-user-form">
            <label> Please enter your verification code:
              <input onChange={this.handleInput} type="password"/>
            </label>
            <button>Submit</button>
          </form>
          <section className="errors">
            <ul>
              {sessionErrors}
            </ul>
          </section>
        </>
      )
    }
    // if the user already submitted
    if (this.props.session.completedUsers.includes(this.props.currentUser)) {
      this.props.history.push(`/sessions/${this.props.session._id}/thankyou`);
      return <>null></>;
    }
    // user restaurant matching session
    const restaurants = this.props.session.restaurants || this.troll; 

    const cards = restaurants.reverse().map((place, idx) => {
      if(idx === restaurants.length - 1){
        return (
          <span key={`LastoCardo`}>
            <li key={`LAST${Date.now()}`} className="cards" id="last-card">
              <span className="food-info">
                <h2>DONE!</h2>
                <h3>Thank you for participating!</h3> <br/>
                <p>Please wait for the others to finish, an email will be sent out with the final decision within the hour</p>
                <button onClick={this.handleSubmit} id="submit-session">Submit Choices</button>
              </span>
            </li>
            <li key={`${place.name}${Date.now()}`} className="cards">
              <span className="food-info">
                <h2><a target="_blank" rel="noopener noreferrer" href={place.sauceUrl}>{place.name}</a></h2>
                <h3>{place.street}</h3>
                <h4>{place.city}</h4>
                <p>Rating: {place.rating}</p>
                <p>Reviews: {place.reviews}</p>
                <p>Price: {place.dollarSigns}</p>
                <img src={place.imgUrl} alt="quick-peek" />              </span>
              <button className="x-out" onClick={this.handleX}><img src={window.xMark} alt="x-mark"/></button>
              <button className="check" onClick={this.handleCheck}><img src={window.checkMark} alt="check-mark"/></button>
            </li>
          </span>
        )
      } else {
        return (
          <li key={`${place.name}${Date.now()}`} className="cards">
            <span className="food-info">
              <h2><a target="_blank" rel="noopener noreferrer" href={place.sauceUrl}>{place.name}</a></h2>
              <h3>{place.street}</h3>
              <h4>{place.city}</h4>
              <p>Rating: {place.rating}</p>
              <p>Reviews: {place.reviews}</p>
              <p>Price: {place.dollarSigns}</p>
              <img src={place.imgUrl} alt="quick-peek"/>
            </span>
            <button className="x-out" onClick={this.handleX}><img src={window.xMark} alt="x-mark"/></button>
            <button className="check" onClick={this.handleCheck}><img src={window.checkMark} alt="check-mark"/></button>
          </li>
        )
      }
    }).reverse();

    return (
      <div className="session-round">
        <h1>Restaurant Round</h1>
        <ul>
          {cards}
        </ul>
      </div>
      )
  }
}

export default RestaurantRound;