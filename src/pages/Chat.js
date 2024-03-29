import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { FiSend } from "react-icons/fi";
import { Link } from "react-router-dom"
import AppContext from "../context"
import "../styles/Chat.scss"
import {BASE_URL} from "../api"

const ChatPage = () => {
    const { userName, roomName } = useContext(AppContext)
    const [messages, setMessages] = useState([])
    const [sendMsg, setSendMsg] = useState('')
    const [editItemId, setEditItemId] = useState('')
    const [editItemValue, setEditItemValue] = useState('')

    useEffect(() => {
        const fetchMessages = async () => {
            await fetch(`${BASE_URL}${roomName}`, { method: 'GET' })
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClickSend = async () => {
        console.log('sending new message', sendMsg)
        await axios(BASE_URL, {
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
        await axios(`${BASE_URL}edit/${message.id}`, {
            method: 'DELETE',
        })
    }

    const handleEditingSave = async (item) => {
        console.log('update message')
        await axios(`${BASE_URL}edit/${item.id}`, {
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

    return <div className="chatpage" >

        <div className="titles">
            <h2 className="slideInLeft">Room Name: {roomName}</h2>
            <h2 className="slideInRight">User Name: {userName}</h2>
        </div>
        <div className="chat-container">

            <div className="link">
                <Link to='/'>
                    Select Other Rooms
                </Link>
            </div>

            <div className="content">
                <div className="messageContainer">
                    {messages && messages.sort((a, b) => a.id > b.id ? 1 : -1).map((item) => {
                        return <div key={item.id} className="messages">
                            <p>
                                <strong>{item.userName}</strong> :
                                {editItemId === item.id ?
                                    <>
                                        <input className="slideInLeft"
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
                                                <button className="slideInLeft" onClick={() => handleEditMsg(item)}>edit</button>
                                                <button className="slideInLeft" onClick={() => handleDeleteMsg(item)}>Delete</button>
                                            </div>
                                        </>}
                                    </>
                                }
                            </p>
                        </div>
                    })}
                </div>
            </div>
                <div className="inputMessage">
                    <input className="button" placeholder="Enter message" type='text' value={sendMsg} onChange={e => setSendMsg(e.target.value)} />
                    <button className="button" onClick={onClickSend}><FiSend /></button>
                </div>
        </div>
    </div>
}
export default ChatPage