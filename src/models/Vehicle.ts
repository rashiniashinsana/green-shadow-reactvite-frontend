export class Vehicle {
    vehicleCode: string;
    licensePlateNumber:string;
    vehicleCategory:string;
    fuelType:string;
    status:string;
    remarks:string;
    staffId:string;

    constructor(vehicleCode: string,licensePlateNumber:string,vehicleCategory:string,fuelType:string,status:string,remarks:string,staffId:string) {
        this.vehicleCode = vehicleCode;
        this.licensePlateNumber = licensePlateNumber;
        this.vehicleCategory = vehicleCategory;
        this.fuelType = fuelType;
        this.status = status;
        this.remarks = remarks;
        this.staffId = staffId;

    }
}