import React from "react";
import "./index.css";

export default function About() {
    return (
        <div className="about-container">
            <h1></h1>
            <div className="info-container">
                <InfoBox
                    imageSrc="https://images.pexels.com/photos/19120330/pexels-photo-19120330/free-photo-of-meat-served-with-vegetables.jpeg?auto=compress&cs=tinysrgb&w=600"
                    title="Our Goal"
                    description="Our goal is to bring fresh homemade food directly to you on campus at a lower price compared to others."
                />
                <InfoBox
                    imageSrc="https://images.pexels.com/photos/19119497/pexels-photo-19119497/free-photo-of-burger-served-in-a-restaurant.jpeg?auto=compress&cs=tinysrgb&w=600"
                    title="Why"
                    description="We think you should be able to eat homecooked meals instead of the same fastfood you normally would."
                />
                <InfoBox
                    imageSrc="https://images.pexels.com/photos/18725480/pexels-photo-18725480/free-photo-of-pineapple-in-the-dark.jpeg?auto=compress&cs=tinysrgb&w=600"
                    title="How"
                    description="Food is made by your own peers on campus and delivered straight to wherever it is you may be located."
                />
            </div>

        </div>
    );
}

function InfoBox({ imageSrc, title, description }) {
    return (
        <div className="info-box">
            <img src={imageSrc} alt="Box" />
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
}