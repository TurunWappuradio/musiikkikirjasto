import { useEffect, useState } from 'react';
import { Container, Accordion, Title } from '@mantine/core';

import Header from '../../components/Header';
import Submission from './Submission';

const LAMBDA_URL = 'https://api.turunwappuradio.com/prod/music-lambda';

const QuarantinePage = () => {
  const [cdSubmissions, setCdSubmissions] = useState([]);
  const [otherSubmissions, setOtherSubmissions] = useState([]);
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

      const values = Object.values(data.submissions);
      const cds = values.filter(({ music_source }) => music_source === 'CD');
      const others = values.filter(
        ({ music_source }) => music_source === 'Other'
      );

      setCdSubmissions(cds);
      setOtherSubmissions(others);
    };

    fn();
  }, []);

  return (
    <>
      <Header title="Karanteeni" />
      <Container>
        <Title order={2} size="h3" mb={8}>
          CD levyltä ripatut: {cdSubmissions.length} kpl
        </Title>
        <Accordion variant="separated">
          {cdSubmissions.map((submission) => (
            <Submission key={submission.id} submission={submission} />
          ))}
        </Accordion>
        <Title order={2} size="h3" mt={16} mb={8}>
          Muut: {otherSubmissions.length} kpl
        </Title>
        <Accordion variant="separated">
          {otherSubmissions.map((submission) => (
            <Submission key={submission.id} submission={submission} />
          ))}
        </Accordion>
      </Container>
    </>
  );
};

export default QuarantinePage;
