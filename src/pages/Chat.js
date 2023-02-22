import { useState } from 'react'

const ChatPage = () => {
    const [userName, setUserName] = useState('')
    const [roomName, setRoomName] = useState('')
    
    return <div>
        This is Chat Page
        <div>
            <form onSubmit={onRoomCreate}>
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
                <button></button>
            </form>
        </div>
    </div>
}
export default ChatPage