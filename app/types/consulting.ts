export type Consultant = {
    id: number;
    name: string;
    email: string;
    calendly_link: string;
  };
  
  export type Service = {
    id: number;
    name: string;
    description: string;
    image?: string; // Optional
    is_available: boolean;
    consultants: Consultant[];
  };
  