export interface Description {
  title: string;
  text: string[];
}

export interface BaseProductDetails {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: Description[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  cell: string[];
}

export interface PhoneDetails extends BaseProductDetails {
  camera: string;
  zoom: string;
}

export interface TabletDetails extends BaseProductDetails {
  camera: string;
  zoom: string;
}

export type AccessoryDetails = BaseProductDetails;

export type ProductDetails = PhoneDetails | TabletDetails | AccessoryDetails;
