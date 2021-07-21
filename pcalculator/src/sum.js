// import { configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// configure({ adapter: new Adapter() });

//find the numbers that add up to 10

let string = "what is the name of that person over there?";

const retrieve = (str) => {
  
  return str.split("").map((item, idx) => {
    if (item !== "a" && item !== "e" && item !== "i" && item !== "o" && item !== "u") {
      return item
    } else {
      return null
    }
  }).filter((item) => item !== null).join("");
  
}

retrieve(string);

module.exports = retrieve;