/* eslint-disable */

import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Avatar } from "@mui/material";
import { BarChart } from '@mui/x-charts/BarChart';
import { dataset, valueFormatter } from './data';
const Profile = () => {

    const chartSetting = {
        xAxis: [{ label: 'Dictations' }],
        height: 400,
        margin: { left: 0 },
    };

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

        <>
            <Avatar alt="Cindy Baker" src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg" />
            <p>{username}</p>
            <BarChart
                xAxis={[{ data: ['group A', 'group B', 'group C'] }]}
                series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                height={300}
            />
            <p>2025</p>
            <BarChart
                dataset={dataset}
                colors='dark'
                yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                series={[{ dataKey: 'seoul', label: 'Dictations done per month', valueFormatter }]}
                layout="horizontal"
                grid={{ vertical: true }}
                {...chartSetting}
            />
        </>

    )
}

export default Profile