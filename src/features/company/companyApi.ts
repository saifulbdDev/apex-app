import { apiSlice } from '@/features/apiSlice';
import {
 
  setUsers,
} from './companySlice';
export const companyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
 
  
    getCompanys: builder.query({
    
      query: (data) => {
        let url = "get-all-companys";

        if (data?.currentPage) {
          url += `?page=${data.currentPage}`;
        }

        if (data?.company_name) {
          url += `&company_status=1&company_name=${data.company_name}`;
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
