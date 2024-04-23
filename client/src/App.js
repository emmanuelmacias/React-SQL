
import './App.css';
import {useState} from 'react';
import Axios from 'axios';


function App() {

  const [nombre,setNombre] = useState('');
  const [apellido,setApellido] = useState('');
  const [email,setEmail] = useState('');
  const [id,setId] = useState();

  const [editar,setEditar] = useState(false);

  const [usersLista,setUsers] = useState([]);

  const getUser = () => {
    Axios.get('http://localhost:3001/users').then((response)=>{
      setUsers(response.data);
    })
  };


  const addUser = () => {
    Axios.post('http://localhost:3001/create', {
      nombre: nombre,
      apellido: apellido,
      email: email
    }).then(()=>{
      getUser(); // Obtiene lista constantemente 
      alert('Registrado');
    })
  };

  const updateUser = () => {
    Axios.put('http://localhost:3001/update', {
      id: id,
      nombre: nombre,
      apellido: apellido,
      email: email
    }).then(()=>{
      getUser(); // Obtiene lista constantemente 
      alert('Actualizado')
    })
  };

  const deleteUser = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then(()=>{
      getUser(); // Obtiene lista constantemente 
      limpiarCampos()
      alert('Eliminado')
    })
  };



  const editarUser = (val) => {
    setEditar(true)

    setNombre(val.nombre);
    setApellido(val.apellido);
    setEmail(val.email);
    setId(val.id)
  }

  
  const limpiarCampos = () => {
    setNombre('');
    setApellido('');
    setEmail('');
    setEditar(false);
  }


  return (
    <div className="App">
      <h1>HOLA MUNDO!</h1>
      <div className="datos">

        <label>Nombre: <input 
        onChange={(event)=>{
          setNombre(event.target.value);
        }}
        type="text" value={nombre}/></label><br />

        <label>Apellido: <input 
        onChange={(event)=>{
          setApellido(event.target.value);
        }}
        type="text" value={apellido}/></label><br />

        <label>Email: <input 
        onChange={(event)=>{
          setEmail(event.target.value);
        }}
        type="email" value={email}/></label><br />

        <div>
          {
            editar==true?
            <div>
            <button onClick={updateUser}>Actualizar</button>
            <button onClick={limpiarCampos}>Cancelar</button>
            </div>
            :<button onClick={addUser}>Registrar</button>
          }
        </div>
        
        <button onClick={getUser}>Mostrar Users</button>
      </div>

      <div className='lista'>

        <table>
          <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
              </tr>
          </thead>

          <tbody>
            {
            usersLista.map((val,key)=>{
              return <tr key={val.id}>
              <td>{val.nombre} </td>
              <td>{val.apellido} </td>
              <td>{val.email} </td>
              <td>
                <div>

                  <button 
                  onClick={()=>{
                    editarUser(val)
                  }}>Editar</button>

                  <button
                  onClick={()=>{
                    deleteUser(val.id)
                  }}>Eliminar</button>

                </div>
              </td>
              </tr>
            })
          }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
