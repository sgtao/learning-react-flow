// PluginComponents.jsx
import { useState } from 'react';
import ReactFlow, { MiniMap, Controls, Background, Panel } from 'reactflow';
import 'reactflow/dist/style.css';

// import initialNodes from './nodes.js';
const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 200, y: 25 },
    style: { backgroundColor: '#6ede87', color: 'white' },
  },

  {
    id: '2',
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
    style: { backgroundColor: '#ff0072', color: 'white' },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 },
    style: { backgroundColor: '#6865A5', color: 'white' },
  },
];
// import initialEdges from './edges.js';
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3', animated: true },
  { id: 'e2-3', source: '2', target: '3' },
];

// ノードの色を設定する関数
const nodeColor = (node) => {
  switch (node.type) {
    case 'input':
      return '#6ede87';
    case 'output':
      return '#6865A5';
    default:
      return '#ff0072';
  }
};

function PluginComponents() {
  const [variant, setVariant] = useState('cross'); // 背景のバリアントを管理する状態

  return (
    <ReactFlow defaultNodes={initialNodes} defaultEdges={initialEdges} fitView>
      {/* コントロールコンポーネントをレンダリング */}
      <Controls />
      {/* ミニマップコンポーネントをレンダリング */}
      <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
      {/* 背景コンポーネントをレンダリング */}
      <Background color="#ccc" variant={variant} />
      {/* パネルコンポーネントをレンダリング */}
      <Panel position="top-right">
        <div>Background:</div>
        {/* 背景のバリアントを変更するボタン */}
        <button onClick={() => setVariant('dots')}>dots</button>
        <button onClick={() => setVariant('lines')}>lines</button>
        <button onClick={() => setVariant('cross')}>cross</button>
      </Panel>
      <Panel position="top-left">
        <b>PluginComponents:</b>
        <pre>
          This Flow uses some React Flow plugins of the{' '}
          <a
            href="https://reactflow.dev/learn/concepts/plugin-components"
            target="_blank"
          >
            Plugin Components
          </a>
          .
        </pre>
      </Panel>
    </ReactFlow>
  );
}

export default PluginComponents;
