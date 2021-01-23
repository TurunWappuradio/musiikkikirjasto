import { useState, useEffect } from 'react';
import { TiNotesOutline as Note, TiDocument as Document } from 'react-icons/ti';
import { AiOutlineLoading as Loading } from 'react-icons/ai';
import { uploadFile } from './handleFiles';

const File = ({ file }) => {
  const [status, setStatus] = useState('loading');

  useEffect(() => uploadFile(file)
      .then(() => setStatus('uploaded'))
      .catch(err => console.log('error', err)),
    [file]);

  return (
    <div className="Dropzone-file">
      {file.type.startsWith('audio')
        ? <Note />
        : <Document />}
      {file.name}
      {status === 'loading' 
        ? <Loading className="Dropzone-loading" />
        : null}
    </div>
  );
}

const Header = ({ title, children }) => (
  <>
    <h1>{title}</h1>
    {children}
  </>
);

<Header title="Lähetä Mu">
  <p>
    diibadaa
  </p>
</Header>

export default File;