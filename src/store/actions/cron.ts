import Types from '../types/enums'
import S3Upload from '../../Functions/S3Upload'

const manageUpload = (payload, mediaId, dispatch) => {
  let s3Upload =
      payload.uploadType == 'single'
        ? new S3Upload(payload.file, payload.options, mediaId)
        : new S3Upload(null, null, mediaId, payload.files),
    uploadFn =
      payload.uploadType == 'single' ? 'singleUpload' : 'multipleUpload'
  dispatch({
    type: Types.SET_MEDIA_CANCEL_INSTANCE,
    payload: {
      cancelInstance: s3Upload.cancel,
      uploadClass: payload.key,
      mediaId: mediaId
    }
  })

  s3Upload[uploadFn](
    (uploadPercent, mediaId, opt) => {
      dispatch({
        type: Types.UPDATE_BACKGROUND_UPLOAD_PROGRESS,
        payload: {
          mediaId,
          mediaState: 'loading',
          progress: uploadPercent,
          uploadClass: payload.key,
          file: opt.file,
          options: opt.options,
          response: null
        }
      })
    },
    (response, mediaId, opt) => {
      dispatch({
        type: Types.BACKGROUND_UPLOAD_SUCCESS,
        payload: {
          mediaId,
          mediaState: 'success',
          progress: 0,
          uploadClass: payload.key,
          file: opt.file,
          options: opt.options,
          response
        }
      })
      dispatch({
        type: Types.SET_URL_OF_MEDIA_UPLOADED,
        payload: {
          mediaId,
          uploadClass: payload.key,
          location: response.body.postResponse.location
        }
      })
    },
    (mediaId, opt) => {
      dispatch({
        type: Types.BACKGROUND_UPLOAD_ERROR,
        payload: {
          mediaId,
          mediaState: 'error',
          progress: 0,
          uploadClass: payload.key,
          file: opt.file,
          options: opt.options,
          response: null
        }
      })
    }
  )
}

export const uploadMedia = payload => dispatch => {
  let mediaId = payload.mediaId || Date.now()

  dispatch({
    type: Types.START_BACKGROUND_UPLOAD,
    payload: {
      mediaId,
      uploadClass: payload.key,
      retry: payload.retry,
      file:
        payload.uploadType == 'single' ? payload.file : payload.files[0].file,
      options:
        payload.uploadType == 'single'
          ? payload.options
          : payload.files[0].options,
      mediaState: 'loading',
      progress: 0
    }
  })

  manageUpload(payload, mediaId, dispatch)
}

export const deleteMedia = payload => ({
  type: Types.DELETE_MEDIA,
  payload: {
    uploadClass: payload.key,
    deleteKey: payload.deleteKey,
    deleteUsing: payload.deleteUsing
  }
})

export const removeUrlFromUploadedMedia = payload => ({
  type: Types.REMOVE_URL_OF_MEDIA_UPLOADED,
  payload: {
    uploadClass: payload.key,
    deleteKey: payload.deleteKey,
    deleteUsing: payload.deleteUsing
  }
})
