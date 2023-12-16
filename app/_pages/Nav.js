import { NavLink } from 'react-router-dom';
import logo from './pwa-192x192.png';


function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">Apologist</NavLink>
          <span>
            <img src={logo} alt="" width="25" height="25"></img>
          </span>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/prompts">Prompts</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/evaluation/">Evaluation</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/configs">Configs</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
