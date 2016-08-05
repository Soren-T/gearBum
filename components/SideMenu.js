import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  TextInput
} from 'react-native';
import homeStyles from '../CSS/HomeStyle';
import {serverUrl} from '../constants/serverConstants';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleFalse: false
    };
  }

  _navigate(name, display) {
    this.props.navigator.push({
      name: name,
      passProps: {
        name: name,
        display: display
      }
    })
  }

  logout() {
    console.log('PROPS OF SIDE MENU', this.props.navigator.setEmail)
   var self = this
   this.props.setEmail(null);
    fetch(serverUrl + "/api/v1/logout", {method: "GET"})
      .then(() => this._navigate('Login'))
  }

  render() {
    return (
      <View style={ homeStyles.sideMenu }>
      <View style={ homeStyles.sideMenuIconContainer }>
       <Image
          source={require('../img/whiteGear.png')} 
          style={ homeStyles.sideMenuIcon } 
        />
      </View>
        <View style={ homeStyles.sideMenuContainer }>
          <TouchableOpacity 
            onPress={ () => this._navigate('ProfilePage', true)}  
            style={ homeStyles.sideMenuLinks }>
            <Text style={ homeStyles.sideMenuText }>
              My Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={ () => this._navigate('ProfilePage', false)}  
            style={ homeStyles.sideMenuLinks }>
              <Text style={ homeStyles.sideMenuText }>
                Account Settings
              </Text>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={ () => this._navigate('SearchGear')}  
          style={ homeStyles.sideMenuLinks }>
            <Text style={ homeStyles.sideMenuText }>
              Search Gear
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={ () => this._navigate('Post')}  
          style={ homeStyles.sideMenuLinks }>
            <Text style={ homeStyles.sideMenuText }>
              Rent Gear
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={ () => this.logout()}  
          style={ homeStyles.sideMenuLinks }>
            <Text style={ homeStyles.sideMenuText }>
              Logout
            </Text>
          </TouchableOpacity>
         </View> 
      </View>
    );
  }
}

module.exports = Menu