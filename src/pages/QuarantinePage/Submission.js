import { Accordion, Title, List } from '@mantine/core';

const Submission = ({ submission }) => {
  const { id, ripper_name, files, validation_error } = submission;

  const errors = validation_error.split(',');

  return (
    <Accordion.Item value={id.toString()}>
      <Accordion.Control>
        <Title order={3} size="h4">
          {files.length} tiedostoa, {ripper_name}
        </Title>
      </Accordion.Control>
      <Accordion.Panel>
        <Title order={4} mb={8} size="h5">
          Validointivirheet
        </Title>
        <List type="unordered">
          {errors.map((e) => (
            <Error errorCode={e} />
          ))}
        </List>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

const Error = ({ errorCode }) => (
  <List.Item>{errorDescriptions[errorCode]}</List.Item>
);

const errorDescriptions = {
  MISSING_LOGFILE: '.log-tiedosto puuttuu',
  MULTIPLE_LOGFILES: 'Liikaa .log-tiedostoja, eli enemmän kuin yksi',
  MISMATCHED_LOGFILE:
    '.log-tiedosto ei täsmää syötettyihin raitoihin, raitojen pituudet eivät täsmää',
  CORRUPTED_LOGFILE: '.log-tiedosto korruptoitunut, avaaminen epäonnistui',
  INVALID_COMMAND_LINE_ARGS: 'Väärät asetukset .log-tiedostossa',
  ACCURATERIP_CHECK_FAILED: 'Accurate rip epäonnistunut',
  EAC_CHECK_FAILED: 'EAC havaitsi virheitä rippauksessa',
  TINYTAG_FAILED: 'Jonkin raidoista metadatan lukeminen epäonnistui',
  MISSING_SONGS:
    'Raitoja puuttuu, .log-tiedostossa on enemmän raitoja kuin lähetetty',
  EXTRANEOUS_SONGS:
    'Raitoja on liikaa, .log-tiedostossa on vähemmän raitoja kuin lähetetty',
  MISSING_METADATA:
    'Metadataa puuttuu jostain raidoista, pakolliset tiedot: title, album, artist, year',
  DUPLICATE_SONG: 'Duplikaatti! Raita on jo musiikkikirjastossa',
  UNKNOWN_SOURCE: 'Kappaleet on muusta lähteestä kuin CD-levyltä ripattu',
};

export default Submission;
