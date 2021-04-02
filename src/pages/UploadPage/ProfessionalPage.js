import { useState } from 'react';
import { AiOutlineLoading as Loading } from 'react-icons/ai';

import Header from '../../components/Header';
import RadioButton from '../../components/RadioButton';
import Button from '../../components/button';
import Dropzone from './DropZone';
import Input from '../../components/Input';
import { professionalSubmitSongs } from './handleFiles';
import ProfessionalModal from '../../components/Modal/ProfessionalModal';

const ProfessionalPage = () => {
  const [musicSource, setMusicSource] = useState(null);
  const [discs, setDiscs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fileValidationError, setFileValidationError] = useState(null);

  const [ripperName, setRipperName] = useState("");
  const [ripperEmail, setRipperEmail] = useState("");
  const [sourceDescription, setSourceDescription] = useState("");
  const [password, setPassword] = useState("");

  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitResponse, setSubmitResponse] = useState(null);

  const handleMusicSourceChange = (ev) => setMusicSource(ev.target.value);
  
  const handleAddDisc = () => setDiscs([...discs, { files: {} }]);

  const addFilesAtIndex = (idx, files) => {
    const newDiscs = [...discs];

    const newFiles = files.reduce((acc, file) => ({
      ...acc,
      [file.name]: {
        file,
        isLoading: false,
        metadata: { title: file.name },
        isValidFile: true 
      }
    }), {});

    newDiscs.splice(idx, 1, {
      files: { ...discs[idx].files, ...newFiles }
    });

    setDiscs(newDiscs);
  }

  const onRipperNameChange = (ev) => setRipperName(ev.target.value);

  const onRipperEmailChange = (ev) => setRipperEmail(ev.target.value);

  const onSourceDescriptionChange = (ev) => setSourceDescription(ev.target.value);

  const onPasswordChange = ev => setPassword(ev.target.value);

  const isSubmitDisabled = !musicSource
    || ripperName === ""
    || ripperEmail === ""
    || password === ""
    || isLoading
    || fileValidationError
    || submitLoading;

  const onSubmitClick = async () => {
    setSubmitLoading(true);
    const response = await professionalSubmitSongs(discs, ripperName, ripperEmail, musicSource, sourceDescription, password);
    setSubmitResponse(response);
    setSubmitLoading(false);
  }

  const onCloseModal = () => {
    setMusicSource(null);
    setDiscs([]);
    setFileValidationError(null);
    setSourceDescription("");
    setSubmitResponse(null);
  }

  console.log(submitResponse)

  return (
    <>
      <Header title="Ammattilaisnäkymä 😎" />

      <div className="Box" onChange={handleMusicSourceChange}>
        <h2>Musiikin lähde</h2>
        <RadioButton name="musicSource" text="Fyysinen CD-levy" value="CD" checked={musicSource === "CD"} />
        <RadioButton name="musicSource" text="Jokin muu lähde" value="Other" checked={musicSource === "Other"} />
      </div>

      {discs.map((disc, idx) => (
        <Dropzone
          key={idx}
          isProfessional={true}
          files={disc.files}
          addFiles={files => addFilesAtIndex(idx, files)}
          pushS3key={() => {}}
          setIsLoading={setIsLoading}
          fileValidationError={fileValidationError}
          setFileValidationError={setFileValidationError} />
      ))}

      <Button className="ProButton" onClick={handleAddDisc}>
        Lisää CD
      </Button>

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
            placeholder="Salasana"
            value={password}
            onChange={onPasswordChange}/>
          <Button onClick={onSubmitClick} disabled={isSubmitDisabled}>
            {submitLoading
              ? <Loading className="Dropzone-loading" />
              : 'Lähetä'}
          </Button>
        </div>
      </div>
      {submitResponse && <ProfessionalModal responses={submitResponse} closeModal={onCloseModal} />}
    </>
  );
}

export default ProfessionalPage;