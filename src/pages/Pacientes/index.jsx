import React, { useState, useEffect, useContext } from "react";
import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import { Title, Menu, SearchInput, Modal, Loading } from "../../components";
import PacienteForm from "./PacienteForm";
import PacienteLista from "./PacienteLista";
import { useGetAllPacientesQuery, hubApi } from "../../store/services/hubApi";
import { AuthContext, SocketContext } from "../../context";

const Pacientes = () => {
  const auth = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const [modal, setModal] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [nome, setSearch] = useState("");
  const { data: response } = useGetAllPacientesQuery({
    params: { page, nome, limit: "8" },
    usuarioId: auth?.user?.id,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (socket) {
      socket.on("Paciente", (data) => {
        if (
          data.action === "create" &&
          data.paciente.usuarioId === auth?.user?.id
        ) {
          setPacientes((prevState) => {
            if (!prevState) {
              return [data.paciente];
            }

            return [data.paciente, ...prevState];
          });

          dispatch(hubApi.util.resetApiState());
        }

        if (
          data.action === "update" &&
          data.paciente.usuarioId === auth?.user?.id
        ) {
          setPacientes((prevState) => {
            const array = [...prevState];
            const index = array.findIndex(
              (item) => item.id === data.paciente.id
            );

            if (index !== -1) {
              array[index] = data.paciente;
            }

            return array;
          });

          dispatch(hubApi.util.resetApiState());
        }

        if (
          data.action === "delete" &&
          data.paciente.usuarioId === auth?.user?.id
        ) {
          setPacientes((prevState) => {
            const array = [...prevState];
            const index = array.findIndex(
              (item) => item.id === data.paciente.id
            );

            if (index !== -1) {
              array.splice(index, 1);
            }

            return array;
          });

          dispatch(hubApi.util.resetApiState());
        }
      });
    }
  }, [socket]);

  const closeCreateModalHandler = () => {
    setModal(false);
  };

  const fetchData = () => {
    setPage((prevState) => prevState + 1);
  };

  const searchHandler = (nome) => {
    if (!nome) {
      setSearch("");
      setPage(1);
      setSearchMode(false);
    } else {
      if (pacientes.length !== 0 && searchMode === false) {
        setPacientes([]);
      }

      setSearch(nome);
      setPage(1);
      setSearchMode(true);
    }
  };

  useEffect(() => {
    if (response && response.length !== 0) {
      setPacientes((prevState) => {
        const array = prevState.filter((item) => {
          const index = response?.data?.pacientes.findIndex(
            (doc) => doc.id === item.id
          );

          if (index === -1) {
            return true;
          }

          return false;
        });

        const toBeRendered = [...array, ...response.data.pacientes];

        return toBeRendered;
      });

      if (response.results === 8) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    } else {
      setHasMore(true);
    }
  }, [response]);

  return (
    <section>
      <Title name={"Pacientes"} spacingStyle={"pt-12 pb-8"} />

      <Menu>
        <Link to={"/"}>
          <div className="flex justify-center items-center w-10 h-10 bg-light-yellow rounded-full bg-opacity-0 cursor-pointer transition-all duration-200 ease-out hover:bg-opacity-100">
            <ArrowLeftIcon className="w-6 text-dark-blue" />
          </div>
        </Link>

        <SearchInput queryHandler={searchHandler} />

        <div
          className="flex justify-center items-center w-10 h-10 bg-light-yellow rounded-full bg-opacity-0 cursor-pointer transition-all duration-200 ease-out hover:bg-opacity-100"
          onClick={() => setModal(true)}
        >
          <PlusIcon className="w-6 text-dark-blue" />
        </div>

        <Modal visible={modal} onClose={closeCreateModalHandler}>
          <PacienteForm closeCreateModalHandler={closeCreateModalHandler} />
        </Modal>
      </Menu>

      <InfiniteScroll
        dataLength={pacientes.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<Loading />}
        endMessage={
          <p style={{ textAlign: "center", marginTop: "16px" }}>
            Você chegou no final
          </p>
        }
      >
        <PacienteLista lista={pacientes} />
      </InfiniteScroll>
    </section>
  );
};

export default Pacientes;
