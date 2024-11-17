// COMPONENT input stays abroad

import { useState } from "react";

export default function Travel({ content, onChangeContent }) {
  let stays = [...(content.staysAbroad || [])];

  // Function adds blank stays to array
  function addStay() {
    if (!stays.length) {
      onChangeContent({ staysAbroad: [{ id: Date.now() }] });
    } else {
      let updatedStays = [...stays, { id: Date.now() }];
      onChangeContent({ staysAbroad: updatedStays });
    }
  }

  // Function adds travel dates to content, in format {id:, departure, arrival}
  function handleDateChange(id, depOrArr, newDate) {
    stays = stays.map((stay) => {
      if (id === stay.id) {
        return { ...stay, [depOrArr]: newDate };
      }
      return stay;
    });
    onChangeContent({ staysAbroad: stays }, "checkTravel");
  }

  return (
    <div>
      <h4>Utenlandsopphold</h4>
      <button type="button" onClick={addStay}>
        Nytt utenlandsopphold
      </button>
      {/* PLACEHOLDER btn deletes all staysAbroad (replace with functionality to delete individual stays) */}
      <button
        type="button"
        onClick={() => onChangeContent({ staysAbroad: [] })}
      >
        Nullstill
      </button>
      <ul>
        {stays.map((stay) => (
          <li key={stay.id}>
            {/* 2 input fields to add departure and arrival dates */}
            <input
              type="date"
              onChange={(e) =>
                handleDateChange(stay.id, "departure", new Date(e.target.value))
              }
            />
            <input
              type="date"
              onChange={(e) =>
                handleDateChange(stay.id, "arrival", new Date(e.target.value))
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
