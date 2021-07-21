// import { shallow, mount, render } from 'enzyme';

// const wrapper = shallow(<Foo />);

const retrieve = require("./sum");

let string = "what is the name of that person over there?";

  test("string should be shorter than original", ()=> {
    expect(retrieve(string).split("").length < string.split("").length ).toBe(true);
  });

  test("there should be no vowels", ()=> {
    retrieve(string).split("").forEach((item, idx) => {
        expect(item).toNotBe("a");
    })
})
  

