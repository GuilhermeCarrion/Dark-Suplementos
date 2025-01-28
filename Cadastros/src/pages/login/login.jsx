import './login.css'
import { useRef, useState } from 'react'
import api from "../../services/api.js"

function Register(){
  const inputName = useRef();
  const inputEmail = useRef();
  const inputPassword = useRef();

  const [Username, setUsername] = useState('');
  const [Userpassword, setPassword] = useState('');

  function cliqueCad(){
    const container = document.getElementById('container');
    container.classList.add("active");
  }

  function cliqueLog(){
    const container = document.getElementById('container');
    container.classList.remove("active");
  }

  async function validation(){
    let validacao = true
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nameRegex = /^[A-Za-z\s]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; 
    
    if(nameRegex.test(inputName.current.value)){
      validacao = true;
    }else{
      validacao = false;
    }
    
    if(emailRegex.test(inputEmail.current.value)){
      validacao = true;
    }else{
      validacao = false;
    }
    
    if(passwordRegex.test(inputPassword.current.value)){
      validacao = true;
    }else {
      validacao = false;
    }

    if(validacao === true){
      createUsers();
    }else{
      alert("Credenciais Invalidas, siga o modelo para criar sua conta:\nNome: Nome Sobrenome\nEmail: 'exemplo@email.com'\nSenha: Sua senha deve conter no mínimo 8 caracteres, incluindo pelo menos 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial.");
    }
  }

  async function createUsers(){
    await api.post('/usuarios', {
      name: inputName.current.value,
      email: inputEmail.current.value,
      password: inputPassword.current.value,

    })
  }

  async function verifyUser(){
    const usersFromApi = await api.get('/usuarios');

    const users = (usersFromApi.data);
    
    const infoUser = users.find(user => user.name === Username);

    if(infoUser){
      const { name , password } = infoUser
      if(name == Username && password == Userpassword){
        window.location.href = "../../../index.html";
      }else{
        alert("Credenciais Invalidas!");
      }
    }else{
      alert("Usuário Não Existe");
    }
  }

  return(

    <div className="container" id="container">
      <div className="form-container sing-up">
        <form>
          <h1>Criar Conta</h1>
            <span>Utilize seus dados para se registrar</span>
            <input type="text" name="nome" placeholder="Nome" ref={inputName}/>
            <input type="email" name="email" placeholder="Email" ref={inputEmail}/>
            <input type="password" name="senha" placeholder="Senha" ref={inputPassword}/>
            <button type='button' onClick={validation}>Cadastrar</button>
        </form>
      </div>
    <div className="form-container sing-in">
      <form>
        <h1>Login</h1>
        <span>Utilize seu email e sua senha para entrar</span>
        <input type="text" name="email" placeholder="Nome de Usuário" onChange={(e) => setUsername(e.target.value)}/>
        <input type="password" name="senha" placeholder="Senha" onChange={(e) => setPassword(e.target.value)}/>
        <a href="#">Esquecei Minha Senha.</a>
        <button type='button' onClick={verifyUser}>Entrar</button>
      </form>
    </div>
    <div className="toggle-container">
      <div className="toggle">
        <div className="toggle-panel toggle-left">
          <h1>Bem-Vindo de volta!</h1>
          <p>Utilize suas informações para usar todo nosso site</p>
          <button className="hidden" id="login" onClick={cliqueLog}>Login</button>
          
        </div>
        <div className="toggle-panel toggle-right">
          <h1>Seja Bem-Vindo!</h1>
          <p>Cadastre suas informações para usar todo nosso site</p>
          <button className="hidden" id="register" onClick={cliqueCad}>Cadastrar</button>
        
        </div>
      </div>
    </div>
  </div>
  )
}

export default Register