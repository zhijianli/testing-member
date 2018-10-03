export const imgUrl = {
    update(content) {

        try {
            let domStyle = this.el,
                pathObj = JSON.parse(content),
                p1 = pathObj.data.catalog,
                p2 = pathObj.data.chartlet

            domStyle.src = './src/images/' + p1 + '/' + p2 + '.png'

        } catch (e) {
            console.log(e)
        }
    }
}