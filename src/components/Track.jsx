import React from 'react'

const Track = ({ index, track, setTrack, cover, name, artist }) => {
    return (
        <div className={`track ${index == track ? 'sideActive' : ''}`} onClick={() => {
            setTrack(index)
            
        }}>
            <div className='sideCover'>
                <img className='sideImg' src={cover} alt="" srcSet="" />
            </div>
            <div className='sideInfo'>
                <h5 className='sideName'>{name}</h5>
                <p className='sideArtist'>{artist}</p>
            </div>
        </div>
    )
}

export default Track