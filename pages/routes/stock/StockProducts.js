import withAuth from "../../Auth/withAuth";
import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";

const Navbar = dynamic(() => import("../../../components/NavBar"), { ssr: false }) //<- set SSr to false

const manageStock = () => {


  const [stockproducts,setStockProducts]=useState([])
  useEffect(async ()=>{
    const res = await fetch('/api/getStockProducts');
    var StockProducts = await res.json();
    setStockProducts(StockProducts)
  },[])


  const deleteData = () => {
    // delete the data
    console.log("deleted");
  };

  return (
    <>
    <Navbar />
      <div className="mx-auto w-full">
        <div className="w-3/4 mx-auto">
          <h1 className="text-center text-5xl font-bold text-green-500 mt-10">
            Liste des produits en stock
          </h1>
        </div>
      </div>
      <div className="overflow-x-auto mx-auto w-3/4 text-base font-light mt-10 text-left">
        <table className="overflow-x-auto mx-auto w-full border-separate border border-green-500 text-gray-800 rounded-md">
          <thead>
            <tr className="text-center">
              <th className="border border-gray-200 p-5 rounded-md">
                Reference du produit
              </th>
              <th className="border border-gray-200 p-5 rounded-md">
                Categorie
              </th>
              <th className="border border-gray-200 p-5 rounded-md">Unite</th>
              <th className="border border-gray-200 p-5 rounded-md">
                Designation
              </th>
              <th className="border border-gray-200 p-5 rounded-md">
                Stock de securite
              </th>
              <th className="border border-gray-200 p-5 rounded-md">
                Stock Actuel
              </th>
              <th className="border border-gray-200 p-5 rounded-md">Statut</th>
              <th className="border border-gray-200 p-5 rounded-md">
                Date d entree en stock
              </th>
              <th className="border border-gray-200 p-5 rounded-md">
                Date de peremption
              </th>
            </tr>
          </thead>

          <tbody>
            {stockproducts
              .reverse()
              .map((item) => (
                <tr key={item.id} className="text-center border">
                  <td className="border border-gray-200 p-5 rounded-md">
                    {item.productref}
                  </td>
                  <td className="border border-gray-200 p-5 rounded-md">
                    {item.category}
                  </td>
                  <td className="border border-gray-200 p-5 rounded-md">
                    {item.unite}
                  </td>
                  <td className="border border-gray-200 p-5 rounded-md">
                    {item._id}
                  </td>
                  <td className="border border-gray-200 p-5 rounded-md">
                    {item.safetyStock}
                  </td>
                  <td className="border border-gray-200 p-5 rounded-md">
                    {item.actualStock}
                  </td>
                  <td className="border border-gray-200 p-5 rounded-md">
                    {item.status}
                  </td>
                  <td className="border border-gray-200 p-5 rounded-md">
                    {item.addedAt!=undefined && item.addedAt.slice(0, 10)}
                  </td>
                  <td className="border border-gray-200 p-5 rounded-md">
                    {item.addedAt!=undefined && item.expireAt.slice(0, 10)}
                  </td>                  <td className="" onClick={deleteData}>
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


export default withAuth(manageStock);
