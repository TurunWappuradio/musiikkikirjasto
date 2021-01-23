import Table from '../../components/Table';
import { useEffect, useState } from "react";
import { getRows } from './tracklist.js';
import Input from '../../components/Input';
import { AiOutlineSearch as Search } from 'react-icons/ai';

const MusicLibrary = () => {
  const [tracks, setTracks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setTracks(getRows(0, searchTerm))
  }, [searchTerm]);

  const update = () => {
    const newTracks = getRows(tracks.length, searchTerm);
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
      <Input
        placeholder="Suodata kappaleita"
        value={searchTerm}
        onChange={ev => setSearchTerm(ev.target.value)}>
        <Search />
      </Input>
    </Table>
  );
}

export default MusicLibrary;