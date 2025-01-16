export class Field{
    fieldCode: string;
    fieldName: string;
    fieldLocation: string;
    fieldSize:string;
    image1:string;
    image2:string;
    staffId:string;


    constructor(fieldCode: string,fieldName: string, fieldLocation: string,fieldSize:string,image1:string,image2:string,staffId:string) {
        this.fieldCode = fieldCode;
        this.fieldName = fieldName;
        this.fieldLocation = fieldLocation;
        this.fieldSize = fieldSize;
        this.image1 = image1;
        this.image2 = image2;
        this.staffId = staffId;

    }
}