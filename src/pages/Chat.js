import { Link } from "react-router-dom"

const ChatPage = () => {
    return <div>
        This is Chat Page

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