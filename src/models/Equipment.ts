export class Equipment {
    equipmentId!: string;
    equipmentName!: string;
    equipmentType!: string;
    staffId!: string;
    fieldId!: string;

    constructor(equipmentId: string, equipmentName: string, equipmentType: string, staffId: string, fieldId: string) {
        this.equipmentId = equipmentId;
        this.equipmentName = equipmentName;
        this.equipmentType = equipmentType;
        this.staffId = staffId;
        this.fieldId = fieldId;
    }
}