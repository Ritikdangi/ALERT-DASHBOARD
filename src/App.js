import React, { useState } from 'react';
import Data from './Data';
import Graphs from './Graphs';

function App() {
  const [data, setData] = useState([]);

  return (
    <div className="dark">
      <div className="bg-dark min-h-screen text-gray-100">
      <header className="p-4 text-center bg-gray-800">
  <h1 className="text-3xl font-bold text-white">Alert Dashboard</h1>
</header>

        <Data setData={setData} />
        <Graphs data={data} />
      </div>
    </div>
  );
}

export default App;
