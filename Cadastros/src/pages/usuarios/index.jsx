import './style.css'
import Trash from '../../assets/lixeira.png'
import api from "../../services/api.js"
import { useEffect, useState } from 'react'

function Home() {
  const [users, setUsers] = useState([])

  async function getUsers(){
    const usersFromApi = await api.get('/usuarios')

    setUsers(usersFromApi.data)
  }

  async function deleteUsers(id){
    await api.delete(`/usuarios/${id}`)

    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='container'>
    {users.map((user) => (
      <div key={user.id} className='card'>
        <div>
          <p>Nome: <span>{user.name}</span></p>
          <p>Email: <span>{user.email}</span></p>
          <p>Senha: <span>{user.password}</span></p>
        </div>
        <button onClick={() => deleteUsers(user.id)}>
          <img src={Trash} alt="lixeira" />
        </button>
      </div>
    ))}
    </div>
    
     
  )
}

export default Home
