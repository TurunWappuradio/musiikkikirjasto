import { Link } from 'react-router-dom';
import './IndexStyle.scss';
import MusicLibrary from './MusicLibrary';
import Header from '../../components/Header';

const IndexPage = () => (
  <>
    <Header title="Musiikkikirjasto"/>
    <div className="IndexContent">
      <p>Onnittelut, löysit Turun Wappuradion musiikkikirjaston!
        Tältä sivulta löydät kaikki musiikkikirjastoon hyväksytyt kappaleet.
        Jos etsimääsi kappaletta ei ole kirjastossa, 
        voit hankkia sen laillisin keinoin esimerkiksi rippaamalla CD-levyltä ja lisätä sen kirjastoon
        {' '}<Link to="/lisaa">tältä sivulta löytyvällä lomakkeella</Link>.
        Lisätietoja Turun Wappuradion musiikkikäytännöistä löydät{' '}
        <a target="_blank" rel="noreferrer" href="https://www.turunwappuradio.com/musiikki">täältä</a>.</p>
    </div>
    <MusicLibrary />
  </>
);

export default IndexPage;