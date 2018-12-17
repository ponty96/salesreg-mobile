import React, { PureComponent } from 'react'
import { color } from '../../Style/Color'
import ProfileListAtom from '../../Atom/ListItem/ExpandableListItemAtom'
import {
  StyleSheet,
  View,
  FlatList,
  Alert,
  Text,
  TouchableOpacity
} from 'react-native'
import { Icon } from 'native-base'
import { Mutation } from 'react-apollo'
import { DocumentNode } from 'graphql'
import AppSpinner from '../../Components/Spinner'
import CachedImageAtom from '../../Atom/CachedImageAtom'

interface Section {
  section: string
  value?: any
  type?: any
  onPress?: () => void
}

interface IProps {
  sections?: Section[]
  headerText: string
  headerSubText?: string
  image?: string
  enableDelete?: boolean
  graphqlDeleteMutation?: DocumentNode
  graphqlDeleteMutationResultKey?: string
  graphqlDeleteVariables?: object
  graphqlRefetchQueries?: any[]
  onSuccessfulDeletion?: () => void
}

export default class GenericProfileDetails extends PureComponent<IProps> {
  static defaultProps = {
    enableDelete: false
  }

  onDeleteCompleted = async res => {
    const { graphqlDeleteMutationResultKey } = this.props,
      {
        [graphqlDeleteMutationResultKey]: { success, fieldErrors }
      } = res

    if (!success) {
      setTimeout(
        () =>
          Alert.alert(
            'Error',
            fieldErrors[0].message,
            [{ text: 'Ok', onPress: () => null }],
            { cancelable: false }
          ),
        100
      )
    } else {
      console.log('Yeah this is good ', success)
      this.props.onSuccessfulDeletion()
    }
  }

  renderProfileDetailsUI = (deleteFn?: ({ variables: any }) => void) => {
    return (
      <React.Fragment>
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
        {this.props.enableDelete && (
          <TouchableOpacity
            style={{
              backgroundColor: 'transparent',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={() =>
              deleteFn({ variables: this.props.graphqlDeleteVariables })
            }
          >
            <Icon
              type="EvilIcons"
              name="trash"
              style={{ color: color.textBorderBottom, fontSize: 60 }}
            />
          </TouchableOpacity>
        )}
      </React.Fragment>
    )
  }

  render() {
    let {
      enableDelete,
      graphqlDeleteMutation,
      graphqlRefetchQueries
    } = this.props

    if (enableDelete) {
      return (
        <Mutation
          mutation={graphqlDeleteMutation}
          refetchQueries={graphqlRefetchQueries || []}
          awaitRefetchQueries={true}
          onCompleted={this.onDeleteCompleted}
        >
          {(deleteDetails, { loading }) => {
            return (
              <React.Fragment>
                <AppSpinner visible={loading} />
                {this.renderProfileDetailsUI(deleteDetails)}
              </React.Fragment>
            )
          }}
        </Mutation>
      )
    }
    return this.renderProfileDetailsUI()
  }

  renderItem = ({ item, index }: any) => {
    if (index == 0) {
      return (
        <View style={styles.pictureView}>
          <CachedImageAtom
            uri={this.props.image || ''}
            style={{ width: '100%', height: 280, borderRadius: 0 }}
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
          type={item.type}
          onPress={item.onPress}
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
