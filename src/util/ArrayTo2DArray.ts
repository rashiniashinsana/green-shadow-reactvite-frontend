 import {Staff} from "../models/Staff.ts";
import {Vehicle} from "../models/Vehicle.ts";
import {Equipment} from "../models/Equipment.ts";

export const convertStaffArrayTo2DArray = (staffArray : Staff[]) => {
    return staffArray.map((staff) => [
        staff.staffId ?? "",
        staff.firstName ?? "",
        staff.lastName ?? "",
        staff.gender ?? "",
        staff.contactNo ?? "",
    ]);
}

export const convertVehicleArrayTo2DArray = (vehicleArray : Vehicle[]) => {
    return vehicleArray.map((vehicle) => [
        vehicle.vehicleCode ?? "",
        vehicle.licensePlateNumber ?? "",
        vehicle.remarks ?? "",
        vehicle.fuelType ?? "",
        vehicle.staffId === "" ? "Available" : "Assigned",
    ])
}

export const convertEquipmentArrayTo2DArray = (equipmentArray : Equipment[]) => {
    return equipmentArray.map((equipment) => [
        equipment.equipmentId ?? "",
        equipment.equipmentName ?? "",
        equipment.equipmentType ?? "",
        equipment.staffId === "" ? "Available" : "Assigned",
    ])
}