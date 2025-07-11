/* eslint-disable */

import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Avatar } from "@mui/material";

const Profile = () => {

    const [user, setUser] = useState({})

    const { username } = useParams();
    const location = useLocation()

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user === undefined) {
                    // create getUser info by username
                    setUser = await getUser(username)
                }
            } catch (error) {
                console.error('Error fetching fetching user:', error);
            }
        }
        fetchData
    }, [username])

    return (
        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
    )
}

export default Profile