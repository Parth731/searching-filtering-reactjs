import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactSelect, { GroupBase } from "react-select";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";

// const sortOptions: { value: string; label: string }[] = ;

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchData();
  }, [currentPage, searchTerm, sortField, sortOrder]);

  const fetchData = async () => {
    const params = {
      _page: currentPage,
      _limit: pageSize,
      _sort: sortField,
      _order: sortOrder,
    };

    const response = await axios.get(
      `http://localhost:5000/users?q=${searchTerm}`,
      { params }
    );
    console.log(response.data);
    setUsers(response.data);
    setTotalPages(Math.ceil(response.headers["x-total-count"] / pageSize));
  };

  const handlePageChange = (page: any) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (e: any) => {
    console.log(e.value);
    setSortField(e.value);
    // setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setCurrentPage(1);
  };

  const handleSortStatus = (e: any) => {
    console.log(e.value);
    setSortOrder(e.value);
    setCurrentPage(1);
  };

  return (
    <MDBContainer
      style={{
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
        className="mt-3 mb-1 p-3"
      />

      {/* <select onChange={handleSort} value={sortField}>
        <option value="">Sort by...</option>
        <option value="name">Name</option>
        <option value="email">Email</option>
        <option value="phone">Phone</option>
        <option value="address">Address</option>
        <option value="status">Status</option>
      </select> */}

      <ReactSelect
        options={[
          { value: "name", label: "Name" },
          { value: "email", label: "Email" },
          { value: "phone", label: "Phone" },
          { value: "address", label: "Address" },
          { value: "status", label: "Status" },
        ]}
        onChange={handleSort}
        className="my-1"
        // value={sortField}
      />

      <ReactSelect
        options={[
          { value: "asc", label: "Ascending" },
          { value: "desc", label: "Descending" },
        ]}
        onChange={handleSortStatus}
        className="my-1"
      />

      {/* <ul>
          {users.map((user: any) => (
            <li key={user.id}>
              {user.name} - {user.email} - {user.phone} - {user.address} -{" "}
              {user.status}
            </li>
          ))}
        </ul> */}

      <div style={{ marginTop: "30px" }}>
        <h2 className="text-center">
          search, Filter and Pagination using JSON Server
        </h2>
        <MDBRow style={{ width: "100%" }}>
          <MDBCol size={12}>
            <MDBTable>
              <MDBTableHead dark>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Address</th>
                  <th scope="col">Status</th>
                </tr>
              </MDBTableHead>
              {users?.length === 0 ? (
                <MDBTableBody className="align-center mb-0 ">
                  <tr>
                    <td colSpan={8} className="text-center mb-0">
                      No Data Found
                    </td>
                  </tr>
                </MDBTableBody>
              ) : (
                users?.map((item: any, index: number) => {
                  console.log(item);
                  return (
                    <MDBTableBody key={index}>
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{item?.name}</td>
                        <td>{item?.email}</td>
                        <td>{item?.phone}</td>
                        <td>{item?.address}</td>
                        <td>{item?.status}</td>
                      </tr>
                    </MDBTableBody>
                  );
                })
              )}
            </MDBTable>
          </MDBCol>
        </MDBRow>
      </div>

      <div className="text-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </MDBContainer>
  );
};

export default UsersList;
