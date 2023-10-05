// this model for view list

export interface DaumList {
    data: Daum[]
    current_page: number
    per_page: number
    total: number
}

export interface Daum {
    id: number
    sponsor_code: string
    sponsor_name: string
    sponsor_type: string
    sponsor_ID: string
    address: string
    postal_code: string
    phone: string
    email: string
    max_limit: string
    financial_limit: string
    time_limit: number
    active: number
    created_by: number
    updated_by: any
    created_at: string
    updated_at: string
    created_by_name: string
    updated_by_name: any
    contact_officers: ContactOfficer[]
}

export interface ContactOfficer {
    id: number
    sponsor_id: number
    contact_officer_name: string
    phone: string
    email: string
    created_at: string
    updated_at: string
}

// this is model for creation

export interface Sponsor {
    sponsor_name: string
    sponsor_type: string
    sponsor_ID: string
    phone: string
    address: string
    email: string
    postal_code: string
    max_limit: string
    financial_limit: string
    time_limit: string
    sponsor_contact_officer: SponsorContactOfficer[]
}

export interface SponsorContactOfficer {
    contact_officer_name: string
    email: string
    phone: string
}

