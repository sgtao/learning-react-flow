// EditFlow.jsx
import { useCallback, useRef } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  updateEdge,
  Position,
  Panel,
} from 'reactflow';
import { nanoid } from 'nanoid/non-secure';

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
      label: 'Start Node',
      name: 'Start Event',
    },
    type: 'eventNode',
    ...nodeDefaults,
  },
  {
    id: 'e1',
    position: { x: 250, y: 150 },
    data: {
      label: 'End Node',
      name: 'End Event',
    },
    type: 'eventNode',
    ...nodeDefaults,
  },
];
// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = {
  eventNode: EventNode,
  textUpdater: TextUpdaterNode,
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
  const edgeUpdateSuccessful = useRef(true);
  // eslint-disable-next-line no-unused-vars
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  // Delete Edge on Drop
  // reference of https://reactflow.dev/examples/edges/delete-edge-on-drop
  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);
  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }
    edgeUpdateSuccessful.current = true;
  }, []);

  // 追加：エッジをダブルクリックで削除する処理
  const onEdgeDoubleClick = useCallback((event, edge) => {
    setEdges((eds) => eds.filter((e) => e.id !== edge.id));
  }, []);

  // ノードを追加する関数
  const getMaxPosition = (currentNodes) => {
    const maxPosition = { x: 0, y: 0 };
    if (currentNodes.length == 0) return maxPosition;
    currentNodes.map((curNode) => {
      if (curNode.position.x > maxPosition.x)
        maxPosition.x = curNode.position.x;
      if (curNode.position.y > maxPosition.y)
        maxPosition.y = curNode.position.y;
    });
    return maxPosition;
  };
  const addNode = () => {
    const maxPosition = getMaxPosition(nodes);
    const idPrefix = (nodes.length + 1).toString();
    const newNode = {
      id: `${idPrefix}-${nanoid()}`,
      data: { label: `Node ${idPrefix}` },
      position: {
        x: maxPosition.x + 50,
        y: maxPosition.y + 150,
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
      snapToGrid
      onEdgeUpdate={onEdgeUpdate}
      onEdgeUpdateStart={onEdgeUpdateStart}
      onEdgeUpdateEnd={onEdgeUpdateEnd}
      onEdgeDoubleClick={onEdgeDoubleClick}
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
        <ul>
          <li>Trial Edit Flow with Node Add and Edge Delete.</li>
          <li>to delete Edge, double click Edge.</li>
        </ul>
      </Panel>
      <Panel position="top-right">
        <button onClick={addNode}>+ Add Node</button>
      </Panel>
    </ReactFlow>
  );
};

export default EditFlow;
