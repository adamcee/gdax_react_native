import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getProducts } from './gdax_api';

interface AppState {
  products: ReadonlyArray<any>
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
    return  products.map(p => <Text style={styles.product}>{p.id}</Text>);
  }

  render() {
    const { products } = this.state;
    return (
      <View style={styles.container}>
        <Text>Open up App.ts to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        {this.listAvailableProducts()}
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
  product: {
    alignItems: 'flex-start',
    backgroundColor: '#fff',
  },
});
