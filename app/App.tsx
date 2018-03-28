import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { getProducts } from './src/gdax_api';
import { GDAXProduct, GDAXProductMap } from './src/interfaces/gdax_product';
import { groupProductsByBaseCurrency } from './src/gdax_api_utils';
import { toggleElInUniqueStringArray } from './src/utils';
import QuoteCurrencyList from './src/QuoteCurrencyList';

interface GDAXProductState {
  products: ReadonlyArray<GDAXProduct>;
  productsByBaseCurrency: GDAXProductMap;
  baseCurrencies: ReadonlyArray<string>;
}

interface SelectedProductsState {
  selectedBaseCurrencies: Array<string>;
}

interface AppState extends GDAXProductState, SelectedProductsState {
}

export default class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      products: [],
      productsByBaseCurrency: {},
      baseCurrencies: [],
      selectedBaseCurrencies: [],
    };

    this.toggleBaseCurrency = this.toggleBaseCurrency.bind(this);
  }

  componentDidMount() {
    console.log("ABOUT TO FETCH");
      const products = getProducts()
        .then(( json ) => {
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

  // toggle if the quote currencies belonging to a given base currency are displayed or not.
  toggleBaseCurrency(baseCurrency: string) {
    console.log('STATE IS: ', this.state)
    const { selectedBaseCurrencies } = this.state;
    console.log('OLD ', selectedBaseCurrencies)
    const updated = toggleElInUniqueStringArray(selectedBaseCurrencies, baseCurrency);
    console.log('NEW ', updated)
    this.setState(prev => ({
      selectedBaseCurrencies: updated
    }));
  }

  // list all the base currencies
  listBaseCurrencies() {
    const { productsByBaseCurrency, baseCurrencies, selectedBaseCurrencies } = this.state;
    return baseCurrencies.map((bc, i) => 
      this.listBaseCurrency(bc, selectedBaseCurrencies, productsByBaseCurrency[bc])
    );
  }

  listBaseCurrency(bcName: string, selectedBcs: ReadonlyArray<string>, selectedBcProducts:  ReadonlyArray<GDAXProduct>) {
      const isSelected = selectedBcs.includes(bcName);
      const style = isSelected ? styles.selectedButton : styles.button
      return (
        <View>
          <Button
            key={bcName}
            title={bcName}
            onPress={this.toggleBaseCurrency.bind(null, bcName)}
          />
          {isSelected ? <QuoteCurrencyList qcProds={selectedBcProducts} /> : null }       
        </View>
      );
  }

  render() {
    const { products, productsByBaseCurrency, baseCurrencies } = this.state;
    return (
      <View style={styles.container}>
        <Text>Open up App.ts to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <View> 
          {this.listBaseCurrencies()}
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
  button: {
    backgroundColor: 'blue',
  },
  selectedButton: {
    backgroundColor: 'green',
  },
});