import React from 'react'
import { MdCalendarToday, MdLocationSearching, MdMailOutline, MdPermIdentity, MdPhoneAndroid, MdPublish } from 'react-icons/md'
import { Link } from 'react-router-dom'

function SingleVendarView() {

    return (
        <div className="p-6">


            <div className="flex gap-6">
                {/* User Info Section */}
                <div className="w-1/3 bg-white p-4 shadow-md rounded-lg">
                    <div className="flex items-center mb-4">
                        <img
                            src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            alt="User"
                            className="w-20 h-20 rounded-full object-cover mr-4"
                        />
                        <div>
                            <h2 className="text-xl font-semibold">Anna Becker</h2>
                            <span className="text-gray-500">Software Engineer</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Account Details</h3>
                        <div className="mb-2 flex items-center">
                            <MdPermIdentity className="text-gray-500 mr-2" />
                            <span className="text-gray-700">annabeck99</span>
                        </div>
                        <div className="mb-4 flex items-center">
                            <MdCalendarToday className="text-gray-500 mr-2" />
                            <span className="text-gray-700">10.12.1999</span>
                        </div>

                        <h3 className="text-lg font-semibold mb-2">Contact Details</h3>
                        <div className="mb-2 flex items-center">
                            <MdPhoneAndroid className="text-gray-500 mr-2" />
                            <span className="text-gray-700">+1 123 456 67</span>
                        </div>
                        <div className="mb-2 flex items-center">
                            <MdMailOutline className="text-gray-500 mr-2" />
                            <span className="text-gray-700">annabeck99@gmail.com</span>
                        </div>
                        <div className="flex items-center">
                            <MdLocationSearching className="text-gray-500 mr-2" />
                            <span className="text-gray-700">New York | USA</span>
                        </div>
                    </div>
                </div>

                {/* Edit User Section */}
                <div className="w-2/3 bg-white p-4 shadow-md rounded-lg">
                    <span className="text-2xl font-semibold">Edit</span>
                    <form className="flex flex-col mt-4 gap-4">
                        {/* Left Section */}
                        <div className="flex-1">
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold">Username</label>
                                <input
                                    type="text"
                                    placeholder="annabeck99"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Anna Becker"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold">Email</label>
                                <input
                                    type="email"
                                    placeholder="annabeck99@gmail.com"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold">Phone</label>
                                <input
                                    type="text"
                                    placeholder="+1 123 456 67"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold">Address</label>
                                <input
                                    type="text"
                                    placeholder="New York | USA"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    className="w-24 h-24 rounded-full object-cover"
                                    src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                                    alt="Profile"
                                />
                                <label
                                    htmlFor="file"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition"
                                >
                                    <MdPublish className="inline mr-2" />
                                    Upload
                                </label>
                                <input type="file" id="file" className="hidden" />
                            </div>
                            <button className="bg-blue-500 max-w-50 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 w-full">
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default SingleVendarView