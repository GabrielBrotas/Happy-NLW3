import Image from "../models/Image"

// como os orfanatos serão exibidos no frontend
export default {
    render(image: Image) {
        return {
            id: image.id,
            url: `http://10.0.0.114:8080/uploads/${image.path}`
        }
    },
    renderMany(images: Image[]) {
        // vai retornar todas as imagens no formato do metodo render()
        return images.map( image => this.render(image))
    }
}