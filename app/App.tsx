import * as React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { getProducts } from './src/gdax_api';
import { GDAXProduct, GDAXProductMap } from './src/interfaces/gdax_product';
import { groupProductsByBaseCurrency } from './src/gdax_api_utils';
import ProductsForBaseCurrency from './src/components/ProductsForBaseCurrency';

interface AppState {
  products: ReadonlyArray<GDAXProduct>;
  productsByBaseCurrency: GDAXProductMap;
  baseCurrencies: ReadonlyArray<string>;
}

export default class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      products: [],
      productsByBaseCurrency: {},
      baseCurrencies: [],
    };
  }

  componentDidMount() {
    const products = getProducts()
      .then((json) => {
        const groupedProducts: GDAXProductMap = groupProductsByBaseCurrency(json);
        const baseCurrencies: Array<string> = Object.keys(groupedProducts);
        this.setState({
          products: json,
          productsByBaseCurrency: groupedProducts,
          baseCurrencies: baseCurrencies,
        })
      })
      .catch(error => console.log(error));
  }

  render() {
    const { productsByBaseCurrency, baseCurrencies } = this.state;
    return (
      <ScrollView style={styles.container}>
        <Text h4 style={styles.instructions} >Select a GDAX Base Currency.</Text>
        <Text h4 style={styles.instructions} >Then select a Quote Currency for product info.</Text>
        <Text h4 style={styles.instructions} >Scroll and toggle.</Text>
        {baseCurrencies.map((bc, i) =>
          <ProductsForBaseCurrency
            baseCurrencyName={bc}
            products={productsByBaseCurrency[bc]}
            key={i}
            keyVal={i}
          />
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingBottom: 80,
    flex: 1,
  },
  instructions: {
    paddingLeft: 10,
    paddingRight: 10,
  }
});