// async.ts
// functions for asynchronous http calls

// TODO: Either pass a whatwg url type in to all the getResource functions as the only param,
//      or define an interface so we dont have to repeat stuff.
// TODO: Convert to whatwg URL and check is valid, use TS builtin for this
export function getJSONResource(host: string, resourceName: string) {
    return getResource(host, resourceName)
        .then(response => response.json());
}

export function getResource(host: string, resourceName: string) {
    return fetch(`${host}/${resourceName}`)
        .then(handleErrors);
}

export function handleErrors(response: Response) {
    if(!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}