import { baseUrl } from "../services/api";

const APIConfig = async ({ data, url, method, headers, fetchOptions }) => {
  try {
    if (!url || !method) {
      throw new Error("Missing required properties: url and method");
    }

    if (data && typeof data !== "object") {
      throw new Error("Invalid data prop: must be an object");
    }

    const defaultHeaders = { "Content-Type": "application/json" };
    const mergedHeaders = { ...defaultHeaders, ...headers };
    if (mergedHeaders["Content-Type"] !== "application/json" && data) {
      console.warn(
        "Content-Type header is not application/json when sending data. Ensure compatibility."
      );
    }

    const response = await fetch(`${baseUrl}${url}`, {
      method,
      headers: new Headers(mergedHeaders),
      body: data && JSON.stringify(data),
      ...fetchOptions,
    }).catch((error) => {
      throw new Error(`Error fetching data from ${url}: ${error}`);
    });

    if (!response.ok) {
      let errorMessage = "Something went wrong!";

      try {
        const errorData = await response.json();
        if (errorData && errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (jsonError) {
        console.error("Error parsing JSON error response:", jsonError);
      }

      throw new Error(
        `API request failed with status ${response.status}: ${errorMessage}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(
      "Error occurred in APIConfig:",
      { url, method, error },
      error.stack
    );

    throw error;
  }
};

export default APIConfig;
