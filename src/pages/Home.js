import { useState, useContext } from "react"
import AppContext from "../context"
import { useNavigate } from "react-router-dom"
import '../styles/Home.scss'

const HomePage = () => {
    const { userName, setUserName, roomName, setRoomName } = useContext(AppContext)
    const navigate = useNavigate()

    const onRoomCreate = async () => {
        console.log('inputed values: ', {userName, roomName})
        navigate('/chat')
    }
    
    return <div className="homepage"> 
        <div className="container">
            <div className="wrapper">
                <h1 className="rotate">CHAT-APP</h1>
                <label htmlFor='room'>Enter The Room name</label>
                <input
                    type='text'
                    name='room'
                    placeholder='Room name' 
                    value={roomName}
                    onChange={e => setRoomName(e.target.value)}
                />
            </div>
            <div className="wrapper">
                <label htmlFor='user'>Enter Your Username</label>
                <input
                    type='text'
                    name='user'
                    placeholder='Username' 
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                />
                <button onClick={onRoomCreate}>Enter Room</button>
            </div>
        </div>
    </div>
}
export default HomePage