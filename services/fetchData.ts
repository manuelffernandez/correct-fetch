import { KeyValueParam, ResponseObject, ResourceDataOne } from "../interfaces";
import { API_URL } from "./urls";

// custom Error class to catch the response object in the fetch
class ResponseError extends Error {
  response: Response;
  constructor(message: string, res: Response) {
    super(message);

    this.response = res;
  }
}

const setURLParams = (URL: URL, KeyValueParams: Array<KeyValueParam>): URL => {
  KeyValueParams.forEach((KeyValueParam) => {
    URL.searchParams.set(KeyValueParam.paramKey, KeyValueParam.paramValue);
  });

  return URL;
};

const errorHandler = (err: ResponseError): ResponseObject<never> => {
  // Handle the error, with full access to status and body
  switch (err.response.status) {
    case 400:
      /* Handle */ break;
    case 401:
      /* Handle */ break;
    case 404:
      /* Handle */ break;
    case 500:
      /* Handle */ break;
    default: /* What does if fetch returns a rejected Promise */
  }
  // returns ResponseObject<never> that will be handled by 'handleResponse'.
  // this return must be inside the cases, and change its content depending on the status
  return { isOk: false, errorMsg: err.message };
};

// getResourceData has 2 possibles return objects
// 1st: the request is fulfilled and we have the res.json() object.
// 2nd: the request is fulfilled but we have an res.ok = false so an error is thrown
// or the promise is rejected.
// In both cases the control is passed to errorHandler in catch, that returns an object
// of ReposnseObject type

export const getResourceData = () => {
  const RESOURCE_URL = new URL(API_URL);
  // request initializer to set in fetch
  const settings: RequestInit = {};
  // this value can change depending on the differents request that the user made
  let queryParams: Array<KeyValueParam> = [];

  setURLParams(RESOURCE_URL, queryParams);
  return fetch(RESOURCE_URL, settings)
    .then((res: Response): Promise<ResponseObject<ResourceDataOne>> | never => {
      if (!res.ok) {
        throw new ResponseError("Bad fetch response", res);
      } else {
        // optional additional useful data to get from the response.
        // ts assertion. header can be null
        let additonalData = res.headers.get("example") as string;

        return res.json().then((data) => {
          return {
            data,
            additonalData,
            isOk: true,
          };
        });
      }
    })
    .catch(errorHandler);
};
