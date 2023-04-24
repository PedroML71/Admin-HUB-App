import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import { TextInput, MaskedTextInput } from "../../../../components";
import { useUpdateUsuarioMutation } from "../../../../store/services/hubApi";

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
});

const StepOne = ({ closeEditModalHandler, errorHandler, stepOneData }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      nome: stepOneData?.nome ? stepOneData?.nome : "",
      sobrenome: stepOneData?.sobrenome ? stepOneData?.sobrenome : "",
      celular: stepOneData?.celular ? stepOneData?.celular : "",
      email: stepOneData?.email ? stepOneData?.email : "",
    },
    resolver: yupResolver(schema),
  });
  const [updateUsuario] = useUpdateUsuarioMutation();

  const formHandler = (data) => {
    const body = { ...data };

    updateUsuario({ body })
      .unwrap()
      .then(() => closeEditModalHandler())
      .catch((error) => errorHandler(error.data.message, body));
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(formHandler)}>
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

      <button
        className="self-center bg-light-blue rounded-sm p-4 text-light-grey"
        type="submit"
      >
        EDITAR
      </button>
    </form>
  );
};

StepOne.propTypes = {
  closeEditModalHandler: PropTypes.func.isRequired,
  errorHandler: PropTypes.func.isRequired,
  stepOneData: PropTypes.object,
};

export default StepOne;
