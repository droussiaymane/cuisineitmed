
import withAuth from "../../Auth/withAuth";
// const Navbar = dynamic(() => import("../../../components/NavBar"), {
//   ssr: false,
// }); //<- set SSr to false


const addPatient = () => {
  console.log(process.env)
  window.location.href = process.env.dpi_uri+"addPatient/";
  
};

export default withAuth(addPatient);
