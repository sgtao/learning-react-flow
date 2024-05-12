// FigmalikeControl.jsx
import { useCallback } from 'react';
import ReactFlow, {
  addEdge,
  SelectionMode,
  useEdgesState,
  useNodesState,
  Background,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';

// import initialNodes from './nodes.js';
const initialNodes = [
  {
    id: '1',
    data: { label: 'Node 1' },
    position: { x: 150, y: 0 },
  },
  {
    id: '2',
    data: { label: 'Node 2' },
    position: { x: 0, y: 150 },
  },
  {
    id: '3',
    data: { label: 'Node 3' },
    position: { x: 300, y: 250 },
  },
];
// import initialEdges from './edges.js';
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e2-3', source: '2', target: '3' },
];

// パンのドラッグを許可するノードのIDを指定
const panOnDrag = [1, 2];

/**
 * Figma-like Viewport Controls:
 * - pan: Space + drag mouse, scroll, middle or right mouse
 * - zoom: pitch or cmd + scroll
 * - create selection: drag mouse
 * @returns `ReactFlow` Component
 */
function FigmalikeControl() {
  // useNodesStateフックを使用して、ノードの状態を管理
  // eslint-disable-next-line no-unused-vars
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  // useEdgesStateフックを使用して、エッジの状態を管理
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // onConnectコールバック関数を定義
  // エッジを接続する際に呼び出される
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  return (
    <ReactFlow
      nodes={nodes} // ノードの配列を渡す
      edges={edges} // エッジの配列を渡す
      onNodesChange={onNodesChange} // ノードが変更された際のコールバック
      onEdgesChange={onEdgesChange} // エッジが変更された際のコールバック
      onConnect={onConnect} // エッジを接続する際のコールバック
      panOnScroll // スクロールでパンを許可
      selectionOnDrag // ドラッグで選択を許可
      panOnDrag={panOnDrag} // パンのドラッグを許可するノードのIDを指定
      selectionMode={SelectionMode.Partial} // 部分選択モードを設定
      fitView // フローチャートをビューポートに合わせる
    >
      {/* 背景コンポーネントをレンダリング */}
      <Background variant="dots" gap={12} size={1} />
      <Panel position="top-left">
        <div>
          <b>Figma-like Control:</b>
          <pre>
            This Flow has mouse-control like Figma by following{' '}
            <a
              href="https://reactflow.dev/learn/concepts/the-viewport#figma-like-viewport-controls"
              target="_blank"
            >
              Figma-like Viewport Controls
            </a>{' '}
            page.
          </pre>
        </div>
      </Panel>
    </ReactFlow>
  );
}

export default FigmalikeControl;
