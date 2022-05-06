import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import StarRating from 'react-native-star-rating'

import { RegularText } from './TextAtom'
import { color } from '../Style/Color'

interface IProps {
  showText: boolean | true
}

class GoldRatings extends React.Component<IProps, any> {
  state = {
    starCount: 0,
    value: ''
  }

  onStarRatingPress(rating: number) {
    switch (rating) {
      case 1:
        {
          this.setState({
            starCount: rating,
            value: 'Terrible'
          })
        }
        break
      case 2:
        {
          this.setState({
            starCount: rating,
            value: 'Not so bad'
          })
        }
        break
      case 3:
        {
          this.setState({
            starCount: rating,
            value: 'Good'
          })
        }
        break
      case 4:
        {
          this.setState({
            starCount: rating,
            value: 'Very good'
          })
        }
        break
      case 5:
        {
          this.setState({
            starCount: rating,
            value: 'Amazing!!!'
          })
        }
        break
      default:
        break
    }
  }

  render() {
    return (
      <View style={styles.goldRatingsContainer}>
        {this.props.showText && (
          <RegularText style={styles.addText}> {this.state.value} </RegularText>
        )}
        <StarRating
          disabled={false}
          fullStarColor={color.selling} // "#FFDF00"
          maxStars={5}
          rating={this.state.starCount}
          selectedStar={(rating: number) => this.onStarRatingPress(rating)}
          starSize={14}
        />
      </View>
    )
  }
}

export default GoldRatings

const styles = StyleSheet.create({
  goldRatingsContainer: {
    alignSelf: 'center',
    justifyContent: 'center'
  },
  addText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#FFDF00',
    fontWeight: '400',
    paddingBottom: 10
  }
})
