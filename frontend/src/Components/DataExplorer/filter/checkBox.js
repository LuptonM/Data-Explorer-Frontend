import React from "react";

export default function CheckBoxTemplate({ item, handleSelect, column }) {
  const handleItemSelect = (event) => {
    handleSelect(column, item.index, item.value, event.target.checked);
  };

  return (
    <div className="checkBoxWrapper" key={item.index}>
      <label>
        <input
          type="checkbox"
          checked={item.selected}
          onChange={(event) => handleItemSelect(event)}
        />
        <span></span>
        {item.value}
      </label>
    </div>
  );
}
