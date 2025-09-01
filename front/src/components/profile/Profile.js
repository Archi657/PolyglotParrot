/* eslint-disable */
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { dataset, valueFormatter } from "./data";

const Profile = () => {
    const chartSetting = {
        xAxis: [{ label: "Dictations" }],
        height: 300,
        margin: { left: 60 },
    };

    const [user, setUser] = useState({});
    const { username } = useParams();
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Replace this mock with: const data = await getUser(username);
                const mockUser = {
                    username,
                    avatar:
                        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
                    stats: {
                        dictationsDone: 42,
                        languagesUsed: ["🇬🇧", "🇫🇷", "🇪🇸"],
                        streak: 12,
                    },
                    latestDictations: [
                        { id: 1, title: "French News Dictation", date: "2025-08-20" },
                        { id: 2, title: "English Story", date: "2025-08-18" },
                        { id: 3, title: "Spanish Practice", date: "2025-08-15" },
                    ],
                };
                setUser(mockUser);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchData();
    }, [username]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 4,
                gap: 6,
            }}
        >
            {/* Avatar + Username Centered */}
            <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <Stack spacing={1.5} alignItems="center">
                    <Avatar
                        alt={user?.username ?? username}
                        src={user?.avatar}
                        sx={{
                            width: 120,
                            height: 120,
                            boxShadow: 2,
                            border: "3px solid",
                            borderColor: "divider",
                        }}
                    />
                    <Typography variant="h5" component="h1" align="center" color="white">
                        {user?.username ?? username}
                    </Typography>
                </Stack>
            </Box>

            {/* Stats Section */}
            <Box sx={{ display: "flex", gap: 6, textAlign: "center" }}>
                <Box>
                    <Typography fontSize="1.5rem">📝</Typography>
                    <Typography color="white" fontWeight="bold">
                        {user.stats?.dictationsDone}
                    </Typography>
                    <Typography variant="body2" color="palette.warning.light">
                        Dictations
                    </Typography>
                </Box>
                <Box>
                    <Typography color="white" fontSize="1.5rem">🌍</Typography>
                    <Typography fontWeight="bold">
                        {user.stats?.languagesUsed?.join(" ")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Languages
                    </Typography>
                </Box>
                <Box>
                    <Typography fontSize="1.5rem">🔥</Typography>
                    <Typography fontWeight="bold">{user.stats?.streak} days</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Streak
                    </Typography>
                </Box>
            </Box>

            {/* Chart 1 */}
            <Box sx={{ width: "100%", maxWidth: 700 }}>
                <Typography variant="h6" mb={2}>
                    Performance
                </Typography>
                <BarChart
                    xAxis={[{ data: ["Group A", "Group B", "Group C"] }]}
                    series={[
                        { data: [4, 3, 5] },
                        { data: [1, 6, 3] },
                        { data: [2, 5, 6] },
                    ]}
                    height={300}
                />
            </Box>

            {/* Chart 2 */}
            <Box sx={{ width: "100%", maxWidth: 700 }}>
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
                        },
                    ]}
                    layout="horizontal"
                    grid={{ vertical: true }}
                    {...chartSetting}
                />
            </Box>

            {/* Latest Dictations */}
            <Box sx={{ width: "100%", maxWidth: 700 }}>
                <Typography variant="h6" mb={2}>
                    Latest Dictations
                </Typography>
                <Stack spacing={1.5}>
                    {user.latestDictations?.map((d) => (
                        <Box
                            key={d.id}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                p: 2,
                                borderRadius: 2,
                                boxShadow: 1,
                                bgcolor: "background.paper",
                                "&:hover": { bgcolor: "grey.50" },
                            }}
                        >
                            <Typography>{d.title}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {d.date}
                            </Typography>
                        </Box>
                    ))}
                </Stack>
            </Box>
        </Box>
    );
};

export default Profile;
