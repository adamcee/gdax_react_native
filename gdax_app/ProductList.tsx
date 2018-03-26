import * as React from 'react';
import { Text, View, AppRegistry, Image } from 'react-native';

interface PLProps {
    products: ReadonlyArray<any>;
}

function ProductList({ products }: PLProps) {
    return (
        <View> 
            {products.map((prod, i) => <Text key={i}>{prod.id}</Text>)}
        </View>
    );
}

export default ProductList;