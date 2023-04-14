import { useEffect, useState } from 'react';
import { Container, Badge } from '@mantine/core';

import Header from '../../components/Header';
import Submission from './Submission';

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
      setSubmissions(Object.values(data.submissions));
    };

    fn();
  }, []);

  const Title = (
    <>
      Karanteeni
      <Badge variant="filled">{submissions.length}</Badge>
    </>
  );

  return (
    <>
      <Header title={Title} />
      <Container>
        {submissions.map((submission) => (
          <Submission submission={submission} />
        ))}
      </Container>
    </>
  );
};

export default QuarantinePage;
