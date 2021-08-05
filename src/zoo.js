const { species } = require('./data');
const data = require('./data');

const getSpeciesByIds = (...ids) =>
  species.filter((animals, identifier) => animals.id === ids[identifier]);

console.log(getSpeciesByIds('0938aa23-f153-4937-9f88-4858b24d6bce'));

function getAnimalsOlderThan(animal, minimumAge) {
  const findAnimal = species.find((specie) => specie.name === animal);
  const resident = findAnimal.residents;
  return resident.every((one) => one.age >= minimumAge);
}
console.log(getAnimalsOlderThan('penguins', 10));

function getEmployeeByName(employeeName) {
  let getEmployee = data.employees.find((name) =>
    (name.firstName === employeeName || name.lastName === employeeName));
  if (employeeName === undefined) getEmployee = {};
  return getEmployee;
}
console.log(getEmployeeByName());

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
console.log(isManager('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'));

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function countAnimals(specie) {
  // seu código aqui
}

function calculateEntry(entrants) {
  // seu código aqui
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
