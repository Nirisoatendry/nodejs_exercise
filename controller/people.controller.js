const axios = require("axios");
const url = "https://swapi.dev/api/people/";//resource url
const getPeople = (req, res) => {
  const sortBy = req.query.sortBy ?? null;// return a value for an optional query param sortBy that allows the array to be sorted by name, height, or mass.
  // console.log(sortBy);
  const getPeoplePromise = [];//array containing the promise requests
  for (i = 1; i < 10; i++) {
    getPeoplePromise.push(
      new Promise((resolve, reject) => {
        axios.get(`${url}` + `?page=${i}`).then((res) => {
          resolve(res.data);
        });
      })
    );
  }
  // console.log(getPeoplePromise);
  let allPeople = [];
  Promise.all(getPeoplePromise).then((peoples) => {
    peoples.forEach((people) => {
      // console.log('page ***',people);
      people.results.forEach((p) => {
        allPeople.push(p);
      });
    });
    if (sortBy) {
      switch (sortBy) {
        case "name":
          allPeople.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "height":
          allPeople.sort((a, b) => parseInt(a.height) - parseInt(b.height));
          break;
        case "mass":
          allPeople.sort((a, b) => parseInt(a.mass) - parseInt(b.mass));
          break;
      }
    }
    // console.log(allPeople,allPeople.length);
    return res.json(allPeople);
  });
};
module.exports = { getPeople };
