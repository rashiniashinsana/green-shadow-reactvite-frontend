export class Crop {
    cropCode: string;
    cropName: string;
    cropScientificName: string;
    cropSeason: string;
    cropType: string;
    cropImage: File | null;
    fieldCode: string;

    constructor(cropCode: string, cropName: string, cropScientificName: string, cropSeason: string, cropType: string, cropImage: File | null, fieldCode: string) {
        this.cropCode = cropCode;
        this.cropName = cropName;
        this.cropScientificName = cropScientificName;
        this.cropSeason = cropSeason;
        this.cropType = cropType;
        this.cropImage = cropImage;
        this.fieldCode = fieldCode;
    }
}