"use client";

import Image from "next/image";
import { useState } from "react";

export default function paginaIniciar() {

    const [archivo, setArchivo] = useState()

    const handerOnChange = (e) => {
        setArchivo(e.target.files[0])
    }

    const handelSubmit = async (e) => {


        e.preventDefault()

        if (!archivo) return

        // esto es para creae un formdata en jes para enviar la data de la imagen
        const form = new FormData()
        form.set('archivo', archivo)

        // se envia la data al api
        const resp = await fetch('/api/upload',
            {
                method: 'POST',
                body: form
            }
        )

        const data = await resp.json()
        console.log(data)


    }


    return (
        <div className="flex h-screen justify-center items-center flex-col">
            {/* Componente para subir Imagen */}

            <form className="bg-zinc-950 p-5"
                onSubmit={handelSubmit}
            >
                <h1 className="text-white text-center text-4xl my-4"> Subir imagen </h1>

                <input 
                    type="file"
                    className="bg-zinc-900 text-zinc-100 p-2 round block mb-2"
                    onChange={handerOnChange}
                />


                <button type="submit" 
                        className="rounded-full bg-green-500 h-10 w-full block p-2 disabled:opacity-50 hover:bg-green-600 text-white"
                        disabled={!archivo}    
                >
                    Subir
                </button>
            </form>

            {
                archivo && (
                    <Image 
                        src={URL.createObjectURL(archivo)}
                        alt="imagen"
                        width={300}
                        height={300}
                        className="m-2"
                    />
                )
            }
        </div>
    )
}

