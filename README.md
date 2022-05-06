# Horse races application for Telia internship
The basic application to create and run horse races, with the additional login capability and betting system, which awards players when they bet on the winning horse calculating the coefficient based on the information of other bets. 
## How to run locally:
1. Copy the repository
2. Create a **PostgreSQL** database
3. Link the database in **application.properties** file, which is located in server folder. 
4. Confugure the url with a port in **spring.datasource.url** field, the username in **spring.datasourse.username** and the password in **spring.datasource.password** field
5. Run **npm install** in client folder
6. Run **npm start** in client folder 

An example of application.properties file, which is also present in this repository:
<img width="736" alt="image" src="https://user-images.githubusercontent.com/22565000/167058703-20682f9d-b6bf-4a15-a185-b31a1f68b18c.png">

Link to the app on heroku: [https://horse-races-frontend.herokuapp.com/]

Heroku app has one crucial difference: the page refresh does not work anywhere except the starting page, because of the React's single page architecture (I use React-Router to imitate a multi-page application). This means that the result of some buttons may not be visible, but choosing the different page on the navigation bar fixes it. The local version does not have this issue, because I use window.location.reload() in two places where I need the page to refresh manually. Since I learned about this only when I was deploying the application to Heroku, I didn't have time to fix the problem, but I assume this will not take me very long.

From the technical side of the application I should also mention that as of now the results of the races are not sorted by placements of the horses. This is a small but important thing which I couldn't get my hands on yet.

Another thing that is worth noticing is the fact that I use express on frontend, which is deployed on Heroku, in order to run the frontend there. This means that I have two servers: the Spring Boot on the backend and the Express on the frontend.

