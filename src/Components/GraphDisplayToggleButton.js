import React, { useState } from 'react';

export const GraphDisplayToggleButton = ({ isToggled, onToggle }) => {
  return (
    <div>
      <label>Line Graph</label>
      <label class="switch">
        <input type="checkbox" checked={isToggled} onChange={onToggle} />
        <span class="slider round" />
      </label>
      <label>Bar Chart</label>
    </div>
  );
};
