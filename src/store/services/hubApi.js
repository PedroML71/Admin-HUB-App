import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../../firebase/services/firebaseAuth";

export const hubApi = createApi({
  reducerPath: "hubApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.DEV
      ? import.meta.env.VITE_REACT_APP_DEV_API_URL
      : import.meta.env.VITE_REACT_APP_PROD_API_URL,
    mode: "cors",
    prepareHeaders: async (headers) => {
      const token = await getToken();

      headers.set("authorization", `Bearer ${token}`);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    signupAdmin: builder.mutation({
      query: ({ body }) => ({
        url: "/usuarios/signup/admin",
        method: "POST",
        body,
      }),
    }),
    signupFuncionario: builder.mutation({
      query: ({ body }) => ({
        url: "/usuarios/signup/funcionario",
        method: "POST",
        body,
      }),
    }),
    signupMedico: builder.mutation({
      query: ({ body }) => ({
        url: "/usuarios/signup/medico",
        method: "POST",
        body,
      }),
    }),
    getAllUsuarios: builder.query({
      query: ({ params, unidadeId }) => {
        if (!unidadeId) {
          return {
            url: "/usuarios",
            params,
          };
        } else {
          return {
            url: `/unidades/${unidadeId}/usuarios`,
            params,
          };
        }
      },
    }),
    getOneUsuario: builder.query({
      query: ({ usuarioId }) => ({
        url: `/usuarios/${usuarioId}`,
      }),
    }),
    updateUsuario: builder.mutation({
      query: ({ usuarioId, body }) => ({
        url: `/usuarios/${usuarioId}`,
        method: "PATCH",
        body,
      }),
    }),
    deleteUsuario: builder.mutation({
      query: ({ usuarioId }) => ({
        url: `/usuarios/${usuarioId}`,
        method: "DELETE",
      }),
    }),
    getUsuarioSignupHistory: builder.query({
      query: ({ params, unidadeId }) => {
        if (!unidadeId) {
          return {
            url: "/usuarios/signup-history",
            params,
          };
        } else {
          return {
            url: `/unidades/${unidadeId}/usuarios/signup-history`,
            params,
          };
        }
      },
    }),
    getAllUnidades: builder.query({
      query: ({ params }) => ({
        url: "/unidades",
        params,
      }),
    }),
    createUnidade: builder.mutation({
      query: ({ body }) => ({
        url: "/unidades",
        method: "POST",
        body,
      }),
    }),
    updateUnidade: builder.mutation({
      query: ({ unidadeId, body }) => ({
        url: `/unidades/${unidadeId}`,
        method: "PATCH",
        body,
      }),
    }),
    deleteUnidade: builder.mutation({
      query: ({ unidadeId }) => ({
        url: `/unidades/${unidadeId}`,
        method: "DELETE",
      }),
    }),
    getUnidadeSignupHistory: builder.query({
      query: () => ({
        url: "/unidades/signup-history",
      }),
    }),
    getAllPacientes: builder.query({
      query: ({ usuarioId, params }) => ({
        url: `/usuarios/${usuarioId}/pacientes`,
        params,
      }),
    }),
    getOnePaciente: builder.query({
      query: ({ pacienteId }) => ({
        url: `/pacientes/${pacienteId}`,
      }),
    }),
    createPaciente: builder.mutation({
      query: ({ body }) => ({
        url: "/pacientes",
        method: "POST",
        body,
      }),
    }),
    updatePaciente: builder.mutation({
      query: ({ pacienteId, body }) => ({
        url: `/pacientes/${pacienteId}`,
        method: "PATCH",
        body,
      }),
    }),
    deletePaciente: builder.mutation({
      query: ({ pacienteId }) => ({
        url: `/pacientes/${pacienteId}`,
        method: "DELETE",
      }),
    }),
    getPacienteSignupHistory: builder.query({
      query: ({ usuarioId }) => ({
        url: `/usuarios/${usuarioId}/pacientes/signup-history`,
      }),
    }),
  }),
});

export const {
  useSignupAdminMutation,
  useSignupFuncionarioMutation,
  useSignupMedicoMutation,
  useGetAllUsuariosQuery,
  useGetOneUsuarioQuery,
  useUpdateUsuarioMutation,
  useDeleteUsuarioMutation,
  useGetUsuarioSignupHistoryQuery,
  useGetAllUnidadesQuery,
  useCreateUnidadeMutation,
  useUpdateUnidadeMutation,
  useDeleteUnidadeMutation,
  useGetUnidadeSignupHistoryQuery,
  useGetAllPacientesQuery,
  useGetOnePacienteQuery,
  useCreatePacienteMutation,
  useUpdatePacienteMutation,
  useDeletePacienteMutation,
  useGetPacienteSignupHistoryQuery,
} = hubApi;
