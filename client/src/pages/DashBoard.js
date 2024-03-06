import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBarOn from "../components/NavBarOn";

function DashBoard(){

    const navigate = useNavigate();
    const [info, setMessage] = useState("");

    const handleTravelClick = () => {
        navigate('/travel');
    }

    const handleIterClick = () =>{
        navigate('/iter');
    }

    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_IP}:8000/api/login`, {
            credentials: 'include'
        })
        .then((res) => res.json())
        .then((data) => setMessage(data));
    }, []);    

    if (info === null) {
        return <div>Loading...</div>;
    }

    if(!info.status){
        navigate('/home');
        return null;
    } else {
        if(!info.loggedIn){
            return(
                <div className="DashBoard-page">
                    <NavBarOn />
                    <h1>Hi, Dashboard Page</h1>
                    <h2>Not Logged In</h2>
                </div>
            )
        } else {
            return(
                <div className="DashBoard-page">
                    <NavBarOn />
                    <h1>Hi {info.name}, Welcome to Dashboard Page</h1>
                    <h2>Logged In</h2>
                    <div className="text-center mt-4">
                        <button type="button" className="btn btn-primary btn-lg mr-2" onClick={handleTravelClick}>Travel</button>
                        <button type="button" className="btn btn-secondary btn-lg" onClick={handleIterClick}>Itinerary</button>
                    </div>
                </div>
            )
        }
    }
}

export default DashBoard;