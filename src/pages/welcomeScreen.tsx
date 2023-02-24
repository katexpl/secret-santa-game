import React from "react";
import { Link } from "react-router-dom";

const WelcomeScreen = () => {
  return (
    <>
      <div className="welcome-screen-header">Secret Santa</div>
      <div className="welcome-screen-container">
        <div className="welcome-screen-content-container">
          <p className="welcome-screen-text">
            This is a React app that plays the "Secret Santa" gift exchange
            game. The app randomly assigns each player to give a gift to another
            player in the group, ensuring that each player is paired up with a
            different person and not their partner or someone they gave a gift
            to in the past.
          </p>
          <div className="welcome-page-buttons-wrapper">
            <div className="task-button-container">
              <Link to="/secret-santa">Secret Santa</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeScreen;
