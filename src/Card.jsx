import { useEffect, useState } from "react";
import "./Card.css";

function Card({ tunnelClass }) {
  return (
    <>
      <div className="card container root">
        <h3 className="card subtitle">tunnelClass</h3>
        <div className="card container slider">
          <span className="card label slider">FF-SI</span>
          <div className="card bar slider">
            <div className="card indicator slider">
              <span className="card score slider" id="percentile">
                0
              </span>
            </div>
          </div>
          <span className="card score slider" id="frequency">
            0.04
          </span>
        </div>
      </div>
    </>
  );
}

export default Card;
