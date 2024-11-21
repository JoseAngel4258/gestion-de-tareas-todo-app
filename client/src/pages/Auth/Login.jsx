import React,{useState} from 'react'
import styles from './Login.module.css';
import login from '../../assets/login.png';
import {Button, Input, message} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import AuthServices from '../../services/authServices';
import { getErrorMessage } from '../../util/GetError';

function Login() {
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async ()=>{
    
    try{
      setLoading(true);
      let data = {
        username,
        password
      }
      const response = await AuthServices.loginUser(data);
      console.log(response.data);
      localStorage.setItem('toDoAppUser',JSON.stringify(response.data));
      message.success("Logged in Successfully!");
      navigate('/to-do-list');
      setLoading(false);
    }catch(err){
      console.log(err);
      message.error(getErrorMessage(err));
      setLoading(false);
    }
  }
  return (
    <div>
      <div className={styles.login__card}>
          <img src={login} alt=".."/>
          <h2>Inicio de sesión</h2>
          <div className={styles.input__wrapper}>
              <Input 
              placeholder="Nombre de usuario" 
              value={username} 
              onChange={(e)=>setUsername(e.target.value)} />
          </div>
          <div className={styles.input__wrapper}>
              <Input.Password 
              placeholder="Contraseña" 
              value={password} 
              onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <div className={styles.input__info}>
            ¿Nuevo usuario? <Link to="/register">Registrarse</Link>
           </div> 
           <Button loading={loading} type="primary" size="large" disabled={!username || !password} onClick={handleSubmit} >Iniciar</Button>
      </div>
    </div>
  )
}

export default Login