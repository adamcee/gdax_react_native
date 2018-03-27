import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { getProducts } from './src/gdax_api';
import { GDAXProduct, GDAXProductMap } from './src/interfaces/gdax_product';
import { groupProductsByBaseCurrency } from './src/gdax_api_utils';

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
    console.log("ABOUT TO FETCH");
      const products = getProducts()
        .then(( json ) => {
          const groupedProducts: GDAXProductMap = groupProductsByBaseCurrency(json);
          const baseCurrencies: Array<string> = Object.keys(groupedProducts);
          console.log('BASE CURRENCIES: ', baseCurrencies);
          console.log('GROUPED PRODUCTS: ', groupedProducts);
          this.setState({
            products: json,
            productsByBaseCurrency: groupedProducts,
            baseCurrencies: baseCurrencies,
          })
        })
        .catch(error => console.log(error));
  }

  listProducts(products: Array<GDAXProduct>) {
    let container: GDAXProductMap = {};
    const baseCurrencies = products.reduce(groupProductsByBase, container);
    function groupProductsByBase(container: GDAXProductMap, product: GDAXProduct): any {
      const base_currency = product.base_currency;
      if (!container.hasOwnProperty(base_currency)) {
        container[base_currency] = [] as Array<GDAXProduct>;
      }
    }

    function onPress(product: GDAXProduct): any {
      console.log(product.id);
    }
    return  products.map((prod, i) => 
      <Button 
        title={prod.id}
        onPress={onPress.bind(null, prod)}
        key={i}
      />
    );
  }

  render() {
    const { products, productsByBaseCurrency, baseCurrencies } = this.state;
    return (
      <View style={styles.container}>
        <Text>Open up App.ts to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <View style={styles.products}>
          {
            baseCurrencies.map((bc, i) => {
              const products = productsByBaseCurrency[bc];
              return (<Text key={i}>{bc}</Text>);
            })
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  products: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
});