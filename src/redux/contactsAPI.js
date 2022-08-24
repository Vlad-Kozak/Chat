import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactsAPI = createApi({
  reducerPath: "contactsAPI",
  tagTypes: ["contacts"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://63048b37761a3bce77e9fa9f.mockapi.io/chat/v1",
  }),
  endpoints: (build) => ({
    getContacts: build.query({
      query: () => "contacts",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "contacts", id })),
              { type: "contacts", id: "LIST" },
            ]
          : [{ type: "contacts", id: "LIST" }],
    }),
    editContact: build.mutation({
      query: (body) => ({
        url: `contacts/${body.id}`,
        method: "PUT",
        body: body.contact,
      }),
      invalidatesTags: [{ type: "contacts", id: "LIST" }],
    }),
  }),
});

export const { useGetContactsQuery, useEditContactMutation } = contactsAPI;
