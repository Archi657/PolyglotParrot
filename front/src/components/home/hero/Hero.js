import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import './Hero.css'
import { Link } from "react-router-dom";
import Emoji from "../../shared/emoji/Emoji";

const Hero = ({ slider }) => {
  return (
    <div>

      <Carousel>
        {slider.map((dictation) => (
          <Link key={0}
            to={`/dictation/${dictation.id}`}
            state={{ dictation: dictation }}>
            <Paper key={dictation.id}>
              <div className="dictation-card-container">
                <div className="dictation-card" style={{ "--img": `url(${dictation.bgImage})` }}>
                  <div className="dictation-detail">
                    <div className="dictation-poster">
                      <img src={dictation.image} alt="" />
                    </div>
                    <div className="dictation-title ">
                      <h4>{dictation.title}</h4>
                    </div>
                    <div className="dictation-buttons-container">

                      <div className="play-button-icon-container">
                        <Emoji className="play-button-icon" emoji={dictation.language} size={75} />
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          </Link>
        ))}
      </Carousel>


    </div>
  );
};

export default Hero;
