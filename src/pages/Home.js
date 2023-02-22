import { useState, useContext } from "react"
import AppContext from "../context"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
    const { userName, setUserName, roomName, setRoomName } = useContext(AppContext)
    const navigate = useNavigate()

    const onRoomCreate = async () => {
        console.log('inputed values: ', {userName, roomName})
        navigate('/chat')
    }
    
    return <div>
        This is Home Page
        <div>
            <label htmlFor='room'>Enter the Room name</label>
            <input
                type='text'
                name='room'
                placeholder='Room name' 
                value={roomName}
                onChange={e => setRoomName(e.target.value)}
            />
            <label htmlFor='user'>Enter the User name</label>
            <input
                type='text'
                name='user'
                placeholder='User name' 
                value={userName}
                onChange={e => setUserName(e.target.value)}
            />
            <button onClick={onRoomCreate}>Enter Room</button>
        </div>
    </div>
}
export default HomePage