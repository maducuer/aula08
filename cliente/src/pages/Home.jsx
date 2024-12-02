import { useEffect, useState } from "react";

export default function Home() {

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const resposta = await fetch("http://localhost:3003/usuarios");
        const dados = await resposta.json();
        setUsuarios(dados);
      } catch {
        alert('Ocorreu um erro no app!');
      }
    }
    buscarUsuario();
  }, [usuarios])

  const deletar = async(id) => {
    try {
      await fetch('http://localhost:3003/usuarios/'+id ,{
        method: 'DELETE'
      });
    } catch{
      alert('ixi lascou')
    }
  }

  return (
    <table>
      <tr>
        <td>Nome</td>
        <td>E-mail</td>
      </tr>
      {usuarios.map((usuario) =>
        <tr key={usuario.id}>
          <td>{usuario.nome}</td>
          <td>{usuario.email}</td>
          <td><button onClick={()=> deletar(usuario.id)}>REMOVER</button></td>
        </tr>
      )}
    </table>
  );
}