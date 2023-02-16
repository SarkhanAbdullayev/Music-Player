import { useState,useRef } from 'react'
import './App.css'
import PlayerBar from './components/PlayerBar'
import Sidebar from './components/Sidebar';

function App() {

  const [playPause, setPlayPause] = useState(true);
  const [mute, setMute] = useState(false);
  const [track, setTrack] = useState(0);
  const [sidebarCall, setSidebarCall] = useState(false);

  

  return (
    <div className="App">
      <Sidebar track={track} setTrack={setTrack} sidebarCall={sidebarCall} setSidebarCall={setSidebarCall} />
      <PlayerBar
        track={track}
        setTrack={setTrack}
        playPause={playPause}
        setPlayPause={setPlayPause}
        mute={mute}
        setMute={setMute} />
      <button className={`libraryCall ${sidebarCall ? 'active' : ''}`}  onClick={() => {
        setSidebarCall(prev => !prev)
      }}>Library <i className="fa-solid fa-music"></i></button>
    </div>
    
  )
}

export default App