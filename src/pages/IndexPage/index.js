import { Link } from 'react-router-dom';
import './IndexStyle.scss';
import MusicLibrary from './MusicLibrary';

const IndexPage = () => {
  return (
    <div className="IndexWrapper">
      <header>
        <Link to="/lisaa">Musanlähetyssivulle</Link>
      </header>
      <div className="IndexContent" >
        <img src="leima.svg" alt="Turun Wappuradio" width="300" height="300"/>
        <h1>Musiikkikirjaston etusivu</h1>
        <p>Onnittelut, löysit Turun Wappuradion musiikkikirjaston!
          Tältä sivulta löydät kaikki musiikkikirjastoon hyväksytyt kapplaeet.
          Jos etsimääsi kappaletta ei ole kirjastossa, 
          voit hankkia sen laillisin keinoin esimerkiksi rippaamalla CD-levyltä ja lisätä sen kirjastoon
          {' '}<Link to="/lisaa">tältä sivulta löytyvällä lomakkeella</Link>.
          Lisätietoja Turun Wappuradion musiikkikäytännöistä löydät{' '}
          <a target="_blank" rel="noreferrer" href="https://www.turunwappuradio.com/musiikki">täältä</a>.</p>
      </div>
      <MusicLibrary />
    </div>
  );
}

export default IndexPage;