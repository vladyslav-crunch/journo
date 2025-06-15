// src/layout/Layout.tsx
import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => (
  <>
    <Navbar />
    <main style={{ padding: '1rem' }}>
      <Outlet />
    </main>
  </>
);

export default Layout;
