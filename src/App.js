import React from 'react';
// import './App.css';
import Table from './components/Table';
import Provider from './context/Provider';
import Filters from './components/Filters';

export default function App() {
  return (
    <Provider>
      <h1>Star Wars Planets Search</h1>
      <Filters />
      <Table />
    </Provider>
  );
}
