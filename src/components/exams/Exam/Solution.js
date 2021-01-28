export default function Solution({ exam }) {
  return (
    <div>
      <img
        src={exam.answer === undefined ? null : exam.answer.imageBase64}
        width="100%"
        height="auto"
        alt={exam.name}
      />
    </div>
  );
}
