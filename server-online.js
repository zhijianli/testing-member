const http = require("http")
const path = require("path")
const querystring = require("querystring")
const express = require("express")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static(__dirname))

app.get("/login", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./login.html"))
})

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./index.html"))

})

app.post("/depression-web/EapEmployee/entireImportEmployee.json", (req, res) => {
    const proxyRequest = http.request({
        host: process.env.NODE_URL || '192.168.0.240',

        port: process.env.NODE_PORT || 80,
        path: req.path,
        method: req.method,
        headers: {
            "Content-Type": req.headers["content-type"],
            "Content-Length": req.headers["content-length"]
        }
    }, (proxyResponse) => {
        res.writeHead(proxyResponse.statusCode, proxyResponse.headers)

        proxyResponse.pipe(res)
    })

    req.pipe(proxyRequest)
})


app.post("/depression-web/EapEmployee/partialImportEmployee.json", (req, res) => {
    const proxyRequest = http.request({

        host: process.env.NODE_URL || "192.168.0.240", //232 => 25

        port: process.env.NODE_PORT || 80,
        path: req.path,
        method: req.method,
        headers: {
            "Content-Type": req.headers["content-type"],
            "Content-Length": req.headers["content-length"]
        }
    }, (proxyResponse) => {
        res.writeHead(proxyResponse.statusCode, proxyResponse.headers)

        proxyResponse.pipe(res)
    })

    req.pipe(proxyRequest)
})


app.post("/depression-web/messagePush/updateMsgPush.json", (req, res) => {
    const proxyRequest = http.request({

        host: process.env.NODE_URL || '192.168.0.240',

        port: process.env.NODE_PORT || 80,
        path: req.path,
        method: req.method,
        headers: {
            "Content-Type": req.headers["content-type"],
            "Content-Length": req.headers["content-length"]
        }
    }, (proxyResponse) => {
        res.writeHead(proxyResponse.statusCode, proxyResponse.headers)

        proxyResponse.pipe(res)
    })

    req.pipe(proxyRequest)
})



app.post("/depression-web/messagePush/saveMsgPush.json", (req, res) => {
    const proxyRequest = http.request({

        host: process.env.NODE_URL || '192.168.0.240',

        port: process.env.NODE_PORT || 80,
        path: req.path,
        method: req.method,
        headers: {
            "Content-Type": req.headers["content-type"],
            "Content-Length": req.headers["content-length"]
        }
    }, (proxyResponse) => {
        res.writeHead(proxyResponse.statusCode, proxyResponse.headers)

        proxyResponse.pipe(res)
    })

    req.pipe(proxyRequest)
})





// app.post("/depression-web/file/*", (req, res) => {
//     const proxyRequest = http.request({
//         host: process.env.NODE_URL || '192.168.0.240',
//         port: process.env.NODE_PORT || 8080,
//         path: req.path,
//         method: req.method,
//         headers: {
//             "Content-Type": req.headers["content-type"],
//             "Content-Length": req.headers["content-length"]
//         }
//     }, (proxyResponse) => {
//         res.writeHead(proxyResponse.statusCode, proxyResponse.headers)

//         proxyResponse.pipe(res)
//     })

//     req.pipe(proxyRequest)
// })





app.post("/depression-web/*", (req, res) => {

    const postData = querystring.stringify(req.body)
    const proxyRequest = http.request({

        host: process.env.NODE_URL || '192.168.0.240',

        port: process.env.NODE_PORT || 80,
        path: req.path,
        method: req.method,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": Buffer.byteLength(postData)
        }
    }, (proxyResponse) => {
        res.writeHead(proxyResponse.statusCode, proxyResponse.headers)

        proxyResponse.pipe(res)
    })

    proxyRequest.write(postData)
    proxyRequest.end()
})


app.post("/depression-api/*", (req, res) => {

    const postData = querystring.stringify(req.body)
    const proxyRequest = http.request({

        host: process.env.NODE_URL || 'api.120xinmao.com',

        port: process.env.NODE_PORT || 80,
        path: req.path,
        method: req.method,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": Buffer.byteLength(postData)
        }
    }, (proxyResponse) => {
        res.writeHead(proxyResponse.statusCode, proxyResponse.headers)

        proxyResponse.pipe(res)
    })

    proxyRequest.write(postData)
    proxyRequest.end()
})








