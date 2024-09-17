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
    const endpoint = "login";
    return await HttpClient.post(endpoint, data);
};





const addCategory = async (data: any): Promise<any> => {
    const endpoint = '/adm/category';
    return await HttpClient.post(endpoint, data);
}

const fetchSingleCategoryById = async (id: number): Promise<any> => {
    const endpoint = `/adm/category/${id}`;
    return await HttpClient.get(endpoint);
}

const updateCategory = async (id: number, data: any): Promise<any> => {
    const endpoint = `/adm/category/${id}`;
    return await HttpClient.put(endpoint, data);
}

const deleteCategory = async (id: number): Promise<any> => {
    const endpoint = `/adm/category/${id}`;
    return await HttpClient.deletemethod(endpoint);
}

const viewAllCategory = async (page?: number, parent?: number): Promise<any> => {
    let endpoint = '/adm/category';

    if (parent !== undefined) {
        endpoint = `/adm/category?page=${page ?? null}&parent=${parent}`;
    } else if (page !== undefined) {
        endpoint = `/adm/category?page=${page}`;
    }
    return await HttpClient.get(endpoint);
}
const viewAllSubCategory = async ( catID?: String): Promise<any> => {

    
      const  endpoint = `/cms/sub-categories/${catID}`
    return await HttpClient.get(endpoint);
}



export {
    Loginfunc,
    viewAllCategory,
    addCategory,
    fetchSingleCategoryById,
    updateCategory,
    deleteCategory,
    viewAllSubCategory
};
