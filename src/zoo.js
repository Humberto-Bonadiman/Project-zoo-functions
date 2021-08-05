const { species, prices } = require('./data');
const data = require('./data');

const getSpeciesByIds = (...ids) =>
  species.filter((animals, identifier) => animals.id === ids[identifier]);

function getAnimalsOlderThan(animal, minimumAge) {
  const findAnimal = species.find((specie) => specie.name === animal);
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
  const findSpecie = species.find((animal) => animal.name === specie);
  return findSpecie.residents.length;
}
console.log(countAnimals('elephants'));

function calculateEntry(entrants) {
  let total = 0;
  if (entrants === undefined || Object.values(entrants).length === 0) return 0;
  Object.keys(entrants).forEach((property) => {
    total += entrants[property] * prices[property];
  });
  return total;
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
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
