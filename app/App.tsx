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

  // toggle if the quote currencies belonging to a given base currency are displayed or not.
  toggleBaseCurrency(baseCurrency: string) {
    const { selectedBaseCurrencies } = this.state;
    const updated = toggleElInUniqueStringArray(selectedBaseCurrencies, baseCurrency);
    this.setState(prev => ({
      selectedBaseCurrencies: updated
    }));
  }

  // list all the base currencies
  listBaseCurrencies() {
    const { productsByBaseCurrency, baseCurrencies, selectedBaseCurrencies } = this.state;
    return baseCurrencies.map((bc, i) =>
      this.listBaseCurrency(i, bc, selectedBaseCurrencies, productsByBaseCurrency[bc])
    );
  }

  listBaseCurrency(id: number, bcName: string, selectedBcs: ReadonlyArray<string>, selectedBcProducts: ReadonlyArray<GDAXProduct>) {
    const isSelected = selectedBcs.includes(bcName);
    const color = isSelected ? '#33FF4F' : '#33B5FF';
    return (
      <View key={`${id}_view`}>
        <Button color={color}
          key={id}
          title={bcName}
          onPress={this.toggleBaseCurrency.bind(null, bcName)}
        />
        {isSelected ? <QuoteCurrencyList qcProds={selectedBcProducts} /> : null}
      </View>
    );
  }

  render() {
    const { products, productsByBaseCurrency, baseCurrencies } = this.state;
    return (
      <View style={styles.container}>
        <Text>Press a button to hide/show information.</Text>
        <Text>Select a GDAX Base Currency to see which Quote Currencies are available for it.</Text>
        <Text>You can then select a Quote Currency to see detailed product info.</Text>
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
});