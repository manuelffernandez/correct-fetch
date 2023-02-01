export interface KeyValueParam {
  paramKey: string;
  paramValue: string;
}

// this interface can change over time and its no strictly the same as the api repsponse
export interface APIResource {
  name: string;
}

// this interface its just an example
export interface ResponseObject {
  isOk: boolean;
  text?: string;
  data?: APIResource;
}
