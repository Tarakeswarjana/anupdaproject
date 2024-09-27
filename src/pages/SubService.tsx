import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { addCategory, addService, addSubService, deleteCategory, deletesubService, fetchSingleCategoryById, fetchSingleServiceById, updateCategory, updatesubService, viewAllCategory, viewAllSetrvice, viewAllSubCategory, viewAllsubService } from '../AllApiCall';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { TableColumn } from 'react-data-table-component';
import { ALLOW_ORIGIN, BASE_URL } from '../HttpClient';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
// Define the interface for the state
interface CategoryState {
    categoryName: string;
    serviceName: string
    type: string;
    position: any;
    status: boolean;
}

// Define the initial state using the interface
const initialState: CategoryState = {
    categoryName: "",
    type: "",
    position: "",
    status: true,
    serviceName: ""
};

// Define the interface for the row data
interface CategoryRow {
    sl: number;
    subCatId: number;
    subServiceId: number
    servie: string;
    type: string;
    position: string;
    SubService: string
    price: number
    status: string;
    approx_time: number
    subCat: JSX.Element;
    image_url: string
}



function SubService() {
    const { id } = useParams()
    // console.log(id, "jjjjjjjj")
    const location = useLocation();
    const { serviceName } = location.state

    const [fromdata, setFromdata] = useState<CategoryState>(initialState);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editableId, setEditableId] = useState<number | null>(null);
    const [categoryData, setCategoryData] = useState<CategoryRow[]>([]);
    const [isModal, setIsModal] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [totalRowCount, setTotalRowCount] = useState<number>(0);
    const [singleCatData, setsingleCatData] = useState<any>(null);
    console.log(singleCatData, "kkkoopp")
    const navigate = useNavigate();

    // Define the columns with type annotations
    const columns: TableColumn<CategoryRow>[] = [
        {
            name: 'Id',
            selector: row => row.sl,
            sortable: true,
        },
        {
            name: 'Service Name',
            selector: row => row.servie,
            sortable: true,
        },
        // {
        //     name: 'Image',
        //     cell: row => <img alt="Image"
        //         src={`${ALLOW_ORIGIN}/${row.image_url}`} />,
        //     sortable: true,
        // },
        {
            name: 'SubService Name',
            selector: row => row.SubService,
            sortable: true,
        },
        {
            name: 'Price',
            selector: row => row.price,
            sortable: true,
        },
        {
            name: 'Approx timing',
            selector: row => row.approx_time,
            sortable: true,
        },

        {
            name: 'Action',
            cell: row => (
                <div className="w-[300px] flex items-center space-x-4">
                    <FaEdit
                        onClick={() => handleEdit(row)}
                        size={34}
                        className="text-blue-500 cursor-pointer"
                    />
                    <MdDelete
                        onClick={() => handleDelete(row.subServiceId)}
                        size={34}
                        className="text-red-500 cursor-pointer"
                    />
                </div>
            ),
        },
    ];


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFromdata({ ...fromdata, [name]: value });
    }

    // Validation Function
    const handleValidation = (): boolean => {
        if (!fromdata.serviceName) {
            toast.error("Enter serviceName Name");
            return false;
        }
        // if (!fromdata.type) {
        //     toast.error("Enter type");
        //     return false;
        // }
        // if (!fromdata.status) {
        //     toast.error("Enter status");
        //     return false;
        // }
        return true;
    }

    const handleSubmit = async () => {
        if (!handleValidation())
            return;
        // "service_id": 5, "subservice_name":"Test", "price": "6", "unit_id":3 


        let obj1 = {
            service_id: id,
            subservice_name: fromdata.serviceName,
            price: fromdata.type,
            unit_id: fromdata.position
        }
        // const formData = new FormData();





        let res = await addSubService(obj1);
        console.log(res, "preview")
        if (res && res.success) {
            toast.success("Service Added successfully");
            setFromdata(initialState);
            setIsModal(false);
            fetchAllsubCategory();
        }
    }

    const handleEdit = async (obj: any) => {
        console.log(obj, "ooiii")

        setEditableId(obj.subServiceId);

        // { "subservice_name": "Floor Cleaning", "price":9,"unit_id":1,"service_id":20 }
        // service_id: id,
        // subservice_name: fromdata.serviceName,
        // price: fromdata.type,
        // unit_id: fromdata.position
        const obj1 = {
            categoryName: "",
            type: obj.price,
            position: 3,
            status: true,
            serviceName: obj.SubService
            // categoryName: string;
            // serviceName: string
            // type: string;
            // position: string;
            // status: boolean;
        };
        setFromdata(obj1);
        setIsModal(true);
        setIsEdit(true);

    }

    const handleUpdate = async () => {
        if (!handleValidation())
            return;

        let editObj = {
            service_id: id,
            subservice_name: fromdata.serviceName,
            price: fromdata.type,
            unit_id: fromdata.position
        }

        const res = await updatesubService(editableId as number, editObj);
        if (res && res.success) {
            toast.success(res.message);
            fetchAllsubCategory();
            setIsModal(false);
        }
    }


    const handleDelete = async (id: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                let res = await deletesubService(id);
                if (res && res.success) {
                    fetchAllsubCategory();
                    toast.success(res.message);
                }
            }
        });
    }

    // Fetching Categories
    const fetchAllsubCategory = async () => {
        setIsLoading(true);
        const res = await viewAllsubService(id);
        console.log(res, "iiiiiii")

        if (res && res.success) {
            const resArr = res.data.map((ele: any, id: number) => ({
                sl: id + 1,
                subServiceId: ele.subservice_id,
                servie: ele.service_name,
                SubService: ele.subservice_name,
                approx_time: ele.approx_time,
                price: ele.price,

                // subCat: (
                //     <button
                //         className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
                //         onClick={() => navigate(`/subService/${ele.service_id}`)}
                //     >
                //         Open SubService
                //     </button>
                // ),
                // status: ele.isActive === 1 ? true : false,
            }));
            setCategoryData(resArr);
            setTotalRowCount(res.total);
            setIsLoading(false);
        }
    }
    const fetchSingleCategory = async () => {
        setIsLoading(true);
        const res = await fetchSingleCategoryById(id);
        if (res) {
            setsingleCatData(res.data)
        }
    }

    useEffect(() => {
        fetchSingleCategory()
        fetchAllsubCategory();
    }, []);
    return (
        <section>
            <div className='border-b-4 border-solid border-indigo-500'>
                <div>
                    <button
                        type="button"
                        onClick={() => { navigate('/category') }}
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 relative float-left"
                    >
                        back
                    </button>
                    <div > Category:{singleCatData?.name}</div>
                </div>

                <div>
                    <button
                        type="button"
                        onClick={() => setIsModal(true)}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 relative float-right"
                    >
                        Add new Service
                    </button>
                </div>

                <DataTable
                    columns={columns}
                    data={categoryData}
                    pagination
                    progressPending={isLoading}
                    paginationServer
                    paginationTotalRows={totalRowCount}
                    onChangePage={fetchAllsubCategory}
                // noRowsPerPage={true}
                />
            </div>

            {/* Modal Form */}
            {isModal && (
                <div className='modelcss'>
                    <span
                        onClick={() => setIsModal(false)}
                        className='float-right cursor-pointer text-red-400'
                    >
                        Close
                    </span>
                    <form className="max-w-[54rem] mx-auto mt-[4rem]">
                        <div className="mb-5">
                            <label htmlFor="categoryName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Service Name</label>
                            <input
                                type="text"
                                id="categoryName"
                                disabled
                                // onChange={handleChange}
                                name='categoryName'
                                value={serviceName}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="categoryName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Service Name</label>
                            <input
                                type="text"
                                id="serviceName"
                                onChange={handleChange}
                                name='serviceName'
                                value={fromdata.serviceName}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                            <input
                                type="text"
                                id="type"
                                onChange={handleChange}
                                name='type'
                                value={fromdata.type}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">UnitID</label>
                            <input
                                type="number"
                                id="position"
                                onChange={handleChange}
                                name="position"
                                value={fromdata.position}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required
                            />
                        </div>
                        {/* <div className="mb-5 flex gap-3">
                            <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status
                                <input
                                    type="radio"
                                    id="status-on"
                                    name="status"
                                    onChange={handleChange}
                                    value="true"
                                    checked={fromdata.status === true}
                                /> ON
                                <input
                                    type="radio"
                                    id="status-off"
                                    name="status"
                                    onChange={handleChange}
                                    value="false"
                                    checked={fromdata.status === false}
                                /> OFF
                            </label>
                        </div> */}
                        <button
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                isEdit ? handleUpdate() : handleSubmit();
                            }}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 relative float-right"
                        >
                            {isEdit ? "Edit" : "Add"}
                        </button>
                    </form>
                </div>
            )}
        </section>
    );
}

export default SubService;
