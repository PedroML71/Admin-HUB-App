import React, { useState, useContext } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Title, Modal } from "../../components";
import { AuthContext } from "../../context";
import AdminGraph from "./AdminGraph";
import FuncionarioGraph from "./FuncionarioGraph";
import MedicoGraph from "./MedicoGraph";
import UnidadeGraph from "./UnidadeGraph";
import PacienteGraph from "./PacienteGraph";
import UserForm from "./UserForm";

const Home = () => {
  const auth = useContext(AuthContext);
  const role = auth?.user?.role;
  const [editModal, setEditModal] = useState(false);

  const closeEditModalHandler = () => {
    setEditModal(false);
  };

  return (
    <main>
      <Title name={"Dashboard"} spacingStyle={"py-12"} />

      <ul className="max-w-7xl mx-auto my-0 px-4 grid normal:grid-cols-3 small:grid-cols-2 phone:grid-cols-1 gap-4">
        <li className="bg-white rounded-sm drop-shadow">
          <div className="flex items-center gap-4 p-4 border-b border-b-primary-grey">
            {auth?.user?.imageUrl ? (
              <img
                className="w-16 h-16 rounded-full"
                src={auth?.user?.imageUrl}
                alt="imagem do usuario"
              />
            ) : (
              <UserCircleIcon className="w-16 text-dark-blue" />
            )}
            <p className="text-2xl text-dark-blue">{`${auth?.user?.nome} ${auth?.user?.sobrenome}`}</p>
          </div>

          <div className="flex flex-col gap-2 p-4 text-base text-dark-blue">
            <div className="flex gap-2">
              <p className="font-bold">Nome:</p>
              <p className="font-light truncate">{auth?.user?.nome}</p>
            </div>

            <div className="flex gap-2">
              <p className="font-bold">Sobrenome:</p>
              <p className="font-light truncate">{auth?.user?.sobrenome}</p>
            </div>

            <div className="flex gap-2">
              <p className="font-bold">Celular:</p>
              <p className="font-light truncate">{auth?.user?.celular}</p>
            </div>

            <div className="flex gap-2">
              <p className="font-bold">Email:</p>
              <p className="font-light truncate">{auth?.user?.email}</p>
            </div>

            <button
              className="self-center bg-light-blue rounded-sm mt-2 px-4 py-2 text-light-grey"
              onClick={() => setEditModal(true)}
            >
              EDITAR
            </button>

            <Modal visible={editModal} onClose={closeEditModalHandler}>
              <UserForm closeEditModalHandler={closeEditModalHandler} />
            </Modal>
          </div>
        </li>

        {role === "Admin" ? <AdminGraph /> : null}

        {role === "Admin" || role === "Funcionario" ? (
          <FuncionarioGraph unidadeId={auth?.user?.unidadeId} role={role} />
        ) : null}

        {role === "Admin" || role === "Funcionario" ? (
          <MedicoGraph unidadeId={auth?.user?.unidadeId} role={role} />
        ) : null}

        {role === "Admin" ? <UnidadeGraph /> : null}

        {role === "Medico" ? (
          <PacienteGraph usuarioId={auth?.user?.id} />
        ) : null}
      </ul>
    </main>
  );
};

export default Home;
