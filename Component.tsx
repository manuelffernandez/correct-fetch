import { useEffect, useState } from "react";
import { getResourceData } from "./services/fetchData";
import { ResponseObject, ResourceDataOne } from "./interfaces";

const Component = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleResponse = (obj: ResponseObject<ResourceDataOne | never>) => {
    setIsLoading(false);
    // analyze the resObj.

    if (obj.isOk) {
      // Do something...
    } else {
      // Do other...
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getResourceData().then((res) => {
      handleResponse(res);
    });
  });
  return <div>{isLoading ? <h1>Loading...</h1> : <h1>render content</h1>}</div>;
};

export default Component;
