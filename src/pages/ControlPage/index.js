import './ControlStyle.scss';
import Header from '../../components/Header';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from './musicTable/index';
import { isMobile } from 'react-device-detect';
import { Button, Select, Group, Text } from '@mantine/core';

const LAMBDA_URL = process.env.REACT_APP_MUSIC_LAMBDA_URL;

const ControlPage = () => {
  const [songList, setSongList] = useState([]);
  const [songs, setSongs] = useState([]);
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(100);

  // Background fetch all songs
  useEffect(() => {
    let isActive = true;
    const fetchAllSongs = async () => {
      const password = localStorage.getItem('session');
      let currentStart = 0;
      const CHUNK_SIZE = 100; // Fetch 100 songs at a time
      let allFetched = false;
      let accumulated = [];

      while (!allFetched && isActive) {
        try {
          const response = await axios({
            method: 'post',
            url: LAMBDA_URL,
            data: {
              operation: 'admin/get-songs',
              password,
              limit: CHUNK_SIZE,
              start: currentStart,
            },
          });
          const fetchedSongs = response.data.songs || [];
          if (fetchedSongs.length === 0) {
            allFetched = true;
          } else {
            accumulated = [...accumulated, ...fetchedSongs];
            setSongList([...accumulated]); // create a new array to trigger re-render
            currentStart += CHUNK_SIZE;
          }
        } catch (error) {
          console.error('Error fetching background songs:', error);
          allFetched = true;
        }
      }
    };
    fetchAllSongs();
    return () => {
      isActive = false;
    };
  }, []);

  const getRows = (list, currentStart, currentLimit) => {
    return list.slice(currentStart, currentStart + currentLimit);
  };

  useEffect(() => {
    setSongs(getRows(songList, start, limit));
  }, [songList, start, limit]);

  console.log(songList);

  const tableHeaders = [
    {
      Header: 'Kappale',
      accessor: 'title',
    },
    {
      Header: 'Artisti',
      accessor: 'artist',
    },
    {
      Header: 'Albumi',
      accessor: 'album',
    },
    {
      Header: 'Kesto',
      accessor: 'length',
    },
  ];
  return (
    <>
      <Header title="Hallintanäkymä" />
      <div className="ControlContent">
        <p>Tervetuloa hallintanäkymään :P</p>
        <a href="/karanteeni">Karanteeni</a>
      </div>
      <Group position="center" my={20}>
        <Button
          color="blue"
          disabled={start === 0}
          onClick={() => setStart(Math.max(0, start - limit))}
        >
          Edellinen
        </Button>
        <Text>
          Sivu {Math.floor(start / limit) + 1} /{' '}
          {Math.ceil(songList.length / limit) || 1} ({songList.length}{' '}
          kappaletta)
        </Text>
        <Button
          color="blue"
          disabled={start + limit >= songList.length}
          onClick={() => setStart(start + limit)}
        >
          Seuraava
        </Button>
        <Select
          data={['20', '50', '100', '200', '500']}
          value={limit.toString()}
          onChange={(val) => {
            const newLimit = parseInt(val, 10);
            setLimit(newLimit);
            setStart(0);
          }}
          style={{ width: 100 }}
        />
      </Group>
      <div className="ControlTable">
        <Table
          columns={tableHeaders}
          data={songs || []}
          hiddenColumns={isMobile ? ['length'] : []}
        ></Table>
      </div>
    </>
  );
};
export default ControlPage;
