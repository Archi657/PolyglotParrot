/* eslint-disable */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { dataset, valueFormatter } from "./data";
import { getDictationsUser } from "../../api/routes";
import Emoji from "../shared/emoji/Emoji";
import "./Profile.css"; // ✅ import the CSS file
import { getSolution } from "../../api/routes";
import { useTranslation } from "react-i18next";
const Profile = () => {

  const navigate = useNavigate()
  const chartSetting = {
    xAxis: [{ label: "Dictations" }],
    height: 300,
    margin: { left: 60 },
  };

  const [user, setUser] = useState({});
  const { username } = useParams();
  const [dictations, setDictations] = useState([]);
  const [loading, setLoading] = useState(true);

  const { t } = useTranslation()
  const { langText, dictText, perfoText } = t("Profile")

  const handleViewSolution = async (solutionId) => {
    const solutionData = await getSolution(solutionId);

    if (solutionData) {
      navigate(`/dictation/${solutionData.dictationID}`, { state: { solution: solutionData } });
    }
  };

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

        setLoading(true);
        const data = await getDictationsUser(username);
        //console.log(data)
        setDictations(data || []);
      } catch (error) {
        console.error("Error fetching dictations for user:", error);
      } finally {
        setLoading(false);
      }
    };
    if (username) fetchData();
  }, [username]);

  return (
    <Box className="profile-container">
      {/* Avatar + Username */}
      <Box className="profile-header">
        <Stack spacing={2} alignItems="center">
          <Avatar
            alt={user?.username ?? username}
            src={user?.avatar}
            className="profile-avatar"
            sx={{ width: 12, height: 12 }}
          />
          <Typography variant="h4" component="h1" align="center" className="profile-username">
            {user?.username ?? username}
          </Typography>
        </Stack>
      </Box>

      {/* Stats */}
      <Box className="profile-stats">
        <Box className="stat-box">
          
          <Box className="stat-languages">
            {user.stats?.languagesUsed?.map((lang, i) => (
              <Emoji key={i} emoji={lang} size={53} />
            ))}
          </Box>
          <Typography className="stat-value blue" variant="h5">
            2
          </Typography>
          <Typography variant="body3" className="stat-label">
            {langText}
          </Typography>
        </Box>
        <Box className="stat-box">
          <Emoji emoji="write" size={53}/>
          <Typography className="stat-value blue" variant="h5">
            {user.stats?.dictationsDone}
          </Typography>
          <Typography  variant="body3" className="stat-label">
            {dictText}
          </Typography>
        </Box>

      </Box>

      {/* Chart 1 */}
      <Box className="chart-box">
        <Typography variant="h5" mb={2}>
          {perfoText}
        </Typography>
        <BarChart
          xAxis={[{
            data: ["Group A", "Group B", "Group C"],
            tickLabelStyle: { fill: "#ffffff" },
            labelStyle: { fill: "#ffffff" }
          }]}
          yAxis={[
            {
              tickLabelStyle: { fill: "#ffffff" }, // Y-axis ticks
              labelStyle: { fill: "#ffffff" },     // Y-axis label
            },
          ]}
          series={[
            { data: [4, 3, 5], color: "#42a5f5" },
            { data: [1, 6, 3], color: "#66bb6a" },
            { data: [2, 5, 6], color: "#ab47bc" },
          ]}
          sx={{
            "& .MuiChartsAxis-line": {
              stroke: "#42a5f5", // axis line color
              strokeWidth: 2,
            },
            "& .MuiChartsAxis-tick": {
              stroke: "#42a5f5", // tick marks color
            },
            "& text": {
              fill: "#ffffff", // axis label + tick text color
            },
          }}

          height={300}
        />
      </Box>

      {/* Chart 2 */}
      <Box className="chart-box">
        <Typography variant="h5" mb={2}>
          Dictations per Month
        </Typography>
        <BarChart
          layout="horizontal"
          dataset={dataset}
          yAxis={[
            {
              scaleType: "band",
              dataKey: "month",
              tickLabelStyle: { fill: "#ffffff" },
              labelStyle: { fill: "#ffffff" },
            },
          ]}
          series={[
            {
              dataKey: "seoul",
              label: "Dictations done per month",
              valueFormatter,
              color: "#42a5f5",
            },
          ]}
          height={300}
          sx={{
            "& .MuiChartsAxis-line": {
              stroke: "#42a5f5",
              strokeWidth: 2,
            },
            "& .MuiChartsAxis-tick": {
              stroke: "#42a5f5",
            },
            "& text": {
              fill: "#ffffff",
            },
          }}
        />

      </Box>

      {/* Dictations */}
      {loading ? (
        <Typography className="loading-text">Loading dictations...</Typography>
      ) : Array.isArray(dictations) && dictations.length > 0 ? (
        dictations.map((d, index) => (
          <Box
            key={index}
            className="dictation-card"
            onClick={() => handleViewSolution(d.id)}
            style={{ cursor: "pointer" }}
          >
            <Box>
              <Emoji emoji={d.language} size={50} />
              <Typography variant="h6">{d.dictationTitle}</Typography>
              <Typography variant="h7" className="dictation-accuracy">
                Accuracy: {d.accuracy}%
              </Typography>
            </Box>
          </Box>
        ))
      ) : (
        <Typography className="no-dictations">No dictations found</Typography>
      )}
    </Box>
  );
};

export default Profile;

/*

<Box className="stat-box">
          <Typography fontSize="1.5rem">🌍</Typography>
          <Box className="stat-languages">
            {user.stats?.languagesUsed?.map((lang, i) => (
              <Emoji key={i} emoji={lang} size={28} />
            ))}
          </Box>
          <Typography variant="body2" className="stat-label">
            Languages
          </Typography>
        </Box>
        <Box className="stat-box">
          <Typography fontSize="1.5rem">🔥</Typography>
          <Typography className="stat-value orange">
            {user.stats?.streak} days 
          </Typography>
          <Typography variant="body2" className="stat-label">
            Streak
          </Typography>
        </Box>

*/