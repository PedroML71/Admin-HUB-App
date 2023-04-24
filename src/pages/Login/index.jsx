import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextInput } from "../../components";
import { loginUser } from "../../firebase/services/firebaseAuth";

const schema = Yup.object().shape({
  email: Yup.string().email("Formato Errado!").required("Campo Obrigatorio"),
  password: Yup.string()
    .min(6, "Campo deve ter no mínimo 6 letras")
    .required("Campo Obrigatorio"),
});

const Login = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(schema),
  });

  const loginHandler = (data) => {
    loginUser(data.email, data.password);
  };

  return (
    <section className="relative h-screen">
      <div className="absolute left-2/4 top-2/4 transform -translate-x-2/4 -translate-y-2/4">
        <form
          className="flex flex-col gap-8"
          onSubmit={handleSubmit(loginHandler)}
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

            <div className="flex flex-col gap-2">
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
              className="w-64 bg-light-blue rounded-sm py-4 text-light-grey"
              type="submit"
            >
              ENTRAR
            </button>

            <Link to={"/reset"} className="font-light text-dark-blue text-sm">
              Esqueceu a senha ?
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
