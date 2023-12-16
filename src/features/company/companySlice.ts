import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Company } from '@/types/company';

interface CompanyState {
  companyList: Company[];

}

const initialState: CompanyState = {
  companyList: [],
 
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
   
    setCompanyList: (state, action: PayloadAction<Company[]>) => {
      state.companyList = action?.payload;
    },
  }
});

export const {
  setCompanyList,
} = companySlice.actions;
export default companySlice.reducer;
