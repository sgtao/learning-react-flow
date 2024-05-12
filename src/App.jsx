// import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SideMenu from './components/SideMenu.jsx';
import {
  HomePage,
  FirstFlow,
  CoreConceptsFlow,
  FigmalikeControl,
  PluginComponents,
  StyledFlow,
  EditFlow,
} from './pages/index';

function App() {
  return (
    // 次のサイトを参考にReact-Router-v6を実装
    // https://ralacode.com/blog/post/how-to-use-react-router/
    <>
      <BrowserRouter>
        <div className="app-container">
          <SideMenu />
          <main className="pages">
            <Routes>
              <Route path={`/`} element={<HomePage />} />
              <Route path={`/Home`} element={<HomePage />} />
              <Route path={`/FirstFlow`} element={<FirstFlow />} />
              <Route path={`/CoreConcepts`} element={<CoreConceptsFlow />} />
              <Route
                path={`/Figma-like-Control`}
                element={<FigmalikeControl />}
              />
              <Route
                path={`/PluginComponents`}
                element={<PluginComponents />}
              />
              <Route path={`/StyledFlow`} element={<StyledFlow />} />
              <Route path={`/EditFlow`} element={<EditFlow />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
