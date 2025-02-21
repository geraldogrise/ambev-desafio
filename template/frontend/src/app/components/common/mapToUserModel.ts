import { AddressModel } from "../../models/AddressModel";
import { UserRole } from "../../models/enums/UserRole";
import { UserStatus } from "../../models/enums/UserStatus";
import { NameModel } from "../../models/NameModel";
import UserModel from "../../models/UserModel";

export function mapToUserModel(data: any): UserModel {
  return new UserModel(
    data.id,
    data.username,
    "",
    data.email,
    data.phone,
    UserStatus[data.status as keyof typeof UserStatus] ?? UserStatus.Unknown,
    UserRole[data.role as keyof typeof UserRole] ?? UserRole.None,
    new NameModel(data.name.firstname, data.name.lastname),
    new AddressModel(
      data.address.city,
      data.address.street,
      data.address.number,
      data.address.zipcode,
      { lat: data.address.geolocation.lat, long: data.address.geolocation.long }
    )
  );
}
