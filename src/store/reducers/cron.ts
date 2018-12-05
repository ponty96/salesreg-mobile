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
              return { mediaId, file, options, state: mediaState, progress }
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
        if (action.payload.deleteUsing == 'mediaId') {
          let _deletedNewState = state[uploadClass].filter(
            media => media.mediaId != action.payload.deleteKey
          )
          return {
            ...state,
            [uploadClass]: _deletedNewState
          }
        } else if (
          action.payload.deleteUsing != 'mediaId' &&
          state[uploadClass]
        ) {
          let _deletedNewState = state[uploadClass].filter(media => {
            let { response } = media,
              _location =
                (response &&
                  response.body &&
                  response.body.postResponse &&
                  response.body.postResponse.location) ||
                ''
            return action.payload.deleteKey.indexOf(_location) == -1
          })
          return {
            ...state,
            [uploadClass]: _deletedNewState
          }
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
        if (action.payload.deleteUsing == 'mediaId') {
          return {
            ...state,
            [uploadClass]: { ..._prevState, [action.payload.deleteKey]: null }
          }
        } else if (
          action.payload.deleteUsing != 'mediaId' &&
          state[uploadClass]
        ) {
          let newState = Object.keys(_prevState).reduce((acc, value) => {
            if (action.payload.deleteKey.indexOf(_prevState[value]) == -1) {
              acc[value] = _prevState[value]
            }
            return acc
          }, {})
          return {
            ...state,
            [uploadClass]: newState
          }
        }

      default:
        state
    }
  }
  return state
}
