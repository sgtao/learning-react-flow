// pages/FirstFlow.jsx
import { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css'; // React Flowのスタイルシートをインポート

// 初期ノードの配列を定義
const initialNodes = [
  { id: '1', position: { x: 80, y: 100 }, data: { label: '1' } },
  { id: '2', position: { x: 110, y: 200 }, data: { label: '2' } },
];

// 初期エッジの配列を定義
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function App() {
  // useNodesStateフックを使用して、ノードの状態を管理
  // eslint-disable-next-line no-unused-vars
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  // useEdgesStateフックを使用して、エッジの状態を管理
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // onConnectコールバック関数を定義
  // エッジを追加する際に呼び出される
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {/* ReactFlowコンポーネントをレンダリング */}
      <ReactFlow
        nodes={nodes} // ノードの配列を渡す
        edges={edges} // エッジの配列を渡す
        onNodesChange={onNodesChange} // ノードが変更された際のコールバック
        onEdgesChange={onEdgesChange} // エッジが変更された際のコールバック
        onConnect={onConnect} // エッジを接続する際のコールバック
      >
        <Panel position="top-left">
          <div>
            <b>First Flow:</b>
            <pre>
              First Flow is example shown in{' '}
              <a href="https://reactflow.dev/learn" target="_blank">
                Quickstart
              </a>
              .
            </pre>
          </div>
        </Panel>
        {/* コントロールコンポーネントをレンダリング */}
        <Controls />
        {/* ミニマップコンポーネントをレンダリング */}
        <MiniMap />
        {/* 背景コンポーネントをレンダリング */}
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
