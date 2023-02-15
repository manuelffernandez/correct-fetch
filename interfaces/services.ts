export interface KeyValueParam {
  paramKey: string;
  paramValue: string;
}

// this interface its just an example, can change over time and it's not strictly the same as the api response
export interface ResourceDataOne {
  // data must not be any. This type has to be changed for the expected returned resource type from API
  data: any;
  additonalData: string;
}

// this interface its just an example, can change over time and it's not strictly the same as the api response
export interface ResourceDataTwo {
  // data it's not necessary an Array. The generic must not be any, this type has to be changed for the expected returned resource type from API
  data: Array<any>;
}

// type created to constraint the generic in ResponseObject type
type APIData = ResourceDataOne | ResourceDataTwo;

export type ResponseObject<T extends APIData> =
  | ({ isOk: true } & T)

  // This type is obtained by typing ResponseObject<never>
  // It does not have to have this structure. properties can be added depending on the needs
  | { isOk: false; errorMsg: string };
