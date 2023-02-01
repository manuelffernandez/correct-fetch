import { KeyValueParam, ResponseObject, APIResource } from "../interfaces";

// the base URL to fetch resources. This value is usually stored in an environment var
const API_URL: URL = new URL("");

// options to set in fetch
const options = {};

// this value can change depending on the differents request that the user made
let queryParams = [];

const setURLParams = (KeyValueParams: Array<KeyValueParam>): void => {
  KeyValueParams.forEach((KeyValueParam) => {
    API_URL.searchParams.set(KeyValueParam.paramKey, KeyValueParam.paramValue);
  });
};

const errorHandler = (err: Error): ResponseObject => {
  //returns ResponseObject object to handle error.
  return { isOk: false, text: err.message };
};

// getData has 2 possibles return objects
// 1st: the request is fulfilled and we have the res.json() object.
// 2nd: the request is fulfilled but we have an res.ok = false so an error is thrown
// or the promise is rejected.
// In both cases the control is passed to errorHandler in catch, that returns an object
// of ReposnseObject type
export const getData = (): Promise<ResponseObject> => {
  setURLParams(queryParams);
  return fetch(API_URL, options)
    .then((res: Response): Promise<APIResource> | never => {
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      return res.json();
    })
    .then((data) => {
      return {
        isOk: true,
        data,
      };
    })
    .catch(errorHandler);
};
