import { useState } from "react";
import { useRouter } from "next/router";
import ErrorCard from "../components/ErrorCard";
import Navbar from "../components/NavBar";
import withoutAuth from './Auth/withoutAuth'

// This page shouldn't be accessed if the user is loggedIn
const signup = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [role, setRole] = useState("Admin");
  const [error, setError] = useState("");

  // const { loggedIn, handleAuth } = useContext(AuthContext);

  const signup = async (e) => {
    e.preventDefault();
    // connect to api to check credentials of user
    const data = { fullName :fullName, email:email, password:password ,role: role};
    const res = await fetch(process.env.back_url+"v1/register", {
 
      method: "POST",
     
      body:JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }      // body data type must match "Content-Type" header
    })

    
   if (res.status == 200) {
     router.push("/")
   } else {
	   let e=await res.json()
     console.log(e)
     setError(e.error.details[0].message)
   }
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto w-3/4 mt-10">
        {error !== "" && <ErrorCard error={error} />}
        <h1 className="text-2xl font-bold">Sign up</h1>
        <form onSubmit={signup} className="flex flex-col mx-auto">
			<label className="text-green-500 font-bold text-sm mt-4">
				Nom :
			  </label>
			  <input
				type="text"
				value={fullName}
				onChange={(e) => {
				  setFullName(e.target.value);
				}}
				placeholder="Entrez votre nom"
				className="border border-green-500 px-2 py-4 rounded-md mt-4"
			/>
          <label className="text-green-500 font-bold text-sm mt-4">
            Addresse e-mail:
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Entrez votre addresse e-mail"
            className="border border-green-500 px-2 py-4 rounded-md mt-4"
          />
          <label className="text-green-500 font-bold text-sm mt-4">
            Mot de passe:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Entrez votre mot de passe"
            className="border border-green-500 px-2 py-4 rounded-md mt-4"
          />
		  <label className="text-green-500 font-bold text-sm mt-4">
            Role:
          </label>
          <select
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
            }}
            className="border border-green-500 px-2 py-4 rounded-md mt-4"
          >
            <option value="Admin">Admin</option>
            <option value="Aide soignant">Aide soignant</option>
            <option value="Agent restauration">Agent restauration</option>
            <option value="Responsable approvisionnement">
              Responsable approvisionnement
            </option>
            <option value="None">None</option>
          </select>
          <button
            type="submit"
            className="bg-green-500 px-2 py-4 rounded-md mt-4 text-white font-bold"
          >
            signup
          </button>
        </form>
      </div>
    </>
  );
};

export default withoutAuth(signup); 
