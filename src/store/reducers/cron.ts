import Types from '../types/enums'

export const mediaUploads = (state = {}, action) => {
  if (action.payload) {
    let {
      type,
      payload: {
        retry,
        uploadClass,
        mediaId,
        file,
        options,
        mediaState,
        progress,
        response,
        cancelInstance
      }
    } = action
    switch (type) {
      case Types.START_BACKGROUND_UPLOAD:
        if (!retry) {
          let _prevState = state[uploadClass] || []
          return {
            ...state,
            [uploadClass]: [
              ..._prevState,
              { mediaId, file, options, state: mediaState, progress }
            ]
          }
        } else {
          let newState = state[uploadClass].map(media => {
            if (media.mediaId == mediaId) {
              return { mediaId, file, options, state: mediaState }
            }
            return media
          })
          return {
            ...state,
            [uploadClass]: newState
          }
        }
      case Types.SET_MEDIA_CANCEL_INSTANCE:
        let _newState = state[uploadClass].map(media => {
          if (media.mediaId == mediaId) {
            return { ...media, cancelFn: cancelInstance }
          }
          return media
        })
        return {
          ...state,
          [uploadClass]: _newState
        }
      case Types.UPDATE_BACKGROUND_UPLOAD_PROGRESS:
      case Types.BACKGROUND_UPLOAD_SUCCESS:
      case Types.BACKGROUND_UPLOAD_ERROR:
        let newState = state[uploadClass].map(media => {
          if (media.mediaId == mediaId) {
            return {
              ...media,
              mediaId,
              file,
              options,
              state: mediaState,
              progress,
              response
            }
          }
          return media
        })
        return {
          ...state,
          [uploadClass]: newState
        }
      case Types.DELETE_MEDIA:
        let _deletedNewState = state[uploadClass].filter(
          media => media.mediaId != mediaId
        )
        return {
          ...state,
          [uploadClass]: _deletedNewState
        }
      default:
        return state
    }
  }
  return state
}

export const urlOfMediaUploaded = (state = {}, action) => {
  if (action.payload) {
    let {
      type,
      payload: { mediaId, location, uploadClass }
    } = action

    let _prevState = state[uploadClass] || {}
    switch (type) {
      case Types.SET_URL_OF_MEDIA_UPLOADED:
        return {
          ...state,
          [uploadClass]: { ..._prevState, [mediaId]: location }
        }
      case Types.REMOVE_URL_OF_MEDIA_UPLOADED:
        return { ...state, [uploadClass]: { ..._prevState, [mediaId]: null } }
      case Types.RESET_MEDIA_UPLOADED_STORE:
        return { ...state, [uploadClass]: {} }
      default:
        state
    }
  }
  return state
}
