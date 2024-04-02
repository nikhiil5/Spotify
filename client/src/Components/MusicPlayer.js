import React, { useEffect, useState } from 'react';
import "../../node_modules/react-internet-meter/dist/index.css";
import { ReactInternetSpeedMeter } from "react-internet-meter";
import './MusicPlayer.css'; // Import CSS file for styling

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [songs, setSongs] = useState([]);
  const [audio, setAudio] = useState(null);
  const [volume, setVolume] = useState(0.7); // Initial volume value
  const [num, setNum] = useState(null);
  const [speeds, setSpeeds] = useState([]);
  const [averageSpeed, setAverageSpeed] = useState(null);
  const [isTestingComplete, setIsTestingComplete] = useState(false);
  const [timestamp, setTimestamp] = useState('00:00');
  const [songDuration, setSongDuration] = useState('00:00');


  const fetchSongs = async () => {
    const response = await fetch('https://spotify-2c6l.onrender.com/songs');
    const data = await response.json();
    
    setSongs(data);
  };

  useEffect(() => {
    fetchSongs();
    
  }, []);

  useEffect(() => {
    if (speeds.length === 5 && !isTestingComplete) {
      
      const total = speeds.reduce((acc, curr) => acc + parseFloat(curr), 0);
      const average = total / speeds.length;
      setAverageSpeed(average.toFixed(2));
      setIsTestingComplete(true);
    }
  }, [speeds, isTestingComplete]);

  const handleSpeedTest = (speed) => {
    if (speeds.length < 5) {
      setSpeeds(prevSpeeds => [...prevSpeeds, speed]);
    }
  };

  useEffect(() => {
    if (audio) {
      audio.addEventListener('timeupdate', () => {
        const { currentTime, duration } = audio;
        setProgress((currentTime / duration) * 100);
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        setTimestamp(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      });

      audio.addEventListener('loadedmetadata', () => {
        const { duration } = audio;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        setSongDuration(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      });

    }
    return () => {
      if (audio) {
        audio.removeEventListener('timeupdate',() => {

        });

        audio.removeEventListener('loadedmetadata',() => {

        });

      }
    };
  }, [audio]);

  const playSong = () => {
  if (audio) {
    if (isPlaying) {
      audio.pause();
    } else {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
        audio.currentTime = 0; // Reset the audio to the beginning
        audio.play();
      }
    }
    setIsPlaying(!isPlaying);
  }
};

  const playing = () => {
    if (isPlaying){
      audio.pause();
      audio.currentTime = 0;
    }
  }


  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    
    setVolume(newVolume);
    if (audio) {
      
      audio.volume = newVolume;
    }
  };

  useEffect(() => {
    const number = () => {
      if (averageSpeed !== null) {
        
        setNum(averageSpeed*8 > 20 ? 0 : 1);
      }
    };
  
    if (isTestingComplete) {
      setAverageSpeed(averageSpeed*8);
      number();
    }
  }, [isTestingComplete]);

  useEffect(()=>{
    
      if (num!==null && songs.length > 0) {
        const currentSong = songs[num].url; 
        const newAudio = new Audio(`https://spotify-2c6l.onrender.com/music${currentSong}`);
        newAudio.volume = volume; // Set initial volume
        setAudio(newAudio);
      }

  },[songs, volume,num])


  const handleNext = () => {
    if ( num < songs.length - 2) {
      playing();
      setIsPlaying(false);
      setProgress(0);
      setNum(num + 2);
   
    }
  };
  
  const handlePrevious = () => {
    if (num > 1) {
      playing();
      setIsPlaying(false);
      setProgress(0);
      setNum(num - 2);
      
    }
  };
  

  const handleShuffle = () => {
    playing();
    setIsPlaying(false);
    
    if(num%2===0){
      const nw=Math.floor(Math.random() * 6)*2;
      if(nw!==num){
        setNum(nw);
      }
      else{
        handleShuffle();
      }
      
    }else{
      const nw=Math.floor(Math.random() * 6)*2 + 1;
      if(nw!==num){
        setNum(nw);
      }
      else{
        handleShuffle();
      }
    }
    setProgress(0);
  };

  const handleRepeat = () => {
    
    playing();
    setIsPlaying(false);
    setProgress(0);
    audio.play();
    setIsPlaying(true);
  };

    

  return (
    <div className='whole'>
      <div className="bandwidth-container">
          <h2>Bandwidth Information</h2>
        
        <ReactInternetSpeedMeter
          txtSubHeading="Internet connection is slow"
          outputType=""
          customClassName={null}
          pingInterval={2000}
          txtMainHeading="Opps..."
          thresholdUnit="megabyte"
          threshold={50}
          imageUrl="https://www.sefram.com/images/products/photos/hi_res/7220.jpg"
          downloadSize="1741796"
          callbackFunctionOnNetworkDown={()=>{}}
          callbackFunctionOnNetworkTest={handleSpeedTest}
        />
        <div className="card-body mt-4">
          {isTestingComplete ? (
            averageSpeed !== null ? (
              <span className="display-6">{averageSpeed} Mbps</span>
            ) : (
              <span className="display-6">Unable to calculate average speed.</span>
            )
          ) : (
            <span className="display-7">Testing internet speed...</span>
          )}
        </div>

        <div className="bandwidth-info">
              <p className="display-8">Download Speed: {averageSpeed?`${averageSpeed}Mbps`:'Calculating...'}</p>
              
          </div>
      </div>
      <div className="player-container">
      <div className='dis'>{averageSpeed===null? '': averageSpeed>20?'Music Playback in High Quality':'Music Playback in Low Quality'}</div>
      <img src="https://i.pinimg.com/originals/b0/2b/e6/b02be617e153fdd852c8e2f839d99eca.jpg" className="album-art"/>
      <div className="song-info">
        <h3>{songs.length > 0 && num !==null ? songs[num].name.split('.')[0] : 'Loading...'}</h3>
      </div>
      <div className="controls">
        
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={playSong}>{isPlaying ? 'Pause' : 'Play '}</button>
        <button onClick={handleNext}>Next</button>
        <button onClick={handleShuffle}>Shuffle</button>
        <button onClick={handleRepeat}>Repeat</button>
      </div>
      <div className="volume-control">
        <img className="volumelogo" src="https://t4.ftcdn.net/jpg/05/52/97/37/360_F_552973791_1xvqdmN0jC7lb3L7vEUZMdFVIYzKqRMo.jpg"/>
        
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="timestamp">
        <div className='timevalue1'>{timestamp}</div>
        <div className='timevalue2'>{songDuration}</div>
      </div>
      </div>
      
    </div>
  );
};

export default MusicPlayer;