//
// app.post("/testCenter/testScalePopulationRange/update", (req, res) => {
//
//     const postData = querystring.stringify(req.body)
//     const proxyRequest = http.request({
//
//         host: process.env.NODE_URL || '192.168.0.240',
//
//         port: process.env.NODE_PORT || 80,
//         path: req.path,
//         method: req.method,
//         headers: {
//             "Content-Type": "application/json",
//             "Content-Length": Buffer.byteLength(postData)
//         }
//     }, (proxyResponse) => {
//         res.writeHead(proxyResponse.statusCode, proxyResponse.headers)
//
//         proxyResponse.pipe(res)
//     })
//
//     proxyRequest.write(postData)
//     proxyRequest.end()
// })
//
//
// app.post("/testCenter/testScalePopulationRange/add", (req, res) => {
//
//     const postData = querystring.stringify(req.body)
//     const proxyRequest = http.request({
//
//         host: process.env.NODE_URL || '192.168.0.240',
//
//         port: process.env.NODE_PORT || 80,
//         path: req.path,
//         method: req.method,
//         headers: {
//             "Content-Type": "application/json",
//             "Content-Length": Buffer.byteLength(postData)
//         }
//     }, (proxyResponse) => {
//         res.writeHead(proxyResponse.statusCode, proxyResponse.headers)
//
//         proxyResponse.pipe(res)
//     })
//
//     proxyRequest.write(postData)
//     proxyRequest.end()
// })
//
// app.post("/testCenter/testScaleInfo/update", (req, res) => {
//
//     const postData = querystring.stringify(req.body)
//     const proxyRequest = http.request({
//
//         host: process.env.NODE_URL || '192.168.0.240',
//
//         port: process.env.NODE_PORT || 80,
//         path: req.path,
//         method: req.method,
//         headers: {
//             "Content-Type": "application/json",
//             "Content-Length": Buffer.byteLength(postData)
//         }
//     }, (proxyResponse) => {
//         res.writeHead(proxyResponse.statusCode, proxyResponse.headers)
//
//         proxyResponse.pipe(res)
//     })
//
//     proxyRequest.write(postData)
//     proxyRequest.end()
// })

////////////////////////

app.post("/testCenter/testScaleClass/add", (req, res) => {

    const postData = querystring.stringify(req.body)
    const proxyRequest = http.request({

        host: process.env.NODE_URL || '192.168.0.240',

        port: process.env.NODE_PORT || 8000,
        path: req.path,
        method: req.method,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": Buffer.byteLength(postData)
        }
    }, (proxyResponse) => {
        res.writeHead(proxyResponse.statusCode, proxyResponse.headers)

        proxyResponse.pipe(res)
    })

    proxyRequest.write(postData)
    proxyRequest.end()
})

app.post("/testCenter/testScaleClass/update", (req, res) => {

    const postData = querystring.stringify(req.body)
    const proxyRequest = http.request({

        host: process.env.NODE_URL || '192.168.0.240',

        port: process.env.NODE_PORT || 8000,
        path: req.path,
        method: req.method,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": Buffer.byteLength(postData)
        }
    }, (proxyResponse) => {
        res.writeHead(proxyResponse.statusCode, proxyResponse.headers)

        proxyResponse.pipe(res)
    })

    proxyRequest.write(postData)
    proxyRequest.end()
})

app.post("/testCenter/*/add", (req, res) => {
    const proxyRequest = http.request({

        host: process.env.NODE_URL || '192.168.0.240',

        port: process.env.NODE_PORT || 8000,
        path: req.path,
        method: req.method,
        headers: {
            "Content-Type": req.headers["content-type"],
            "Content-Length": req.headers["content-length"]
        }
    }, (proxyResponse) => {
        res.writeHead(proxyResponse.statusCode, proxyResponse.headers)

        proxyResponse.pipe(res)
    })

    req.pipe(proxyRequest)
})


app.post("/testCenter/*/update", (req, res) => {
    const proxyRequest = http.request({

        host: process.env.NODE_URL || '192.168.0.240',

        port: process.env.NODE_PORT || 8000,
        path: req.path,
        method: req.method,
        headers: {
            "Content-Type": req.headers["content-type"],
            "Content-Length": req.headers["content-length"]
        }
    }, (proxyResponse) => {
        res.writeHead(proxyResponse.statusCode, proxyResponse.headers)

        proxyResponse.pipe(res)
    })

    req.pipe(proxyRequest)
})






app.post("/testCenter/*", (req, res) => {

    const postData = querystring.stringify(req.body)
    const proxyRequest = http.request({

        host: process.env.NODE_URL || '192.168.0.240',

        port: process.env.NODE_PORT || 8000,
        path: req.path,
        method: req.method,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": Buffer.byteLength(postData)
        }
    }, (proxyResponse) => {
        res.writeHead(proxyResponse.statusCode, proxyResponse.headers)

        proxyResponse.pipe(res)
    })

    proxyRequest.write(postData)
    proxyRequest.end()
})

app.post("/orderCenter/*", (req, res) => {

    const postData = querystring.stringify(req.body)
    const proxyRequest = http.request({

        host: process.env.NODE_URL || '192.168.0.240',

        port: process.env.NODE_PORT || 8000,
        path: req.path,
        method: req.method,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": Buffer.byteLength(postData)
        }
    }, (proxyResponse) => {
        res.writeHead(proxyResponse.statusCode, proxyResponse.headers)

        proxyResponse.pipe(res)
    })

    proxyRequest.write(postData)
    proxyRequest.end()
})


app.listen(process.env.PORT || 4000, function() {
    console.log('port at 4000')
})