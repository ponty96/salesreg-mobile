import { RNS3 } from 'react-native-aws3'

function S3Upload(file, options, mediaId, arrayOfFiles?: any) {
  this.file = file
  this.options = options
  this.mediaId = mediaId
  this.arrayOfFiles = arrayOfFiles
  this.task = []
}

S3Upload.prototype.cancel = function() {
  this.task.forEach(task => task.abort())
}

S3Upload.prototype.singleUpload = function(
  progressCallback,
  successCallback,
  errorCallback
) {
  let task = RNS3.put(this.file, this.options)
    .progress(e => {
      progressCallback(e.percent, this.mediaId, {
        file: this.file,
        options: this.options
      })
    })
    .then(response => {
      response.status != this.options.successActionStatus
        ? errorCallback(this.mediaId, {
            file: this.file,
            options: this.options
          })
        : successCallback(response, this.mediaId, {
            file: this.file,
            options: this.options
          })
    })
    .catch(() => {
      errorCallback(this.mediaId, {
        file: this.file,
        options: this.options
      })
    })

  this.task.push(task)
}

S3Upload.prototype.multipleUpload = function(
  progressCallback,
  successCallback,
  errorCallback
) {
  let requests = this.arrayOfFiles.map(fileInfo => {
    let task = RNS3.put(fileInfo.file, fileInfo.options)
      .progress(e => {
        if (fileInfo.file.type.indexOf('image') == -1) {
          this.progress = e.percent
        }

        progressCallback(
          fileInfo.file.type.indexOf('image') != -1 ? this.progress : e.percent,
          this.mediaId,
          {
            file: this.arrayOfFiles[0].file,
            options: this.arrayOfFiles[0].options
          }
        )
      })
      .then(response => Promise.resolve(response))
      .catch(err => Promise.reject(err))
    this.task.push(task)
    return task
  })

  Promise.all([...requests])
    .then((response: any) => {
      response[0].status != this.arrayOfFiles[0].options.successActionStatus
        ? errorCallback(this.mediaId, {
            file: this.arrayOfFiles[0].file,
            options: this.arrayOfFiles[0].options
          })
        : successCallback(response[0], this.mediaId, {
            file: this.arrayOfFiles[0].file,
            options: this.arrayOfFiles[0].options
          })
    })
    .catch(() => {
      errorCallback(this.mediaId, {
        file: this.arrayOfFiles[0].file,
        options: this.arrayOfFiles[0].options
      })
    })
}

export default S3Upload
