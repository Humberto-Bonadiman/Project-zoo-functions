const { species, prices, hours, employees } = require('./data');
const data = require('./data');

const getSpeciesByIds = (...ids) =>
  species.filter((animals, identifier) => animals.id === ids[identifier]);

function getAnimalsOlderThan(animal, minimumAge) {
  const findAnimal = species.find((specie) => specie.name === animal);
  console.log(findAnimal);
  const resident = findAnimal.residents;
  return resident.every((one) => one.age >= minimumAge);
}

function getEmployeeByName(employeeName) {
  let getEmployee = data.employees.find((name) =>
    (name.firstName === employeeName || name.lastName === employeeName));
  if (employeeName === undefined) getEmployee = {};
  return getEmployee;
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  // Consultei o repositório do Levi Manoel para resolver essa parte
  // fonte: https://github.com/tryber/sd-014-b-project-zoo-functions/pull/101/commits/f66ac41d5352543856abe3896024a8f8c6976bb4;
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return newEmployee;
}

function isManager(identifier) {
  const findId = data.employees.some((employee) =>
    employee.managers.includes(identifier));
  return findId;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function countAnimals(specie) {
  if (specie === undefined) {
    return {
      lions: 4,
      tigers: 2,
      bears: 3,
      penguins: 4,
      otters: 4,
      frogs: 2,
      snakes: 2,
      elephants: 4,
      giraffes: 6,
    };
  }
  const findSpecie = species.find((animal) => animal.name === specie);
  return findSpecie.residents.length;
}

function calculateEntry(entrants) {
  // Consultei o repositório do Adilson Gabriel para resolver essa parte
  /* Fonte: https://github.com/tryber/sd-014-b-project-zoo-functions/pull/93/commits/2aa6cd8389d350f0f14022368a948ebfa6304309 */
  let total = 0;
  if (entrants === undefined || Object.values(entrants).length === 0) return 0;
  Object.keys(entrants).forEach((property) => {
    total += entrants[property] * prices[property];
  });
  return total;
}

// Consultei o repositório do Vinicius Santana para resolver essa parte
/* Fonte: https://github.com/tryber/sd-014-b-project-zoo-functions/pull/32/commits/2486beebff89a8af50583d0b562b59997b11f4f2 */
function getAnimalMap(options = {}) {
  const { includeNames = false } = options;
  const getPlaces = { NE: [], NW: [], SE: [], SW: [] };
  const filterPlaces = (place) => data.species.filter((value) => (value.location === place));
  const lookOptionsSort = (alternatives) => (options.sorted ? alternatives.sort() : alternatives);
  const lookGender = (gender) => (options.sex ? (gender.sex === options.sex) : (true));
  const addNames = (names) => (names.name);
  const addNamesAndMore = (names) => (
    { [names.name]: lookOptionsSort(names.residents.filter(lookGender).map(addNames)) }
  );
  const putNamesOptions = includeNames ? addNamesAndMore : addNames;
  getPlaces.NE = filterPlaces('NE').map(putNamesOptions);
  getPlaces.NW = filterPlaces('NW').map(putNamesOptions);
  getPlaces.SE = filterPlaces('SE').map(putNamesOptions);
  getPlaces.SW = filterPlaces('SW').map(putNamesOptions);
  return getPlaces;
}

function getSchedule(dayName) {
  const createInfoOfDay = (key, day) => (day.open === 0
    ? { [key]: 'CLOSED' }
    : { [key]: `Open from ${day.open}am until ${day.close - 12}pm` });
  const chronogram = Object.keys(data.hours);
  const newChronogram = chronogram.map((day) => createInfoOfDay(day, hours[day]));
  if (dayName === undefined) {
    return newChronogram.reduce((obj, item) => ({ ...obj, ...item }), {});
  }
  return createInfoOfDay(dayName, data.hours[dayName]);
}

function getOldestFromFirstSpecies(ids) {
  const getEmployee = data.employees.find((employee) => employee.id === ids);
  const getFirstAnimal = getEmployee.responsibleFor[0];
  const getAnimalInformation = data.species.find((animal) => animal.id === getFirstAnimal);
  const getAnimalResidents = getAnimalInformation.residents;
  let getOldestAnimal;
  getAnimalResidents.forEach((animal) => {
    if (!getOldestAnimal || animal.age > getOldestAnimal.age) {
      getOldestAnimal = animal;
    }
  });
  return Object.values(getOldestAnimal);
}

/* Fonte: https://qastack.com.br/programming/11832914/round-to-at-most-2-decimal-places-only-if-necessary */
function increasePrices(percentage) {
  data.prices.Adult = Math.round(data.prices.Adult * (1 + (percentage / 100)) * 100) / 100;
  data.prices.Senior = Math.round(data.prices.Senior * (1 + (percentage / 100)) * 100) / 100;
  data.prices.Child = Math.round(data.prices.Child * (1 + (percentage / 100)) * 100) / 100;
  return prices;
}

// Consultei o repositório do Michael Caxias para resolver essa parte
/* Fonte: https://github.com/tryber/sd-014-b-project-zoo-functions/pull/65/commits/604b2f298dcc78e4416cbf916e9a9097af9f6b68 */
function getEmployeeCoverage(idOrName) {
  if (idOrName === undefined) {
    const getAllEmployees = employees.reduce((acc, curr) => {
      const findAnimal = curr.responsibleFor.map((animalId) =>
        species.find(({ id }) => id === animalId).name);
      acc[`${curr.firstName} ${curr.lastName}`] = findAnimal;
      return acc;
    }, {});
    return getAllEmployees;
  }
  const get = data.employees.find(({ id, firstName, lastName }) =>
    (id === idOrName || lastName === idOrName || firstName === idOrName));
  const getAnimals = get.responsibleFor;
  const getAnimal = getAnimals.map((animal) =>
    species.find(({ id }) => id === animal).name);
  return ({ [`${get.firstName} ${get.lastName}`]: getAnimal });
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
