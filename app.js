/*This is the main file which is the first point of entry for the exercise
Routes are defined in the routes folder and the functions called in routes are defined in controller. */
const express = require("express");
const app = express();
const port = 3000;
const people = require("./routes/people.router");
const planets = require("./routes/planets.router");

app.use("/people", people); //endpoint people to see the list of people
app.use("/planets", planets); //endpoint planet to see the list of planets

app.listen(port, () => console.log(`Server is running in ${port}`));



