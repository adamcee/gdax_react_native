// main_screen_test.ts
import React from 'react';
import App from '../App';

import renderer from 'react-test-renderer';

test('renders main screen correctly', () => {
const tree = renderer.create(<App/>).toJSON();
    expect(tree).toMatchSnapshot();

});