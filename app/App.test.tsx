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

test('groupProductsByBaseCurrency: correctly groups gdax products by base currency', () => {
  // These values were manually gotten from mocks/gdax_products.json
  const mockBaseCurrencies = ['BTC', 'ETH', 'LTC', 'BCH'];
  const BTC = 'BTC';
  const ETH = 'ETH';
  const LTC = 'LTC';
  const BCH = 'BCH';

  const numBTC = 2;
  const numETH = 2;
  const numLTC = 2;
  const numBCH = 2;

  const groupedProducts = groupProductsByBaseCurrency(mockGDAXProducts);
  const groupBTC = groupedProducts[BTC];
  const groupETH = groupedProducts[ETH];
  const groupLTC = groupedProducts[LTC];
  const groupBCH = groupedProducts[BCH];

  // each base currency has an array constructed on the object
  expect(groupBTC).toBeInstanceOf(Array);
  expect(groupETH).toBeInstanceOf(Array);
  expect(groupLTC).toBeInstanceOf(Array);
  expect(groupBCH).toBeInstanceOf(Array);

  // each base currency array contains the expected number of products
  expect(groupBTC.length).toEqual(numBTC);
  expect(groupETH.length).toEqual(numETH);
  expect(groupLTC.length).toEqual(numLTC);
  expect(groupBCH.length).toEqual(numBCH);

  // the total number of products in the original array and in our map is the same
  const sumGroups = groupBTC.length + groupETH.length + groupLTC.length + groupBCH.length;
  expect(sumGroups).toEqual(mockBaseCurrencies.length);

  // each base currency array only contains products of the desired base currency
  groupBTC.forEach(product => expect(product.base_currency).toEqual(BTC));
  groupETH.forEach(product => expect(product.base_currency).toEqual(ETH));
  groupLTC.forEach(product => expect(product.base_currency).toEqual(LTC));
  groupBCH.forEach(product => expect(product.base_currency).toEqual(BCH));
});