export class Equipment {
    equipmentId : string;
    equipmentName: string;
    equipmentType: string;
    status: string;
    fieldCode: string;
    staffId: string;

    constructor(equipmentId: string, equipmentName: string,equipmentType:string,status: string,fieldCode:string,staffId:string) {

    this.equipmentId = equipmentId;
    this.equipmentName = equipmentName;
    this.equipmentType = equipmentType;
    this.status = status;
    this.fieldCode = fieldCode;
    this.staffId = staffId;

    }
}