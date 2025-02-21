import { NameModel } from "./NameModel";  
import { AddressModel } from "./AddressModel"; 
import { BaseModel } from "./core/BaseModel";

export default class UserModel extends BaseModel {
  username: string;
  password: string;
  email: string;
  phone: string;
  name: NameModel;
  address: AddressModel;

  constructor(
    username: string = "",
    password: string = "",
    email: string = "",
    phone: string = "",
    name: NameModel = new NameModel(),
    address: AddressModel = new AddressModel()
  ) {
    super();
    this.username = username;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.name = name;
    this.address = address;
  }
}




