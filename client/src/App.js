import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Components/MusicPlayer';
import './Components/Header';
import './App.css';
import MusicPlayer from './Components/MusicPlayer';
import Uploadform from './Components/Uploadform';
import AudioPlayer from './Components/AudioPlayer';
import BandwidthDisplay from './Components/Bandwidth';
import Header from './Components/Header';

function App() {
  

  return (
    <div className="App">
      <Header />
      
      <MusicPlayer/>
      
    </div>
  );
}

export default App;
