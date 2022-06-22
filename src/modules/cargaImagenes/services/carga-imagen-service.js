import axios from 'axios';

const CargaImagenServices = {
    clasificarImagen,
}

function clasificarImagen(datos, success, error) {
    const ruta = "http://127.0.0.1:5000/imagenWithDetections"
    axios.post(ruta, datos)
        .then(success)
        .catch(error)
}

export default CargaImagenServices