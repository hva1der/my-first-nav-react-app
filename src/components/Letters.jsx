import styles from "./Letters.module.css";

export default function Letters({ content }) {
  return (
    <div>
      <p>{content.applicationDate}</p>
    </div>
  );
}
