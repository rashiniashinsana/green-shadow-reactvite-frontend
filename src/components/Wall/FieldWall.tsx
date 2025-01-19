import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Field} from "../../models/Field.ts";
import {Crop} from "../../models/Crop.ts";
import {Log} from "../../models/Log.ts";
import Swal from "sweetalert2";
import {deleteField} from "../../reducers/FieldSlice.tsx";
import SaveFieldPopup from "../popup/field/SaveFieldPopup.tsx";
import UpdateFieldPopup from "../popup/field/UpdateFieldPopup.tsx";
import ViewFieldPopup from "../popup/field/ViewFieldPopup.tsx";
import CardSet from "../CardSet.tsx";
import HeaderComponent from "../pageheader/HeaderComponent.tsx";

const FieldWall = () => {
    const [saveFieldPopup, setSaveFieldPopup] = useState(false)
    const [updateFieldPopup, setUpdateFieldPopup] = useState(false)
    const [viewFieldPopup, setViewFieldPopup] = useState(false)
    const fieldsData = useSelector((state: { field: Field[] }) => state.field)
    const [search, setSearch] = useState('')
    const [fields, setFields] = useState(fieldsData)
    const [targetField, setTargetField] = useState<Field>({} as Field)
    const dispatch = useDispatch()

    const handleSaveFieldPopup = () => {
        setSaveFieldPopup(!saveFieldPopup)
    }

    const handleUpdateFieldPopup = (data: Field | Crop | Log) => {
        if ('fieldName' in data && 'fieldCode' in data) {
            setTargetField(data as Field); // Type narrowed to Field
            setUpdateFieldPopup((prev) => !prev);
        }
    };

    const handleViewFieldPopup = (data: Field | Crop | Log) => {
        console.log(data)
        if ('fieldName' in data && 'fieldCode' in data) {
            setTargetField(data as Field); // Type narrowed to Field
            setViewFieldPopup((prev) => !prev);
        }
    }

    useEffect(() => {
        const filteredFields = fieldsData.filter((field: Field) => {
            return field.fieldName.toLowerCase().includes(search.toLowerCase())
        })
        setFields(filteredFields)
    }, [search, fieldsData])

    const handleDeleteField = (fieldId: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete this Field?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteField(fieldId))
                Swal.fire("Deleted!", "Field has been deleted.", "success");
            } else {
                Swal.fire("Cancelled", "Field deletion cancelled", "info");
            }
        })
    }

    return (
        <>
            {saveFieldPopup && <SaveFieldPopup closePopupAction={handleSaveFieldPopup} />}
            {updateFieldPopup && <UpdateFieldPopup closePopupAction={handleUpdateFieldPopup} targetField={targetField} />}
            {viewFieldPopup && <ViewFieldPopup targetField={targetField} closePopupAction={handleViewFieldPopup} />}
            <div className="w-100 p-5 bg-transparent" id="field-wall">
                <HeaderComponent section={"Field Management"} button={"Add Field"} addPopupAction={handleSaveFieldPopup} searchAction={setSearch} />
                <CardSet cardType={"field"} cardSet={fields} handleUpdatePopup={handleUpdateFieldPopup } handleViewPopup={handleViewFieldPopup} handleDeletePopup={handleDeleteField} />
            </div>
        </>
    )
}

export default FieldWall