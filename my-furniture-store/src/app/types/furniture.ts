export interface Furniture {
  img: string;
  name: string;
  price: number;
  category: CategoryType;
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

enum CategoryType {
  Chairs = 'chair',
  Tables = 'table',
  Beds = 'bed',
  Wardrobes = 'wardrobe',
  BedsideTables = 'bedside table',
  Dressers = 'dresser',
  TVStands = 'tv stand',
  DisplayCabinets = 'display cabinet',
  CornerSofa = 'corner sofa',
  Sofas = 'sofa',
  CoffeeTables = 'coffee table',
  Hockers = 'hocker',
  Poufs = 'pouf',
  Hangers = 'hanger',
}
