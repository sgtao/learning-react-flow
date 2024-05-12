// TextUpdaterNode.jsx
import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import './updater-node.css';

const targetStyle = { left: -5 };
const sourceStyle = { right: -5 };

// eslint-disable-next-line react/prop-types,no-unused-vars
function TextUpdaterNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="updater-node">
      <p className="updater-paragraph">
        {
          // eslint-disable-next-line react/prop-types
          data.label
        }
      </p>
      <Handle
        type="target"
        position={Position.Left}
        style={targetStyle}
        isConnectable={isConnectable}
      />
      <div className="updater-input">
        <label htmlFor="text">Title:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>
      <Handle
        type="source"
        position={Position.Right}
        style={sourceStyle}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default TextUpdaterNode;
