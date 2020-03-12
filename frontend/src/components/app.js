import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Splash from './splash/splash_container';
import ThankYou from './thank_you/thank_you_container';
import RestaurantRound from './session_round/restaurants /restaurants_round_container';
// import SessionRound from './session_round/session_round_container';
// import Winner from './winner/winner_container';

const App = () => (
    <Switch>
        <Route exact path="/" component={Splash} />
        {/* <Route path="/round" component={SessionRound} /> */}
        <Route path="/restaurantround" component={RestaurantRound} />
        <Route exact path="/session/:sessionId/thankyou" component={ThankYou} />
        {/* <Route exact path="/session/:sessionId/winner" component={Winner} /> */}
    </Switch>
); 

export default App;
