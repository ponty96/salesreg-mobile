import React from 'react'
import { View, Text } from 'react-native'
import StarRating from 'react-native-star-rating'

import styles from './../Style/Layout'

class GoldRatings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      starCount: 0,
      value: ''
    }
  }

  onStarRatingPress(rating) {
    if (rating == 1) {
      this.setState({
        starCount: rating,
        value: 'Terrible'
      })
    } else if (rating == 2) {
      this.setState({
        starCount: rating,
        value: 'Not so Bad'
      })
    } else if (rating == 3) {
      this.setState({
        starCount: rating,
        value: 'Good!'
      })
    } else if (rating == 4) {
      this.setState({
        starCount: rating,
        value: 'Very Good!!'
      })
    } else if (rating == 5) {
      this.setState({
        starCount: rating,
        value: 'Amazing!!!'
      })
    }
  }

  render() {
    return (
      <View style={styles.goldRatingsContainer}>
        <Text style={styles.addText}> {this.state.value} </Text>
        <StarRating
          disabled={false}
          fullStarColor="#FFDF00"
          maxStars={5}
          rating={this.state.starCount}
          selectedStar={rating => this.onStarRatingPress(rating)}
          starSize={14}
        />
      </View>
    )
  }
}

export default GoldRatings
