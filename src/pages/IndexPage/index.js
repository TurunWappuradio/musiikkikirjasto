//import { Link } from 'react-router-dom';
import './IndexStyle.scss';
import MusicLibrary from './MusicLibrary';
import Header from '../../components/Header';

const IndexPage = () => (
  <>
    <Header title="Musiikkikirjasto" />
    <div className="IndexContent">
      <p>
        Tervetuloa Turun Wappuradion musiikkikirjastoon! Kirjaston kattavaa
        valikoimaa ei tällä hetkellä pysty kartuttamaan, mutta ominaisuus
        lisätään tälle sivulle myöhemmin keväällä, malta siis vielä hetki.
        <br></br>
        {/* Kirjasto on kattava, mutta mikäli etsimääsi kappaletta ei kuitenkaan löydy kirjastosta, 
        voit lisätä laillisin keinoin hankitun kopion{' '}<Link to="/lisaa">musanlataussivulla</Link>.<br></br>*/}
        Lisätietoja Turun Wappuradion musiikkikäytännöistä löydät{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.turunwappuradio.com/musiikki"
        >
          täältä
        </a>
        .
      </p>
    </div>
    <MusicLibrary />
  </>
);

export default IndexPage;
