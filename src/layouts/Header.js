import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Dashboard from '../components/Dashboard'

const Header = () => {
    const [open, setOpen] = useState()
    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark" style={{justifyContent: 'space-between'}} >
                <Link className="navbar-brand ps-3" to={'/'}>QUẢN LÝ</Link>

                <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" onClick={()=>setOpen(!open)} id="navbarDropdown"  role="button" data-bs-toggle="dropdown" aria-expanded="false"><img className="fas fa-user fa-fw"/></a>
                        {open &&<ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to={'/profile'}>Profile</Link></li>
                                    
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to={'/login'}>Logout</Link></li>
                                </ul>
                        }
                        
                    </li>
                </ul>
            </nav>
    )
}

export default Header