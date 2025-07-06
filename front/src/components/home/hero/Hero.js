import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import './Hero.css'
import {Link} from "react-router-dom";
import Emoji from "../../shared/emoji/Emoji";

const Hero = ({ slider }) => {
  return (
    <div>
      <Carousel>
        {slider.map((dictation) => (
          <Paper key={dictation.id}>
            <div className="dictation-card-container">
              <div className="dictation-card" style={{"--img": `url(${dictation.backdrops[0]})`}}>
                <div className="dictation-detail">
                  <div className="dictation-poster">
                    <img src={dictation.poster} alt=""/>
                  </div>
                  <div className="dictation-title ">
                    <h4>{dictation.title}</h4>
                  </div>
                  <div className="dictation-buttons-container">
                  <Link key={0}
                    to={`/dictation/${dictation.id}`}
                    state={{ language: dictation.language }}>
                    <div className="play-button-icon-container">
                      <Emoji className="play-button-icon" emoji={dictation.language} size={75}/>
                    </div>
                  </Link>
                  </div>
                </div>
              </div>
            </div>
          </Paper>
        ))}
      </Carousel>
    </div>
  );
};
 
export default Hero;
