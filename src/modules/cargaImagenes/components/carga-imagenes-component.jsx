
import React, { useState } from 'react'

const FileImage = (props) => {

    const { handleFileBase64String, handleImagePreview, Input } = props

    const [image, setImage] = useState({})
    const [hasImage, setHasImage] = useState(false)
    const [errors, setErrors] = useState({})

    const encodeFileBase64 = (file) => {
        var reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onload = () => {
                var Base64 = reader.result;
                console.log(Base64);
                handleFileBase64String(Base64)
            };
            reader.onerror = (error) => {
                console.log("error: ", error);
            };
        }
    };


    const onChangeFile = (event) => {
        if (event.currentTarget.files[0]) {
            encodeFileBase64(event.currentTarget.files[0])
            setImage(event.currentTarget.files[0])
            handleImagePreview(URL.createObjectURL(event.target.files[0]))
            setHasImage(true)
        }
    }

    return (
        <>
            <div>
                <label htmlFor='file'>Foto: </label>
                <input type="file" name="file" id='file'
                    onChange={onChangeFile}
                    // onSubmit={onSubmitFile}
                />
            </div>
            {(errors.format || errors.size) && (
                <>
                    <div className="ui pointing red basic label">
                        {(errors.format) ? <>{errors.format} <br></br></> : ''}
                        {(errors.size) ? errors.size : ''}
                    </div>
                </>
            )}
        </>
    )
}

export default FileImage