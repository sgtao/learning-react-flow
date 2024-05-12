// CounterNode.jsx
import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import './updater-node.css';

const targetStyle = { left: -5 };
const sourceStyle = { right: -5 };

// eslint-disable-next-line react/prop-types
export default function CounterNode({ isConnectable }) {
  const [count, setCount] = useState(0);

  return (
    <div className="updater-node">
      <Handle
        type="target"
        position={Position.Left}
        style={targetStyle}
        isConnectable={isConnectable}
      />
      <button className="nodrag" onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <p>Count: {count}</p>
      <Handle
        type="source"
        position={Position.Right}
        style={sourceStyle}
        isConnectable={isConnectable}
      />
    </div>
  );
}
