import React from "react";
import Navbar from "../../components/Navbar";
import styles from "./UserLog.module.css";
import { Table, Tag, Divider } from "antd";

function UserLog() {
  const data = [
    {
      key: "1",
      name: "Juan Pérez",
      username: "juanperez",
      password: "********",
      loginDate: "2024-11-18 08:45:23",
    },
    {
      key: "2",
      name: "Ana Gómez",
      username: "anagomez",
      password: "********",
      loginDate: "2024-11-17 09:12:30",
    },
    // Puedes agregar más registros aquí
  ];

  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Nombre de Usuario",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Contraseña",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Fecha de Ingreso",
      dataIndex: "loginDate",
      key: "loginDate",
    },
  ];

  return (
    <>
      <Navbar active={"userLog"} />
      <section className={styles.userLogWrapper}>
        <div className={styles.userLogHeader}>
          <h2>Bitácora de Usuario</h2>
        </div>
        <Divider />
        
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          rowKey="key"
        />
      </section>
    </>
  );
}

export default UserLog;
