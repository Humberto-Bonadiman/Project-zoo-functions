const { species, prices, hours } = require('./data');
const data = require('./data');

const getSpeciesByIds = (...ids) =>
  species.filter((animals, identifier) => animals.id === ids[identifier]);

function getAnimalsOlderThan(animal, minimumAge) {
  const findAnimal = species.find((specie) => specie.name === animal);
  console.log(findAnimal);
  const resident = findAnimal.residents;
  return resident.every((one) => one.age >= minimumAge);
}
console.log(getAnimalsOlderThan('elephants', 3));

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

/* Com a opção includeNames: true especificada, retorna nomes de animais
Com a opção sorted: true especificada, retorna nomes de animais ordenados
Com a opção sex: 'female' ou sex: 'male' especificada, retorna somente nomes de animais macho/
fêmea
Com a opção sex: 'female' ou sex: 'male' especificada e a opção sort: true especificada,
retorna somente nomes de animais macho/fêmea com os nomes dos animais ordenados
Só retorna informações ordenadas e com sexo se a opção includeNames: true for especificada */
function getAnimalMap(options) {
  if (options === undefined) {
    return {
      NE: ['lions', 'giraffes'],
      NW: ['tigers', 'bears', 'elephants'],
      SE: ['penguins', 'otters'],
      SW: ['frogs', 'snakes'],
    };
  }
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
