//
// COMPONENT: Input options for attendance at application.
// - Namely for handling actions where user has not attended in person for application
import { appAttTexts } from "../../../texts/notesTexts";

export default function ApplicationAttendance({ content, onChangeContent }) {
  return (
    <div>
      {/* Radio button to select whether claimant attended yes/no */}
      <label>
        Personlig fremmøte:
        <input
          type="radio"
          name="attendanceRadio"
          onChange={() => onChangeContent({ attendance: "Ja" })}
        />{" "}
        Ja
      </label>
      <label>
        <input
          type="radio"
          name="attendanceRadio"
          onChange={() => onChangeContent({ attendance: "Nei" })}
        />{" "}
        Nei
      </label>

      {/* If NO attendance, render dropdown with possible grounds */}
      {content.attendance === "Nei" && (
        <select
          value={content.noAttGrounds || "-Velg årsak-"}
          onChange={(e) => {
            onChangeContent({ noAttGrounds: e.target.value });
          }}
        >
          <option disabled>-Velg årsak-</option>
          <option value={appAttTexts.validFail}>
            Fullmakt og legeerklæring
          </option>
          <option value={appAttTexts.noMedEv}>Mangler legeerklæring</option>
          <option value={appAttTexts.noRep}>Mangler fullmakt</option>
          <option value={appAttTexts.noGrounds}>
            Mangler både fullmakt og legeerklæring
          </option>
        </select>
      )}
    </div>
  );
}
