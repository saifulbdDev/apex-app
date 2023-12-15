import { apiSlice } from '@/features/apiSlice';
import {
 
  setUsers,
} from './companySlice';
export const companyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
 
  
    getCompanys: builder.query({
    
      query: (data) => {
        let url = "get-all-companys";

        if (data?.category) {
          url += `/category/${data.category}`;
        }

        if (data?.sort) {
          url += `?sort=${data.sort}`;
        }

        return {
          url: url,
          method: "GET"
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          if (response?.data?.data?.length) {
            dispatch(setUsers(response?.data?.data));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
  
  }),
});

export const {
 
  useGetCompanysQuery,
 
} = companyApi;
