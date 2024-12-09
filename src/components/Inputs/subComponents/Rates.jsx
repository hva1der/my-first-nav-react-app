// COMPONENT: radio input to select benefit rate

export default function Rates({ content, onChangeContent }) {
  return (
    <div>
      <label>
        <input
          type="radio"
          name="rateSelector"
          value="EV"
          onChange={(e) => {
            onChangeContent({ rate: e.target.value }, "checkIncomes");
          }}
        ></input>{" "}
        EV
      </label>
      <label>
        <input
          type="radio"
          name="rateSelector"
          value="EN"
          onChange={(e) => {
            onChangeContent({ rate: e.target.value }, "checkIncomes");
          }}
        ></input>{" "}
        EN
      </label>
    </div>
  );
}
