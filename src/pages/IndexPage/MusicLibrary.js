import Table from '../../components/Table';
import { useEffect, useState } from "react";
import { getRows } from './tracklist.js';

const MusicLibrary = () => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    setTracks(getRows(0))
  }, []);

  const update = () => {
    const newTracks = getRows(tracks.length);
    setTracks([...tracks, ...newTracks]);
  }

  const tableHeaders = [
    {
      Header: "Kappale",
      accessor: "title"
    },
    {
      Header: "Artisti",
      accessor: "artist"
    },
    {
      Header: "Albumi",
      accessor: "album"
    }
  ];

  return (
    <Table columns={tableHeaders} data={tracks} update={update}>
      <h2>Testi-teksti</h2>
    </Table>
  );
}

export default MusicLibrary;