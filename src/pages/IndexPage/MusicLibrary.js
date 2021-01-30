import Table from '../../components/Table';
import Button from '../../components/button';
import { useEffect, useState, useRef, useCallback } from "react";
import { getRows } from './tracklist.js';
import Input from '../../components/Input';
import { AiOutlineSearch as Search } from 'react-icons/ai';

const MusicLibrary = () => {
  const [tracks, setTracks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const headerRef = useRef(null);
  const [scrollPos, setScrollPos] = useState(0);
  const [direction, setDirection] = useState("up");

  useEffect(() => {
    setTracks(getRows(0, searchTerm));
  }, [searchTerm]);

  const onScroll = useCallback((ev) => {
    const scrolled = document.scrollingElement.scrollTop;
    setScrollPos(scrolled);
    const newDirection = scrolled > scrollPos ? "up" : "down";
    setDirection(newDirection);
  }, [scrollPos]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);


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
    <div className="tableWrapper" ref={headerRef}>
      <Table columns={tableHeaders} data={tracks} update={update}>
        <Input
          placeholder="Suodata kappaleita"
          value={searchTerm}
          onChange={ev => setSearchTerm(ev.target.value)}>
          <Search />
        </Input>
      </Table>
      {direction === "down" && scrollPos > 1500 && (
        <Button className="floatingButton" onClick={() => headerRef.current.scrollIntoView()}>Palaa ylös</Button>
      )}
    </div>
  );
}

export default MusicLibrary;