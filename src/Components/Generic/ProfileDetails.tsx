import React, { PureComponent } from 'react'
import { color } from '../../Style/Color'
import ProfileListAtom from '../../Atom/ListItem/ExpandableListItemAtom'
import { StyleSheet, View, FlatList, Image, Text } from 'react-native'

interface Section {
  section: string
  value?: any
}
interface IProps {
  sections?: Section[]
  headerText: string
  headerSubText?: string
  image?: string
}

export default class GenericProfileDetails extends PureComponent<IProps> {
  render() {
    return (
      <FlatList
        data={[
          { section: 'a', value: '' },
          { section: 'b', value: '' },
          ...this.props.sections
        ]}
        renderItem={this.renderItem}
        keyExtractor={item => item.section}
        stickyHeaderIndices={[1]}
        style={{ flex: 1, backgroundColor: '#fff' }}
      />
    )
  }

  renderItem = ({ item, index }: any) => {
    if (index == 0) {
      return (
        <View style={styles.pictureView}>
          <Image
            source={{
              uri:
                this.props.image ||
                'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7'
            }}
            style={{ width: '100%', height: 280 }}
          />
        </View>
      )
    } else if (index == 1) {
      return (
        <View style={styles.textView}>
          <Text style={styles.headerText}>{this.props.headerText}</Text>
          <Text style={styles.headerSubText}>{this.props.headerSubText}</Text>
        </View>
      )
    } else {
      return (
        <ProfileListAtom
          section={item.section}
          value={item.value}
          iconName={item.icon}
          body={item.body}
        />
      )
    }
  }
}

const styles = StyleSheet.create({
  pictureView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  textView: {
    backgroundColor: color.selling,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24
  },
  headerText: {
    fontSize: 16,
    fontFamily: 'AvenirNext-Regular',
    color: '#fff',
    padding: 0
  },
  headerSubText: {
    fontSize: 24,
    fontFamily: 'AvenirNext-Bold',
    color: '#fff',
    marginTop: 6,
    padding: 0
  }
})
