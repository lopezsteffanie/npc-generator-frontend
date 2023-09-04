import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NpcList from './components/NpcList';
import NpcForm from "./components/NpcForm";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NpcList />} />
        <Route path="/add" element={<NpcForm />} />
      </Routes>
    </Router>
  );
}

export default App;
