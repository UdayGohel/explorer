import { baseUrl } from "../services/api";

const APIConfig = async ({ data, url, method, headers, fetchOptions }) => {
  try {
    // Validate input properties
    if (!url || !method) {
      throw new Error("Missing required properties: url and method");
    }

    // Ensure `data` is an object (optional)
    if (data && typeof data !== "object") {
      throw new Error("Invalid data prop: must be an object");
    }

    // Merge headers with caution
    const defaultHeaders = { "Content-Type": "application/json" };
    const mergedHeaders = { ...defaultHeaders, ...headers };
    if (mergedHeaders["Content-Type"] !== "application/json" && data) {
      console.warn(
        "Content-Type header is not application/json when sending data. Ensure compatibility."
      );
    }

    // Construct the fetch request with error handling
    const response = await fetch(`${baseUrl}${url}`, {
      method,
      headers: new Headers(mergedHeaders),
      body: data && JSON.stringify(data),
      ...fetchOptions,
    }).catch((error) => {
      throw new Error(`Error fetching data from ${url}: ${error}`);
    });

    // Check for successful response
    if (!response.ok) {
      let errorMessage = "Something went wrong!";

      // Attempt to parse JSON error response
      try {
        const errorData = await response.json();
        if (errorData && errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (jsonError) {
        console.error("Error parsing JSON error response:", jsonError);
      }

      // Throw a more informative error
      //   throw new Error(
      //     `API request failed with status ${response.status}: ${errorMessage}`
      //   );
      throw new Error(errorMessage);
    }

    // Return the parsed response data
    return await response.json();
  } catch (error) {
    // Log the error with additional context
    console.error(
      "Error occurred in APIConfig:",
      { url, method, error },
      error.stack
    );

    // Re-throw the error to allow for higher-level handling
    throw error;
  }
};

export default APIConfig;
