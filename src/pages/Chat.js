import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import AppContext from "../context"
import "../styles/Chat.scss"

const ChatPage = () => {
    const { userName, roomName } = useContext(AppContext)
    const [ messages, setMessages ] = useState([])
    const [ sendMsg, setSendMsg ] = useState('')
    const [ editItemId, setEditItemId ] = useState('')
    const [ editItemValue, setEditItemValue ] = useState('')

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
        return () => {
            clearInterval(timer)
        }
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

    const handleEditMsg = async (item) => {
        console.log('delete a message', item)
        setEditItemId(item.id)
        setEditItemValue(item.message)
    
    }
    const handleDeleteMsg = async (message) => {
        console.log('delete a message', message)
        await axios(`http://localhost:8000/api/chat/edit/${message.id}`, {
            method: 'DELETE',
        })
    }

    const handleEditingSave = async (item) => {
        console.log('update message')
        await axios(`http://localhost:8000/api/chat/edit/${item.id}`, {
            method: 'PUT',
            data: {
                'userName': item.userName,
                'roomName': item.roomName,
                'message': editItemValue,
            }
        })
        setEditItemId('')
        setEditItemValue('')
    }
    const handleEditingCancel = async (item) => {
        console.log('cancel message')
        setEditItemId('')
        setEditItemValue('')
    }

    return <div className="roomContainer">
       
        <div className="chat-container">

        <h1 className="roomTitle">{roomName}</h1>
       
        <h2>User Name : {userName}</h2>

        <div>
           

            {messages && messages.sort((a, b) => a.id > b.id ? 1 : -1).map((item) => {
                return <div key={item.id}>
                    <p>
                        <strong>{item.userName}</strong> :
                        {editItemId === item.id ?
                            <>
                                <input
                                    type='text'
                                    value={editItemValue}
                                    onChange={e => setEditItemValue(e.target.value)}
                                />
                                <button onClick={() => handleEditingSave(item)}>save</button>
                                <button onClick={() => handleEditingCancel(item)}>cancel</button>
                            </>
                            :
                            <>
                                <span>{item.message}</span>
                                {item.userName === userName && <>
                                    <div className="edit-button">
                                    <button onClick={() => handleEditMsg(item)}>edit</button>
                                    <button onClick={() => handleDeleteMsg(item)}>X</button>
                                    </div>
                                </>}
                            </>
                        }
                    </p>
                </div>
            })}
           
                <input placeholder="Enter message" type='text' value={sendMsg} onChange={e => setSendMsg(e.target.value)} />
                <button  onClick={onClickSend}>Send message</button>
              

            </div>
        </div>
    </div>
}
export default ChatPage