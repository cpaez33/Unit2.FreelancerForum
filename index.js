/**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// === Constants ===
const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];
const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Engineer"];
const PRICE_RANGE = { min: 20, max: 200 };
const NUM_FREELANCERS = 100;

// === State ===
function makeFreelancer() {
  const randomName = Math.floor(Math.random() * NAMES.length);
  const randomOccupations = Math.floor(Math.random() * OCCUPATIONS.length);
  const name = NAMES[randomName];
  const occupation = OCCUPATIONS[randomOccupations];
  const rate =
    Math.floor(Math.random() * (PRICE_RANGE.max - PRICE_RANGE.min + 1)) +
    PRICE_RANGE.min;

  return { name, occupation, rate };
}

const freelancersArr = Array.from({ length: NUM_FREELANCERS }, makeFreelancer);
console.log(freelancersArr);

function getAverageRate(freelancers) {
  let totalRate = 0;
  for (const freelancer of freelancers) {
    totalRate += freelancer.rate;
  }
  return totalRate / freelancers.length;
}

function freelancerComponent({ name, occupation, rate }) {
  const tableRow = document.createElement("tr");
  tableRow.innerHTML = `<td>${name}</td>
<td>${occupation}</td>
<td>${rate}</td>`;
  return tableRow;
}

function freelancerRows() {
  const tableRowContent = document.createElement("tbody");
  tableRowContent.id = "table-body";
  const freelancerElements = freelancersArr.map(freelancerComponent);
  // console.log(freelancerElements);
  tableRowContent.replaceChildren(...freelancerElements);
  return tableRowContent;
}

function averageRateComponent() {
  const averageRateLayout = document.createElement("p");
  averageRateLayout.id = "avg-text";
  averageRateLayout.textContent = `The average rate is $${averageRate}`;
  return averageRateLayout;
}

// console.log(getAverageRate(freelancersArr));

const averageRate = getAverageRate(freelancersArr);

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
  <h1>Freelancer Forum</h1>
  <p id="avg-text"></p>
      <table class="freelancer-table">
        <thead>
          <tr>
            <th class="header" scope="col">name</th>
            <th class="header" scope="col">occupation</th>
            <th class="header" scope="col">rate</th>
          </tr>
        </thead>
        <tbody id="table-body"></tbody>
      </table>`;
  $app.querySelector("#table-body").replaceWith(freelancerRows());
  $app.querySelector("#avg-text").replaceWith(averageRateComponent());
}

render();
