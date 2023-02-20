import React, {useRef, useEffect} from 'react'
import Track from './Track'
import { data } from './data'



const body = document.querySelector('body');



const Sidebar = ({ track, setTrack, sidebarCall, setSidebarCall }) => {
    
    const sidebarRef = useRef()

    useEffect(() => {

        function sidebarHideFunc(e) {
            if (!sidebarRef.current.contains(e.target) && e.target.className != 'libraryCall active') {
                setSidebarCall(false);
            }
        }

        body.addEventListener('click', sidebarHideFunc)

        return () => {
            body.removeEventListener('click', sidebarHideFunc)
        }
    },[sidebarCall])

    return (
        <div ref={sidebarRef} className='sidebar' style={{transform : sidebarCall ? 'TranslateX(0%)' : 'TranslateX(-100%)'}}>
            <div className='sidebarTitle'>
                <img style={{width: '70px', height: '70px', marginRight: '20px'}} src="/logo.png" alt="" />
                Library
            </div>
            <div className='sidebarContent'>
                {data.map((el,index) => {
                    return <Track track={track} setTrack={setTrack} index={index} key={index} cover={el.cover} name={el.name} artist={el.artist} />
                })}
            </div>
            
        </div>
    )
}
export default Sidebar