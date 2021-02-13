import Table from '../../components/Table';
import Button from '../../components/button';
import { useEffect, useState, useRef, useCallback } from "react";
import { getRows, getSongs } from './tracklist.js';
import Input from '../../components/Input';
import { AiOutlineSearch as Search } from 'react-icons/ai';
import { isMobile } from 'react-device-detect';

const MusicLibrary = () => {
  const [tracklist, setTracklist] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const headerRef = useRef(null);
  const [scrollPos, setScrollPos] = useState(0);
  const [direction, setDirection] = useState("up");

  useEffect(() => {
    const f = async () => setTracklist(await getSongs());
    f();
  }, []);

  useEffect(() => {
    setTracks(getRows(tracklist, 0, searchTerm));
  }, [tracklist, searchTerm]);

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
    const newTracks = getRows(tracklist, tracks.length, searchTerm);
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
    },
    {
      Header: "Kesto",
      accessor: "length"
    }
  ];

  return (
    <div className="tableWrapper" ref={headerRef}>
      <Table columns={tableHeaders} data={tracks} update={update} hiddenColumns={isMobile ? ["length"] : []}>
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