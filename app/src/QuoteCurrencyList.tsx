// QuoteCurrencyList.tsx
import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { GDAXProduct, GDAXProductMap } from './interfaces/gdax_product';
import { groupProductsByBaseCurrency } from './gdax_api_utils';
import { toggleElInUniqueStringArray } from './utils';

interface ComponentProps {
    qcProds: ReadonlyArray<GDAXProduct>;
}

interface ComponentState {
  products: ReadonlyArray<GDAXProduct>;
  selectedProductIds: Array<string>;
}

export default class QuoteCurrencyList extends React.Component<ComponentProps, ComponentState> {
  constructor(props: any) {
    super(props);
    this.state = {
      products: [],
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

  // show detail info for a product.
  showProductInfo(product: GDAXProduct) {
    const productDetailNames = Object.keys(product);
    return (
      <View>
        {productDetailNames.map((detail, i) => 
          <Text key={i}>{detail}: {product[detail]}</Text>
        )}
      </View>
    );
  }

  render() {
    const { qcProds } = this.props;
    return (
      <View> 
        {qcProds.map((qcp, i) =>
          <Button
            key={i}
            title={qcp.quote_currency}
            onPress={this.toggleProductInfo.bind(null, qcp)}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
});