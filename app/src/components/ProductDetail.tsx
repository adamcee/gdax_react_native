// ProductDetail.tsx
// Show detailed information for a GDAX Product 
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-elements';
import { GDAXProduct } from '../interfaces/gdax_product';

interface ComponentProps {
  product: GDAXProduct;
}

interface ComponentState {
}

export default class ProductDetail extends React.Component<ComponentProps, ComponentState> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const { product } = this.props;
        const productDetailNames = Object.keys(product);
        return (
            <Card wrapperStyle={{ marginLeft: 20, marginRight: 20}} >
                {productDetailNames.map((detail, i) =>
                    <Text key={i}><Text h4>{detail}</Text>: {product[detail]}</Text>
                )}
            </Card>
        );
    }
}