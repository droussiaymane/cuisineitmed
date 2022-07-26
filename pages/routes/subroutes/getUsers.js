import { React, useState, useEffect } from "react";
import withAuth from "../../Auth/withAuth";
import SuccessCard from "../../../components/SuccessCard";
import ErrorCard  from "../../../components/ErrorCard";
import Router from "next/router";

import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import("../../../components/NavBar"), { ssr: false }) //<- set SSr to false


const getUsers = ( ) => {
  const [order, setOrder] = useState("");
  const [id, setId] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setError(false);
    setSuccess(false);
  }, []);



  
  const [users,setUsers]=useState([])
  useEffect(async ()=>{
    var Users = await fetch("/api/getUsers");
  Users = await Users.json();
  setUsers(Users)
  },[])


  const deleteData = async (e) => {
    // Get the id of the target
    const target = e.target.id;
    setId(target);

    const deleted = await fetch(
      "/api/deleteUser/" + target,
      {
        method: "DELETE",
      }
    );

    console.log(deleted.status)

    if (deleted.status == 200) {
 
        Router.reload(window.location.pathname);
        setSuccess(true);
     
    } else if (deleted.status == 404) {
    
        Router.reload(window.location.pathname);
        setError(true);
     
    }
  };
  const activateData = async (e) => {
    // Get the id of the target
    const target = e.target.id;
    setId(target);

    const activate = await fetch(
      "/api/activateUser/" + target,
      {
        method: "GET",
      }
    );


    if (activate.status == 200) {
 
        Router.reload(window.location.pathname);
        setSuccess(true);
     
    } else if (activate.status == 404) {
    
        Router.reload(window.location.pathname);
        setError(true);
     
    }
  };
  const activeicon=(item)=>{return(!item.active)? <td id={item._id} className="" onClick={activateData}>
                  <svg id={item._id} className="h-6 w-6 mx-auto" onClick={activateData} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline id={item._id} points="20 6 9 17 4 12"></polyline></svg>
  </td> : ""}
  return (
    <>
      <Navbar />
      {success && <SuccessCard message="the request is done successfully" />}
      {error && <ErrorCard error="Something went wrong" />}
      <div className="mx-auto w-full">
        <div className="w-3/4 mx-auto">
          <h1 className="text-center text-5xl font-bold text-green-500 mt-10">
            Liste des utilisateurs
          </h1>
        </div>
      </div>
      <div className="overflow-x-auto mx-auto w-3/4 text-base font-light mt-10 text-left">
        <table className="overflow-x-auto mx-auto w-full border-separate border border-green-500 text-gray-800 rounded-md">
          <thead>
            <tr className="text-center">
              <th className="border border-gray-200 p-5 rounded-md">
                Nom Complet
              </th>
              <th className="border border-gray-200 p-5 rounded-md">
                Addresse E-mail
              </th>
              <th className="border border-gray-200 p-5 rounded-md">Rôle</th>
            </tr>
          </thead>

          <tbody>
            {users.map((item) => (
              <tr key={item.id} className="text-center border">
                <td className="border border-gray-200 p-5 rounded-md">
                  {item.fullName}
                </td>
                <td className="border border-gray-200 p-5 rounded-md">
                  {item.email}
                </td>
                <td className="border border-gray-200 p-5 rounded-md">
                  {item.role}
                </td>
				
				
                <td id={item._id} className="" onClick={deleteData}>
                  <svg
                    id={item._id}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#ff0000"
                  >
                    <path
                      id={item.id}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </td>
				{activeicon(item)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

// This function gets called at build time
export async function getStaticProps() {

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {

    },
  };
}

export default withAuth(getUsers);
