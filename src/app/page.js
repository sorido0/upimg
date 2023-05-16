"use client";

import { useState } from "react";
import Image from "next/image";
import { subirImagenen } from "./api/upload/cloudinary";
import fubiBien from "./components/subiBIen";


export default function PaginaIniciar() {

    const [archivo, setArchivo] = useState(null)
    const [urlimagen, setUrlimagen] = useState("")

    const handerOnChange = ({ target }) => {

        if (!target.files) return console.log('No hay archivo')
        // console.log(target.files)
        setArchivo(target.files[0])
    }
    
    const handelSubmit = async (e) => {
        
        
        e.preventDefault()
        
        if (!archivo) return console.log('No hay archivo')
        
        const url = await subirImagenen(archivo)
        
        setUrlimagen(url)
        setArchivo(null)
        fubiBien()
        
        return ""
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
                    multiple
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
            {
                urlimagen ? <span className="text-white text-center text-sm my-4"> {urlimagen} </span> : null
            }

        </div>
    )
}

