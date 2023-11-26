const str = "Dashbot 30";
const quantity = 2;
const nenbotArray = [
  {
    name: "Nenbot 30D",
    days: 30,
    key: "asdasqfq",
  },
  {
    name: "Nenbot 30D",
    days: 30,
    key: "123",
  },
  {
    name: "Nenbot 15D",
    days: 15,
    key: "asdasqfq",
  },
];

const splitted = str.split(" ")[1];
const filteredNenbots = nenbotArray.filter(
  (result) => result.days === parseInt(splitted)
);

let array = [];

if (filteredNenbots.length < 1) {
  console.error("No have nenbots");
} else {
  for (let index = 0; index < quantity; index++) {
    array.push(filteredNenbots[0]);
    filteredNenbots.shift();
  }
}

console.log(array);
