const { Router } = require('express');
const cloudinary = require('cloudinary').v2;
const router = Router();

router.post('/', (req, res) => {
	const imagen = req.files.imagen;
	cloudinary.uploader.upload(imagen.tempFilePath, (error, result) => {
		if (error) {
			return res.status(500).send('Error al cargar la imagen');
		}
		return res.status(200).send('Imagen cargada con exito');
	});
});

module.exports = router;
