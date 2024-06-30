import styles from "./Notes.module.css";

export default function Notes({ content }) {
  return (
    <div className={styles.notesText}>
      <p>
        Søknadsdato: <b>{content.applicationDate.day}</b>
      </p>
      <p>
        Sats: <b>{content.rate}</b>
      </p>
    </div>
  );
}
