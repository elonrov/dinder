import React from 'react'; 
import './session_form.css';
import { withRouter } from 'react-router-dom';

class SessionForm extends React.Component {
    constructor(props) {
        super(props); 

        this.state = {
            hostEmail: "",
            friend1Email: "",
            friend2Email: "",
            friend3Email: "",
            friend4Email: "",
            location: "",
            cuisine: ""
            
            // total: 1 // do we need this? revisit for making form dynamic
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.createUsers = this.createUsers.bind(this);

    }

    createUsers(sessionId) {
        const emails = this.state;
        for (let key in emails) {
            if (emails[key]) {
                if (key === "location" || key ==='cuisine') {
                    continue;
                } else if (key === "hostEmail"){ // allows host to be recognized
                    this.props.createUser({
                        sessionId: sessionId,
                        email: emails[key],
                        host: true
                    });
                } else {
                    this.props.createUser({
                        sessionId: sessionId,
                        email: emails[key]
                    });
                }
            }
        }
    }

    userCount(emails) {
        let count = 0;
        for (let email in emails) {
            if (email === "location" || email === 'cuisine') {
                continue;
            } else if (emails[email]) {
                count++;
            }
        }

        return count
    }

    // incrementUserCount () {
    //     this.setState({total: this.state.total + 1}) // increments total in state on click
    // }

    handleSubmit (e) {
        e.preventDefault();
        let where = this.state.location;
        if (!where) where = "NYC";
        let cuisine = this.state.cuisine
        const numUsers = this.userCount(this.state);
        const obj = { numUsers, location: where, cuisine: cuisine }
        this.props.createSession(obj)
            .then((sessionAction) => {
                this.createUsers(sessionAction.session._id); 
                this.props.history.push(`/session/${sessionAction.session._id}/thankyou`);
            });
           
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value }); //updates email value in state
    }

    // verifyEmail


    render () {
        return (
            <div>
                <form className="session-form" onSubmit={this.handleSubmit}>
                    <label>Cuisine
                        <input
                            type="text"
                            placeholder="try 'tacos' or 'dim sum'"
                            value={this.state.cuisine}
                            onChange={this.update('cuisine')}
                        />
                    </label>
                    <br/>
                    <label>Neighborhood
                        <input
                            type="text"
                            placeholder="try 'williamsburg' or '10003'"
                            value={this.state.location}
                            onChange={this.update('location')}
                        />
                    </label>
                    <br />
                    <label>Your email
                        <input
                            type="email"
                            placeholder="hostwiththemost@dinder.com"
                            value={this.state.hostEmail}
                            onChange={this.update('hostEmail')}
                            required
                        />
                    </label>
                    <br />
                        <section>
                            <br />
                            <label>Your friends' emails
                                <br />
                                <input 
                                    className="friend-1-input"
                                    type="email"
                                    placeholder="Friend #1's Email"
                                    value={this.state.friend1Email}
                                    onChange={this.update('friend1Email')}
                                />
                            </label>
                            <br />
                            <label>
                                <input
                                    className="friend-2-input"
                                    type="email"
                                    placeholder="Friend #2's Email"
                                    value={this.state.friend2Email}
                                    onChange={this.update('friend2Email')}
                                />
                            </label>
                            <br />
                            <label>
                                <input
                                    className="friend-3-input"                            
                                    type="text"
                                    placeholder="Friend #3's Email"
                                    value={this.state.friend3Email}
                                    onChange={this.update('friend3Email')}
                                />
                            </label>
                            <br />
                            <label>
                                <input
                                    className="friend-4-input"
                                    type="text"
                                    placeholder="Friend #4's Email"
                                    value={this.state.friend4Email}
                                    onChange={this.update('friend4Email')}
                                />
                            </label>
                            <h5>* This isn't Myspace, order doesn't matter *<br /></h5>
                        </section>
                    <div className="submit">
                        <button className="get-started" type="submit">Send Invites</button>
                    </div>
                </form>
            </div>
        )
    }
}; 

export default withRouter(SessionForm); 