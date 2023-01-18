const API_URL = "";
const options = {};

// this interface its just an example
interface ResponseObject {
  isFulfilled: boolean;
  dataToRender?: string;
}

const statusHandler = (res: Response): ResponseObject => {
  let resObj = { isFulfilled: true };

  // analyze possible codes...

  //returns ResponseObject object to handle the status code.
  return resObj;
};

const errorHandler = (err: Error | undefined): ResponseObject => {
  console.log(err);
  //returns ResponseObject object to handle error.
  return { isFulfilled: false, dataToRender: "ERROR. Promise rejected" };
};

// returns a JSX directly to render in DOM or a boolean to handle with other function
const handleResponse = (obj: ResponseObject): JSX.Element => {
  // analyze the resObj and returns data to render.
};

// getData has 3 possibles return objects
// 1st: the request is fulfilled and we have the res.json() object.
// 2nd: the request is fulfilled but we have an res.ok = false. So statusHandler returns an object.
// 3rd: the request is rejected so errorHandler returns an objecto
const getData = (): Promise<ResponseObject> => {
  return fetch(API_URL, options)
    .then((res: Response) => {
      if (!res.ok) {
        return statusHandler(res);
      }
      return res.json();
    })
    .catch(errorHandler);
};

// inside component
getData().then((res) => {
  handleResponse(res);
});
