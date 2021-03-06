var assign = require('./util/assign')
var jsonFile = require('jsonfile')
var json = require('./json')

var fse = {}
var gfs = require('graceful-fs')

// attach fs methods to fse
Object.keys(gfs).forEach(function (key) {
  fse[key] = gfs[key]
})

var fs = fse

assign(fs, require('./copy'))
assign(fs, require('./mkdirs'))

var remove = require('./remove')
fs.remove = remove.remove
fs.removeSync = remove.removeSync
fs['delete'] = fs.remove
fs.deleteSync = fs.removeSync

var create = require('./create')
fs.createFile = create.createFile
fs.createFileSync = create.createFileSync

fs.ensureFile = create.createFile
fs.ensureFileSync = create.createFileSync

var createOutputStream = require('./create-output-stream')
fs.createOutputStream = createOutputStream.createOutputStream
fs.createOutputStreamSync = createOutputStream.createOutputStreamSync

var move = require('./move')
fs.move = function (src, dest, opts, callback) {
  if (typeof opts === 'function') {
    callback = opts
    opts = {}
  }

  if (opts.mkdirp == null) opts.mkdirp = true
  if (opts.clobber == null) opts.clobber = false

  move(src, dest, opts, callback)
}

var output = require('./output')
fs.outputFile = output.outputFile
fs.outputFileSync = output.outputFileSync

fs.readJsonFile = jsonFile.readFile
fs.readJSONFile = jsonFile.readFile
fs.readJsonFileSync = jsonFile.readFileSync
fs.readJSONFileSync = jsonFile.readFileSync

fs.readJson = jsonFile.readFile
fs.readJSON = jsonFile.readFile
fs.readJsonSync = jsonFile.readFileSync
fs.readJSONSync = jsonFile.readFileSync

fs.outputJsonSync = json.outputJsonSync
fs.outputJSONSync = json.outputJsonSync
fs.outputJson = json.outputJson
fs.outputJSON = json.outputJson

fs.writeJsonFile = jsonFile.writeFile
fs.writeJSONFile = jsonFile.writeFile
fs.writeJsonFileSync = jsonFile.writeFileSync
fs.writeJSONFileSync = jsonFile.writeFileSync

fs.writeJson = jsonFile.writeFile
fs.writeJSON = jsonFile.writeFile
fs.writeJsonSync = jsonFile.writeFileSync
fs.writeJSONSync = jsonFile.writeFileSync

var empty = require('./empty-dir')
Object.keys(empty).forEach(function (method) {
  fs[method] = empty[method]
})

module.exports = fs

jsonFile.spaces = 2 // set to 2
module.exports.jsonfile = jsonFile // so users of fs-extra can modify jsonFile.spaces
