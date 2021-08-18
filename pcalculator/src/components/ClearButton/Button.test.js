import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Button from "./Button";

configure({ adapter: new Adapter() });

describe("button test", ()=> {
    let wrapper;

beforeEach(()=> {
wrapper = shallow(<Button />);

});

test('render a button with the text default', ()=> {
    expect(wrapper.find("button").text()).toBe("Default");
});

});