export interface Furniture {
  img: string;
  name: string;
  price: number;
  dimensions: Dimensions;
  color: string;
  material: string;
  weight: number;
  _id: string;
  userId: string;
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

export interface CreateAd {
  img: string;
  name: string;
  price: number;
  dimensions: Dimensions;
  color: string;
  material: string;
  weight: number;
}
