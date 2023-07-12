export interface IProductType {
  id: number;
  name: string;
}

export interface ICategory {
  id: number;
  name: string;
}

export interface ITrl {
  id: number;
  name: string;
}

export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  sex: number;
  profilePicture: string;
  position: string;
}

export interface ICountry {
  name: string;
}

export interface ICity {
  name: string;
}

export interface IAddress {
  country: ICountry;
  city: ICity;
  street: string;
  house: string;
  zipCode: string;
  longitude: string;
  latitude: string;
}

export interface ICompany {
  name: string;
  logo: string;
  address: IAddress;
}

export interface IBusinessModel {
  id: number;
  name: string;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  picture: string;
  type: IProductType;
  categories: ICategory[];
  implementationEffortText?: any;
  investmentEffort: string;
  trl: ITrl;
  video: string;
  user: IUser;
  company: ICompany;
  businessModels: IBusinessModel[];
}

export interface IConfig {
  id: number;
  logo: string;
  mainColor: string;
  hasUserSection: boolean;
}
