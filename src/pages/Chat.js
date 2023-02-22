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
        // await axios(`http://localhost:8000/api/chat/edit/${message.id}`, {
        //     method: 'PUT',
        //     data: {
        //         'userName': 'user5',
        //         'roomName': 'room5',
        //         'message': 'updated message --- 1',
        //     }
        // })
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
        <div>
            <Link to='/'>
                Select Other Rooms
            </Link>
        </div>
        <div className="chat-container">

        <div className="names">
        <h1 className="header"> RoomName:{roomName}</h1>
        {/* <p>Room Name : {roomName}</p> */}
        <h2 className="user-name">UserName: {userName}</h2>
        </div>
        <div className="button">
        <div>
           

            {messages && messages.map((item) => {
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
                                    <button onClick={() => handleEditMsg(item)}>edit</button>
                                    <button onClick={() => handleDeleteMsg(item)}>X</button>
                                </>}
                            </>
                        }
                    </p>
                </div>
            })}
           
                <input placeholder="Type The messages here" type='text' value={sendMsg} onChange={e => setSendMsg(e.target.value)} />
                <button  onClick={onClickSend}>Send message</button>
            </div>
        </div>
    </div>
    </div>
}
export default ChatPage