import React, { useState, useEffect, useContext } from "react";
import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import { Title, Menu, SearchInput, Modal, Loading } from "../../components";
import AdminForm from "./AdminForm";
import AdminLista from "./AdminLista";
import { useGetAllUsuariosQuery, hubApi } from "../../store/services/hubApi";
import { SocketContext } from "../../context";

const Admins = () => {
  const { socket } = useContext(SocketContext);
  const [usuarios, setUsuarios] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [nome, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const { data: response } = useGetAllUsuariosQuery({
    params: { page, nome, limit: "8", role: "Admin" },
  });
  const dispatch = useDispatch();

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
      if (usuarios.length !== 0 && searchMode === false) {
        setUsuarios([]);
      }

      setSearch(nome);
      setPage(1);
      setSearchMode(true);
    }
  };

  useEffect(() => {
    if (response && response.results !== 0) {
      setUsuarios((prevState) => {
        const array = prevState.filter((item) => {
          const index = response?.data?.usuarios.findIndex(
            (doc) => doc.id === item.id
          );

          if (index === -1) {
            return true;
          }

          return false;
        });

        const toBeRendered = [...array, ...response.data.usuarios];

        return toBeRendered;
      });

      if (response.results === 8) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    } else {
      setHasMore(false);
    }
  }, [response]);

  useEffect(() => {
    if (socket) {
      socket.on("Admin", (data) => {
        if (data.action === "create") {
          setUsuarios((prevState) => {
            if (!prevState) {
              return [data.user];
            }

            return [data.user, ...prevState];
          });

          dispatch(hubApi.util.resetApiState());
        }
      });
    }
  }, [socket]);

  return (
    <section>
      <Title name={"Admins"} spacingStyle={"pt-12 pb-8"} />

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
          <AdminForm closeCreateModalHandler={closeCreateModalHandler} />
        </Modal>
      </Menu>

      <InfiniteScroll
        dataLength={usuarios.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<Loading />}
        endMessage={
          <p style={{ textAlign: "center", marginTop: "16px" }}>
            Você chegou no final
          </p>
        }
      >
        <AdminLista lista={usuarios} />
      </InfiniteScroll>
    </section>
  );
};

export default Admins;
