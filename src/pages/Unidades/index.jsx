import React, { useState, useEffect, useContext } from "react";
import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import { Title, Menu, SearchInput, Modal, Loading } from "../../components";
import UnidadeForm from "./UnidadeForm";
import UnidadeLista from "./UnidadeLista";
import { useGetAllUnidadesQuery, hubApi } from "../../store/services/hubApi";
import { SocketContext } from "../../context";

const Unidades = () => {
  const { socket } = useContext(SocketContext);
  const [unidades, setUnidades] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [nome, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const { data: response } = useGetAllUnidadesQuery({
    params: { page, nome, limit: "8" },
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
      if (unidades.length !== 0 && searchMode === false) {
        setUnidades([]);
      }

      setSearch(nome);
      setPage(1);
      setSearchMode(true);
    }
  };

  useEffect(() => {
    if (response && response.length !== 0) {
      setUnidades((prevState) => {
        const array = prevState.filter((item) => {
          const index = response?.data?.unidades.findIndex(
            (doc) => doc.id === item.id
          );

          if (index === -1) {
            return true;
          }

          return false;
        });

        const toBeRendered = [...array, ...response.data.unidades];

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

  useEffect(() => {
    if (socket) {
      socket.on("Unidade", (data) => {
        if (data.action === "create") {
          setUnidades((prevState) => {
            if (!prevState) {
              return [data.unidade];
            }

            return [data.unidade, ...prevState];
          });

          dispatch(hubApi.util.resetApiState());
        }

        if (data.action === "update") {
          setUnidades((prevState) => {
            const array = [...prevState];
            const index = array.findIndex(
              (item) => item.id === data.unidade.id
            );

            if (index !== -1) {
              array[index] = data.unidade;
            }

            return array;
          });

          dispatch(hubApi.util.resetApiState());
        }

        if (data.action === "delete") {
          setUnidades((prevState) => {
            const array = [...prevState];
            const index = array.findIndex(
              (item) => item.id === data.unidade.id
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

  return (
    <main>
      <Title name={"Unidades"} spacingStyle={"pt-12 pb-8"} />

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
          <UnidadeForm closeCreateModalHandler={closeCreateModalHandler} />
        </Modal>
      </Menu>

      <InfiniteScroll
        dataLength={unidades.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<Loading />}
        endMessage={
          <p style={{ textAlign: "center", marginTop: "16px" }}>
            Você chegou no final
          </p>
        }
      >
        <UnidadeLista lista={unidades} />
      </InfiniteScroll>
    </main>
  );
};

export default Unidades;
