
import { writeFile } from 'fs/promises'
import { NextResponse } from 'next/server'
import path from 'path'




export async function POST(request) {


  try {
    // Se espera que el request sea un formdata
    const datos = await request.formData()

    // se obtiene el archivo
    const archivo = datos.get('archivo')

    // se convierte el archivo a un arraybuffer
    const byte = await archivo.arrayBuffer()

    // se convierte el arraybuffer a un buffer
    const buffer = Buffer.from(byte)

    // se crea la ruta del archivo
    const rutaArchivo = path.join(process.cwd(), 'public', archivo.name)

    // se escribe el archivo
    writeFile(rutaArchivo, buffer)

    console.log(rutaArchivo)

    return new Response(JSON.stringify({
      message: 'Image uploaded successfully!'
    }))

  } catch (error) {
      return NextResponse.json(
        JSON.stringify({
          message: 'No file uploaded!',
        }),
          {
            status: 400,
          }
        )

  }


}
