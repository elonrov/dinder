import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Splash from './splash/splash_container';
import MatchingRound from './matching_round/matching_round';
import ThankYou from './thank_you/thank_you';
import Winner from './winner/winner_container';

const App = () => (
    <Switch>
        <Route exact path="/" component={Splash} />
        <Route path="/round" component={MatchingRound} />
        <Route exact path="/thankyou" component={ThankYou} />
        <Route exact path="/sessions/:sessionId/winner" component={Winner} />
    </Switch>
); 

export default App;
