import react from 'react'
import { Link , useLocation} from 'react-router-dom';

function Navbar() {
    //const location = useLocation();
    const currentRoute = useLocation().pathname.split('/')[1];
    console.log(currentRoute);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
            <div className="container py-2">
                <Link className="navbar-brand" to="/">Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className={`nav-link ${currentRoute == '' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                    <Link className={`nav-link ${currentRoute == 'hospital' ? 'active' : ''}`} to="/hospital">Hospitals</Link>
                    <Link className={`nav-link ${currentRoute == 'branch' ? 'active' : ''}`} to="/branch">Branches</Link>
                    <Link className={`nav-link ${currentRoute == 'drug' ? 'active' : ''}`} to="/drug">Drugs</Link>
                    <Link className={`nav-link ${currentRoute == 'branding' ? 'active' : ''}`} to="/branding">Advertisement</Link>
                </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar