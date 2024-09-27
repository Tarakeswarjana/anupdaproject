const BASE_URL = "http://13.127.135.64:3000/";
const ALLOW_ORIGIN = "http://13.127.135.64:3000";

// Type definitions
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestData {
    [key: string]: any;
}

function checkingAuth() {
    let tokendata = localStorage.getItem('token');
    if (tokendata) {
        return `Bearer ${JSON.parse(tokendata)}`;
    }
    return "";
}
interface Config extends RequestInit {
    body?: any;
}
// async function requestData(url: string, data: RequestData = {}, method: HttpMethod = "GET",isfromdata:Boolean): Promise<any> {
   

//     const config:Config = {
//         method: method,
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Authorization': checkingAuth()
//             ,
//              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.5845.111 Safari/537.36'
            
//         },
//         body: isfromdata?data:JSON.stringify(data)
//     }


//     if (method.toLowerCase() === "get") {
//         config.body = undefined; 
//     }


//     const response = await fetch(url, config)
//     const json = await response.json()
//     if (response) {
//         return json
//         console.log(json,"kkkkkk")
//         // return response
//     } else {
//         alert("error in fetching api")
//         console.log("error")
//     }
// }

async function requestData(
    url: string,
    data: RequestData = {},
    method: HttpMethod = "GET",
    isFormData: boolean = false
  ): Promise<any> {
    // Determine headers based on whether data is FormData or JSON
    const headers: any = {
      Accept: 'application/json',
      'Authorization': checkingAuth(),
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.5845.111 Safari/537.36'
    };
  
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }
  
    const config: Config = {
      method: method,
      headers: headers,
      body: isFormData ? data : JSON.stringify(data)
    };
  
    // For GET requests, remove the body
    if (method.toLowerCase() === "get") {
      delete config.body;
    }
  
    try {
      const response = await fetch(url, config);
      const json = await response.json();
      
      if (response.ok) {
        return json;
      } else {
        console.log("Error:", json);
        alert("Error in fetching API");
        return json; // Return error response for further handling if needed
      }
    } catch (error) {
      console.log("Network or server error:", error);
      alert("Network or server error");
      throw error; // Optionally rethrow the error
    }
  }
  

function get(endpoint: string, params: RequestData = {}): Promise<any> {
    const urlParams = new URLSearchParams(params as any).toString();
    const fullUrl = BASE_URL+endpoint + (urlParams ? `?${urlParams}` : '');

    return requestData(fullUrl, {}, "GET",false);
}

function post(endpoint: string, params: RequestData = {},isfromdata:boolean): Promise<any> {

    return requestData(BASE_URL+endpoint, params, "POST",isfromdata);
}

function put(endpoint: string, params: RequestData = {},isfromdata:boolean): Promise<any> {
    return requestData(BASE_URL+endpoint, params, "PUT",isfromdata);
}

function deletemethod(endpoint: string, params: RequestData = {}): Promise<any> {
    return requestData(BASE_URL+endpoint, params, "DELETE",false);
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
