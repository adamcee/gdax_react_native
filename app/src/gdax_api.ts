// gdax_api.ts
// interact with the gdax public gdax_api
import { getJSONResource } from './async';

export const GDAX_SANDBOX_HOST = 'https://api-public.sandbox.gdax.com';

export function getProducts() {
    return getJSONResource(GDAX_SANDBOX_HOST, 'products');
}