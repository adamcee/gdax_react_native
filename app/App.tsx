import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { getProducts } from './src/gdax_api';
import { gdaxProduct } from './src/interfaces/gdax_product';

interface AppState {
  products: ReadonlyArray<gdaxProduct>
}

export default class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    console.log("ABOUT TO FETCH");
      const products = getProducts()
        .then(json => this.setState({products: json}))
        .catch(error => console.log(error));
  }

  listAvailableProducts() {
    const { products } = this.state;
    function onPress(product: gdaxProduct): any {
      console.log(product.id);
    }
    return  products.map((prod, i) => 
      <Button 
        title={"test"}
        onPress={onPress.bind(null, prod)}
        key={i}
      />
    );
  }

  render() {
    const { products } = this.state;
    return (
      <View style={styles.container}>
        <Text>Open up App.ts to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <View style={styles.products}>
          {this.listAvailableProducts()}
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
