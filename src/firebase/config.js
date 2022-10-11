import { initializeApp } from "firebase/app"
import { getStorage, ref, uploadBytes, getDownloadURL/*, getMetadata*/ } from "firebase/storage"
//import {v4} from 'uuid'

const firebaseConfig = {
  apiKey: "AIzaSyCyO8UKeQvFAlFIoTPUbhPQqX4MzxIxfyA",
  authDomain: "didacticobb.firebaseapp.com",
  projectId: "didacticobb",
  storageBucket: "didacticobb.appspot.com",
  messagingSenderId: "36739103464",
  appId: "1:36739103464:web:ea9ad88c31b92f9c1ce75d"
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)

/**
 * 
 * @param {File} file el archivo a subir
 * @returns el url del arhivo subido
 */
export  const subidaIPerfil =   async  file  =>  {    
    const storageRef = ref(storage, `perfil/${file.name}`)
    await uploadBytes(storageRef, file)
    const url   = await getDownloadURL(storageRef)
    return  url
}
/**
 * 
 * @param {File} file archivo a subir a rompecabeza
 * @returns el url del archivo
 */
export  const subidaIRompecabeza =   async  file  =>  {    
  const storageRef = ref(storage, `rompecabeza/${file.name}`)
  await uploadBytes(storageRef, file)
  const url   = await getDownloadURL(storageRef)
  return  url
}

export  const subidaIVocabulario =   async  file  =>  {    
  const storageRef = ref(storage, `vocabulario/${file.name}`)
  await uploadBytes(storageRef, file)
  const url   = await getDownloadURL(storageRef)
  return  url
}

export  const subidaIOracion =   async  file  =>  {    
  const storageRef = ref(storage, `oracion/${file.name}`)
  await uploadBytes(storageRef, file)
  const url   = await getDownloadURL(storageRef)
  return  url
}

export  const subidaIEquipo =   async  file  =>  {    
  const storageRef = ref(storage, `oracion/${file.name}`)
  await uploadBytes(storageRef, file)
  const url   = await getDownloadURL(storageRef)
  return  url
}
