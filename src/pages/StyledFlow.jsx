// StyledFlow.jsx
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
import CounterNode from '../components/CounterNode';
import EventNode from '../components/EventNode';

const nodeDefaults = {
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
};

const initialNodes = [
  {
    id: '1',
    position: { x: 0, y: 150 },
    data: { label: 'default style 1' },
    ...nodeDefaults,
  },
  {
    id: '2',
    position: { x: 250, y: 0 },
    data: { label: 'default style 2' },
    type: 'textUpdater',
    ...nodeDefaults,
  },
  {
    id: '3',
    position: { x: 250, y: 150 },
    data: { label: 'default style 3' },
    type: 'countUpdater',
    ...nodeDefaults,
  },
  {
    id: '4',
    position: { x: 250, y: 300 },
    data: {
      label: 'Node 1',
      name: 'Sample Event Node 1',
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
  countUpdater: CounterNode,
  eventNode: EventNode,
};

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
  },
  {
    id: 'e1-4',
    source: '1',
    target: '4',
  },
];

const rfStyle = {
  backgroundColor: '#B8CEFF',
};

const StyledFlow = () => {
  // eslint-disable-next-line no-unused-vars
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

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
        <b>Styled Flow:</b>
        <pre>
          Theming and Styling Flow are described in the{' '}
          <a
            href="https://reactflow.dev/learn/customization/custom-nodes"
            target="_blank"
          >
            Custom Nodes
          </a>
          .
        </pre>
      </Panel>
    </ReactFlow>
  );
};

export default StyledFlow;
