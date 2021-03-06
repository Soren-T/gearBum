import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Image,
  AlertIOS,
  ScrollView,
} from 'react-native';
import findGearStyles from '../CSS/FindGearStyles';
import loginPostStyles from '../CSS/LoginPostStyle';
import filterStyles from '../CSS/FilterStyles';
import homeStyles from '../CSS/HomeStyle';
import {serverUrl} from '../constants/serverConstants';

class FilterGear extends Component {

  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  _navigate(name,equipid) {
    this.props.navigator.push({
      name: name,
      passProps: {
        name: name,
        equipid,
      }
    })
  }

  _onPressButtonGet(category){
    var self = this
    fetch(serverUrl + "/api/v1/equip/category/" + category , {method: "GET"})
      .then((response) => response.json())
      .then((responseData) => {
        self.setState({results: responseData})
      })
  }

  toSelectedListing(equipid) {
    this._navigate('SelectedListing', equipid)
  }

  display(){
    if (this.state.results.length === 0){
      return (
        <View style={ filterStyles.picMenu }>
          <TouchableOpacity style={ filterStyles.picBtn } onPress={() => this._onPressButtonGet('Bike')}>
            <Image 
              style={ filterStyles.pic }
              source={require('../img/sports.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={ filterStyles.picBtn } onPress={() => this._onPressButtonGet('Snow')}>  
            <Image 
              style={ filterStyles.pic }
              source={require('../img/ski-lift.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={ filterStyles.picBtn } onPress={() => this._onPressButtonGet('Camp')}>    
            <Image 
              style={ filterStyles.pic }
              source={require('../img/night-camping.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={ filterStyles.picBtn } onPress={() => this._onPressButtonGet('Boat')}>
            <Image 
              style={ filterStyles.pic }
              source={require('../img/boat.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={ filterStyles.picBtn } onPress={() => this._onPressButtonGet('Golf')}>
            <Image 
              style={ filterStyles.pic }
              source={require('../img/golf.png')}
            />
          </TouchableOpacity>
          <View style={ filterStyles.picBtn }>
            <TouchableOpacity onPress={()=> this.props.toggleFxn()}>
              <Image 
                style={ filterStyles.pic }
                source={require('../img/blackGear.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      )
    } else {
      return (
        <View style={ findGearStyles.resultsContainer }>
          <View style={ filterStyles.backBtnContainer }>
            <TouchableOpacity
              style={ filterStyles.backBtn } 
              onPress={()=> this.setState({results: []})}>
              <Text style={ homeStyles.textWhite }>
                Back
              </Text>
            </TouchableOpacity>
          </View>
          <View style={ findGearStyles.resultsItemsContainer }>  
            {this.state.results.map((equipment)=>{
              var thumbNail = equipment.photos.split(' ')
              return (
                <TouchableOpacity
                  style={ findGearStyles.resultsTouch } 
                  onPress={()=> this.toSelectedListing(equipment.equipid)}
                  key={`touch-${equipment.equipid}`}>
                    <Image
                      key={`image-${equipment.equipid}`}
                      style={ findGearStyles.resultsImg }
                      source={{uri: thumbNail[0]}}>
                      <Text 
                        style={ findGearStyles.resultsText }
                        key={equipment.equipid}>
                        {equipment.location} {equipment.price}                     
                        {'\n'}
                      </Text>
                    </Image>
                </TouchableOpacity>
              )
            })}
          </View> 
        </View>
      )
    }
  }

  render(){
    return (
      <View style={ filterStyles.mainFilter}>
        {this.display()}
      </View>
    )
  }
} 

module.exports = FilterGear