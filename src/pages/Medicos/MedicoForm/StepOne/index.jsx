import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import {
  TextInput,
  MaskedTextInput,
  SelectInput,
} from "../../../../components";
import {
  useSignupMedicoMutation,
  useUpdateUsuarioMutation,
  useGetAllUnidadesQuery,
} from "../../../../store/services/hubApi";
import { AuthContext } from "../../../../context";

const schema = Yup.object().shape({
  nome: Yup.string()
    .matches(/^[a-zA-Z]+$/i)
    .required("Campo obrigatório"),
  sobrenome: Yup.string()
    .matches(/^[a-zA-Z]+$/i)
    .required("Campo obrigatório"),
  celular: Yup.string()
    .matches(/^[0-9()-]*$/i)
    .required("Campo obrigatório"),
  email: Yup.string()
    .email("Formato do email errado")
    .required("Campo obrigatório"),
  showPassword: Yup.boolean(),
  password: Yup.string().when("showPassword", {
    is: true,
    then: () =>
      Yup.string()
        .min(6, "Campo deve ter no mínimo 6 letras")
        .required("Campo obrigatório"),
  }),
});

const StepOne = ({
  closeCreateModalHandler,
  closeEditModalHandler,
  editMode,
  errorHandler,
  stepOneData,
}) => {
  const auth = useContext(AuthContext);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues:
      auth?.user?.role === "Admin"
        ? {
            nome: stepOneData?.nome ? stepOneData?.nome : "",
            sobrenome: stepOneData?.sobrenome ? stepOneData?.sobrenome : "",
            celular: stepOneData?.celular ? stepOneData?.celular : "",
            email: stepOneData?.email ? stepOneData?.email : "",
            unidadeId: stepOneData?.unidadeId ? stepOneData?.unidadeId : "",
            showPassword: editMode ? false : true,
            password: stepOneData?.password ? stepOneData?.password : "",
          }
        : {
            nome: stepOneData?.nome ? stepOneData?.nome : "",
            sobrenome: stepOneData?.sobrenome ? stepOneData?.sobrenome : "",
            celular: stepOneData?.celular ? stepOneData?.celular : "",
            email: stepOneData?.email ? stepOneData?.email : "",
            showPassword: editMode ? false : true,
            password: stepOneData?.password ? stepOneData?.password : "",
          },
    resolver: yupResolver(schema),
  });
  const [createMedico] = useSignupMedicoMutation();
  const [updateMedico] = useUpdateUsuarioMutation();
  const { data: response } = useGetAllUnidadesQuery(
    {
      params: { limit: "100" },
    },
    { skip: auth?.user.role === "Admin" ? false : true }
  );

  const createMedicoHandler = (data) => {
    const body = {
      nome: data.nome,
      sobrenome: data.sobrenome,
      celular: data.celular,
      email: data.email,
      unidadeId:
        auth?.user?.role === "Admin" ? data.unidadeId : auth?.user?.unidadeId,
      password: data.password,
    };

    createMedico({ body })
      .unwrap()
      .then(() => closeCreateModalHandler())
      .catch((error) => errorHandler(error.data.message, body));
  };

  const editMedicoHandler = (data) => {
    const body = {
      nome: data.nome,
      sobrenome: data.sobrenome,
      celular: data.celular,
      email: data.email,
      unidadeId:
        auth?.user?.role === "Admin" ? data.unidadeId : auth?.user?.unidadeId,
    };

    updateMedico({ usuarioId: stepOneData.id, body })
      .unwrap()
      .then(() => closeEditModalHandler())
      .catch((error) => errorHandler(error.data.message, body));
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={
        editMode
          ? handleSubmit(editMedicoHandler)
          : handleSubmit(createMedicoHandler)
      }
    >
      <div className="flex flex-col gap-2">
        <TextInput
          name="nome"
          control={control}
          label="Nome"
          type="text"
          error={errors?.nome}
        />

        {errors?.nome ? (
          <p className="text-red-600 text-sm font-light">
            {errors?.nome?.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <TextInput
          name="sobrenome"
          control={control}
          label="Sobrenome"
          type="text"
          error={errors?.sobrenome}
        />

        {errors?.sobrenome ? (
          <p className="text-red-600 text-sm font-light">
            {errors?.sobrenome?.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <MaskedTextInput
          name="celular"
          control={control}
          type="text"
          label="Celular"
          mask="(99)99999-9999"
          error={errors?.celular}
        />

        {errors?.celular ? (
          <p className="text-red-600 text-sm font-light">
            {errors?.celular?.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <TextInput
          name="email"
          control={control}
          label="Email"
          type="text"
          error={errors?.email}
        />

        {errors?.email ? (
          <p className="text-red-600 text-sm font-light">
            {errors?.email?.message}
          </p>
        ) : null}
      </div>

      {auth?.user?.role === "Admin" ? (
        <div className="flex flex-col gap-2">
          <SelectInput
            name="unidadeId"
            control={control}
            label="Unidade"
            error={errors?.unidadeId}
          >
            {control._defaultValues.unidadeId === "" ? (
              <option value="" />
            ) : null}
            {response?.data?.unidades?.map((unidade, index) => (
              <option key={index} value={unidade.id}>
                {unidade.nome}
              </option>
            ))}
          </SelectInput>

          {errors?.unidadeId ? (
            <p className="text-red-600 text-sm font-light">
              {errors?.unidadeId?.message}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className={`flex flex-col gap-2 ${editMode ? "hidden" : ""}`}>
        <TextInput
          name="password"
          control={control}
          label="Senha"
          type="password"
          error={errors?.password}
        />

        {errors?.password ? (
          <p className="text-red-600 text-sm font-light">
            {errors?.password?.message}
          </p>
        ) : null}
      </div>

      <button
        className="self-center bg-light-blue rounded-sm p-4 text-light-grey"
        type="submit"
      >
        {editMode ? "EDITAR" : "CADASTRAR"}
      </button>
    </form>
  );
};

StepOne.propTypes = {
  closeCreateModalHandler: PropTypes.func,
  closeEditModalHandler: PropTypes.func,
  editMode: PropTypes.bool,
  errorHandler: PropTypes.func.isRequired,
  stepOneData: PropTypes.object,
};

export default StepOne;
