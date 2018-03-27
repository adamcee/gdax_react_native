import * as React from 'react';
import App from './App';
import { GDAXProductMap, GDAXProduct } from './src/interfaces/gdax_product';
import { groupProductsByBaseCurrency } from './src/gdax_api_utils';
const mockGDAXProducts = require('./mocks/gdax_products.json');

import * as renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});

// test non-component-specific code - helper functions, etc
test('GDAXProduct Interface: interface is correct for key properties in our mock data', () => {
  const product: GDAXProduct = mockGDAXProducts[0];
  expect(product.hasOwnProperty('id')).toBeTruthy;
  expect(product.hasOwnProperty('base_currency')).toBeTruthy;
  expect(product.hasOwnProperty('quote_currency')).toBeTruthy;
  expect(product.hasOwnProperty('display_name')).toBeTruthy;

});

describe('groupProductsByBaseCurrency: correctly groups gdax products by base currency', () => {
  // These values were manually gotten from mocks/gdax_products.json
  const mockBaseCurrencies = ['BTC', 'ETH', 'LTC', 'BCH'];
  const BTC = 'BTC';
  const ETH = 'ETH';
  const LTC = 'LTC';
  const BCH = 'BCH';

  const numBTC = 3;
  const numETH = 3;
  const numLTC = 3;
  const numBCH = 3;

  const groupedProducts = groupProductsByBaseCurrency(mockGDAXProducts);
  const groupBTC = groupedProducts[BTC];
  const groupETH = groupedProducts[ETH];
  const groupLTC = groupedProducts[LTC];
  const groupBCH = groupedProducts[BCH];

  it('should have an object property keyed to each base currency, which contains an array', () => {
    expect(groupBTC).toBeInstanceOf(Array);
    expect(groupETH).toBeInstanceOf(Array);
    expect(groupLTC).toBeInstanceOf(Array);
    expect(groupBCH).toBeInstanceOf(Array);
  });

  it('should contains the expected number of products in each base currencys array', () => {
    expect(groupBTC.length).toEqual(numBTC);
    expect(groupETH.length).toEqual(numETH);
    expect(groupLTC.length).toEqual(numLTC);
    expect(groupBCH.length).toEqual(numBCH);
  });

  it('should have the same number of elements in its arrays (sum of all arrays) as the array of all products of all base currencies', () => {
    const sumGroups = groupBTC.length + groupETH.length + groupLTC.length + groupBCH.length;
    expect(sumGroups).toEqual(mockGDAXProducts.length);
  });

  it('should only contain products of the desired base currency in each array', () => {
    groupBTC.forEach(product => expect(product.base_currency).toEqual(BTC));
    groupETH.forEach(product => expect(product.base_currency).toEqual(ETH));
    groupLTC.forEach(product => expect(product.base_currency).toEqual(LTC));
    groupBCH.forEach(product => expect(product.base_currency).toEqual(BCH));
  });
});