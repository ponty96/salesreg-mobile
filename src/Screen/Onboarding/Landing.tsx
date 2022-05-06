import React, { PureComponent } from 'react'
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  ImageSourcePropType,
  Dimensions
} from 'react-native'
import ViewOverflow from 'react-native-view-overflow'

import ButtonAtom from '../../Atom/Form/ButtonAtom'
import { color } from '../../Style/Color'
import { DemiBoldText } from '../../Atom/TextAtom'
import StatusBarAtom from '../../Atom/StatusBarAtom'

interface IProps {
  navigation: any
}

interface IState {
  isFirstImage?: boolean
  isSecondImage?: boolean
  isThirdImage?: boolean
  currentFocusedElement: any
}

class LandingScreen extends PureComponent<IProps, IState> {
  private textScrollView: any
  private imageScrollview: any

  private LANDING_SCREEN_IMAGES: ImageSourcePropType[] = [
    require('../../../assets-v1/images/onboardingScreen/ecommerce.png'),
    require('../../../assets-v1/images/onboardingScreen/delivery.png'),
    require('../../../assets-v1/images/onboardingScreen/restock.png')
  ]

  private viewabilityConfig: object = { viewAreaCoveragePercentThreshold: 50 }

  private LANDING_SCREEN_TEXT = [
    {
      title: 'You now have your own \nE-commerce website',
      body:
        'Let customers view your products, make \npurchase and pay easily from anywhere'
    },
    {
      title: 'Package delivery \nto your customers',
      body:
        'Get items picked up and delivered to your \ncustomers, and get paid on delivery'
    },
    {
      title: 'Let customers always find \nwhat they need',
      body:
        'Keep your stocks up to date. Get restock \nreminders before they run out on you'
    }
  ]

  viewabilityImageChanged = (info: any): void => {
    if (this.state.currentFocusedElement == 'image') {
      const screenMessage: any = this.getScreenMessage(
        info.viewableItems[0].index
      )

      this.textScrollView.scrollToIndex({
        animated: true,
        index: info.viewableItems[0].index
      })

      this.setState({
        isFirstImage: screenMessage.isFirstImage,
        isSecondImage: screenMessage.isSecondImage,
        isThirdImage: screenMessage.isThirdImage
      })
    }
  }

  viewabilityTextChanged = (info: any): void => {
    if (this.state.currentFocusedElement == 'text') {
      const index = info.viewableItems[0].index

      const screenMessage: any = this.getScreenMessage(index)

      this.imageScrollview.scrollToIndex({
        animated: true,
        index: info.viewableItems[0].index,
        viewPosition: 1,
        viewOffset: index == 0 || index == 2 ? 0 : -70
      })

      this.setState({
        isFirstImage: screenMessage.isFirstImage,
        isSecondImage: screenMessage.isSecondImage,
        isThirdImage: screenMessage.isThirdImage
      })
    }
  }

  getScreenMessage = (screenIndex: number): object => {
    let message = {}

    switch (screenIndex) {
      case 0:
        message = {
          isFirstImage: true
        }
        break
      case 1:
        message = {
          isSecondImage: true
        }
        break
      case 2:
        message = {
          isThirdImage: true
        }
    }
    return message
  }

  state: IState = {
    isFirstImage: true,
    isSecondImage: false,
    isThirdImage: false,
    currentFocusedElement: null
  }

  render() {
    const { navigate } = this.props.navigation

    return (
      <View style={styles.container}>
        <StatusBarAtom backgroundColor={color.button} />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          style={{ height: 250 }}
          ref={ref => (this.imageScrollview = ref)}
          data={this.LANDING_SCREEN_IMAGES}
          renderItem={({ item, index }) => (
            <ViewOverflow
              style={{
                flex: 1,
                width: undefined,
                marginTop: 40,
                marginLeft: index == 0 ? -7 : 0,
                marginRight: index != 2 ? 15 : -7
              }}
            >
              <Image
                source={item}
                resizeMode="cover"
                style={{
                  flex: 1,
                  borderRadius: 5
                }}
              />
            </ViewOverflow>
          )}
          onScrollBeginDrag={() =>
            this.setState({ currentFocusedElement: 'image' })
          }
          keyExtractor={index => String(index)}
          onViewableItemsChanged={this.viewabilityImageChanged}
          viewabilityConfig={this.viewabilityConfig}
        />

        <View style={styles.indicatorsWrapper}>
          <View
            style={[
              styles.indicator,
              this.state.isFirstImage && styles.activeIndicator
            ]}
          />
          <View
            style={[
              styles.indicator,
              this.state.isSecondImage && styles.activeIndicator
            ]}
          />
          <View
            style={[
              styles.indicator,
              this.state.isThirdImage && styles.activeIndicator
            ]}
          />
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          ref={ref => (this.textScrollView = ref)}
          data={this.LANDING_SCREEN_TEXT}
          onScrollBeginDrag={() =>
            this.setState({ currentFocusedElement: 'text' })
          }
          renderItem={({ item }) => (
            <View style={{ width: Dimensions.get('window').width }}>
              <DemiBoldText style={[styles.haveAccount, styles.messageTitle]}>
                {item.title}
              </DemiBoldText>
              <DemiBoldText style={[styles.haveAccount, styles.messageBody]}>
                {item.body}
              </DemiBoldText>
            </View>
          )}
          keyExtractor={(item, index) => {
            item
            return String(index)
          }}
          onViewableItemsChanged={this.viewabilityTextChanged}
        />

        <ButtonAtom
          btnText="Get Started"
          onPress={() => navigate('Signup')}
          type="primary"
        />
        <DemiBoldText style={styles.haveAccount}>
          Already have an account?
        </DemiBoldText>
        <ButtonAtom
          btnText="LOGIN"
          transparent={true}
          onPress={() => navigate('Login')}
          type="secondary"
          hideIcon={true}
        />
      </View>
    )
  }
}

export default LandingScreen

const styles = StyleSheet.create({
  haveAccount: {
    marginTop: 32,
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
    fontFamily: 'AvenirNext-DemiBold'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 24,
    backgroundColor: color.button,
    paddingTop: 8
  },
  messageTitle: {
    fontSize: 18,
    marginBottom: 8,
    marginTop: 16
  },
  messageBody: {
    marginTop: 0,
    marginBottom: 36
  },
  indicator: {
    height: 8,
    width: 16,
    borderColor: color.active,
    borderRadius: 5,
    borderWidth: 1,
    marginRight: 8
  },
  indicatorsWrapper: {
    flexDirection: 'row',
    marginTop: 16
  },
  activeIndicator: {
    backgroundColor: color.secondary,
    borderColor: 'transparent'
  }
})
