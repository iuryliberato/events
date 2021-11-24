## General Assembly
##Project 4 - EVE.Events 🕺🏻🎭🎬
Eve.Events is a web-app where you can search for events, confirm your attendance, register and also create your own events. 
Event’s Link
EVE.Events

Goal 
This was a 8 day solo project. I was asked to build a full Stack application with a React front-end and a Django back-end, a fully functional RESTful API with all routes (GET, POST, PUT, DELETE), and content relationships including OneToMany and  ManyToMany, custom authentication (register/login) and a pre-planned wireframe for the front-end.  
Overview and Concept 
This is a React app with a Python and Django back-end, React, JavaScript, CSS with Styled-Components in the front-end. Users can register/login manually or register/login with Google, switch themes between dark and light mode, search and filter events, confirm attendance, and create their own events. In their own profile, they can see, edit and delete events that they have created and also see events that they are attending.
Technologies used
HTML5.
CSS.
Styled Components.
React.
JavaScript.
Django.
Python.
React Switch.
React Ticker.
Yarn.
Github.
Google Fonts.
Figma.
Approach Taken:
Day 1 - Firstly I listed all of the back-end and front-end features that I wished to implement in my app and using Figma I created three rough prototypes and chose my favorite one.


I spent the rest of the first day searching for new features that my course didn’t include like switching themes between light and dark mode, finding a way to get a Ticker bar displaying on my mainpage and learning ways to implement google auth and designing in figma to have a visual idea.

Day 2 and 3 - I managed to build the back-end with Python and Django. I built an Events folder which contains models where I have a ManytoManyField where you can add one or multiple tags according to the type of event, urls, views and serializers. 
I added a JWT_Auth directory with views and urls to allow users to register and login.

Day 4 - I started working on the front-end, firstly implementing the switch theme button. I used Styled Components which have support for themes which allowed me to add light and dark mode.

import { createGlobalStyle } from "styled-components"
 
export const lightTheme = {
 dark: false,
 body: '#eeeeee',
 text: '#0A0A0A',
 card: '#ffffff',
 primary: '#00DEB6',
}
export const darkTheme = {
 dark: true,
 body: '#1D1D1D',
 text: '#fff',
 card: '#2F2F2F',
 primary: '#00DEB6',
}

 



I began creating the register and login page as a pop-up form, to do this I added  a transparent background to give the effect that the form is on top of the page.
Day 5 - I created the events listing page, which has different filters such as: 
Name
Location
Date
Price

All of the events are displayed as cards, containing an image, name, date and a button that directs the user to the event’s page with all of the information. The all events page also has a Load more button which loads 6 more events when clicked.

Day 6 - I built the single event page where the app displays additional information about the event, including a description, time, price, location, pet friendly, event’s organiser name and tags. At this point I added a feature to confirm your attendance, which I had to create two endpoints, one endpoint to confirm attendance and one to cancel. After making that API call, the page gets rerendered automatically so the user can see whether they are attending or not without having to manually reload the page.

Day 7 - I created the forms for creating a new event and editing an existing event. I used React Select to implement the tags and make sure they display in a nicer way than the default browser behavior.



I designed the profile page which displays events you created and events that you are attending. These events are displayed based on relationships between the data in the Django back-end.

Day 8 - I made the app responsive to small, medium, large and extra large screens. I did a Mobile first approach where the default styles are for the mobile version and any additional styles are for larger devices.

Implemented the ticker bar to display animating words, using the React Ticker library to do this. I added final touches and then I thought about adding google registration. I had a chat with my instructor and decided to install React Google Login which provided me with an easy way for users to login using their google account, that works with the existing authentication I had built.
Key learnings:
Learned Styled components.
Learned how to create light and dark mode, which made the app look great for a wide range of users and also forced me to focus on design.
I’ve got a better understanding of authentication.
I started building the desktop version, then I had to stop and rebuild for mobile size first which was a learning experience to always start building on mobile size.
Challenges:
Finding and using a specific library when needed.
Designed the full app with two different themes.
 
Future improvements:
Add Links to get tickets.
Add reviews.
Bugs:
I couldn’t get the “date” to display it as a placeholder in the filter section.
