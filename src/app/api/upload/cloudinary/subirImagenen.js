

export const subirImagenen = async ( archivo = [] ) => {

    // Validar si la imagen existe
    if (!archivo) return console.log('No hay imagen')
     
     
    console.log(archivo)

    // Hacer a POST a la API de Cloudinary
    const cloudUrl = 'https://api.cloudinary.com/v1_1/sorido0/image/upload'
    const formData = new FormData()
    formData.append('upload_preset', 'sorido0upimg')
    formData.append('file', archivo )

    try {
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        })

        console.log(resp)
        if ( !resp.ok ) throw new Error('Error al subir la imagen')
        // if (resp.ok) {
             const cloudResp = await resp.json()
             console.log(cloudResp)
             return cloudResp.secure_url
        // } else {
        //     throw await resp.json()
        // }
    }
    catch (err) {
        throw err
    }

}
    