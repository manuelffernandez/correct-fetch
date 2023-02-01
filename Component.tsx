import { useEffect } from "react";
import { getData } from "./services/fetchData";
import { ResponseObject } from "./interfaces";

const Component = (): JSX.Element => {
  const handleResponse = (obj: ResponseObject) => {
    // analyze the resObj.

    if (obj.isOk) {
      // Do something...
    } else {
      // Do other...
    }
  };

  useEffect(() => {
    getData().then((res) => {
      handleResponse(res);
    });
  });
  return <div></div>;
};

export default Component;
