// QuoteCurrencyList.tsx
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { GDAXProduct } from '../interfaces/gdax_product';
import { toggleElInUniqueStringArray } from '../utils';
import ProductDetail from './ProductDetail';

interface ComponentProps {
    qcProds: ReadonlyArray<GDAXProduct>;
}

interface ComponentState {
  selectedProductIds: Array<string>;
}

export default class QuoteCurrencyList extends React.Component<ComponentProps, ComponentState> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedProductIds: [],
    };
    this.toggleProductInfo = this.toggleProductInfo.bind(this);
  }

  // toggle if info for a product is displayed or not.
  toggleProductInfo(productId: string) {
    const { selectedProductIds } = this.state;
    const updated = toggleElInUniqueStringArray(selectedProductIds, productId);
    this.setState(prev => ({
      selectedProductIds: updated
    }));
  }

  hideShowProductDetail(selectedProductIds: ReadonlyArray<string>, product: GDAXProduct, key: number) {
    const isSelected = selectedProductIds.includes(product.id);
    console.log('PRODUCT ${product.id}, selected is: ', isSelected);
    if(isSelected) {
      return (
        <ProductDetail product={product} key={`${key}_prod`} />
      );
    }
    return null;
  }

  render() {
    const { qcProds } = this.props;
    const { selectedProductIds } = this.state;
    const buttonBaseStyle = {
      borderColor: 'black',
      borderLeftWidth: 5,
      borderRightWidth: 5,
    };

    return (
      <View key={`qc_view_${qcProds[0].quote_currency}`}> 
        {qcProds.map((qcp, i) => {
          const backgroundColor = selectedProductIds.includes(qcp.id) ? '#33E9FF' : 'white';
          const buttonStyle = Object.assign({}, buttonBaseStyle, {backgroundColor: backgroundColor});

          return (
            <View key={`prod_view_${i}`}>
              <Button
                key={i}
                title={qcp.quote_currency}
                color='black'
                onPress={this.toggleProductInfo.bind(null, qcp.id)}
                buttonStyle={buttonStyle}
              />
              {this.hideShowProductDetail(selectedProductIds, qcp, i)}
            </View>
          );
        })}
      </View>
    );
  }
}