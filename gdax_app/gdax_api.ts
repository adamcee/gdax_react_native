// gdax_api.ts
// interact with the gdax public gdax_api
const GDAX_SANDBOX_HOST = 'https://api.public.dax.com';

function getProducts() {
    return getResource(GDAX_SANDBOX_HOST, 'products');
}

// TODO: Either pass a whatwg url type in to all the getResource functions as the only param,
//      or define an interface so we dont have to repeat stuff.
// TODO: Convert to whatwg URL and check is valid, use TS builtin for this
function getJSONResource(host: string, resourceName: string) {
    return getResource(host, resourceName)
            .then(response => response.json());
}
function getResource(host: string, resourceName: string) {
    return fetch(`${host}/${resourceName}`)
        .then(handleErrors);
}

function handleErrors(response: Response) {
    if(!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}