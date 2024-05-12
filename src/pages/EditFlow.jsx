// EditFlow.jsx
import { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Position,
  Panel,
} from 'reactflow';

import 'reactflow/dist/style.css';
import TextUpdaterNode from '../components/TextUpdaterNode';
import EventNode from '../components/EventNode';

const nodeDefaults = {
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
};

const initialNodes = [
  {
    id: 's1',
    position: { x: 50, y: 50 },
    data: {
      label: 'Node 1',
      name: 'Event -Start-',
      color: '#38B5AD',
    },
    type: 'eventNode',
    ...nodeDefaults,
  },
  {
    id: 'e1',
    position: { x: 250, y: 150 },
    data: {
      label: 'Node 1',
      name: 'Event -End-',
      color: '#38B5AD',
    },
    type: 'eventNode',
    ...nodeDefaults,
  },
];
// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = {
  textUpdater: TextUpdaterNode,
  eventNode: EventNode,
};

const initialEdges = [
  {
    id: 'initial-s1-e1',
    source: 's1',
    target: 'e1',
  },
];

const rfStyle = {
  backgroundColor: '#B8CEFF',
};

const EditFlow = () => {
  // eslint-disable-next-line no-unused-vars
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // ノードを追加する関数
  const addNode = () => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      data: { label: `Node ${nodes.length + 1}` },
      position: {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      },
      type: 'textUpdater',
      ...nodeDefaults,
    };
    setNodes((nds) => nds.concat(newNode));
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
      style={rfStyle}
    >
      <Background />
      <Controls />
      <MiniMap />
      <Panel position="top-left">
        <b>Edit Flow:</b>
        <pre>Trial Edit Flow by Add and Delete Node.</pre>
      </Panel>
      <Panel position="top-right">
        <button onClick={addNode}>+ Add Node</button>
      </Panel>
    </ReactFlow>
  );
};

export default EditFlow;
