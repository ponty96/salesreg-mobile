import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native'
import { color } from '../../Style/Color'
import { Icon } from 'native-base'
import MediaUploadHandlerAtom from './../MediaUploadHandlerAtom'
import { connect } from 'react-redux'
import {
  DocumentPicker,
  DocumentPickerUtil
} from 'react-native-document-picker'

interface IProps {
  document: string
  handleDocumentUpload: (image: string) => void
  underneathText?: string
  error?: any
  storeMedias?: any
  reduxMediaUploadClass: string | number
}

interface IState {
  documentToUpload: any
  prevDocumentUploaded: string
}

class DocumentUploadAtom extends React.PureComponent<IProps, IState> {
  state = {
    documentToUpload: null,
    isInProcessing:
      this.props.storeMedias[0] && this.props.storeMedias[0].state,
    prevDocumentUploaded: this.props.document
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.storeMedias != this.props.storeMedias &&
      this.props.storeMedias.length == 0
    ) {
      this.setState({
        documentToUpload: null
      })
    }
  }

  handleDocumentUpload = () => {
    DocumentPicker.show(
      {
        filetype: [DocumentPickerUtil.pdf()]
      },
      (error, res) => {
        if (!error) {
          if (res.fileize / 1000000 > 8) {
            Alert.alert(
              'Pdf too large',
              'The pdf is too large, please select a pdf of size 8MB or less',
              [{ text: 'Ok', onPress: () => null }],
              { cancelable: false }
            )
          } else {
            this.setState({
              prevDocumentUploaded: null,
              documentToUpload: res
            })
          }
        }
      }
    )
  }

  handleDocumentValueSet = document => {
    let url = document[Object.keys(document)[0]]
    this.props.handleDocumentUpload(url)
    if (!url) {
      this.setState({
        documentToUpload: url
      })
    }
  }

  renderSelectDocumentPlaceholder = (): JSX.Element => {
    return (
      <TouchableOpacity onPress={this.handleDocumentUpload}>
        <View>
          <View style={styles.placeholderWrapper}>
            <Icon
              type="MaterialCommunityIcons"
              name="file-plus"
              style={{ fontSize: 150, color: color.red }}
            />
          </View>
          <Text
            style={{
              color: color.button,
              alignSelf: 'center',
              marginVertical: 20,
              fontSize: 18,
              fontFamily: 'AvenirNext-Medium'
            }}
          >
            Upload Pdf
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderDefaultDocument = () => {
    return (
      <TouchableOpacity onPress={this.handleDocumentUpload}>
        <View>
          <View style={styles.placeholderWrapper}>
            <Icon
              type="MaterialCommunityIcons"
              name="file-pdf"
              style={{ fontSize: 150, color: color.red }}
            />
          </View>
          <Text
            style={{
              color: color.button,
              alignSelf: 'center',
              marginVertical: 20,
              fontSize: 18,
              fontFamily: 'AvenirNext-Medium'
            }}
          >
            Change Pdf
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderUploadDocument = () => {
    return (
      <TouchableOpacity onPress={this.handleDocumentUpload}>
        <View>
          <MediaUploadHandlerAtom
            onMediaSet={this.handleDocumentValueSet}
            reduxMediaUploadClass={this.props.reduxMediaUploadClass}
            media={this.state.documentToUpload}
            hideRemoveButton
            category="document"
            style={styles.placeholderWrapper}
            uploadType="single"
          />
          <Text
            style={{
              color: color.button,
              alignSelf: 'center',
              marginVertical: 20,
              fontSize: 18,
              fontFamily: 'AvenirNext-Medium'
            }}
          >
            Change Document
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <React.Fragment>
        <View style={{ alignItems: 'center' }}>
          {this.state.prevDocumentUploaded &&
          this.state.isInProcessing == undefined
            ? this.renderDefaultDocument()
            : this.props.storeMedias.length > 0 || this.state.documentToUpload
            ? this.renderUploadDocument()
            : this.renderSelectDocumentPlaceholder()}
        </View>
        {this.renderUnderNeathText()}
      </React.Fragment>
    )
  }

  renderUnderNeathText = () => {
    if (this.props.error || this.props.underneathText) {
      return (
        <Text
          style={[
            styles.underneathText,
            {
              fontFamily: 'AvenirNext-Regular',
              color: this.props.error ? 'red' : color.principal
            }
          ]}
        >
          {this.props.error || this.props.underneathText}
        </Text>
      )
    } else {
      return null
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    storeMedias: state.mediaUploads[ownProps.reduxMediaUploadClass] || []
  }
}

export default connect(mapStateToProps)(DocumentUploadAtom)

const styles = StyleSheet.create({
  placeholderWrapper: {
    backgroundColor: color.listBorderColor,
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24
  },
  underneathText: {
    marginLeft: 0,
    color: color.textColor,
    fontSize: 14,
    marginBottom: 0,
    marginTop: 0,
    paddingLeft: 8,
    fontFamily: 'AvenirNext-Regular',
    paddingVertical: 0
  }
})
