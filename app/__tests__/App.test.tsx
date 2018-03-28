import * as React from 'react';
import App from '../App';
import QuoteCurrencyList from '../src/components/QuoteCurrencyList';
import ProductDetail from '../src/components/ProductDetail';
import { groupProductsByBaseCurrency } from '../src/gdax_api_utils';
const mockGDAXProducts = require('../mocks/gdax_products.json');

import * as renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});

it('<App /> renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('test child components which require props', () => {
  const groupedProducts = groupProductsByBaseCurrency(mockGDAXProducts);
  const baseCurrencies = Object.keys(groupedProducts);
  // all quote currences for the first base currency.
  const qcProducts = groupedProducts[baseCurrencies[0]];

  const someProduct = qcProducts[0];

  it('<QuoteCurrencyList /> renders correctly', () => {
    const tree = renderer.create(<QuoteCurrencyList qcProds={qcProducts} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('<ProductDetail /> renders correctly', () => {
    const tree = renderer.create(<ProductDetail product={someProduct} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});


