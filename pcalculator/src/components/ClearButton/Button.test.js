import React from "react";

import Button from "./Button";

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { shallow } from "enzyme";

Enzyme.configure({ adapter: new Adapter() });

describe ("rendering components", ()=> {
    it("renders Button component without crashing", ()=> {
        const wrapper = shallow(<Button/>);
        const button = (<Button variant="outlined" >Default</Button>);
        expect(wrapper.contains(button)).toEqual(true);
    });

})