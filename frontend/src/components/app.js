import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Splash from './splash/splash_container';
import SessionRound from './session_round/session_round_container';
import ThankYou from './thank_you/thank_you';
import Winner from './winner/winner_container';

const App = () => (
    <Switch>
        <Route exact path="/" component={Splash} />
        <Route path="/round" component={SessionRound} />
        <Route exact path="/thankyou" component={ThankYou} />
        <Route exact path="/sessions/:sessionId/winner" component={Winner} />
    </Switch>
); 

export default App;
