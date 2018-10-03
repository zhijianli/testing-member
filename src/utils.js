// export let serialize = (obj) => {
//     let str = ""

//     for (let key in obj) {
//         str += `${key}=${obj[key]}&`
//     }

//     str = str.slice(0, -1)

//     return str
// }
export const serialize = (obj) => {
    // let str = ""

    // for (let key in obj) {
    //  str += `${key}=${encodeURIComponent(obj[key])}&`
    // }

    // str = str.slice(0, -1)

    // return str

    return Object.keys(obj).map((item) => `${encodeURIComponent(item)}=${encodeURIComponent(obj[item])}`).join("&")
}

export let getURLParams = () => {
    let a = location.search.slice(1),
        b = a.split("&"),
        c = {}

    b.forEach(function(item, index) {
        let name = item.split("=")[0],
            value = item.split("=")[1]

        c[name] = value
    })

    return c
}



export let fromJudge = (
    obj,
    trueFun = () => {
        console.log(`trueFun:${obj}`)
    },
    errFun = () => {
        console.log(`errFun:${obj}`)
    }

) => {

    let flag = true
    let emptyKey = []
    for (let key in obj) {
        if (obj[key] === "") {
            flag = false
            emptyKey.push(key)
        }
    }
    if (flag) {
        trueFun(obj)
    } else {
        alert('以下几项未填写' + emptyKey)
        errFun(obj)
    }
}


export const isNowBigger = function(pushTime, nowTime) { // '2017-03-15 18:37:39'  //

    let bool = true

    let now = nowTime ? new Date(nowTime) : new Date(),
        item = new Date(pushTime)

    bool = now.getTime() > item.getTime() ? true : false

    return bool
}