// COMPONENT: input field for application date

export default function ApplicationDate({ onChangeContent }) {
  return (
    <label>
      Søknadsdato:
      <input
        type="date"
        id="applicationDate"
        onChange={(e) => {
          onChangeContent({ applicationDate: new Date(e.target.value) });
        }}
      />
    </label>
  );
}
