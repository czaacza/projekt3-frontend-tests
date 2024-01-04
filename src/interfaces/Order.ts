import { Types } from 'mongoose';

interface Order {
  user_id: string;
  books: {
    id: string;
    order_id?: string;
    quantity: number;
  }[];
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  comments?: string;
  status: string;
}

export type { Order };
