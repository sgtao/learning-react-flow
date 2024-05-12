// CoreConceptsFlow.jsx
import { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css'; // React Flowのスタイルシートをインポート

// 初期ノードの配列を定義
// `initialNodes` can be exported as `nodes.js`
const initialNodes = [
  {
    id: '1',
    type: 'input', // ノードのタイプを指定
    data: { label: 'Input Node' }, // ノードのラベルを指定
    position: { x: 250, y: 25 }, // ノードの位置を指定
  },

  {
    id: '2',
    // Reactコンポーネントをラベルとして渡すこともできる
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'output', // ノードのタイプを指定
    data: { label: 'Output Node' }, // ノードのラベルを指定
    position: { x: 250, y: 250 }, // ノードの位置を指定
  },
];

// 初期エッジの配列を定義
// `initialEdges` can be exported as `edges.js`
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' }, // ノード1からノード2へのエッジ
  { id: 'e2-3', source: '2', target: '3', animated: true }, // ノード2からノード3へのアニメーション付きエッジ
];

function CoreConceptsFlow() {
  // useStateフックを使用して、ノードの状態を管理
  // eslint-disable-next-line no-unused-vars
  const [nodes, setNodes] = useState(initialNodes);

  // useStateフックを使用して、エッジの状態を管理
  // eslint-disable-next-line no-unused-vars
  const [edges, setEdges] = useState(initialEdges);

  // onNodesChangeコールバック関数を定義
  // ノードが変更された際に呼び出される
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );

  // onEdgesChangeコールバック関数を定義
  // エッジが変更された際に呼び出される
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );

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
      fitView // フローチャートをビューポートに合わせる
    >
      <Panel position="top-left">
        <div>
          <b>Core Concepts:</b>
          <pre>
            Core Concepts Flow is example shown in{' '}
            <a
              href="https://reactflow.dev/learn/concepts/core-concepts"
              target="_blank"
            >
              Core Concepts
            </a>{' '}
            Page.
          </pre>
        </div>
      </Panel>
      {/* 背景コンポーネントをレンダリング */}
      <Background variant="dots" gap={12} size={1} />
    </ReactFlow>
  );
}

export default CoreConceptsFlow;
