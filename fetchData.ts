const API_URL: URL = new URL("");
const options = {};

interface KeyValueParam {
  paramKey: string;
  paramValue: string;
}

const setURLParams = (KeyValueParams: Array<KeyValueParam>): void => {
  KeyValueParams.forEach((KeyValueParam) => {
    API_URL.searchParams.set(KeyValueParam.paramKey, KeyValueParam.paramValue);
  });
};

// this interface can change over time and its no strictly the same as the api repsponse
interface APIData {
  name: string;
}

// this interface its just an example
interface ResponseObject {
  isOk: boolean;
  text?: string;
  data?: APIData;
}

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
const getData = (): Promise<ResponseObject> => {
  return fetch(API_URL, options)
    .then((res: Response): Promise<APIData> | never => {
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

// returns a JSX directly to render in DOM
const handleResponse = (obj: ResponseObject): JSX.Element => {
  // analyze the resObj and returns data to render.

  if (obj.isOk) {
    // Do something...
  } else {
    // Do other...
  }
};

// inside component
getData().then((res) => {
  handleResponse(res);
});
