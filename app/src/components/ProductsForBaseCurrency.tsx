// ProductsForBaseCurrency.tsx
// Toggle button to view all the products for a base currency
import * as React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { GDAXProduct } from '../interfaces/gdax_product';
import QuoteCurrencyList from './QuoteCurrencyList';

interface ComponentState {
    isSelected: boolean;
}

interface ComponentProps {
    baseCurrencyName: string;
    products: ReadonlyArray<GDAXProduct>;
    keyVal: number,
}

export default class ProductsForBaseCurrency extends React.Component<ComponentProps, ComponentState> {
  constructor(props: any) {
    super(props);
    this.state = {
        isSelected: false,
    };
    this.toggleViewProducts = this.toggleViewProducts.bind(this);
  }

  // toggle if we view the products (quote currencies) for our base currency
  toggleViewProducts() {
      this.setState(prev => ({isSelected: !prev.isSelected}));
  }

  render() {
    const { baseCurrencyName, products, keyVal  } = this.props;
    const { isSelected } = this.state;
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
      <View key={`${baseCurrencyName}_component_view_${keyVal}`}>
        <Button 
          key={`${baseCurrencyName}_button_${keyVal}`}
          title={baseCurrencyName}
          onPress={this.toggleViewProducts}
          buttonStyle={buttonStyle}
        />
        {isSelected ? <QuoteCurrencyList qcProds={products} /> : null}
      </View>
    );
  }
}