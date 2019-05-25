import React, { Component } from 'react'
import { FlatList, View, Text, TouchableHighlight, StyleSheet, Button, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class GridData extends Component {

     renderSeparator = () => {  
      return (  
          <View  
              style={{  
                  height: 1,  
                  width: "100%",  
                  backgroundColor: "#000",  
              }}  
          />  
      );  
    }

    markTaskComplete = () => {
        console.log('in Grid markTaskComplete--' );
    }

    deleteTask = () => {
        console.log('deleteTask--' );
    }


   render() {
       console.log("In Grid data component");
      return (
            <FlatList
               data={this.props.data}
               keyExtractor={(item, index) => item.index}
               renderItem = {( {item} ) => {
                //console.log(item)
                //console.log(item.key)
                return ( 
                <View style={styles.flatview}>
                   <Text style={styles.name}>{item.key}</Text>
                   <View style={styles.button}>
                { item.isCompleted === 'false' &&
                    <TouchableHighlight  onPress= {() => this.props.markTaskComplete(item.key)}>
                    <Image
                        
                        source={require('../assets/icons8-checkmark-48.png')}
                    />
                    </TouchableHighlight>
                }
                    
                    <TouchableHighlight  onPress= {() => this.props.deleteTask(item.key)}>
                    <Image
                        
                        source={require('../assets/icons8-cancel-48.png')}
                    />
                    </TouchableHighlight>
                    </View>
                </View>)
               }}
               ItemSeparatorComponent={this.renderSeparator}     
            />
      )
   }
}

export default GridData

const styles = StyleSheet.create({
   flatview: {
    padding: 10,
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Verdana', 
    fontSize: 16,   
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    
  }
})