// async.ts
// functions for asynchronous http calls

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