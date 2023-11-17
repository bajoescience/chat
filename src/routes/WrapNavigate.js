import { Navigate, useOutletContext } from "react-router-dom"

const WrapNavigate = () => {
    const {userState} = useOutletContext()
    return <Navigate replace to={`/chat/${userState.user && userState.user.username}`} />
}

export default  WrapNavigate