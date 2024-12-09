// COMPONENT: input field for date of claimants last address change.

export default function AddressChange({ content, onChangeContent }) {
  const { formType } = content;

  if (formType !== "control") {
    // (address change only checked during applications, not for controls)
    return (
      <div>
        <label>
          Siste adresseendring:
          <input
            type="date"
            id="addressChange"
            onChange={(e) => {
              onChangeContent({ addressChange: new Date(e.target.value) });
            }}
          />
        </label>
      </div>
    );
  }
}
