import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { getUserDetails } from "../util/GetUser";
import avatar from "../assets/login.png";

function Navbar({ active }) {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userDetails = getUserDetails();
    setUser(userDetails);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("toDoAppUser");
    navigate("/login");
  };

  return (
    <header>
      <nav>
        <div className="logo__wrapper">
          <h4>Gestión de Tareas</h4>
        </div>
        <ul className="navigation-menu">
          <li>
            <Link to="/" className={active === "home" && "activeNav"}>
              Inicio
            </Link>
          </li>
          {user && (
            <>
              <li>
                <Link
                  to="/to-do-list"
                  className={active === "myTask" && "activeNav"}
                >
                  Mis Tareas
                </Link>
              </li>

              {/* Mostrar Bitácora de Usuarios solo en /to-do-list-admin */}
              {location.pathname === "/to-do-list-admin" && (
                <li>
                  <Link
                    to="/user-log"
                    className={active === "userLog" && "activeNav"}
                  >
                    Bitácora de Usuarios
                  </Link>
                </li>
              )}
              {location.pathname === "/to-do-list-admin" && (
                <li>
                  <a onClick={handleLogout}>Descargar Base de Datos</a>
                </li>
              )}
            </>
          )}
          <li>
            <Link
              to="/user-manual"
              className={active === "userManual" && "activeNav"}
            >
              Manual de Usuario
            </Link>
          </li>
          <li>
            <a
              className={active === "userManual" && "activeNav"}
              onClick={handleLogout}
            >
              Salir
            </a>
          </li>
          <div className="userInfoNav">
            <img src={avatar} alt="avatar" />
            <span>
              {user?.firstName
                ? `Hola, ${user?.firstName} ${user?.lastName}`
                : user?.username}
            </span>
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
