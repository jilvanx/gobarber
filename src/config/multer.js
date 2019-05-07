const path = require('path')
const crypt = require('crypto')
const multer = require('multer')

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypt.randomBytes(16, (err, raw) => {
        if (err) return cb(err)

        cb(null, raw.toString('hex') + path.extname(file.originalname))
      })
    }
  })
}
