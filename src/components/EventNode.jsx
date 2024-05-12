// EventNode.jsx
// モック用のNODEコンポーネント
import { Handle, Position } from 'reactflow';
import './event-node.css';

const targetStyle = { left: -5 };
const sourceStyle = { right: -5 };

// eslint-disable-next-line react/prop-types,no-unused-vars
function EventNode({ data, selected, isConnectable }) {
  return (
    <>
      <p className="event-paragraph">
        {
          // eslint-disable-next-line react/prop-types
          data.label
        }
      </p>
      <div
        className={
          selected
            ? 'event-container event-container-selected'
            : 'event-container event-container-unselected'
        }
      >
        <div
          className="event-content"
          // eslint-disable-next-line react/prop-types
          style={{ borderColor: data.color }}
        >
          <Handle
            type="target"
            position={Position.Left}
            style={targetStyle}
            isConnectable={isConnectable}
          />
          <span
            className="event-name"
            // eslint-disable-next-line react/prop-types
            style={{ color: data.color }}
          >
            {
              // eslint-disable-next-line react/prop-types
              data.name
            }
          </span>
          <Handle
            type="source"
            position={Position.Right}
            style={sourceStyle}
            isConnectable={isConnectable}
          />
        </div>
      </div>
    </>
  );
}

export default EventNode;
