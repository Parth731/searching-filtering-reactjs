// import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
// import {
//   MDBTable,
//   MDBTableBody,
//   MDBTableHead,
//   MDBRow,
//   MDBContainer,
//   MDBCol,
//   MDBBtn,
//   MDBBtnGroup,
//   MDBPagination,
//   MDBPaginationItem,
//   MDBPaginationLink,
// } from "mdb-react-ui-kit";

import UsersList from "./components/UserList";

// import axios from "axios";
// import ReactPaginate from "react-paginate";

// function App() {
//   const [result, setResult] = useState<any>([]);
//   const [query, setQuery] = useState<string>("");
//   const [sortValue, setSortValue] = useState<string>("");
//   const [currentPage, setCurrentPage] = useState<number>(0);
//   const [pageLimit, setPageLimit] = useState<number>(10);
//   const [sortFilterValue, setSortFilterValue] = useState<string>("");
//   const [operation, setOperation] = useState<string>("");

//   const sortOption = ["name", "email", "phone", "address", "status"];

//   useEffect(() => {
//     loadUserData(0, 10, 0);
//   }, []);

//   const loadUserData = async (
//     start: number,
//     end: number,
//     increase: number,
//     opType = null as any,
//     filterOrSortValue?: any
//   ) => {
//     console.log(currentPage, start, end);
//     switch (opType) {
//       case "search":
//         setOperation("search");
//         setSortValue("");
//         try {
//           const response = await axios.get(
//             `http://localhost:5000/users?q=${query}_start=${start}&_end=${end}`
//           );
//           setResult(response.data);
//           setCurrentPage((prev) => prev + increase);
//           setQuery("");
//         } catch (error) {
//           console.log(error);
//         }
//         break;
//       default:
//         try {
//           const response = await axios.get(
//             `http://localhost:5000/users?_start=${start}&_end=${end}`
//           );
//           const resData: any = await response.data;
//           console.log(resData);
//           setResult(resData);
//           setCurrentPage((prev) => prev + increase);
//         } catch (error) {
//           console.log(error);
//         }
//     }
//   };

//   const handleSearch = async (e: any) => {
//     e.preventDefault();
//     loadUserData(0, 10, 0, "search", query);
//     // try {
//     //   const response = await axios.get(
//     //     `http://localhost:5000/users?q=${query}`
//     //   );
//     //   setResult(response.data);
//     // } catch (error) {
//     //   console.log(error);
//     // }
//   };

//   const handleReset = () => {
//     loadUserData(0, 10, 0);
//   };

//   const handleSort = async (e: any) => {
//     // e.preventDefault();
//     setSortValue(e.target.value);
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/users?_sort=${e.target.value}&_order=asc`
//       );
//       setResult(response.data);
//       setQuery("");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleFilter = async (value: string) => {
//     try {
//       if (value) {
//         const response = await axios.get(
//           `http://localhost:5000/users?status=${value}`
//         );
//         setResult(response.data);
//         setQuery("");
//       } else {
//         const response = await axios.get("http://localhost:5000/users");
//         setResult(response.data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const renderPagination = () => {
//     if (currentPage === 0) {
//       return (
//         <MDBPagination className="mb-0">
//           <MDBPaginationItem>
//             <MDBPaginationLink>1</MDBPaginationLink>
//           </MDBPaginationItem>
//           <MDBPaginationItem>
//             <MDBBtn onClick={() => loadUserData(10, 20, 1, operation)}>
//               Next
//             </MDBBtn>
//           </MDBPaginationItem>
//         </MDBPagination>
//       );
//     } else if (currentPage < pageLimit - 1 && result.length === pageLimit) {
//       return (
//         <MDBPagination className="mb-0">
//           <MDBPaginationItem>
//             <MDBBtn
//               onClick={() =>
//                 loadUserData(
//                   (currentPage - 1) * 10,
//                   currentPage * 10,
//                   -1,
//                   operation
//                 )
//               }
//             >
//               Prev
//             </MDBBtn>
//           </MDBPaginationItem>
//           <MDBPaginationItem>
//             <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
//           </MDBPaginationItem>
//           <MDBPaginationItem>
//             <MDBBtn
//               onClick={() =>
//                 loadUserData(
//                   (currentPage + 1) * 10,
//                   (currentPage + 2) * 10,
//                   1,
//                   operation
//                 )
//               }
//             >
//               Next
//             </MDBBtn>
//           </MDBPaginationItem>
//         </MDBPagination>
//       );
//     } else {
//       <MDBPagination className="mb-0">
//         <MDBPaginationItem>
//           <MDBPaginationItem>
//             <MDBBtn
//               onClick={() =>
//                 loadUserData(
//                   (currentPage - 1) * 10,
//                   currentPage * 10,
//                   -1,
//                   operation
//                 )
//               }
//             >
//               prev
//             </MDBBtn>
//           </MDBPaginationItem>
//           <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
//         </MDBPaginationItem>
//       </MDBPagination>;
//     }
//   };

