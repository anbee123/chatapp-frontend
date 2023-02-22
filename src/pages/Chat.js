import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import AppContext from "../context"
import "../styles/Chat.scss"

const ChatPage = () => {
    const { userName, roomName } = useContext(AppContext)
    const [ messages, setMessages ] = useState([])
    const [ sendMsg, setSendMsg ] = useState('')

    useEffect(() => {
        const fetchMessages = async () => {
            await fetch(`http://localhost:8000/api/chat/${roomName}`, {method: 'GET'})
                .then(response => response.json())
                .then(data => setMessages(data))
                .catch(err => console.log(err))
        }
        fetchMessages()
        // fetch messages every one second
        const timer = setInterval(() => {
            fetchMessages()
        }, 1000)
    }, [])

    const onClickSend = async () => {
        console.log('sending new message', sendMsg)
        await axios(`http://localhost:8000/api/chat/`, {
            method: 'POST',
            data: {
                'userName': userName,
                'roomName': roomName,
                'message': sendMsg,
            }
        })
    }

    const handleEditMsg = async (message) => {
        console.log('delete a message', message)
        await axios(`http://localhost:8000/api/chat/edit/${message.id}`, {
            method: 'PUT',
            data: {

            }
        })
    }
    const handleDeleteMsg = async (message) => {
        console.log('delete a message', message)
        await axios(`http://localhost:8000/api/chat/edit/${message.id}`, {
            method: 'DELETE',
        })
    }

    return <div className="roomContainer">
        <div>
            <Link to='/'>
                Back to Homepage
            </Link>
        </div>

        <h1 className="roomTitle">{roomName}</h1>
        {/* <p>Room Name : {roomName}</p> */}
        <h2>User Name : {userName}</h2>

        <div>
            The messages here

            {messages && messages.map((item) => {
                return <div key={item.id}>
                    <p>
                        {item.userName} : {item.message}
                        {item.userName === userName && <>
                            <button onClick={() => handleEditMsg(item)}>edit</button>
                            <button onClick={() => handleDeleteMsg(item)}>X</button>
                        </>}
                    </p>
                </div>
            })}
            <div>
                <input type='text' value={sendMsg} onChange={e => setSendMsg(e.target.value)} />
                <button onClick={onClickSend}>Send message</button>
            </div>
        </div>
    </div>
}
export default ChatPage