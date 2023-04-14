import { useEffect, useState } from 'react';
import { MantineProvider } from '@mantine/core';

import Header from '../../components/Header';

const LAMBDA_URL = 'https://api.turunwappuradio.com/prod/music-lambda';

const QuarantinePage = () => {
  const [submissions, setSubmissions] = useState([]);
  const password = localStorage.getItem('session');

  useEffect(() => {
    const fn = async () => {
      const res = await fetch(LAMBDA_URL, {
        method: 'POST',
        body: JSON.stringify({
          operation: 'admin/get-quarantined',
          password,
        }),
      });
      const data = await res.json();
      setSubmissions(data.submissions);
    };

    fn();
  }, []);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Header title="Karanteeni" />
    </MantineProvider>
  );
};

export default QuarantinePage;
