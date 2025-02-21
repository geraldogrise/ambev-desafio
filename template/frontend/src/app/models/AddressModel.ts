import { GeolocationModel } from "./GeolocationModel";

export class AddressModel {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: GeolocationModel;
  
    constructor(
      city: string = "",
      street: string = "",
      number: number = 0,
      zipcode: string = "",
      geolocation: GeolocationModel = new GeolocationModel() 
    ) {
      this.city = city;
      this.street = street;
      this.number = number;
      this.zipcode = zipcode;
      this.geolocation = geolocation;
    }
  }