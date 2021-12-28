import React, { useEffect, useState } from 'react';
import './App.css';
// import HelloWorld from '../HelloWorld/HelloWorld'

function App() {
  const [active, setState] = useState(false)

  return (
    <div>

      <div onClick={() => setState(prev => !prev)}>
        click me
      </div>
      {active && <ActiveState />}
    </div>
  );
}
export default App;