//   // const oneVal = new Number(3) + 2;
//   // const twoVal = new Number(3) === 3;
//   // console.log(oneVal, twoVal);

//   const handlePageChange = (event) => {
//     console.log(event);
//     // TODO Only change displayed selected page
//     // when its content is loaded in useEffect.
//     setPageOffset(event.selected);
//   };

//   return (
//     <>
//       <MDBContainer>
//         <form
//           action=""
//           style={{
//             margin: "auto",
//             padding: "15px",
//             maxWidth: "400px",
//             alignContent: "center",
//           }}
//           className="d-flex input-group w-auto"
//           onSubmit={handleSearch}
//         >
//           <input
//             type="text"
//             name="search"
//             id="search"
//             className="form-control me-2"
//             placeholder="Search Name ..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//           />
//           {/* <MDBBtnGroup> */}
//           <MDBBtn type="submit" color="dark">
//             Search
//           </MDBBtn>
//           <MDBBtn className="mx-2" color="info" onClick={() => handleReset()}>
//             Reset
//           </MDBBtn>
//           {/* </MDBBtnGroup> */}
//         </form>

//         <div style={{ marginTop: "100px" }}>
//           <h2 className="text-center">
//             search, Filter and Pagination using JSON Server
//           </h2>
//           <MDBRow>
//             <MDBCol size={12}>
//               <MDBTable>
//                 <MDBTableHead dark>
//                   <tr>
//                     <th scope="col">No</th>
//                     <th scope="col">Name</th>
//                     <th scope="col">Email</th>
//                     <th scope="col">Phone</th>
//                     <th scope="col">Address</th>
//                     <th scope="col">Status</th>
//                   </tr>
//                 </MDBTableHead>
//                 {result?.length === 0 ? (
//                   <MDBTableBody className="align-center mb-0">
//                     <tr>
//                       <td colSpan={8} className="text-center mb-0">
//                         No Data Found
//                       </td>
//                     </tr>
//                   </MDBTableBody>
//                 ) : (
//                   result?.map((item: any, index: number) => {
//                     console.log(item);
//                     return (
//                       <MDBTableBody key={index}>
//                         <tr>
//                           <th scope="row">{index + 1}</th>
//                           <td>{item?.name}</td>
//                           <td>{item?.email}</td>
//                           <td>{item?.phone}</td>
//                           <td>{item?.address}</td>
//                           <td>{item?.status}</td>
//                         </tr>
//                       </MDBTableBody>
//                     );
//                   })
//                 )}
//               </MDBTable>
//             </MDBCol>
//           </MDBRow>
//           <div
//             style={{
//               margin: "auto",
//               padding: "15px",
//               maxWidth: "250px",
//               alignContent: "center",
//             }}
//           >
//             {/* {renderPagination()} */}
//             <ReactPaginate
//               previousLabel="Previous"
//               nextLabel="Next"
//               pageClassName="page-item"
//               pageLinkClassName="page-link"
//               previousClassName="page-item"
//               previousLinkClassName="page-link"
//               nextClassName="page-item"
//               nextLinkClassName="page-link"
//               breakLabel="..."
//               breakClassName="page-item"
//               breakLinkClassName="page-link"
//               pageCount={pageCount}
//               marginPagesDisplayed={2}
//               pageRangeDisplayed={5}
//               onPageChange={handlePageChange}
//               containerClassName="pagination"
//               activeClassName="active"
//               forcePage={pageOffset}
//             />
//           </div>
//         </div>
//         <MDBRow>
//           <MDBCol size={8}>
//             <h5>SortBy:</h5>
//             <select
//               style={{ width: "50%", borderRadius: "2px", height: "35px" }}
//               value={sortValue}
//               onChange={handleSort}
//             >
//               <option>Please Select Value</option>
//               {sortOption.map((item, index) => (
//                 <option key={index} value={item}>
//                   {item}
//                 </option>
//               ))}
//             </select>
//           </MDBCol>
//           <MDBCol size={4}>
//             <h2>Filter By Status</h2>
//             <MDBBtnGroup>
//               <MDBBtn color="success" onClick={() => handleFilter("active")}>
//                 Active
//               </MDBBtn>
//             </MDBBtnGroup>
//             <MDBBtnGroup>
//               <MDBBtn
//                 color="danger"
//                 style={{ marginLeft: "2px" }}
//                 onClick={() => handleFilter("inactive")}
//               >
//                 InActive
//               </MDBBtn>
//             </MDBBtnGroup>
//             <MDBBtnGroup>
//               <MDBBtn
//                 color="info"
//                 style={{ marginLeft: "2px" }}
//                 onClick={() => handleFilter("")}
//               >
//                 Clear
//               </MDBBtn>
//             </MDBBtnGroup>
//           </MDBCol>
//         </MDBRow>
//       </MDBContainer>
//     </>
//   );
// }

// export default App;

function App() {
  return (
    <>
      <UsersList />
    </>
  );
}
export default App;
