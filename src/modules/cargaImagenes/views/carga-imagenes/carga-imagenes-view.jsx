import Styled from 'styled-components'
import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'


const StyledContainer = Styled.div`
    .previewImage {
        width: 300px;
        height: 300px;
        border-radius: 25%;
    }
`

const handleClick = async  () =>{
    const endpoint = '/api/hello';
    const response = await fetch(endpoint);
    const result = await response.json()
    alert(`El tipo vehiculo es: ${result.name}`)
}

const CargaImagenes = (props) => {
    const { addToast } = props

    const SUPPORTED_FORMATS = ['png', 'jpeg', 'jpg']
    const FILE_SIZE = (1000000 * 3) // 3 MBs

    const [imagePet, setImagePet] = useState({})
    const [hasImage, setHasImage] = useState(false)
    const [previewImage, setPreviewImage] = useState({})
    const [errors, setErrors] = useState({});

    // Tratamiento de imagen
    const [fileBase64String, setFileBase64String] = useState("");

    const encodeFileBase64 = (file) => {
        var reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onload = () => {
                var Base64 = reader.result;
                console.log(Base64);
                setFileBase64String(Base64);
            };
            reader.onerror = (error) => {
                console.log("error: ", error);
            };
        }
    };

    const validateFile = () => {
        const errors = {}
        if (imagePet && hasImage) {
            if (!SUPPORTED_FORMATS.some(formato => `image/${formato}` === imagePet.type)) {
                errors.format = `Formato de imagen invalido (Solo: ${SUPPORTED_FORMATS.join(', ')})`
            }
            if (imagePet.size > FILE_SIZE) {
                errors.size = `El tamaño máximo del archivo no debe superar los: ${FILE_SIZE / 1000000} MBs`
            }
        }
        return errors;
    }

    const onChangeFile = (event) => {
        if (event.currentTarget.files[0]) {
            encodeFileBase64(event.currentTarget.files[0])
            setImagePet(event.currentTarget.files[0])
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setHasImage(true)
        }
    }

    const onSubmitFile = (values) => {
        // console.log({
        //     fileName: values.file.name,
        //     type: values.file.type,
        //     size: `${values.file.size} bytes`
        // })
    }

    return (
        <StyledContainer>
                <Row>
                    <Col>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Seleccionar imagen:</Form.Label>
                            <Form.Control type="file" 
                                onChange={onChangeFile}
                                onSubmit={onSubmitFile}/>
                        </Form.Group>
                            {/* <label htmlFor='file'>Foto: </label>
                            <input type="file" name="file" id='file'
                                // {...formik.getFieldProps('file')}
                                onChange={onChangeFile}
                                onSubmit={onSubmitFile}
                            /> */}
                            {/* {formik.touched.file && formik.errors.file ? (<div className="ui pointing red basic label">{formik.errors.file}</div>) : null} */}
                        {(errors.format || errors.size) && (
                            <>
                                <div className="ui pointing red basic label">
                                    {(errors.format) ? <>{errors.format} <br></br></> : ''}
                                    {(errors.size) ? errors.size : ''}
                                </div>
                            </>
                        )}
                        <br /><br />
                        <div textAlign="center">
                            {imagePet.name &&
                                <div className='col-m12' width={16}>
                                    <img src={previewImage} centered circular size="large" />
                                </div>
                            }
                        </div>
                    </Col>
                     <Col>
                        <div className='col-m12'>
                            <Button variant="primary" type='submit' onClick={handleClick}>
                                Validar tipo vehículo
                            </Button>
                        </div>
                        <h1>La separacion</h1>
                     </Col>       
                </Row>
                <br></br>
                
                <br></br>
                
        </StyledContainer>
    )
}

export default CargaImagenes;