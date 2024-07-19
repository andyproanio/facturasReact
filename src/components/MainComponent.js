import React, { useState } from 'react';
import axios from 'axios';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Inventario from './InventarioComponent';
import { Routes, Route, Navigate } from 'react-router-dom';


const Main = () => {
  const [file, setfile] = useState(null)

  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home file={file} setfile={setfile} axios={axios} />} />
        <Route path='/inventario/:pagina' element={<Inventario />} />
        <Route path='*' element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default Main;