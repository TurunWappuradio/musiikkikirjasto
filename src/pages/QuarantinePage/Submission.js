const Submission = ({ submission }) => {
  const { id, ripper_name } = submission;

  return (
    <h1>
      {id} – {ripper_name}
    </h1>
  );
};

export default Submission;
