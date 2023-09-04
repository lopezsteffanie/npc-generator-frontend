import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import axios from 'axios';
import NpcList from './components/NpcList';
import NpcForm from "./components/NpcForm";
import UpdateNpcForm from './components/UpdateNpcForm';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NpcList />} />
        <Route path="/add" element={<NpcForm />} />
        <Route path="/update/:npcId" element={<UpdateNPCFormWithFetch />} />
      </Routes>
    </Router>
  );
}


const UpdateNPCFormWithFetch: React.FC = () => {
  const { npcId } = useParams();
  const [npc, setNpc] = useState<any>(null);

  useEffect(() => {
    axios.get(`https://dnd-npc-generator-7234deb077cc.herokuapp.com/api/get-npc-by-id/${npcId}`)
      .then((response) => {
        setNpc(response.data);
      })
      .catch((error) => {
        console.error("Error fetching NPC data:", error);
      });
  }, [npcId]);

  if (npc === null) {
    return <div>Loading...</div>
  }

  return <UpdateNpcForm npc={npc} />;
};

export default App;
