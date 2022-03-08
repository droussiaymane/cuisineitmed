import NavBar from './NavBar'
import Footer from './Footer'
import Link from 'next/link';


const Layout = ({children}) => {
    return ( 
        <>
        <div>
            
            {children}
        </div>
        <Footer />
        </>
     );
}
 
export default Layout;