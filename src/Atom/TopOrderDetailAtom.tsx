import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ListItem, Left, Right, Thumbnail } from 'native-base'

interface IProps {
  uri: string
  status: string
  orderId?: number
  name?: string
}

export default class TopOrderDetailAtom extends React.Component<IProps, any> {
  static defaultProps: IProps = {
    uri:
      'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7',
    status: 'Unknown'
  }
  render() {
    return (
      <View>
        <ListItem style={styles.stylesDetailWhiteList}>
          <Left>
            <Text style={styles.stylesDetailRedText}>ORDER ID</Text>
          </Left>
          <Right>
            <Text style={styles.stylesDetailRedText}>{this.props.orderId}</Text>
          </Right>
        </ListItem>
        <ListItem style={styles.stylesDetailContent}>
          <Left style={styles.stylesDetailMoneyView}>
            <Text style={styles.stylesDetailGreyText}>Bought by</Text>
          </Left>
          <Right style={styles.stylesDetailPictureView}>
            <Thumbnail
              source={{ uri: this.props.uri }}
              style={styles.aboveAccordiondp}
            />
            <Text style={styles.stylesDetailPictureText}>
              {this.props.name}
            </Text>
          </Right>
        </ListItem>
        <ListItem style={styles.stylesDetailWhiteList}>
          <Left>
            <Text style={styles.stylesDetailGreyText}>Status</Text>
          </Left>
          <Right>
            <Text style={styles.stylesDetailBlackText}>
              {this.props.status}
            </Text>
          </Right>
        </ListItem>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  stylesDetailContainer: {
    flexDirection: 'row',
    flex: 0,
    borderTopWidth: 0.5,
    borderTopColor: '#f0f0f0'
  },
  stylesDetailContent: {
    height: 130,
    width: '100%',
    paddingLeft: 0,
    marginLeft: 0
  },
  stylesDetailPictureView: {
    flexDirection: 'column',
    width: '50%',
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  stylesDetailPictureText: {
    paddingTop: 10,
    fontSize: 18,
    fontWeight: '400',
    color: 'grey'
  },
  stylesDetailGreyText: {
    color: '#c0c0c0',
    fontSize: 16,
    fontWeight: '400',
    paddingLeft: 16
  },
  stylesDetailMoneyView: {
    width: '50%',
    height: 120,
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  stylesDetailDp: {
    height: 45,
    width: 45
  },
  stylesDetailWhiteList: {
    flex: 1,
    height: 65,
    width: '100%',
    paddingLeft: 0,
    marginLeft: 0,
    backgroundColor: '#FFF'
  },
  stylesDetailBlackText: {
    fontSize: 16,
    color: '#000'
  },
  stylesDetailRedText: {
    fontSize: 16,
    color: 'red',
    paddingLeft: 16
  },
  aboveAccordiondp: {
    height: 90,
    width: 90
  }
})
