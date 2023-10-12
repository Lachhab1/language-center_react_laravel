import React from 'react';

function CustomGroupRenderer(params) {
  const role = params.node.key;

  return (
    <div>
      <select>
        <option value="student">Students</option>
        <option value="teacher">Teachers</option>
      </select>
    </div>
  );
}

export default CustomGroupRenderer;
