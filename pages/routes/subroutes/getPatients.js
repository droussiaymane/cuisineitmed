import withAuth from '../../Auth/withAuth';
import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";
import Router from "next/router";
const Navbar = dynamic(() => import("../../../components/NavBar"), { ssr: false }) //<- set SSr to false

const getPatients = ({ Patients }) => {


const getPatientsApi=async ()=>{
  const res = await fetch("/api/getPatients");
  var Patients = await res.json();
  setPatients(Patients)
}

  const [patients,setPatients]=useState([])
  useEffect(()=>{getPatientsApi()},[])



  const deleteData = async (ipp) => {
    const res = await fetch("/api/deletePatient/"+ipp);
	Router.reload(window.location.pathname);
	
	
	

  };

  return (
    <>
    <Navbar />
      <div className="mx-auto w-full">
        <div className="w-3/4 mx-auto">
          <h1 className="text-center text-5xl font-bold text-green-500 mt-10">
            Liste des patients
          </h1>
        </div>
      </div>
      <div className="overflow-x-auto mx-auto w-3/4 text-base font-light mt-10 text-left">
        <table className="overflow-x-auto mx-auto w-full border-separate border border-green-500 text-gray-800 rounded-md">
          <thead>
            <tr className="text-center">
              <th className="border border-gray-200 p-5 rounded-md">IPP</th>
              <th className="border border-gray-200 p-5 rounded-md">
                Nom Complet
              </th>
              <th className="border border-gray-200 p-5 rounded-md">Nationalité</th>
              <th className="border border-gray-200 p-5 rounded-md">
                Date de naissance
              </th>
              
              <th className="border border-gray-200 p-5 rounded-md">
              Numéro de séjour
              </th>
              <th className="border border-gray-200 p-5 rounded-md">
              Allergie Type
              </th>
              <th className="border border-gray-200 p-5 rounded-md">
                Date d'entrée
              </th>
            </tr>
          </thead>

          <tbody>
            {patients.slice(0)
              .reverse()
              .map((item) => (
                <tr key={item.ssNumber} className="text-center border">
                  <td className="border border-gray-200 p-5 rounded-md">
                    {item.IPP}
                  </td>
                  <td className="border border-gray-200 p-5 rounded-md">
                    {item.firstName}
                  </td>
                  <td className="border border-gray-200 p-5 rounded-md">
                    {item.nationality}
                  </td>
                  <td className="border border-gray-200 p-5 rounded-md">
                    {item.birthDate.slice(0, 10)}
                  </td>
                  <td className="border border-gray-200 p-5 rounded-md">
                    {item.SojournNb}
                  </td>
                  <td className="border border-gray-200 p-5 rounded-md">
                    {item.allergyType}
                  </td>
                  <td className="border border-gray-200 p-5 rounded-md">
                    {item.vaccinationDate.slice(0, 10)}
                  </td>
                  <td className="" onClick={()=>{deleteData(item.IPP)}}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#ff0000"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </td>
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
  // Call an external API endpoint to get posts

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {

    },
  };
}

export default withAuth(getPatients);
