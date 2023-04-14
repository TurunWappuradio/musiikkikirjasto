import { Accordion, Title, Stack, Text, List } from '@mantine/core';

const Submission = ({ submission }) => {
  const { id, ripper_name, files, validation_error } = submission;

  return (
    <Accordion.Item value={id.toString()}>
      <Accordion.Control>
        <Title order={3} size="h4">
          {files.length} tiedostoa, {ripper_name}
        </Title>
      </Accordion.Control>
      <Accordion.Panel>
        <SubmissionInfo submission={submission} />
        <ValidationErrors errors={validation_error} />
      </Accordion.Panel>
    </Accordion.Item>
  );
};

const SubmissionInfo = ({ submission }) => {
  const {
    id,
    timestamp,
    ripper_name,
    ripper_email,
    source_description,
    message,
  } = submission;

  const ts = new Date(timestamp).toLocaleDateString('eu-fi');

  return (
    <Stack spacing="xs" mb={20}>
      <Text>ID: {id}</Text>
      <Text>Lähettäjä: {ripper_name}</Text>
      <Text>Sähköposti: {ripper_email}</Text>
      <Text>Aikaleima: {ts}</Text>
      {source_description && <Text>Mistä hankittu: {source_description}</Text>}
      {message && <Text>Terveiset: {message}</Text>}
    </Stack>
  );
};

const ValidationErrors = ({ errors }) => {
  const errorCodes = errors.split(',');

  return (
    <>
      <Title order={4} mb={8} size="h5">
        Validointivirheet
      </Title>
      <List>
        {errorCodes.map((e) => (
          <List.Item>{errorDescriptions[e]}</List.Item>
        ))}
      </List>
    </>
  );
};

const errorDescriptions = {
  MISSING_LOGFILE: '.log-tiedosto puuttuu.',
  MULTIPLE_LOGFILES: 'Liikaa .log-tiedostoja, eli enemmän kuin yksi.',
  MISMATCHED_LOGFILE:
    '.log-tiedosto ei täsmää syötettyihin raitoihin. Raitojen pituudet eivät täsmää.',
  CORRUPTED_LOGFILE: '.log-tiedosto korruptoitunut, avaaminen epäonnistui.',
  INVALID_COMMAND_LINE_ARGS: 'Väärät asetukset .log-tiedostossa.',
  ACCURATERIP_CHECK_FAILED: 'AccurateRip epäonnistunut.',
  EAC_CHECK_FAILED: 'EAC havaitsi virheitä rippauksessa.',
  TINYTAG_FAILED: 'Jonkin raidoista metadatan lukeminen epäonnistui.',
  MISSING_SONGS:
    'Raitoja puuttuu. .log-tiedostossa on enemmän raitoja kuin lähetetty.',
  EXTRANEOUS_SONGS:
    'Raitoja on liikaa. .log-tiedostossa on vähemmän raitoja kuin lähetetty.',
  MISSING_METADATA:
    'Metadataa puuttuu jostain raidoista. Pakolliset tiedot: title, album, artist, year',
  DUPLICATE_SONG: 'Duplikaatti! Raita on jo musiikkikirjastossa',
  UNKNOWN_SOURCE: 'Kappaleet on muusta lähteestä kuin CD-levyltä ripattu',
};

export default Submission;
