export class Staff {
    id: number;
    firstName: string;
    lastName: string;
    designation: string;
    gender: string;
    joinDate: string;
    DOB: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    addressLine4: string;
    addressLine5: string;
    contactNo: string;
    email: string;
    role: string;

    constructor(id: number, firstName: string, lastName: string, designation: string, gender: string, joinDate: string, DOB: string, addressLine1: string, addressLine2: string,addressLine3:string,addressLine4:string,addressLine5:string,contactNo: string, email: string, role: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.designation = designation;
    this.gender = gender;
    this.joinDate = joinDate;
    this.DOB = DOB;
    this.addressLine1 = addressLine1;
    this.addressLine2 = addressLine2;
    this.addressLine3 = addressLine3;
    this.addressLine4 = addressLine4;
    this.addressLine5 = addressLine5;
    this.contactNo = contactNo;
    this.email = email;
    this.role = role;

    }
}