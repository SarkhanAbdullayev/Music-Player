import React, { useRef,useState } from 'react'
import { data } from './data';



const PlayerBar = ({playPause, setPlayPause,mute, setMute,track, setTrack}) => {


    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [fullTime, setFullTime] = useState(0);
    const [volume, setVolume] = useState(90)

    const audioRef = useRef();
    
    function playMus() {
        playPause ? audioRef.current.play() : audioRef.current.pause()
        setPlayPause(prev => !prev)
        audioRef.current.autoplay = true;
        coverRef.current.style.animationPlayState = 'running';
    }

    function muteSound() {
        !mute ? audioRef.current.muted = true : audioRef.current.muted = false;
        setMute(prev => !prev)
    }

    const coverRef = useRef()

    return (
        <div className='playerBar'>
            <div ref={coverRef} className='coverDiv' onClick={(e) => {
                console.log(getComputedStyle(e.target).transform);
            }}>
                <img src={data[track].cover} alt=""/>
            </div>
            <h3 className='name'>{data[track].name}</h3>
            <p className='artist'>{data[track].artist}</p>
            <div className='durationDiv'>
                <div className='currentTime'>{`${Math.floor(currentTime / 60)} : ${Math.floor(currentTime % 60) < 10 ? `0${Math.floor(currentTime % 60)}` : Math.floor(currentTime % 60)}`}</div>
                <div className='duration' onClick={(e) => {
                    const clickedTime = (e.clientX - e.target.getBoundingClientRect().left) * fullTime / 470
                    audioRef.current.currentTime = clickedTime;
                }}>
                    <div
                        className='innerDuration'
                        style={{ width: `${duration}%`, background: `linear-gradient(50deg, ${data[track].color[0]}, ${data[track].color[1]})` }}>
                    </div>
                </div>
                <div className='fullTime'>{fullTime ? `${Math.floor(fullTime / 60)} : ${Math.floor(fullTime % 60) < 10 ? `0${Math.floor(fullTime % 60)}` : Math.floor(fullTime % 60)}` : '0 : 00'}</div>
            </div>
            <div className='audioDiv'>
                <audio ref={audioRef}
                    onTimeUpdate={() => {
                        setDuration(audioRef.current.currentTime * 100 / audioRef.current.duration);
                        setCurrentTime(audioRef.current.currentTime)
                        setFullTime(audioRef.current.duration)
                    }}
                    src={data[track].audio}
                    onPause={() => {
                        audioRef.current.autoplay = false;
                        
                        coverRef.current.style.animationPlayState = 'paused';
                    }}>
                </audio>
            </div>
            <div className='playerNav'>
                <div className='btns prev' onClick={() => {
                    setTrack(track == 0 ? data.length - 1 : prev => prev = prev - 1);
                    console.log(coverRef);
                    setDuration(0);
                }}>
                    <i className="fa-solid fa-angle-left"></i>
                </div>
                <div className='btns play-pause' onClick={playMus}>
                    {playPause ? <i className="fa-solid fa-play"></i> : <i className="fa-solid fa-pause"></i>}
                </div>
                <div className='btns next' onClick={() => {
                    setTrack(track == data.length - 1 ? 0 : prev => prev = prev + 1);
                    setDuration(0);
                }}>
                    <i className="fa-solid fa-angle-right"></i>
                </div>
                <div className='btns mute'>
                    <i className={`fa-solid fa-volume-${!mute ? 'low' : 'xmark'}`} onClick={muteSound}></i>
                    <div className='volumeDiv'>
                        <div className='innerVolume' onClick={(e) => {
                            const vol = (e.clientX - e.target.getBoundingClientRect().left)* 100 / 90 / 100
                            setVolume(vol * 100)
                            audioRef.current.volume = vol;
                        }}>
                            <div className='currentVol' style={{left: `${volume}%`, background: data[track].color[1]}} ></div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default PlayerBar