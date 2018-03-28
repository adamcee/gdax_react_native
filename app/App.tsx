import * as React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Divider, Text } from 'react-native-elements';
import { getProducts } from './src/gdax_api';
import { GDAXProduct, GDAXProductMap } from './src/interfaces/gdax_product';
import { groupProductsByBaseCurrency } from './src/gdax_api_utils';
import { toggleElInUniqueStringArray } from './src/utils';
import QuoteCurrencyList from './src/components/QuoteCurrencyList';

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
    const buttonStyle = {
      backgroundColor: color,
      borderColor: 'black',
      borderBottomWidth: 3,
      borderLeftWidth: 3,
      borderRightWidth: 3,
      width: "100%",
    };

    return (
      <View key={`${id}_view`}>
        <Button 
          key={id}
          title={bcName}
          onPress={this.toggleBaseCurrency.bind(null, bcName)}
          buttonStyle={buttonStyle}
        />
        {isSelected ? <QuoteCurrencyList qcProds={selectedBcProducts} /> : null}
      </View>
    );
  }

  render() {
    const { products, productsByBaseCurrency, baseCurrencies } = this.state;
    return (
      <ScrollView style={styles.container}> 
        <Text h4 style={styles.instructions} >Select a GDAX Base Currency.</Text>
        <Text h4 style={styles.instructions} >Then select a Quote Currency for product info.</Text>
        <Text h4 style={styles.instructions} >Scroll and toggle.</Text>
        <View>
          {this.listBaseCurrencies()}
        </View>
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