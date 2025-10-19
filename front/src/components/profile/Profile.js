/* eslint-disable */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { dataset, valueFormatter } from "./data";

import { getDictationsUser } from "../../api/routes"; 
import Emoji from "../shared/emoji/Emoji"

const Profile = () => {
    const chartSetting = {
        xAxis: [{ label: "Dictations" }],
        height: 300,
        margin: { left: 60 },
    };

    const [user, setUser] = useState({});
    const { username } = useParams();
    const [dictations, setDictations] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const mockUser = {
                    username,
                    avatar:
                        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
                    stats: {
                        dictationsDone: 42,
                        languagesUsed: ["french", "german"],
                        streak: 12,
                    },
                    latestDictations: [
                        { id: 1, title: "French News Dictation", date: "2025-08-20" },
                        { id: 2, title: "English Story", date: "2025-08-18" },
                        { id: 3, title: "Spanish Practice", date: "2025-08-15" },
                    ],
                };
                setUser(mockUser);

                // REAL

                setLoading(true)
                const data = await getDictationsUser(username)
                //console,log(username + " dictations " + data)
                setDictations(data || [])
            } catch (error) {
                console.error("Error fetching dictations for user:", error);
            }finally { 
              setLoading(false)
            }
        };
        if (username) fetchData();
    }, [username]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 4,
                gap: 6,
                bgcolor: "#121212", // Dark background
                minHeight: "100vh",
            }}
        >
            {/* Avatar + Username */}
            <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <Stack spacing={1.5} alignItems="center">
                    <Avatar
                        alt={user?.username ?? username}
                        src={user?.avatar}
                        sx={{
                            width: 120,
                            height: 120,
                            boxShadow: 3,
                            border: "3px solid #42a5f5", // Neon blue border
                        }}
                    />
                    <Typography variant="h5" component="h1" align="center" color="white">
                        {user?.username ?? username}
                    </Typography>
                </Stack>
            </Box>

            {/* Stats */}
            <Box sx={{ display: "flex", gap: 6, textAlign: "center", color: "white" }}>
                <Box>
                    <Typography fontSize="1.5rem">📝</Typography>
                    <Typography fontWeight="bold" color="#42a5f5">
                        {user.stats?.dictationsDone}
                    </Typography>
                    <Typography variant="body2" color="#9e9e9e">
                        Dictations
                    </Typography>
                </Box>
                <Box>
                    <Typography fontSize="1.5rem">🌍</Typography>
                    <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                        {user.stats?.languagesUsed?.map((lang, i) => (
                        <Emoji key={i} emoji={lang} size={28} />
                        ))}
                    </Box>
                    <Typography variant="body2" color="#9e9e9e">
                        Languages
                    </Typography>
                </Box>
                <Box>
                    <Typography fontSize="1.5rem">🔥</Typography>
                    <Typography fontWeight="bold" color="#ffa726">
                        {user.stats?.streak} days
                    </Typography>
                    <Typography variant="body2" color="#9e9e9e">
                        Streak
                    </Typography>
                </Box>
            </Box>

            {/* Chart 1 */}
            <Box sx={{ width: "100%", maxWidth: 700, color: "white" }}>
                <Typography variant="h6" mb={2}>
                    Performance
                </Typography>
                <BarChart
                    xAxis={[{ data: ["Group A", "Group B", "Group C"] }]}
                    series={[
                        { data: [4, 3, 5], color: "#42a5f5" }, // Neon blue
                        { data: [1, 6, 3], color: "#66bb6a" }, // Neon green
                        { data: [2, 5, 6], color: "#ab47bc" }, // Neon purple
                    ]}
                    height={300}
                />
            </Box>

            {/* Chart 2 */}
            <Box sx={{ width: "100%", maxWidth: 700, color: "white" }}>
                <Typography variant="h6" mb={2}>
                    Dictations per Month
                </Typography>
                <BarChart
                    dataset={dataset}
                    yAxis={[{ scaleType: "band", dataKey: "month" }]}
                    series={[
                        {
                            dataKey: "seoul",
                            label: "Dictations done per month",
                            valueFormatter,
                            color: "#42a5f5", // Blue
                        },
                    ]}
                    layout="horizontal"
                    grid={{ vertical: true }}
                    {...chartSetting}
                />
            </Box>

            {loading ? (
        <Typography color="#9e9e9e">Loading dictations...</Typography>
      ) : Array.isArray(dictations) && dictations.length > 0 ? (
        dictations.map((d, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              borderRadius: 2,
              bgcolor: "#1e1e1e",
              mb: 2,
              transition: "0.3s",
              "&:hover": { bgcolor: "#2c2c2c" },
            }}
          >
            <Box>
              <Typography variant="h6">{d.dictationTitle}</Typography>
              <Typography variant="body2" color="#9e9e9e">
                Accuracy: {d.accuracy}%
              </Typography>
            </Box>
          </Box>
        ))
      ) : (
        <Typography color="#9e9e9e">No dictations found</Typography>
      )}
    </Box>
    );
};

export default Profile;
