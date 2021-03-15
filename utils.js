const fs = require('fs')

function writeDataToFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content, null, 4), 'utf8', (err) => {
        if (err) {
            console.error(err)
        }
    })
}

function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = ''

            req.on('data', chunk => {
                body += chunk.toString()
            })

            req.on('end', () => {
                resolve(JSON.parse(body))
            })
        } catch (error) {
            console.error(error)

            reject(error)
        }
    })
}

module.exports = {
    writeDataToFile, getPostData
}