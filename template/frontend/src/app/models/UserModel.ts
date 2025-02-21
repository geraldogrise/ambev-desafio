import { NameModel } from "./NameModel";  
import { AddressModel } from "./AddressModel"; 
import { BaseModel } from "./core/BaseModel";
import { UserStatus } from "./enums/UserStatus";
import { UserRole } from "./enums/UserRole";

export default class UserModel extends BaseModel {
  id: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  status: UserStatus;
  role: UserRole;
  name: NameModel;
  address: AddressModel;

  constructor(
    id: string = "",
    username: string = "",
    password: string = "",
    email: string = "",
    phone: string = "",
    status: UserStatus = UserStatus.Unknown,
    role: UserRole = UserRole.None,
    name: NameModel = new NameModel(),
    address: AddressModel = new AddressModel()
  ) {
    super();
    this.id = id;
    this.username = username;
    this.password = password || '';
    this.email = email;
    this.phone = phone;
    this.status = status;
    this.role = role;
    this.name = name;
    this.address = address;
  }
}




