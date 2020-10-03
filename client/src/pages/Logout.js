import Axios from 'axios';

function Logout(props) {

    const data={}

    Axios.get("./api/logout", data)
    .then(() => {
        props.setLoggedIn(false);
    })
    return Logout;
}

export default Logout;