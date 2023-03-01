import './ControlStyle.scss'
import Header from '../../components/Header';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Table from '../../components/Table'
import { isMobile } from 'react-device-detect';
import tracklist from '../IndexPage/tracklist.json'

const LAMBDA_URL = process.env.REACT_APP_MUSIC_LAMBDA_URL;

const ControlPage = () => {

  const [songList, setSongList] = useState(tracklist)
  const [songs, setSongs] = useState([])

  const update = () => {
    const newSongs = getRows(songList, songs.length);
    setSongs([...songs, ...newSongs]);
  }

  const getRows = (songList, rowNum) => {
    return songList.slice(rowNum, rowNum + 100);
  }

  useEffect(() => {
    setSongs(getRows(songList, 0));
  }, [songList]);

 /* useEffect(() => {
    axios({
      method: 'post',
      url: LAMBDA_URL,
      data: {
        operation: 'admin/get-songs',
        password: 'salaisuus'
      }
    })
    .then(response => setSongs(response.data.songs))
  
  }, [])
*/
  console.log(songList)

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
    <>
      <Header title='Hallintanäkymä' />
      <div className='ControlContent' >
        <p>Tervetuloa hallintanäkymään :P</p>
      </div>
      <div>
      <Table columns={tableHeaders} data={songs} update={update} hiddenColumns={isMobile ? ["length"] : []}>
      </Table>
      </div>
    </>
  )
}
export default ControlPage;