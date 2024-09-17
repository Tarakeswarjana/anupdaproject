const BASE_URL = "http://13.127.135.64:3000/v1";
const ALLOW_ORIGIN = "http://13.127.135.64:3000";

// Type definitions
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestData {
    [key: string]: any;
}

function checkingAuth() {
    let tokendata = localStorage.getItem('token');
    if (tokendata) {
        return `bearer ${JSON.parse(tokendata)}`;
    }
    return "";
}

function requestData(url: string, data: RequestData = {}, method: HttpMethod = "GET"): Promise<any> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const fullUrl = BASE_URL + url
        xhr.open(method, fullUrl, true);

        // Set headers
        xhr.setRequestHeader("Content-Type", "application/json");
        if (checkingAuth()) {
            xhr.setRequestHeader("Authorization", checkingAuth());
        }

        // Handle response
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        let responseData: any;
                        const contentType = xhr.getResponseHeader("Content-Type");

                        if (contentType && contentType.includes("application/json")) {
                            responseData = JSON.parse(xhr.responseText);
                        } else if (contentType && contentType.includes("text/html")) {
                            responseData = xhr.responseText; // Treat HTML as text
                        } else if (contentType && contentType.includes("text/plain")) {
                            responseData = xhr.responseText; // Treat plain text as text
                        } else if (contentType && contentType.includes("application/x-www-form-urlencoded")) {
                            const formData = new URLSearchParams(xhr.responseText);
                            responseData = Object.fromEntries(formData.entries());
                        } else {
                            responseData = xhr.responseText; // Fallback to text for unknown content types
                        }

                        resolve(responseData);
                    } catch (error:any) {
                        reject(`Failed to parse response: ${error.message}`);
                    }
                } else {
                    reject(`HTTP error! Status: ${xhr.status}, Message: ${xhr.statusText}`);
                }
            }
        };

        // Handle network errors
        xhr.onerror = function () {
            reject(`Request failed: ${xhr.statusText}`);
        };

        // Send request
        if (method === "GET" || method === "DELETE") {
            xhr.send();
        } else {
            xhr.send(JSON.stringify(data));
        }
    });
}

function get(endpoint: string, params: RequestData = {}): Promise<any> {
    const urlParams = new URLSearchParams(params as any).toString();
    const fullUrl = endpoint + (urlParams ? `?${urlParams}` : '');
    return requestData(fullUrl, {}, "GET");
}

function post(endpoint: string, params: RequestData = {}): Promise<any> {
    return requestData(endpoint, params, "POST");
}

function put(endpoint: string, params: RequestData = {}): Promise<any> {
    return requestData(endpoint, params, "PUT");
}

function deletemethod(endpoint: string, params: RequestData = {}): Promise<any> {
    return requestData(endpoint, params, "DELETE");
}

const request = {
    requestData,
    get,
    post,
    put,
    deletemethod,
    BASE_URL,
};

export default request;
export { BASE_URL ,ALLOW_ORIGIN};
