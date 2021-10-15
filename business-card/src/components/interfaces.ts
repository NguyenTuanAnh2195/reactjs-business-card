export interface User {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    age: number,
    job_title: string,
    employer: string,
    city: string,
    birth_day: any,
    phone_number: string,
    profile_picture: File | null,
    is_staff: boolean,
}
