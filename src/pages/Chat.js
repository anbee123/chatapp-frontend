import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import AppContext from "../context"

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

    return <div className="container">
        <h1>This is Chat Page</h1>
        <p>Room Name : {roomName}</p>
        <p>User Name : {userName}</p>

        <div>
            <Link to='/'>
                Back to Homepage
            </Link>
        </div>

        <div>
            The messages here

            {messages && messages.map((item) => {
                return <div key={item.id}>
                    <p>{item.userName} : {item.message}</p>
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