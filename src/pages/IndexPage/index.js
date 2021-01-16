import { Link } from 'react-router-dom';
import './IndexStyle.scss';
import Table from '../../components/Table';
import { useEffect, useState } from "react";
import { getRows } from './tracklist.js';

const IndexPage = () => {
  const [tracks, setTracks] = useState(getRows(0))

  const update = () => {
    const newTracks = getRows(tracks.length -1)
    setTracks([...tracks, ...newTracks])
  }

  //useEffect(()) => {
    
  //}

  const tableHeaders = [
    {
      Header: "Artisti",
      accessor: "artist"
    },
    {
      Header: "Albumi",
      accessor: "album"
    },
    {
      Header: "Kappale",
      accessor: "title"
    }
  ]
  return (
    <div className="IndexWrapper" >
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
      <Table columns={tableHeaders} data={tracks} update={update}>
        <h2>Testi-teksti</h2>
      </Table>
    </div>
  );
}

export default IndexPage;