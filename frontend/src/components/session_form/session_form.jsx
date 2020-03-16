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
            cuisine: "",
            errors: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.createUsers = this.createUsers.bind(this);

    }

    createUsers(sessionId) {
        const emails = this.state;

        for (let key in emails) {
            if (emails[key]) {
                if (key in ["location", "cuisine", "errors"]) {
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

    userCountAndVerify(emails) { // counts amount of valid users and checks for dupe emails
        let count = 0;
        const validEmails = [];

        for (let email in emails) {
            let curEmail = emails[email];

            if (email in ["location", "cuisine", "errors"]) {
                continue;
            } else if (validEmails.includes(curEmail)) {
                return false;
            } else if (curEmail) {
                count++;
                validEmails.push(curEmail);
            }
        }

        return count;
    }

    componentWillUnmount() {
        this.setState({ errors: [] });
        // may not work as intended with the way we are displaying forms
        // hard refresh should reset anyways but this is here in case
    }

    handleSubmit (e) {
        e.preventDefault();
        const numUsers = this.userCountAndVerify(this.state);

        if (numUsers) {
            let where = this.state.location;
            if (!where) where = "NYC";
            let cuisine = this.state.cuisine;
            const obj = { numUsers, location: where, cuisine: cuisine };
            this.props.createSession(obj)
                .then((sessionAction) => {
                    this.createUsers(sessionAction.session._id); 
                    this.props.history.push(`/session/${sessionAction.session._id}/thankyou`);
                });
        } else {
            this.setState({ errors: "Uh oh, it looks like you've used the same email more than once." });
            // adds email error message to state
        }
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value }); // updates email value in state
    }

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
                        <p className="email-error">{this.state.errors}</p>
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