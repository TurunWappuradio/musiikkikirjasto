import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { TiNotesOutline as Note, TiDocument as Document } from 'react-icons/ti';
import { AiOutlineLoading as Loading } from 'react-icons/ai';

const Dropzone = () => {
  const [files, setFiles] = useState([]);

  const onDrop = acceptedFiles => setFiles([...files, ...acceptedFiles]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="Box" {...getRootProps()}>
      <input {...getInputProps()} />
      {files.map((file, idx) => <File file={file} key={idx} />)}
      {
        isDragActive ?
          <p>Pudota tiedostot tähän ...</p> :
          <p>Raahaa ja pudota tiedostot tähän, tai klikkaa valitaksesi tiedostot</p>
      }
    </div>
  );
}

const File = ({ file }) => {
  return (
    <div className="Dropzone-file">
      {file.type.startsWith('audio')
        ? <Note />
        : <Document />}
      {file.name}
      <Loading className="Dropzone-loading" />
    </div>
  );
}

export default Dropzone;