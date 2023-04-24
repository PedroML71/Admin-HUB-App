import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextInput } from "../../components";
import { sendResetPasswordEmail } from "../../firebase/services/firebaseAuth";

const schema = Yup.object().shape({
  email: Yup.string().email("Formato Errado!").required("Campo Obrigatorio"),
});

const Reset = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: { email: "" },
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const sendResetPasswordHandler = async (data) => {
    await sendResetPasswordEmail(data.email);

    navigate("/login");
  };

  return (
    <section className="relative h-screen">
      <div className="absolute left-2/4 top-2/4 transform -translate-x-2/4 -translate-y-2/4">
        <form
          className="flex flex-col gap-8"
          onSubmit={handleSubmit(sendResetPasswordHandler)}
        >
          <div className="flex flex-col gap-4">
            <img className="h-44" alt="Logo da Admin-Hub" src="/logo.svg" />
            <h1 className="text-5xl font-bold text-dark-blue">Admin-Hub </h1>
          </div>

          <div className="flex flex-col gap-4 self-center">
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
              className="w-64 bg-light-blue rounded-sm py-4 text-light-grey"
              type="submit"
            >
              RESETAR
            </button>

            <Link to={"/login"} className="font-light text-dark-blue text-sm">
              Voltar para tela de login
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Reset;
