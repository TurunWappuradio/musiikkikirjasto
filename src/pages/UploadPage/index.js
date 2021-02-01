import { useState } from 'react';
import { AiOutlineLoading as Loading } from 'react-icons/ai';

import Dropzone from './DropZone';
import Button from '../../components/button';
import './UploadPage.scss';
import Header from '../../components/Header';
import { submitSongs } from './handleFiles';
import Input from '../../components/Input';

const UploadPage = () => {
  const [S3keys, setS3keys] = useState([]);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const pushS3key = key => setS3keys(prevKeys => [...prevKeys, key]);

  const onPassowrdChange = ev => setPassword(ev.target.value);

  const onSubmitClick = async () => {
    setStatus('loading');
    const status = await submitSongs(S3keys, password);
    setStatus(status);
  }

  const isSubmitDisabled = password === "" || S3keys.length === 0;

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
      <div className="UploadContent">
        <Dropzone pushS3key={pushS3key} />
        <div className="Box">
          {status === 'loading'
            ? <Loading className="Dropzone-loading"/>
            : status}
          <div className="SubmitControls">
            <Input placeholder="salasana" value={password} onChange={onPassowrdChange}/>
            <Button onClick={onSubmitClick} disabled={isSubmitDisabled}>Lähetä</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadPage;
