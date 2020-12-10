import multer from 'multer'
import path from 'path'

export default {
    // Storage vai ser onde vai ficar armazenado as imagens salvas, neste caso é no disco, poderia ser no aws3 google cloud storage, etc
    storage: multer.diskStorage({
        // destination: 'qual pasta vai ser armazenado as fotos,
        /*
            __dirname: caminho atual (config/)
            path.join() vai unir os caminhos de acordo com o sistema operacional, se vai usar / ou \...
        */
        destination: path.join(__dirname, '..', '..', 'uploads'),
        // filename vai dar um nome ao nosso arquivo para evitar sobrescrever o nome de uma imagem já existente no sistema, vai receber o request do express, o arquivo e uma funcão de callback
        filename: (request, file, cb) => {
            const fileName = `${Date.now()}-${file.originalname}`

            // o callback recebe um erro e o resultado, nesse caso não vamos ter erro então so vamos passar o resultado
            cb(null, fileName);
        }
    }) 
}