const axios = require("axios");
const getPlanet = (req, res) => {
  const url = "https://swapi.dev/api/planets/"; //resource url
  const getPlanetPromise = []; //array containing the promise requests
  for (i = 1; i < 7; i++) {
    getPlanetPromise.push(
      new Promise((resolve, reject) => {
        axios.get(`${url}` + `?page = ${i}`).then(async (res) => {
          const planetes = res.data.results;
          resolve(planetes);
        });
      })
    );
  }
  //   console.log(getPlanetPromise)
  let allPlanets = [];
  Promise.all(getPlanetPromise)
    .then(async (planetsInPage) => {
      for (const planetes of planetsInPage) {
        for (const planete of planetes) {
          const residentPromise = planete.residents.map(async (link) => {
            const res = await axios.get(link);
            return res.data.name;
          });

          const residents = await Promise.all(residentPromise);
          planete.residents = residents;
          allPlanets.push(planete);
        }
      }
      return res.json(allPlanets);
    })
    .catch((error) => {
      console.error(
        "Une erreur s'est produite lors de la récupération des planètes :",
        error
      );
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des planètes." });
    });
};
module.exports = { getPlanet };
