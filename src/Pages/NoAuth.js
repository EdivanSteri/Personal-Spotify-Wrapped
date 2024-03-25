import { Link} from "react-router-dom";

function NoAuth () {
    sessionStorage.removeItem("verifier");

    return (
        <div>
            <h1>Error 401: User Not Authorized</h1>
            
            <Link to={'/'}><button>Retry Login To Spotify</button></Link>
        </div>
    );
};

export default NoAuth;