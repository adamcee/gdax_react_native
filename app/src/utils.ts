// utils.ts
// utilities and helpers

// Adds an element to an array of strings if it does not exist,
// or removes it from the array if it does.
// IMPORTANT: This function is meant to be used on arrays with unique elements, such as an array of id strings.
//            If used on arrays with repeated elements, it will remove ALL instances of the given element!!!!
export function toggleElInUniqueStringArray(arr: Array<string>, el: string): Array<string> {
  if (!arr.includes(el)) {
    return [...arr, el];
  } else {
    return arr.filter(xe => xe !== el)
  }
}