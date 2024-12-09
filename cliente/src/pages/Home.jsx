import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autoTable";

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
  };

  const exportarPDF = () => {
    const doc = new jsPDF ();

    const tabela = usuarios.map ( usuario => [
      usuario.nome,
      usuario.email
    ]);

    doc.text("Litsa de Usuários",10, 10);

    doc.autoTable({
      head:[["Nome", "E-mail"]],
      body: tabela
    });

    doc.save("alunosIFMS");
  }
  return (
    <div>
    <table>
    <thead>
    <button variant="contained" onClick={() => exportarPDF()}>
    Gerar PDF
    </button>
      <tr>
        <th>Nome</th>
        <th>E-mail</th>
        <th>Ações</th>
      </tr>
      <tbody>
      {usuarios.map((usuario) =>
        <tr key={usuario.id}>
          <td>{usuario.nome}</td>
          <td>{usuario.email}</td>
          <td><button onClick={()=> deletar(usuario.id)}>REMOVER</button></td>
        </tr>
      )}
    </table>
    </tbody>
  );
}