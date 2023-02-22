import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import AppContext from "../context"

const ChatPage = () => {
    const { userName, roomName } = useContext(AppContext)
    const [ messages, setMessages ] = useState([])

    useEffect(() => {
        const fetchMessages = async () => {
            await fetch(`http://localhost:8000/api/chat/${roomName}/${userName}`, {method: 'GET'})
                .then(response => response.json())
                .then(data => setMessages(data))
                .catch(err => console.log(err))
        }
        fetchMessages()
    }, [])
    return <div>
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

            <button>Send message</button>
        </div>
    </div>
}
export default ChatPage