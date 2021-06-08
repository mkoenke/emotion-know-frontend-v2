export const GraphDisplayToggleButton = ({ isToggled, onToggle }) => {
  return (
    <div>
      <label class="content">Line Graph</label>
      <label class="switch">
        <input type="checkbox" checked={isToggled} onChange={onToggle} />
        <span class="slider round" />
      </label>
      <label class="content">Bar Chart</label>
    </div>
  );
};
