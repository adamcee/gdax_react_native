// gdax_api_utils.ts
// helper functions for the gdax api and manipulating data it returns
import { GDAXProduct, GDAXProductMap } from './interfaces/gdax_product';


// Takes an array of products with various base currencies 
// and returns a dict grouped by base currency.
export function groupProductsByBaseCurrency(products: Array<GDAXProduct>): GDAXProductMap {
    let container: GDAXProductMap = {};

    const groupedProducts = products.reduce(groupProductsByBase, container);

    function groupProductsByBase(container: GDAXProductMap, product: GDAXProduct): any {
        const base_currency = product.base_currency;
        if (!container.hasOwnProperty(base_currency)) {
            container[base_currency] = [] as Array<GDAXProduct>;
        } else {
            container[base_currency].push(product);
        }
        return container;
    }

    return groupedProducts;
}