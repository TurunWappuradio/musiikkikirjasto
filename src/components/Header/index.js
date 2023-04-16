import { Link, useHistory } from 'react-router-dom';
import './HeaderStyle.scss';

const LAMBDA_URL = process.env.REACT_APP_MUSIC_LAMBDA_URL;

const Header = ({ title }) => {
  const session = localStorage.getItem('session');
  const isAdmin = session && session !== '';

  return (
    <>
      <header>
        <ul>
          <Link to="/">Musiikkikirjasto</Link>
          <Link to="/lisaa">Musiikin lähettäminen</Link>
          {isAdmin ? <Link to="/hallinta">Hallinta</Link> : <LoginButton />}
        </ul>
      </header>
      <div className="imgContainer">
        <img src="leima.svg" alt="Turun Wappuradio" width="300" height="300" />
      </div>
      <div className="HeaderContainer">
        <h1>{title}</h1>
      </div>
    </>
  );
};

const LoginButton = () => {
  const history = useHistory();

  const handleLoginClicked = async () => {
    const password = prompt('Syötä salasana', '');

    try {
      const response = await fetch(LAMBDA_URL, {
        method: 'POST',
        body: JSON.stringify({
          operation: 'admin/login',
          password,
        }),
      });

      if (response.status === 200) {
        // Store the password in localStorage. This is a very bad practice.
        localStorage.setItem('session', password);
        history.push('/hallinta');
      } else {
        alert('Väärin.');
      }
    } catch {
      alert('Kirjautuminen sisään epäonnistui.');
    }
  };

  return (
    <button onClick={handleLoginClicked} className="LoginButton">
      Kirjaudu
    </button>
  );
};

export default Header;
