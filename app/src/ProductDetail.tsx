// ProductDetail.tsx
// Show detailed information for a GDAX Product 
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GDAXProduct } from './interfaces/gdax_product';

interface ComponentProps {
  product: GDAXProduct;
}

interface ComponentState {
}

export default class ProductDetail extends React.Component<ComponentProps, ComponentState> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        console.log('PRODUCT DETAIL: ', this.props.product);
    }

    render() {
        const { product } = this.props;
        const productDetailNames = Object.keys(product);
        return (
            <View>
                {productDetailNames.map((detail, i) =>
                    <Text key={i}>{detail}: {product[detail]}</Text>
                )}
            </View>
        );
    }
}