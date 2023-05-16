


export const subirImagenen = async (archivo = []) => {

    // Validar si la imagen existe
    if (!archivo) return console.log('No hay imagen')


    // Hacer a POST a la API de Cloudinary
    const cloudUrl = 'https://api.cloudinary.com/v1_1/sorido0/image/upload'
    const formData = new FormData()
    formData.append('upload_preset', 'sorido0upimg')
    formData.append('file', archivo)

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        })


        if (!resp.ok) throw new Error('Error al subir la imagen')
        // if (resp.ok) {
        const cloudResp = await resp.json()

        return cloudResp.secure_url
        // } else {
        //     throw await resp.json()
        // }
    }
    catch (err) {
        throw err
    }
    finally {
        console.info('Fin de la subida de la imagen')
    }

}
