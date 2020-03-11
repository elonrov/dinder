![](assets/banner.png)

# Dinder Party 
A group decision making app that answers: where should we get dinner tonight?	We'll find a restaurant option that you and your friends can all agree on, so you can circumvent the annoying 3 hour round-and-round of indecision. 

## How it Works
Step 1: Host initiates a Dinder Party by choosing a cuisine and a neighborhood, and inviting their friends to join via Email
Step 2: Dinder sends an email to each participant, including the host, with a unique access code and link to the matching round. 
Step 3: In the matching round, participants are presented with 10 options, based on the Host's criteria, and 'swipe' left or right to either reject or approve each option, respectively. 
Step 4: Based on each participant's preferences, Dinder will pick an option that 100% of the group has approved of, and email everyone again to announce the winning restaurant.

## How it Works, Technically 
[restate app flow in terms of what is happening in the code, including routes, requests, emails, and API calls]

## Technologies 
### MERN Stack
Dinder is built with a MongoDb database framework on the backend, Express application controller, React components on the frontend, and a Node.js server. Dinder is deployed on Heroku. 
[add sentence about custom routes]
### NodeMailer.js
We imported a module called NodeMailer to support our in-app email needs. NodeMailer is configured with two custom templates: one for the initial invitation to match, and one to announce the winning restaurant. NodeMailer is configured with handlebars templates and custom mail options for variables including session codes, links, attachments, and styling. 

[include nodemailer code screenshot]
[include screenshot of email?]

### Yelp API Integration
We integrated the Yelp API to pull restaurant options based on user-inputted search criteria. When initializing a Dinder Party, a host can optionally include a cuisine search term and a geographical search term, to narrow down the list of options Dinder presents to their group. Using these search terms, we request a list of the top 10 reviewed restaurant options from Yelp. 

[describe this more technically]
[screenshot of get route code]

### 'Swiping' Functionality 
The 'swiping' functionality was achieved using a combination of JavaScript, HTML, and CSS. 
[sceenshot of the handle X and handle Check methods in restaurant round]. 


## Future Plans
1) If no restaurant option is agreed upon by every group participant, Dinder will auto-initialize a new round with 10 new options. 
2) If not every participant has completed their matching round within 1 hour of initialization, Dinder will close the round and pick a winner. 
3) Allow for more than 5 participants.

