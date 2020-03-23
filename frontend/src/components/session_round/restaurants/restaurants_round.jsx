import React, { Component } from 'react';
import '../session_round.css';
import AboutPage from '../../about_modal/about';

class RestaurantRound extends Component{
  constructor(props){
    super(props);
    this.handleX = this.handleX.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleHold = this.handleHold.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleRelease = this.handleRelease.bind(this);
    this.checkCode = this.checkCode.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.pickWinner = this.pickWinner.bind(this);
    this.rejections = [];
    this.mouseTracking = {
      status: false,
      x1: 0,
      x2: 0,
    };
    this.mouseDiff = this.mouseTracking.x2 - this.mouseTracking.x1;
    this.state = {
      sessionCode: "",
      rotateDeg: this.mouseDiff
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

  handleHold(e){
    e.preventDefault();
    this.mouseTracking.x1 = e.screenX;
    this.mouseTracking.status = true;
  }

  handleMove(e){
    e.preventDefault();
    if (this.mouseTracking.status){
      this.mouseTracking.x2 = e.screenX;
      this.mouseDiff = (this.mouseTracking.x2 - this.mouseTracking.x1) / 10;
      this.setState({
        rotateDeg: (this.mouseDiff > 0) ? Math.min(this.mouseDiff, 25) : Math.max(this.mouseDiff, -25)
      });
    }
  }

  handleRelease(e){
    e.preventDefault();
    if (this.mouseTracking.status) {
      this.mouseTracking.status = false;
      this.mouseTracking.x2 = e.screenX;
      if (this.state.rotateDeg === 25){
        // this.handleCheck();
        console.log("this.handleCheck", e.currentTarget);
      } else if (this.state.rotateDeg === -25){
        // this.handleX();
        console.log("this.handleX", e.currentTarget);
      }
    }
    // this.setState({
    //   rotateDeg: 0
    // });
    
  }

  handleX(e){
    e.preventDefault();
    const newRejs = [...this.rejections, e.currentTarget.nextElementSibling.firstElementChild.textContent];
    this.rejections = newRejs;
    // card swipe
    e.currentTarget.nextElementSibling.setAttribute("id", "HIDDEN-LEFT");
    // button disappear
    e.currentTarget.nextElementSibling.nextElementSibling.setAttribute("id", "BYE-LI");
    e.currentTarget.setAttribute("id", "BYE-LI");
    const targ = e.currentTarget.nextElementSibling;
    setTimeout(() => targ.classList.add("none"), 500);
    // after .5 secs sets card to display none so page doesn't get wider from ele being moved
  }
  
  handleCheck(e){
    e.preventDefault();
    // card swipe
    e.currentTarget.previousElementSibling.setAttribute("id", "HIDDEN-RIGHT");
    // button disappear
    e.currentTarget.previousElementSibling.previousElementSibling.setAttribute("id", "BYE-LI");
    e.currentTarget.setAttribute("id", "BYE-LI");
    const targ = e.currentTarget.parentElement;
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
      //find url for winner 
      let url;
      this.props.session.restaurants.forEach( (restaurant) => {
        if (restaurant.name === winner) {
          url = restaurant.sauceUrl;
        };
      });
      // send winner up with updateSession request
      this.props.updateSession({ sessionId: this.props.session._id, completedUsers: this.props.session.completedUsers, winner: winner, url: url });
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
    if(this.props.session.numUsers === undefined) return <h1 className="loading-session">Loading Session...</h1>;
    // pre verify user
    if(this.props.currentUser._id === undefined) {
      return (
        <>
          <form onSubmit={this.checkCode} id="verify-user-form">
            <label className="verification-request"> Please enter your verification code:<br/>
              <input className="code-input" onChange={this.handleInput} autoFocus/>
            </label>
            <button className="code-submit">submit</button>
          </form>
          <section className="session-errors">
            <ul className="session-errors">
              {sessionErrors}
            </ul>
          </section>
        </>
      )
    }
    // if the user already submitted
    if (this.props.session.completedUsers.includes(this.props.currentUser)) {
      this.props.history.push(`/session/${this.props.session._id}/thankyou`);
      return <>null></>;
    }
    // user restaurant matching session
    const restaurants = this.props.session.restaurants || this.troll; 

    let rotateStyling = {transform: `rotate(${this.state.rotateDeg}deg)`}

    const cards = restaurants.reverse().map((place, idx) => {
      if(idx === restaurants.length - 1){
        return (
          <span key={`LastoCardo`}>
            <li key={`LAST${Date.now()}`} className="cards" id="last-card">
              <span className="food-info" style={rotateStyling}  onMouseDown={this.handleHold} >
                <h2>DONE!</h2>
                <h3>Thank you for participating!</h3> <br/>
                <p>Please wait for the others to finish, an email will be sent out with the final decision within the hour</p>
                <button onClick={this.handleSubmit} id="submit-session">Submit Choices</button>
              </span>
            </li>
            <li key={`${place.name}${Date.now()}`} className="cards">
              <button className="x-out" onClick={this.handleX}><img src={window.xMark} alt="x-mark"/></button>
              <span className="food-info" style={rotateStyling} onMouseDown={this.handleHold} onMouseUp={this.handleRelease}>
                <h2><a target="_blank" rel="noopener noreferrer" href={place.sauceUrl}>{place.name}</a></h2>
                <h3>{place.street}</h3>
                <h4>{place.city}</h4>
                <img src={place.imgUrl} alt="quick-peek" />
                <p>Rating: {place.rating ? place.rating : "N/A"}</p>
                <p>Reviews: {place.reviews ? place.reviews : "0"}</p>
                <p>Price: {place.dollarSigns ? place.dollarSigns : "N/A"}</p>
              </span>
              <button className="check" onClick={this.handleCheck}><img src={window.checkMark} alt="check-mark"/></button>
            </li>
          </span>
        )
      } else {
        return (
          <li key={`${place.name}${Date.now()}`} className="cards">
            <button className="x-out" onClick={this.handleX}><img src={window.xMark} alt="x-mark"/></button>
            <span className="food-info" style={rotateStyling} onMouseDown={this.handleHold} onMouseUp={this.handleRelease}>
              <h2><a target="_blank" rel="noopener noreferrer" href={place.sauceUrl}>{place.name}</a></h2>
              <h3>{place.street}</h3>
              <h4>{place.city}</h4>
              <img src={place.imgUrl} alt="quick-peek"/>
              <p>Rating: {place.rating ? place.rating : "N/A"}</p>
              <p>Reviews: {place.reviews ? place.reviews : "0"}</p>
              <p>Price: {place.dollarSigns ? place.dollarSigns : "N/A"}</p>
            </span>
            <button className="check" onClick={this.handleCheck}><img src={window.checkMark} alt="check-mark"/></button>
          </li>
        )
      }
    }).reverse();

    return (
      <div className="session-round">
        {/* <h1>Restaurant Round</h1> */}
        <ul onMouseMove={this.handleMove} onMouseUp={this.handleRelease}>
          {cards}
        </ul>
        <AboutPage/>
      </div>
      )
  }
}

export default RestaurantRound;