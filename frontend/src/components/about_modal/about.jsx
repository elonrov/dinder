import React, { Component } from 'react';
import './about.css';

class AboutPage extends Component {
  constructor(props){
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      showModal: false
    };
  }

  handleOpen(e){
    e.preventDefault();
    this.setState({
      showModal: true
    });
  }
  
  handleClose(e){
    if (!e.target.dataset.link) {
      e.preventDefault();
      this.setState({
        showModal: false
      });
    }
  }

  render(){

    const modalClass = (this.state.showModal) ? "modal-on" : "modal-off";

    return(
      <div>
        <h2 onClick={this.handleOpen} id="about-us">
          Meet the dinder Team
        </h2>
        <span onClick={this.handleClose} className={modalClass}>
          <h2 onClick={this.handleClose} className="x-button">
            &times;
          </h2>
          <section id="creators">
            <div id="creator-card">
              <span>
                <img src="https://media-exp1.licdn.com/dms/image/C4D03AQHrMPiEEs5MGA/profile-displayphoto-shrink_200_200/0?e=1590624000&v=beta&t=gU4XoMoP6pzG2oZV9905B1BldUKmCWozGwhbxsqaErA" alt="Akeem"/>
                <div>
                  <h2>Akeem Nicholas</h2><br/>
                  <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/akeem-nicholas-2983a6192/"><i data-link="true" className="fab fa-linkedin"></i></a>
                  <a target="_blank" rel="noopener noreferrer" href="https://angel.co/akeem-nicholas"><i data-link="true" className="fab fa-angellist"></i></a>
                  <a target="_blank" rel="noopener noreferrer" href="https://github.com/anicholas4747"><i data-link="true" className="fab fa-github-square"></i></a>
                </div>
              </span>
            </div>
            <div id="creator-card">
              <span>
                <img src="https://media-exp1.licdn.com/dms/image/C5603AQG_44vAWyFHdg/profile-displayphoto-shrink_200_200/0?e=1590624000&v=beta&t=85IoTFgLF90HWe1GzABgC61YC8n4ehjgFnx4VpaWQaQ" alt="Calvin"/>
                <div>
                  <h2>Calvin Curnuck</h2><br/>
                  <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/calvin-curnuck-7139a7a8/"><i data-link="true" className="fab fa-linkedin"></i></a>
                  <a target="_blank" rel="noopener noreferrer" href="https://angel.co/calvin-curnuck"><i data-link="true" className="fab fa-angellist"></i></a>
                  <a target="_blank" rel="noopener noreferrer" href="https://github.com/calvincu1230"><i data-link="true" className="fab fa-github-square"></i></a>
                </div>
              </span>
            </div>
            <div id="creator-card">
              <span>
              <img src="https://media-exp1.licdn.com/dms/image/C4D03AQE9OCYW1NQ1nw/profile-displayphoto-shrink_200_200/0?e=1590624000&v=beta&t=znwfYgrOVqgrfu4FVUF4bAbDbZqExS6g4T-Q7Vp4DHM" alt="Elon"/>
                <div>
                  <h2>Elon Rov</h2><br/>
                  <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/elon-rov-1389648b/"><i data-link="true" className="fab fa-linkedin"></i></a>
                  <a target="_blank" rel="noopener noreferrer" href="https://angel.co/elon-rov"><i data-link="true" className="fab fa-angellist"></i></a>
                  <a target="_blank" rel="noopener noreferrer" href="https://github.com/elonrov"><i data-link="true" className="fab fa-github-square"></i></a>
                </div>
              </span>
            </div>
            <div id="creator-card">
              <span>
              <img src="https://media-exp1.licdn.com/dms/image/C4E03AQH2u5nMdPNGpg/profile-displayphoto-shrink_200_200/0?e=1590624000&v=beta&t=fn-tUHA79A-nPwDIEggDGhxeFsGl791B2qbyEDAdlXs" alt="Harry"/>
                <div>
                  <h2>Harry Zec</h2><br/>
                  <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/harry-zec-7157a4a8/"><i data-link="true" className="fab fa-linkedin"></i></a>
                  <a target="_blank" rel="noopener noreferrer" href="https://angel.co/harry-zec"><i data-link="true" className="fab fa-angellist"></i></a>
                  <a target="_blank" rel="noopener noreferrer" href="https://github.com/harryzec"><i data-link="true" className="fab fa-github-square"></i></a>
                </div>
              </span>
            </div>
          </section>
        </span>

      </div>
    )
  }
}

export default AboutPage;