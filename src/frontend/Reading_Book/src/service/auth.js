import axios from "axios"
import { useNavigate } from "react-router-dom";
import authHeader, { jwt } from "./authHeader"
const API = 'https://ebook4u-server.onrender.com/'

export default function AuthAdmin() {

    const authen = async () => {
        await axios.get(API + 'auth/checkAdmin', { headers: authHeader() }).then((res) => {
            if (!res.data.success) window.location.href = "https://ebooks4u.netlify.app/login"

        }).catch((e) => {

        })
    }
    authen()

}