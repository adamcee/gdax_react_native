import * as React from 'react';
import App from '../App';
import QuoteCurrencyList from '../src/components/QuoteCurrencyList';
import ProductDetail from '../src/components/ProductDetail';
import ProductsForBaseCurrency from '../src/components/ProductsForBaseCurrency';
import { groupProductsByBaseCurrency } from '../src/gdax_api_utils';
const mockGDAXProducts = require('../mocks/gdax_products.json');

import * as renderer from 'react-test-renderer';

// NOTE: ignore typescript ide warnings related to mock fetch functions -- 
// we just dont have type defs for the 'jest-fetch-mock' lib we are using.

describe('test the <App /> component', () => {
  beforeEach(() => {
    // reset the mock data used by fetch
    fetch.resetMocks()
    // We must do this so that the mock fetch actually has data.
    fetch.mockResponseOnce(JSON.stringify(mockGDAXProducts));
  });

  // both of these also are basially integration tests for our async functions,
  // as we call getProducts() with our mock fetch.
  it('renders without crashing', () => {
    const rendered = renderer.create(<App />).toJSON();
    expect(rendered).toBeTruthy();
  });

  it('<App /> renders correctly', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
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

  it('<ProductsForBaseCurrency /> renders correctly', () => {
    const bc = baseCurrencies[0];
    const products = groupedProducts[bc];
    const tree = renderer.create(<ProductsForBaseCurrency products={products} baseCurrencyName={bc} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});