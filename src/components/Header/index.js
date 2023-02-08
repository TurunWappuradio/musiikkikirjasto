import { Link } from 'react-router-dom';
import './HeaderStyle.scss';

const Header = ({ title }) => (
  <>
    <header>
      <ul>
        <Link to="/">Musiikkikirjasto</Link>
        <Link to="/lisaa">Musiikin lähettäminen</Link>
        <Link to="/hallinta">Hallintanäkymä</Link>
      </ul>
    </header>
    <div className="imgContainer">
      <img src="leima.svg" alt="Turun Wappuradio" width="300" height="300"/>
    </div>
    <div className="HeaderContainer">
      <h1>{title}</h1>
    </div>  
  </>
);

export default Header;