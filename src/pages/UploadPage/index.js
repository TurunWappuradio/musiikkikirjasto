import { useState } from 'react';
import { AiOutlineLoading as Loading } from 'react-icons/ai';

import Dropzone from './DropZone';
import Button from '../../components/button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import RadioButton from '../../components/RadioButton';
import { submitSongs } from './handleFiles';
import './UploadPage.scss';
import Modal from '../../components/Modal/Modal';

const CD_INSTRUCTION = (
  <p>
    Fyysiseltä CD-levyltä ripattu musiikki on aina luvallista radiotoistoon.
    Ohjeet rippaamiseen löydät <a href="https://turunwappuradio.com/windowsrippaus">täältä</a>.
    Varmistathan että kaikki raidat ovat onnistuneesti rippaantuneet, ja että lähetät musiikkitiedostojen
    lisäksi myös kaikki muut rippauksessa syntyneet tiedostot.
  </p>
);

const OTHER_INSTRUCTION = (
  <p>
    Muusta lähteestä hankitussa musiikissa täytyy olla mukana todiste lähteen laillisuudesta,
    esimerkiksi kuitti tai artistin lupatosite. Varmistathan että raitojen lisäksi lähetät myös
    todisteen lähteen laillisuudesta.
  </p>
);

const UploadPage = () => {
  const [musicSource, setMusicSource] = useState(null);
  const [S3keys, setS3keys] = useState([]);
  const [files, setFiles] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [fileValidationError, setFileValidationError] = useState(null);

  const [ripperName, setRipperName] = useState("");
  const [ripperEmail, setRipperEmail] = useState("");
  const [sourceDescription, setSourceDescription] = useState("");
  const [message, setMessage] = useState("");

  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitResponse, setSubmitResponse] = useState(null);

  const handleMusicSourceChange = (ev) => setMusicSource(ev.target.value);

  const pushS3key = (key) => setS3keys(prevKeys => [...prevKeys, key]);

  const onRipperNameChange = (ev) => setRipperName(ev.target.value);

  const onRipperEmailChange = (ev) => setRipperEmail(ev.target.value);

  const onSourceDescriptionChange = (ev) => setSourceDescription(ev.target.value);

  const onMessageChange = (ev) => setMessage(ev.target.value);

  const isSubmitDisabled = ripperName === ""
    || ripperEmail === ""
    || sourceDescription === ""
    || S3keys.length === 0
    || isLoading
    || fileValidationError
    || submitLoading;

  const onSubmitClick = async () => {
    setSubmitLoading(true);
    const response = await submitSongs(S3keys, ripperName, ripperEmail, musicSource, sourceDescription, message);
    setSubmitResponse(response);
    setSubmitLoading(false);
  }

  const onCloseModal = () => {
    setMusicSource(null);
    setS3keys([]);
    setFiles({});
    setFileValidationError(null);
    setSourceDescription("");
    setSubmitResponse(null);
  }

  return (
    <>
      <Header title="Lähetä musiikkia" />
      <div className="IndexContent">
        <p>
          Musiikin lähetys on tällä hetkellä vain Toimituksen sisäisessä testauskäytössä.
          Malta vielä hetki, ominaisuus julkaistaan myös juontajille myöhemmin keväällä.
          Wappuun on vielä valitettavasti hetki aikaa.
        </p>
      </div>

      <div className="Box" onChange={handleMusicSourceChange}>
        <h2>Musiikin lähde</h2>
        <RadioButton name="musicSource" text="Fyysinen CD-levy" value="CD" checked={musicSource === "CD"} />
        <RadioButton name="musicSource" text="Jokin muu lähde" value="Other" checked={musicSource === "Other"} />
      </div>

      {musicSource && (
        <div className="IndexContent">
          {musicSource === "CD" && CD_INSTRUCTION}
          {musicSource === "Other" && OTHER_INSTRUCTION}
        </div>
      )}

      {musicSource && (
        <Dropzone
          files={files}
          setFiles={setFiles}
          pushS3key={pushS3key}
          setIsLoading={setIsLoading}
          fileValidationError={fileValidationError}
          setFileValidationError={setFileValidationError} />
      )}
      
      {musicSource && (
        <div className="Box">
          <h2>Lähettäjän tiedot</h2>
          <div className="SubmitControls">
            <Input
              placeholder="Nimi"
              value={ripperName}
              onChange={onRipperNameChange} />
            <Input
              placeholder="Sähköposti"
              value={ripperEmail}
              onChange={onRipperEmailChange} />
            <Input
              placeholder="Mistä musiikki on hankittu"
              value={sourceDescription}
              onChange={onSourceDescriptionChange} />
            <Input
              placeholder="Terveiset toimitukselle"
              value={message}
              onChange={onMessageChange} />
            <Button onClick={onSubmitClick} disabled={isSubmitDisabled}>
              {submitLoading
                ? <Loading className="Dropzone-loading" />
                : 'Lähetä'}
            </Button>
          </div>
        </div>
      )}
      {submitResponse && <Modal response={submitResponse} closeModal={onCloseModal} />}
    </>
  );
}

export default UploadPage;
