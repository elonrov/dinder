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
    const userVerificationData = {
      sessionId: this.props.session.id,
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
      sessionId: this.props.session.id,
      completedUsers: [...this.props.session.completedUsers,this.props.currentUser.email]
    };

    const userData = {
      userId: this.props.currentUser.id,
      rejections: this.rejections
    };

    // this.props.updateSession(sessionData)
    //       .then(this.props.history.push('/success'));

    this.props.updateUser(userData)
      .then(() => {
        // if (this.props.session.winningRestaurant) {
        //   const completionData = {
        //     restaurant: this.props.session.winningRestaurant,
        //     location: this.props.session.location
        //   };
        //   const completeSessionData = Object.assign({}, sessionData, completionData);
        //   this.props.updateSession(completeSessionData)
        //     .then(this.props.history.push(`/sessions/${this.props.session._id}/thankyou`));
        // } else {
          this.props.updateSession(sessionData)
            .then(this.props.history.push(`/sessions/${this.props.session._id}/thankyou`));
        // }
      });    
  }

  componentDidMount(){
    if(this.props.session === undefined){
      debugger
      const sessionId = this.props.history.location.search.slice(1);
      this.props.fetchSession(sessionId);
    }
  }

  render(){
    
    if(this.props.session === undefined) return <h1>Loading Session...</h1>;

    if (this.props.session.completedUsers.length === this.props.sessions.numUsers) {
      this.props.history.push(`/sessions/${this.props.session._id}/thankyou`);
    }
    
    if(this.props.currentUser === undefined) {
      return (
        <form onSubmit={this.checkCode} id="verify-user-form">
          <label> Please enter your verification code:
            <input onChange={this.handleInput} type="password"/>
          </label>
        </form>
      )
    }

    const troll = [
      {
        name: "McDonald's",
        imgUrl: "https://i.cbc.ca/1.4598664.1522334234!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/i-m-lovin-it.jpg",
        sauceUrl: "https://www.mcdonalds.com/us/en-us.html",
        reviews: 1000000,
        rating: 2.5,
        dollarSigns: "$",
        street: "Um...",
        city: "Everywhere"
      },
      {
        name: "McDonald's",
        imgUrl: "https://i.cbc.ca/1.4598664.1522334234!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/i-m-lovin-it.jpg",
        sauceUrl: "https://www.mcdonalds.com/us/en-us.html",
        reviews: 1000000,
        rating: 2.5,
        dollarSigns: "$",
        street: "Um...",
        city: "Everywhere"
      },
      {
        name: "McDonald's",
        imgUrl: "https://i.cbc.ca/1.4598664.1522334234!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/i-m-lovin-it.jpg",
        sauceUrl: "https://www.mcdonalds.com/us/en-us.html",
        reviews: 1000000,
        rating: 2.5,
        dollarSigns: "$",
        street: "Um...",
        city: "Everywhere"
      },
      {
        name: "McDonald's",
        imgUrl: "https://i.cbc.ca/1.4598664.1522334234!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/i-m-lovin-it.jpg",
        sauceUrl: "https://www.mcdonalds.com/us/en-us.html",
        reviews: 1000000,
        rating: 2.5,
        dollarSigns: "$",
        street: "Um...",
        city: "Everywhere"
      },
      {
        name: "McDonald's",
        imgUrl: "https://i.cbc.ca/1.4598664.1522334234!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/i-m-lovin-it.jpg",
        sauceUrl: "https://www.mcdonalds.com/us/en-us.html",
        reviews: 1000000,
        rating: 2.5,
        dollarSigns: "$",
        street: "Um...",
        city: "Everywhere"
      }
    ]

    const restaurants = this.props.session.restaurants || troll; 

    const cards = restaurants.reverse().map((place, idx) => {
      if(idx === restaurants.length - 1){
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
            <li key={`${place.name}${Date.now()}`} className="cards">
              <span className="food-info">
                <h2><a href={place.sauceUrl}>{place.name}</a></h2>
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
              <h2><a href={place.sauceUrl}>{place.name}</a></h2>
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