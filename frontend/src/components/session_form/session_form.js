import React from 'react'; 
import './session_form.css';
import { withRouter, Link } from 'react-router-dom';

class SessionForm extends React.Component {
    constructor(props) {
        super(props); 

        this.state = {
            emails: {
                hostEmail: "",
                friend1Email: "",
                friend2Email: "",
                friend3Email: ""
            },
            total: 1
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    incrementUserCount () {
        this.setState({total: this.state.total + 1})
    }

    handleSubmit (e) {
        e.preventDefault();
        // email situation
        this.props.history.push('/thankyou')
    }

    update(field) {
        return e => this.setState({emails: {[field]: e.target.value }});
    }


    render () {
        return (
            <div>
                <form className="session-form" onSubmit={this.handleSubmit}>
                    <section className="form-inputs">
                        <label>Your email<br />
                            <input
                                type="text"
                                placeholder="hostwiththemost@dinder.com"
                                value={this.state.emails.hostEmail}
                                onChange={this.update('Your email')}
                            />
                        </label>
                        
                        <section>
                            <br />
                            <label>Your friends' emails
                                <br />
                                <input 
                                    className="friend-1-input"
                                    type="text"
                                    placeholder="Friend #1's Email"
                                    value={this.state.emails.friend1Email}
                                    onChange={this.update('Friend #1')}
                                />
                                {/* plus sign to reveal next row and increment counter */}
                            </label>
                            <br />
                            <label>
                                <input
                                    className="friend-2-input"
                                    type="text"
                                    placeholder="Friend #3's Email"
                                    value={this.state.emails.friend2Email}
                                    onChange={this.update('Friend #2')}
                                />
                            </label>
                            <br />
                            <label>
                                <input
                                    className="friend-4-input"                            
                                    type="text"
                                    placeholder="Friend #3's Email"
                                    value={this.state.emails.friend3Email}
                                    onChange={this.update('Friend #3')}
                                />
                            </label>
                            <br />
                            <label>
                                <input
                                    className="friend-4-input"
                                    type="text"
                                    placeholder="Friend #4's Email"
                                    value={this.state.emails.friend4Email}
                                    onChange={this.update('Friend #4')}
                                />
                            </label>
                            <h5>* This isn't Myspace, order doesn't matter *<br /></h5>
                        </section>
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