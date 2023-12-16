export interface Company {
    id: number;
    company_name: string;
    company_phone: string;
    company_size_id: number;
    address1: string;
    address2: string;
    city: string;
    country_id: number;
    state_id: number;
    time_zone_id: number;
    zip: string;
    industry_id: number;
    lead_source_id: number;
    lead_description: string;
    company_logo_link: string;
    company_status: string;
    created_at: string;
    updated_at: string;
  }
  export type PaginationState = {
    pageIndex: number
    pageSize: number
  }