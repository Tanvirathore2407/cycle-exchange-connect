
export interface PostItem {
  id: string;
  name: string;
  category: string;
  description: string;
  contact: string;
  image: string;
  createdAt: string;
}

export interface Item {
  id: string | number;
  name: string;
  owner: string;
  image: string;
  description?: string;
  postedDate?: string;
  borrowDate?: string;
  returnDate?: string;
  category?: string;
}
