import { REQUEST_METHODS } from "@/constants";

const { GET, POST } = REQUEST_METHODS;

interface EndpointObj {
  url: string;
  method?: string;
}

const endpoint = {
  translate: {
    post: {
      url: "/translate",
      method: POST,
    },
  },
  language: {
    get: {
      url: "/translate",
      method: GET,
    },
  },
};

const endpointParams = (
  endpointObj: EndpointObj,
  ...params: string[]
): { url: string; method?: string } => {
  let iteration = 0;
  const urlWithParams = endpointObj?.url.replace(
    /:([a-zA-Z0-9]+)/g,
    (match: string, contents: string) => {
      if (params[iteration]) {
        contents = params[iteration];
        iteration++;
      }
      return contents;
    }
  );

  return { url: urlWithParams, method: endpointObj?.method };
};
export { endpoint, endpointParams };
