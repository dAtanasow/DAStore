export interface Furniture {
  img: string;
  name: string;
  price: number;
  dimensions: Dimensions;
  color: string;
  material: string;
  weight: number;
  _id: string;
  authorId: string;
  created_at: string;
  updatedAt: string;
  __v: number;
}

export interface Dimensions {
  width: number;
  length: number;
  depth: number;
  height: number;
}