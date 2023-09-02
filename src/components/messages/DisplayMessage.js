import { Tag } from 'antd';
import React from 'react';

function DisplayMessage({ type, message }) {
  return (
    <div
      className="text-center justify-content-center"
      style={{
        width: '97%',
      }}
    >
      <div>
        <h1>
          <Tag color={type}>
            <h2>{message}</h2>
          </Tag>
        </h1>
      </div>
    </div>
  );
}

export default DisplayMessage;
