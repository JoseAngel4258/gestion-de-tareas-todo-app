import React from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import landing from "../../assets/landing.jpg";
import styles from "./Landing.module.css";
function Landing() {
  return (
    <div>
      <Navbar active={"home"} />
      <div className={styles.landing__wrapper}>
        <div className={styles.landing__text}>
          <h1>
            Programe sus tareas diarias con{" "}
            <span className="primaryText">Fluidez!</span>
          </h1>
          <div className="btnWrapper">
            <Link to="/register" className="primaryBtn">
              Registrarse
            </Link>
            <Link to="/login" className="secondaryBtn">
              Acceder
            </Link>
          </div>
        </div>

        <div className={styles.landing__img}>
          <img src={landing} alt="landing" />
        </div>
      </div>
    </div>
  );
}

export default Landing;
