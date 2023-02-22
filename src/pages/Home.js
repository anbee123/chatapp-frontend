import { useState } from "react"

const HomePage = () => {
    const [userName, setUserName] = useState('')
    const [roomName, setRoomName] = useState('')

    const onRoomCreate = async () => {
        console.log('inputed values: ', {userName, roomName})
        await fetch()
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