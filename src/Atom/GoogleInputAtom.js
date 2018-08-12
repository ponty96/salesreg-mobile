import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { color } from '../Style/Color';

class GoogleInputAtom extends React.Component {
  render() {
    return (
      <GooglePlacesAutocomplete
        placeholder={this.props.label} // "City, State"
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        listViewDisplayed="auto" // true/false/undefined
        fetchDetails={true}
        renderDescription={row =>
          row.description || row.vicinity || row.formatted_address || row.name
        } // custom description render
        onPress={(data, details) => {
          console.log('ON PRESS HANDLER DATA', data);
          console.log('ON PRESS HANDLER DETAILS', details);
        }}
        onChangeText={text => this.props.getValue(text)}
        getDefaultValue={() => {
          return ''; // text input default value
        }}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: 'AIzaSyD8Q3_2x4OPmtwLThWkKS5RgMlN0xx-maI',
          language: 'en' // language of the results
          // types: '(cities)' // default: 'geocode'
        }}
        styles={{
          placeholder: {
            color: color.inactive,
            fontFamily: 'SourceSansPro'
          },
          description: {
            fontWeight: 'bold',
            fontFamily: 'SourceSansPro'
          },
          textInputContainer: {
            backgroundColor: 'rgba(0,0,0,0)',
            borderTopWidth: 0,
            borderBottomWidth: 0,
            height: 45,
            marginHorizontal: 1,
            marginBottom: 10,
            borderBottomColor: color.textBorderBottom
          },
          textInput: {
            marginLeft: 0,
            marginRight: 0,
            height: 38,
            color: 'black',
            fontSize: 16,
            fontFamily: 'SourceSansPro',
            borderBottomWidth: 1.5,
            borderBottomColor: color.textBorderBottom
          },
          predefinedPlacesDescription: {
            color: color.button,
            fontFamily: 'SourceSansPro'
          }
        }}
        // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        // currentLocationLabel="Current location"
        nearbyPlacesAPI="GoogleReverseGeocoding" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={{
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          rankby: 'distance',
          types: 'food'
        }}
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          types: 'food'
        }}
        filterReverseGeocodingByTypes={[
          'locality',
          'administrative_area_level_3'
        ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        debounce={200}
      />
    );
  }
}

export default GoogleInputAtom;
