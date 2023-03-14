import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getHotelId } from '../../utils/utils';
import LoadingIndicator from "../LoadingIndicator/LoadIndicator";

function ViewUsers() {
    const hotelId = getHotelId();
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState<any>()
    const [selectedPage, setSelectedPage] = useState<any>("first")
    const [currentPage, setCurrentPage] = useState<any>();
    let rowId = 1;

    const [page, setPage] = useState<any>({
        currentPage: 1,
        nextPage: 2
    });

    useEffect(() => {
        setPage((prevPage: any) => ({
            ...prevPage,
            nextPage: prevPage.currentPage + 1
        }));

        if (selectedPage == "second") {
            fetchData(page.currentPage + 1);
        } else {
            fetchData(page.currentPage);
        }
    }, [page.currentPage]);

    useEffect(() => {
        fetchData(1);
    }, [])

    async function fetchData(pageNumber: any) {
        setCurrentPage(pageNumber);
        setIsLoading(true)
        try {
            const response = await axios.get(`http://localhost:8090/users/page/${pageNumber}`);
            setUsers(response.data);
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            alert("Some error occured while fetching data")
        }
    }

    async function handleDelete(userId: any) {
        setIsLoading(true)
        try {
            const response = await axios.delete(`http://localhost:8090/users/${userId}`);
            fetchData(currentPage)
        } catch (error) {
            setIsLoading(false)
            alert("Some error occured while deletion, please try again")
        }
    }

    return (
        <>
            {isLoading && <LoadingIndicator />}
            <div className='view-booking-container'>
                <div className="col-12 mt-5">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="header-title title">HOTEL LISTS</h4>
                            {
                                users?.length > 0 ?
                                    (<div className="data-tables datatable-dark">
                                        <table id="dataTable3" className="text-center">
                                            <thead className="text-capitalize">
                                                <tr>
                                                    <th>No.</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Password</th>
                                                    <th>Role</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            {
                                                users.map((user: any) =>
                                                    <tbody>
                                                        <tr>
                                                            <td>{rowId++}</td>
                                                            <td>{user.name}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.password}</td>
                                                            <td>{user.role}</td>
                                                            <td className='delete-link-text'>
                                                                <a onClick={() => handleDelete(user.id)}>Delete</a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                )

                                            }
                                        </table>
                                    </div>)
                                    :
                                    <div className='no-data-text-view'>
                                        <i className='no-bookings-text'>
                                            "Sorry no users are available"
                                        </i>
                                    </div>
                            }
                        </div>

                    </div>
                </div>

                <div className='dataTables_paginate paging_simple_numbers page'>
                    <ul className='pagination'>

                    </ul>
                    <li className={`paginate_button page-item previous ${page.currentPage <= 1 ? 'disabled' : ''}`}>
                        <a onClick={() => setPage({ ...page, currentPage: page.currentPage - 1 })} className='page-link'>
                            Previous
                        </a>
                    </li>

                    <li className={`paginate_button page-item  ${selectedPage == "first" ? 'active' : ''}`}>
                        <a className='page-link' onClick={() => {
                            if (selectedPage == "second") {
                                fetchData(page.currentPage)
                            }
                            setSelectedPage("first");
                        }}>
                            {page.currentPage}
                        </a>
                    </li>

                    <li className={`paginate_button page-item ${selectedPage === "second" ? 'active' : ''}`}>
                        <a className='page-link' onClick={() => {
                            if (selectedPage == "first") {
                                fetchData(page.currentPage + 1)
                            }
                            setSelectedPage("second");
                        }}>
                            {page.nextPage}
                        </a>
                    </li>

                    <li className='paginate_button page-item next'>
                        <a onClick={() => {
                            setPage({ ...page, currentPage: page.currentPage + 1 });
                        }}
                            className='page-link'>
                            Next
                        </a>
                    </li>
                </div>
            </div>
        </>
    )
}

export default ViewUsers