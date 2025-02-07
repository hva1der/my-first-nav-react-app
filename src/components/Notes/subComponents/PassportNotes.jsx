// COMPONENT renders passport details

import { travelTexts } from "../../../texts/notesTexts";

export default function PassportNotes({ content }) {
  const { validPassport } = content;

  if (validPassport === false) {
    return (
      <div>
        <p>
          <b>Pass:</b>
        </p>
      </div>
    );
  }
}
