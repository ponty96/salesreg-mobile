import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import StarRating from 'react-native-star-rating'

interface IState {
  value: string
  starCount: number
}

class GoldRatings extends React.Component<any, IState> {
  constructor(props?: IState) {
    super(props)
    this.state = {
      starCount: 0,
      value: ''
    }
  }

  onStarRatingPress(rating: number) {
    /*switch (rating) {
      case 1: {
        this.setState({
          starCount: rating,
          value: 'Terrible'
        })
      }
      break
      case 2: {
        this.setState({
          starCount: rating,
          value: 'Not so bad'
        })
      }
      break
      case 3: {
        this.setState({
          starCount: rating,
          value: 'Good'
        })
      }
      break
      case 4: {
        this.setState({
          starCount: rating,
          value: 'Very good'
        })
      }
      break
      case 5: {
        this.setState({
          starCount: rating,
          value: 'Amazing!!!'
        })
      }
      break
      default: {}
    }*/

    if (rating === 1) {
      this.setState({
        starCount: rating,
        value: 'Terrible'
      })
    } else if (rating === 2) {
      this.setState({
        starCount: rating,
        value: 'Not so Bad'
      })
    } else if (rating === 3) {
      this.setState({
        starCount: rating,
        value: 'Good!'
      })
    } else if (rating === 4) {
      this.setState({
        starCount: rating,
        value: 'Very Good!!'
      })
    } else if (rating === 5) {
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
