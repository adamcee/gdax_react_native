import * as React from 'react';
import { Text, View, AppRegistry, Image } from 'react-native';
import ProductList from './ProductList';
import { defaultStyles } from './styles';

export default class App extends React.Component<{}> {
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
    };
    const myProducts = [
      {id: 'One'},
      {id: 'Two'},
      {id: 'Three'},
      {id: 'Four'}
    ]
    return (
      <View style={defaultStyles.container}>
        <Text>Open up App.ts to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Text>Hello wordl!</Text>
        <Image source={pic} style={{width: 193, height: 110}} />
        <ProductList products={myProducts} />
      </View>
    );
  }
}

