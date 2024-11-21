import React from "react";
import Navbar from "../../components/Navbar";
import styles from "./UserManual.module.css";
import { Divider } from "antd";

function UserManual() {
  return (
    <>
      <Navbar active={"userManual"} />
      <section className={styles.manualWrapper}>
        <div className={styles.manualHeader}>
          <h2>Manual de Usuario</h2>
        </div>
        <Divider />

        <div className={styles.imageWrapper}>
          <div className={styles.imageItem}>
            <img
              src="https://via.placeholder.com/300"
              alt="Imagen 1"
              className={styles.manualImage}
            />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              volutpat est a orci volutpat, vel tempor nulla pretium. Mauris
              vulputate nisi et ante sollicitudin, ac cursus eros auctor.
            </p>
          </div>

          <div className={styles.imageItem}>
            <img
              src="https://via.placeholder.com/300"
              alt="Imagen 2"
              className={styles.manualImage}
            />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              volutpat est a orci volutpat, vel tempor nulla pretium. Mauris
              vulputate nisi et ante sollicitudin, ac cursus eros auctor.
            </p>
          </div>

          <div className={styles.imageItem}>
            <img
              src="https://via.placeholder.com/300"
              alt="Imagen 3"
              className={styles.manualImage}
            />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              volutpat est a orci volutpat, vel tempor nulla pretium. Mauris
              vulputate nisi et ante sollicitudin, ac cursus eros auctor.
            </p>
          </div>

          <div className={styles.imageItem}>
            <img
              src="https://via.placeholder.com/300"
              alt="Imagen 4"
              className={styles.manualImage}
            />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              volutpat est a orci volutpat, vel tempor nulla pretium. Mauris
              vulputate nisi et ante sollicitudin, ac cursus eros auctor.
            </p>
          </div>

          <div className={styles.imageItem}>
            <img
              src="https://via.placeholder.com/300"
              alt="Imagen 5"
              className={styles.manualImage}
            />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              volutpat est a orci volutpat, vel tempor nulla pretium. Mauris
              vulputate nisi et ante sollicitudin, ac cursus eros auctor.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default UserManual;
