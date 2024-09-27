import HttpClient from "./HttpClient";

// Define an interface for the login data
interface LoginData {
    username: string;
    password: string;
}

interface ApiResponse {
    success: boolean;
    token?: string;
    error?: string;
}


const Loginfunc = async (data: LoginData): Promise<ApiResponse> => {
   
    const endpoint = "v1/adm/login";


    return await HttpClient.post(endpoint, data,false);}
    





const addCategory = async (data: any): Promise<any> => {
    const endpoint = 'v1/adm/category';
    return await HttpClient.post(endpoint, data,true);
}

const fetchSingleCategoryById = async (id: any): Promise<any> => {
    const endpoint = `v1/adm/category/${id}`;
    return await HttpClient.get(endpoint);
}
const fetchSingleServiceById = async (id: any): Promise<any> => {
    const endpoint = `v1/adm/category/${id}`;
    return await HttpClient.get(endpoint);
}

const updateCategory = async (id: number, data: any): Promise<any> => {
    const endpoint = `v1/adm/category/${id}`;
    console.log(data,"55555555")
    return await HttpClient.put(endpoint, data,true);
}

const deleteCategory = async (id: number): Promise<any> => {
    const endpoint = `v1/adm/category/${id}`;
    return await HttpClient.deletemethod(endpoint);
}

const viewAllCategory = async (page?: number, parent?: number): Promise<any> => {
    let endpoint = 'v1/adm/category';

    if (parent !== undefined) {
        endpoint = `v1/adm/category?page=${page ?? null}&parent=${parent}`;
    } else if (page !== undefined) {
        endpoint = `v1/adm/category?page=${page}`;
    }
    return await HttpClient.get(endpoint);
}
const viewAllSubCategory = async ( catID?: String): Promise<any> => {
      const  endpoint = `v1/adm/sub-categories/${catID}`
    return await HttpClient.get(endpoint);
}
const viewAllSetrvice = async ( catID?: String): Promise<any> => {
    const  endpoint = `v1/adm/category-wise-services/${catID}`
  return await HttpClient.get(endpoint);
}
const viewAllsubService = async ( serviceID?: String): Promise<any> => {
    const  endpoint = `v1/adm/sub-services/${serviceID}`
  return await HttpClient.get(endpoint);
}

const addService = async (data: any): Promise<any> => {
    const endpoint = 'v1/adm/services';
    console.log(data, "preview2")
 return await HttpClient.post(endpoint, data,false);

 

 

    // const config = {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //         'Authorization':
    //         'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJTa2lsbCIsInN1YiI6ImQyY2UzNGM0ZGUzY2JhNzM5YjI3NzIzOTA2YjcwZWU2NjhjZDM1ZTRkMjM5YTRmMjFkZDc2NTk4MmI1YTZmZTkxNTQ0M2FmMmYzNjMzN2RhYThlNGZiNmIxNjYwY2EyZTIzMTY4NzE3NTc4OWU5N2I1NTAyZTdjOGQyYzJmNTdmMDg4MGNmZGU3OTgzNzRiNTkzMzY4MTY1NTQ1MjUzNjE4MjJlNmFhY2MzYTIzZTQwNmMxYmJkMDRkNTljNTRjMTZlIiwiYWciOiJlNTY3ZjFiMDMxZDYzNzM3YWJjNjViZGI3NWZlYTIwZDI4ZGQ0NGVkNTEwNTgzOTAyZGFhOTA3ODIwZTY5MTBlZDg5OGE2NjIyNmM1MDdjNDllODNlNWQ1YTZiNDFkN2M4MjVjNzhlYzgxODE4OTcxNGIyYjEwYzUxMTUwMDZmYWVkNmZlYzZiMjA2MDQ4ZjY1ZTU1ZWMwMGU2NjYyNDIwOWI1M2M2NzJhZWJlN2ZkZDlkMGVhYjU5NmEwMmY0YjA2NzE5ZjYxZjhjMTkxMmY1ZWVjMGI2Nzk0MGM5OGRjYWI5ZTE0MTdkZDYiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNzI2ODAwMzI4LCJleHAiOjE3Mjc0MDUxMjh9.MBuuJcIz3AVztnXs5CBYZstnmCXcymoR58L5kJXH4Uo'

    //     },
    //     body: JSON.stringify(data)
    // }
    // const response = await fetch(`http://13.127.135.64:3000/v1/adm/services`, config)
    // const json = await response.json()
    // if (response.ok) {
    //     return json
    //     return response
    // } else {
    //     //
    //     console.log("error")
    // }



}


const updateService = async (id:number, data: any): Promise<any> => {
    const endpoint = `v1/adm/services/${id}`;
  
 return await HttpClient.put(endpoint, data,false);}

const addSubService = async (data: any): Promise<any> => {
    const endpoint = 'v1/adm/sub-services';
 
 return await HttpClient.post(endpoint, data,false);
}



const fetchAllVendars = async (page?: number, parent?: number): Promise<any> => {
    let endpoint = 'v1/adm/vendors-list';

    if (parent !== undefined) {
        endpoint = `v1/adm/vendors-list?page=${page ?? null}&parent=${parent}`;
    } else if (page !== undefined) {
        endpoint = `v1/adm/vendors-list?page=${page}`;
    }
    return await HttpClient.get(endpoint);
}
const acceptVendar = async (data: any): Promise<any> => {
    const endpoint = 'v1/adm/vendors-status-change';

 return await HttpClient.put(endpoint, data,false);
}

const deleteService = async (id: number): Promise<any> => {
    const endpoint = `v1/adm/services/${id}`;
    return await HttpClient.deletemethod(endpoint);
}

const updatesubService = async (id:number, data: any): Promise<any> => {
    const endpoint = `v1/adm/sub-services-update/${id}`;
    console.log(data, "preview2")
 return await HttpClient.put(endpoint, data,false);}


 const deletesubService = async (id: number): Promise<any> => {
    const endpoint = `v1/adm/sub-services-delete/${id}`;
    return await HttpClient.deletemethod(endpoint);
}



export {
    Loginfunc,
    viewAllCategory,
    addCategory,
    fetchSingleCategoryById,
    updateCategory,
    deleteCategory,
    viewAllSubCategory,
    viewAllSetrvice,
    viewAllsubService,
    addService,
    fetchSingleServiceById,
    addSubService,
    fetchAllVendars,
    acceptVendar,
    updateService,
    deleteService,
    updatesubService,
    deletesubService
};

