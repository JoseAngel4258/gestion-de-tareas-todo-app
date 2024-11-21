import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import styles from "./ToDoList.module.css";
import {
  Button,
  Divider,
  Empty,
  Input,
  Modal,
  Select,
  Tag,
  Tooltip,
  message,
} from "antd";
import { getErrorMessage } from "../../util/GetError";
import { getUserDetails } from "../../util/GetUser";
import ToDoServices from "../../services/toDoServices";
import { useNavigate } from "react-router";
import {
  CheckCircleFilled,
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

function ToDoList() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allToDo, setAllToDo] = useState([]);
  const [currentEditItem, setCurrentEditItem] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [currentTaskType, setCurrentTaskType] = useState("incomplete");
  const [completedTodo, setCompletedTodo] = useState([]);
  const [incompletedTodo, setIncompletedTodo] = useState([]);
  const [currentTodoTask, setCurrentToDoTask] = useState([]);
  const [filteredToDo, setFilteredToDo] = useState([]);

  const navigate = useNavigate();

  const getAllToDo = async () => {
    try {
      let user = getUserDetails();
      console.log(user?.userId);
      const response = await ToDoServices.getAllToDo(user?.userId);
      console.log(response.data);
      setAllToDo(response.data);
    } catch (err) {
      console.log(err);
      message.error(getErrorMessage(err));
    }
  };

  useEffect(() => {
    let user = getUserDetails();
    const getAllToDo = async () => {
      try {
        console.log(user?.userId);
        const response = await ToDoServices.getAllToDo(user?.userId);
        console.log(response.data);
        setAllToDo(response.data);
      } catch (err) {
        console.log(err);
        message.error(getErrorMessage(err));
      }
    };
    if (user && user?.userId) {
      getAllToDo();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const incomplete = allToDo.filter((item) => item.isCompleted === false);
    const complete = allToDo.filter((item) => item.isCompleted === true);
    setIncompletedTodo(incomplete);
    setCompletedTodo(complete);
    if (currentTaskType === "incomplete") {
      setCurrentToDoTask(incomplete);
    } else {
      setCurrentToDoTask(complete);
    }
  }, [allToDo]);

  const handleSubmitTask = async () => {
    setLoading(true);
    try {
      const userId = getUserDetails()?.userId;
      const data = {
        title,
        description,
        isCompleted: false,
        createdBy: userId,
      };
      const response = await ToDoServices.createToDo(data);
      console.log(response.data);
      setLoading(false);
      message.success("¡Tarea añadida correctamente!");
      setIsAdding(false);
      getAllToDo();
    } catch (err) {
      console.log(err);
      setLoading(false);
      message.error(getErrorMessage(err));
    }
  };

  const getFormattedDate = (value) => {
    let date = new Date(value);
    let dateString = date.toDateString();
    let hh = date.getHours();
    let min = date.getMinutes();
    let ss = date.getSeconds();
    let finalDate = `${dateString} at ${hh}:${min}:${ss}`;
    return finalDate;
  };

  const handleEdit = (item) => {
    console.log(item);
    setCurrentEditItem(item);
    setUpdatedTitle(item?.title);
    setUpdatedDescription(item?.description);
    setUpdatedStatus(item?.isCompleted);
    setIsEditing(true);
  };

  const handleDelete = async (item) => {
    try {
      const response = await ToDoServices.deleteToDo(item._id);
      console.log(response.data);
      message.success(`${item.title} ¡Tarea eliminada con éxito!`);
      getAllToDo();
    } catch (err) {
      console.log(err);
      message.error(getErrorMessage(err));
    }
  };

  const handleUpdateStatus = async (id, status) => {
    console.log(id);
    try {
      const response = await ToDoServices.updateToDo(id, {
        isCompleted: status,
      });
      console.log(response.data);
      message.success("¡El estado de la tarea se actualizó correctamente!");
      getAllToDo();
    } catch (err) {
      console.log(err);
      message.error(getErrorMessage(err));
    }
  };

  const handleUpdateTask = async () => {
    try {
      setLoading(true);
      const data = {
        title: updatedTitle,
        description: updatedDescription,
        isCompleted: updatedStatus,
      };
      console.log(data);
      const response = await ToDoServices.updateToDo(
        currentEditItem?._id,
        data
      );
      console.log(response.data);
      message.success(`${currentEditItem?.title} ¡Actualizado correctamente!`);
      setLoading(false);
      setIsEditing(false);
      getAllToDo();
    } catch (err) {
      console.log(err);
      setLoading(false);
      message.error(getErrorMessage(err));
    }
  };

  const handleTypeChange = (value) => {
    console.log(value);
    setCurrentTaskType(value);
    if (value === "incomplete") {
      setCurrentToDoTask(incompletedTodo);
    } else {
      setCurrentToDoTask(completedTodo);
    }
  };

  const handleSearch = (e) => {
    let query = e.target.value;
    let filteredList = allToDo.filter((item) =>
      item.title.toLowerCase().match(query.toLowerCase())
    );
    console.log(filteredList);
    if (filteredList.length > 0 && query) {
      setFilteredToDo(filteredList);
    } else {
      setFilteredToDo([]);
    }
  };
  return (
    <>
      <Navbar active={"myTask"} />
      <section className={styles.toDoWrapper}>
        <div className={styles.toDoHeader}>
          <h2>Tus Tareas</h2>
          <Input
            style={{ width: "50%" }}
            onChange={handleSearch}
            placeholder="Busca una tarea aquí..."
          />
          <div>
            <Button
              onClick={() => setIsAdding(true)}
              type="primary"
              size="large"
            >
              Añadir
            </Button>
            <Select
              value={currentTaskType}
              style={{ width: 180, marginLeft: "10px" }}
              onChange={handleTypeChange}
              size="large"
              options={[
                { value: "incomplete", label: "Incompleta" },
                { value: "complete", label: "Completada" },
              ]}
            />
          </div>
        </div>
        <Divider />

        <div className={styles.toDoListCardWrapper}>
          {filteredToDo.length > 0 ? (
            filteredToDo.map((item) => {
              return (
                <div key={item?._id} className={styles.toDoCard}>
                  <div>
                    <div className={styles.toDoCardHeader}>
                      <h3>{item?.title}</h3>
                      {item?.isCompleted ? (
                        <Tag color="cyan">Completada</Tag>
                      ) : (
                        <Tag color="red">Incompleta</Tag>
                      )}
                    </div>
                    <p>{item?.description}</p>
                  </div>

                  <div className={styles.toDoCardFooter}>
                    <Tag>{getFormattedDate(item?.createdAt)}</Tag>
                    <div className={styles.toDoFooterAction}>
                      
                      <Tooltip title="¿Eliminar tarea?">
                        <DeleteOutlined
                          onClick={() => handleDelete(item)}
                          style={{ color: "red" }}
                          className={styles.actionIcon}
                        />
                      </Tooltip>
                      {item?.isCompleted ? (
                        <Tooltip title="Marcar como incompleta">
                          <CheckCircleFilled
                            onClick={() => handleUpdateStatus(item._id, false)}
                            style={{ color: "green" }}
                            className={styles.actionIcon}
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip title="Marcar como completada">
                          <CheckCircleOutlined
                            onClick={() => handleUpdateStatus(item._id, true)}
                            className={styles.actionIcon}
                          />
                        </Tooltip>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : currentTodoTask.length > 0 ? (
            currentTodoTask.map((item) => {
              return (
                <div key={item?._id} className={styles.toDoCard}>
                  <div>
                    <div className={styles.toDoCardHeader}>
                      <h3>{item?.title}</h3>
                      {item?.isCompleted ? (
  <Tag color="cyan">Completada</Tag>
) : item?.isPending ? (
  <Tag color="orange">Pendiente</Tag>
) : (
  <Tag color="red">Incompleta</Tag>
)}

                    </div>
                    <p>{item?.description}</p>
                  </div>

                  <div className={styles.toDoCardFooter}>
                    <Tag>{getFormattedDate(item?.createdAt)}</Tag>
                    <div className={styles.toDoFooterAction}>
                      
                      {item?.isCompleted ? (
                        <Tooltip title="Marcar como incompleta">
                          <CheckCircleFilled
                            onClick={() => handleUpdateStatus(item._id, false)}
                            style={{ color: "green" }}
                            className={styles.actionIcon}
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip title="Marcar como completada">
                          <CheckCircleOutlined
                            onClick={() => handleUpdateStatus(item._id, true)}
                            className={styles.actionIcon}
                          />
                        </Tooltip>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.noTaskWrapper}>
              <Empty />
            </div>
          )}
        </div>

        <Modal
          confirmLoading={loading}
          title="Añade una nueva tarea"
          open={isAdding}
          onOk={handleSubmitTask}
          onCancel={() => setIsAdding(false)}
        >
          <Input
            style={{ marginBottom: "1rem" }}
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input.TextArea
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Modal>

        <Modal
          confirmLoading={loading}
          title={`Update ${currentEditItem.title}`}
          open={isEditing}
          onOk={handleUpdateTask}
          onCancel={() => setIsEditing(false)}
        >
          <Input
            style={{ marginBottom: "1rem" }}
            placeholder="Actualizar título"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <Input.TextArea
            style={{ marginBottom: "1rem" }}
            placeholder="Actualizar descripción"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
          <Select
            onChange={(value) => setUpdatedStatus(value)}
            value={updatedStatus}
            options={[
              {
                value: false,
                label: "Incompleta",
              },

              {
                value: true,
                label: "Completada",
              },
            ]}
          />
        </Modal>
      </section>
    </>
  );
}

export default ToDoList;
