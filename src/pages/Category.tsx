import React, { useContext, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { addCategory, deleteCategory, fetchSingleCategoryById, updateCategory, viewAllCategory } from '../AllApiCall';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { TableColumn } from 'react-data-table-component';
import { ALLOW_ORIGIN } from '../HttpClient';
import { ALLDATA } from '../Contexts/AllData';





// Define the interface for the state
interface CategoryState {
    categoryName: string;
    type: string;
    position: string;
    status: String;
    image: any | null;
}

// Define the initial state using the interface
const initialState: CategoryState = {
    categoryName: "",
    type: "",
    position: "",
    status: "",
    image: null
};

// Define the interface for the row data
interface CategoryRow {
    sl: number;
    catname: string;
    type: string;
    position: string;
    status: boolean;
    subCat: JSX.Element;
    image_url: string
}


function Category() {
    const data = useContext(ALLDATA)
    // const {pageCount ,setPageCount}=data
    console.log(data?.pageCount, "kkkkkkkk")

    const [fromdata, setFromdata] = useState<CategoryState>(initialState);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editableId, setEditableId] = useState<number | null>(null);
    const [categoryData, setCategoryData] = useState<CategoryRow[]>([]);
    const [isModal, setIsModal] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [totalRowCount, setTotalRowCount] = useState<number>(0);
    const navigate = useNavigate();

    const columns: TableColumn<CategoryRow>[] = [
        {
            name: 'Id',
            selector: row => row.sl,
            sortable: true,
        },
        {
            name: 'Category Name',
            selector: row => row.catname,
            sortable: true,
        },
        {
            name: 'Image',

            cell: row => <img alt="Image" src={`${ALLOW_ORIGIN}/${row.image_url}`} />,
            sortable: true,
        },
        // {
        //     name: 'Position',
        //     selector: row => row.position,
        //     sortable: true,
        // },
        {
            name: 'Status',
            cell: row => <> <label className="inline-flex items-center me-5 cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="relative border-2 border-green-500 w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4  dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Green</span>
            </label></>,
            sortable: true,
        },
        {
            name: 'SubCategory',
            cell: row => row.subCat, // Assuming this is a string or handle it accordingly
            sortable: false,
        },
        {
            name: 'Action',
            cell: row => (
                <div className='w-[300px]'>
                    <button
                        onClick={() => handleEdit(row.sl)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(row.sl)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFromdata({ ...fromdata, [name]: value });
    }
    // const imageUrl = fromdata.image ? URL.createObjectURL(fromdata.image) : '';

    const [imageUrl1, setImageUrl1] = useState<string>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;

        // Update the state with the new file
        setFromdata(prevState => ({
            ...prevState,
            image: file
        }));

        // Create and set image URL if a file is selected
        if (file) {
            const url = URL.createObjectURL(file);
            setImageUrl1(url);

            // Clean up the URL object when the component unmounts
            return () => URL.revokeObjectURL(url);
        } else {
            // Clear the image URL if no file is selected
            setImageUrl1('');
        }
    };

    // // Clean up the URL object on component unmount
    // useEffect(() => {
    //     return () => {
    //         if (imageUrl1) {
    //             URL.revokeObjectURL(imageUrl1);
    //         }
    //     };
    // }, [imageUrl1]);



    // Validation Function
    const handleValidation = (): boolean => {
        if (!fromdata.categoryName) {
            toast.error("Enter Category Name");
            return false;
        }
        if (!fromdata.type) {
            toast.error("Enter type");
            return false;
        }
        if (!fromdata.status) {
            toast.error("Enter status");
            return false;
        }
        return true;
    }

    const handleSubmit = async () => {
        if (!handleValidation())
            return;

        const obj1 = {
            name: fromdata.categoryName,
            description: fromdata.type,
            order: fromdata.position,
            isActive: fromdata.status === "true" ? 1 : 0,
            image: fromdata.image
        };

        let res = await addCategory(obj1);
        if (res && res.success) {
            toast.success("Category Added successfully");
            setFromdata(initialState);
            setIsModal(false);
            fetchAllCategory(1);
        }
    }

    const handleEdit = async (id: number) => {
        setEditableId(id);
        let res = await fetchSingleCategoryById(id);
        console.log(res, "kkk")
        if (res && res.success) {
            const obj1 = {
                categoryName: res.data?.name,
                type: res.data?.description,
                position: res.data?.order,
                status: res.data?.isActive === 1 ? "true" : "false",
                image: null
            };
            setImageUrl1(res.data.image)
            setFromdata(obj1);
            setIsModal(true);
            setIsEdit(true);
        }
    }

    const handleUpdate = async () => {
        if (!handleValidation())
            return;
        // name:demo category
        // parent_id:5
        // description:demo
        // order:1
        // isActive:1

        const editObj = {
            name: fromdata.categoryName,
            description: fromdata.type,
            order: fromdata.position,
            isActive: fromdata.status === "true" ? 1 : 0,
            Image: fromdata.image
        };

        const res = await updateCategory(editableId as number, editObj);
        if (res && res.success) {
            toast.success(res.message);
            fetchAllCategory(1);
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
                let res = await deleteCategory(id);
                if (res && res.success) {
                    fetchAllCategory(1);
                    toast.success(res.message);
                }
            }
        });
    }

    // Fetching Categories
    const fetchAllCategory = async (page: number) => {
        data?.setPageCount(page)
        setIsLoading(true);
        const res = await viewAllCategory(page);
        if (res && res.success) {
            const resArr = res.data.map((ele: any) => ({
                sl: ele.category_id,
                catname: ele.name,
                image_url: ele.image_url,
                type: ele.description,
                position: ele.position,
                subCat: (
                    <button
                        className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => navigate(`/subCategory/${ele.category_id}`)}
                    >
                        Open Service list
                    </button>
                ),
                status: ele.isActive === 1 ? "true" : "false",
            }));
            setCategoryData(resArr);
            setTotalRowCount(res.total);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchAllCategory(data?.pageCount || 1);
    }, []);

    return (
        <section>
            <div className='border-b-4 border-solid border-indigo-500'>
                <div>
                    <button
                        type="button"
                        onClick={() => setIsModal(true)}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 relative float-right"
                    >
                        Add new Category
                    </button>
                </div>

                <DataTable
                    columns={columns}
                    data={categoryData}
                    pagination
                    paginationDefaultPage={data?.pageCount || 1}
                    // currentPage={ 1}

                    progressPending={isLoading}
                    paginationServer
                    paginationTotalRows={totalRowCount}
                    onChangePage={fetchAllCategory}


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
                            <label htmlFor="categoryName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category Name</label>
                            <input
                                type="text"
                                id="categoryName"
                                onChange={handleChange}
                                name='categoryName'
                                value={fromdata.categoryName}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
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
                            <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
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

                        <div className="mb-5 flex gap-3">
                            <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status
                                <input
                                    type="radio"
                                    id="status-on"
                                    name="status"
                                    onChange={handleChange}
                                    value="true"
                                    checked={fromdata.status === "true"}
                                /> ON
                                <input
                                    type="radio"
                                    id="status-off"
                                    name="status"
                                    onChange={handleChange}
                                    value="false"
                                    checked={fromdata.status === "false"}
                                /> OFF
                            </label>
                        </div>
                        <div>
                            <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                {imageUrl1 && (
                                    <img
                                        src={imageUrl1}
                                        alt="Selected"
                                        style={{ maxWidth: '50px', maxHeight: '50px' }}
                                    />
                                )}
                            </label>
                        </div>
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

export default Category;
