export interface Category {
  _id: string;
  name: string;
  imageUrl: string;
  totalAmount: number;
}

export interface Item {
  _id: string;
  categoryId: string;
  name: string;
  imageUrl: string;
  price: number;
  date: string;
  purchaseUrl: string;
  status: string;
}
