import { Link, useHistory } from 'react-router-dom';
import './HeaderStyle.scss';

const LAMBDA_URL = process.env.REACT_APP_MUSIC_LAMBDA_URL;

const Header = ({ title }) => {
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
        // A succesful login request sets a cookie,
        // which can be used to access admin pages.
        history.push('/hallinta');
      } else {
        alert('Väärin.');
      }
    } catch {
      alert('Kirjautuminen sisään epäonnistui.');
    }
  };

  return (
    <>
      <header>
        <ul>
          <Link to="/">Musiikkikirjasto</Link>
          <Link to="/lisaa">Musiikin lähettäminen</Link>
          <button onClick={handleLoginClicked} className="LoginButton">
            Kirjaudu
          </button>
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

export default Header;
