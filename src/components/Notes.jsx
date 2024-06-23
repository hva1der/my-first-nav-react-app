import styles from "./Notes.module.css";

export default function Notes({ notesContents = "helloNotes" }) {
  return (
    <div>
      <p>{notesContents}</p>
    </div>
  );
}
