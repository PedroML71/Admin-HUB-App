import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import { TextInput, MaskedTextInput } from "../../../../components";
import {
  useCreateUnidadeMutation,
  useUpdateUnidadeMutation,
} from "../../../../store/services/hubApi";

const schema = Yup.object().shape({
  nome: Yup.string()
    .matches(/^\w+( \w+)*$/i)
    .required("Campo obrigatório"),
  celular: Yup.string()
    .matches(/^[0-9()-]*$/i)
    .required("Campo obrigatório"),
  email: Yup.string()
    .email("Formato do email errado")
    .required("Campo obrigatório"),
  estado: Yup.string()
    .matches(/^[a-zA-Z]+$/i)
    .required("Campo obrigatório"),
  cidade: Yup.string()
    .matches(/^\w+( \w+)*$/i)
    .required("Campo obrigatório"),
  bairro: Yup.string()
    .matches(/^\w+( \w+)*$/i)
    .required("Campo obrigatório"),
  numero: Yup.string()
    .matches(/^\w+( \w+)*$/i)
    .required("Campo obrigatório"),
  cep: Yup.string()
    .matches(/^[0-9-]+$/i)
    .required("Campo obrigatório"),
});

const StepOne = ({
  closeCreateModalHandler,
  closeEditModalHandler,
  editMode,
  errorHandler,
  stepOneData,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      nome: stepOneData?.nome ? stepOneData?.nome : "",
      celular: stepOneData?.celular ? stepOneData?.celular : "",
      email: stepOneData?.email ? stepOneData?.email : "",
      estado: stepOneData?.estado ? stepOneData?.estado : "",
      cidade: stepOneData?.cidade ? stepOneData?.cidade : "",
      bairro: stepOneData?.bairro ? stepOneData?.bairro : "",
      numero: stepOneData?.numero ? stepOneData?.numero : "",
      cep: stepOneData?.cep ? stepOneData?.cep : "",
    },
    resolver: yupResolver(schema),
  });
  const [createUnidade] = useCreateUnidadeMutation();
  const [updateUnidade] = useUpdateUnidadeMutation();

  const createUnidadeHandler = (data) => {
    const body = { ...data };

    createUnidade({ body })
      .unwrap()
      .then(() => closeCreateModalHandler())
      .catch((error) => errorHandler(error.data.message, body));
  };

  const editUnidadeHandler = (data) => {
    const body = { ...data };

    updateUnidade({ unidadeId: stepOneData.id, body })
      .unwrap()
      .then(() => closeEditModalHandler())
      .catch((error) => errorHandler(error.data.message, body));
  };

  return (
    <form
      className="grid normal:grid-cols-2 small:grid-cols-2 phone:grid-cols-1 gap-4"
      onSubmit={
        editMode
          ? handleSubmit(editUnidadeHandler)
          : handleSubmit(createUnidadeHandler)
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

      <div className="flex flex-col gap-2">
        <TextInput
          name="estado"
          control={control}
          label="Estado"
          type="text"
          error={errors?.estado}
        />

        {errors?.estado ? (
          <p className="text-red-600 text-sm font-light">
            {errors?.estado?.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <TextInput
          name="cidade"
          control={control}
          label="Cidade"
          type="text"
          error={errors?.cidade}
        />

        {errors?.cidade ? (
          <p className="text-red-600 text-sm font-light">
            {errors?.cidade?.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <TextInput
          name="bairro"
          control={control}
          label="Bairro"
          type="text"
          error={errors?.bairro}
        />

        {errors?.bairro ? (
          <p className="text-red-600 text-sm font-light">
            {errors?.bairro?.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <TextInput
          name="numero"
          control={control}
          label="Numero"
          type="text"
          error={errors?.numero}
        />

        {errors?.numero ? (
          <p className="text-red-600 text-sm font-light">
            {errors?.numero?.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <MaskedTextInput
          name="cep"
          control={control}
          type="text"
          label="Cep"
          mask="99999-999"
          error={errors?.cep}
        />

        {errors?.cep ? (
          <p className="text-red-600 text-sm font-light">
            {errors?.cep?.message}
          </p>
        ) : null}
      </div>

      <button
        className="col-span-full justify-self-center bg-light-blue rounded-sm p-4 text-light-grey"
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
