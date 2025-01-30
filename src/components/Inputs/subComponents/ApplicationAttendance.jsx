//
// COMPONENT: Input options for attendance at application.
// - Namely for handling actions where user has not attended in person for application
import { defaultValues, noAttendanceGrounds } from "../../../texts/inputTexts";

export default function ApplicationAttendance({ content, onChangeContent }) {
  // possible grounds for failing to attend at application
  const noAttGrounds = ["validFail", "noRep", "noMedEv", "noGrounds"];

  return (
    <div>
      {/* Radio button to select whether claimant attended yes/no */}
      <label>
        Personlig fremmøte:
        <input
          type="radio"
          name="attendanceRadio"
          onChange={() =>
            onChangeContent(
              { attendance: true, noAttGrounds: undefined },
              "checkAttendance"
            )
          }
        />{" "}
        {defaultValues.capsYes}
      </label>
      <label>
        <input
          type="radio"
          name="attendanceRadio"
          onChange={() =>
            onChangeContent({ attendance: false }, "checkAttendance")
          }
        />{" "}
        {defaultValues.capsNo}
      </label>

      {/* If NO attendance, render dropdown with possible grounds */}
      {content.attendance === false && ( // "=== false" to avoid this rendering before attendance has been defined
        <select
          value={content.noAttGrounds || "choose"}
          onChange={(e) => {
            onChangeContent(
              { noAttGrounds: e.target.value },
              "checkAttendance"
            );
          }}
        >
          <option value="choose" disabled>
            {defaultValues.choose}
          </option>
          {/* Render grounds options for failing to attend */}
          {noAttGrounds.map((ground) => (
            <option key={ground} value={ground}>
              {noAttendanceGrounds[ground]}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
