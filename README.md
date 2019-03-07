# Rotten Potatoes Reviews
A Rotten Tomatoes User Reviews Service

# Table of Contents
1. Motivation
2. Websites
3. Technology Stack
4. Challenges Faced/Lessons Learned
  
# 1. Motivation

To build a website with microservice/service thinking to display in one common proxy server. Each microservice (e.g. reviews, scoreboard, photos, videos) is responsible for delivering the content and data and is separately handled by a team member. Each microservice is then served up into a proxy server, a master layout, in which each microservice has its own features, API endpoints, frontend stack and database. Stand-ups were done at least twice a week in order to assess the progress, blockers, and what each member would be working on next. It was standardized such that each commit must be accompanied with sufficient test cases.

# 2. Websites

Links are shown down below. 

Trello was used in order to document each member's process and phase in the project. Some phases include: Staged for Review, In Progress, and Deployed to Production

Trello - https://trello.com/b/s9H9kCOG/rotten-tomatoes
Review microservice - http://d3j8vuqdefdwm3.cloudfront.net/
RT Proxy Server - http://d1p7hgrke505re.cloudfront.net/m/black_panther
GitHub Proxy - https://github.com/number-ape/Rotten_Tomatoes_Reviews_Proxy
GitHub Service - https://github.com/number-ape/Rotten_Tomatoes_Reviews_Service

# 3. Technology Stack

The following section includes and describes the following technology stacks used:
Testing - Jest, SuperTest, Enzyme
Continuous Integration- TravisCI
Frontend - React, HTML, CSS, JS, BootStrap
Backend - MySQL, Express/Node

# 3.1 Testing
Jest was used to test the whole full-stack application.
SuperTest was used to test the API calls specifically in this case were the following:
  - /reviews/audience/:title
  - /reviews/scoreboard/:id
Enzyme was used to test React components, taking snapshots in order to look for a rendered component or elements on the page

# 3.2 Continuous Integration
TravisCI was used as an integration tool when committing to GitHub and when pull merges were requested. This ensured that the pull requests were tested against and reviewers would be confident in working code.

# 3.3 Frontend
React was considered in order to leverage reusable UI components when rendering data. React makes displaying data fast, simple and scalable.

Vanilla HTML, CSS, JS and BootStrap are standard for web dev.

# 3.4 Backend
Backend consisted of MySQL and Express to serve files and provide API endpoints. MySQL was considered as the review data is very structured and every review consisted of id, review, user id, movie id, stars etc., as such a relational database was selected over a non-relational database.

# 4. Challenges Faced/Lessons Learned

In this section, I will be talking about the challenges I came across when developing Rotten Potatoes and the possible solutions that were considered.

# 4.1 Bootstrap and React

Early in the project phase, when the application was first considered it was decided as a group that Bootstrap was to be used for CSS styling. When I finally got to the stage of writing the frontend React code, it was at first difficult to conform bootstrap styling with React. In my AudienceReview component, I passed down movie reviews and had to render the stars given by the reviewer. As a design choice, I would render the stars once the component was created. This resulted in the use of immediately-invoked function expressions (IFFE) to map and loop through the number of stars needed and render it on the spot. It was not trivial at first that IFFE was needed to render the component, but it was necessary in order to immediately execute after the props were passed down.

# 4.2 Testing

Testing is always interesting and crucial to any project. I used Enzyme, Jest, SuperTest and TravisCI to ensure frontend and backend code were working as intended. This project helped me gain the knowledge of these testing frameworks as it was the first time integrating them into a project. I know there are teams dedicated to QA, but as a sanity check, I like creating test cases to ensure the code I have written is proper and does what I intended.

# 4.3 Proxy and Server Communication

Rotten Potatoes is my first project to think about microservice architecture. This comes with an added benefit of having autonomous teams develop, deploy and scale their respective services independently, which is exactly what our team has accomplished. With parallel development, we have recreated Rotten Tomatoes in less than 8 weeks which was no easy feat.

I built my proxy and server independently and when it came the time to connect them together, it was quite a learning experience. It was a slow stumble in having to put cors in my service, even though I knew what cors was and setting up the endpoints and directory for which the proxy had to hit (to manage the name of the directory for that the current executing script currently resides in).

# 4.4 Code Reviews

It was suggested to load some calculations from the server (had a loop to go through each row of data) to the backend instead since the db had built-in functions to help. I find code reviews to be essential as there are ideas that you would skip over in your head or haven't even thought about. I know I need more practice in code reviewing in order to contribute more to other's PR.

# 4.5 Deployment to AWS EC2

Honestly, even after deploying to Amazon's EC2 instance, I still find it foggy. I know I still need more research on Docker and deployment. As a technical debt, I need to redeploy using Docker only as I installed MySQL on the instance myself. This is thinking in terms of scalability since when one is cloning and horizontal scaling, it would be useful to not install MySQL yourself on every instance you create.