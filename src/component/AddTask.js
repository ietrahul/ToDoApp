import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import GridData from './GridData'

class AddTask extends Component {
   state = {
      task: '',
      taskList: [],
      data: [],
      isCompleted: 'false'
     }

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

   componentDidMount = () =>{
    let taskList = [];
   // AsyncStorage.removeItem('taskList');
    AsyncStorage.getItem('taskList').then((value) => {
     if(value) {
         console.log('Mount1--',value);
         //taskList = value
         taskList = JSON.parse(value);
         this.setState({ taskList: taskList}, () => {
            this.filterTask(this.state.isCompleted); 
         })
        // this.filterTask(this.state.isCompleted);
         //console.log('mount22--',taskList)     
     }
     }) ;
       //console.log('000--',this.state.taskList);
   }

   handleTask = (text) => {
      this.setState({ task: text })
   }

   capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }

   addTask = (task) => {
      //alert('task: ' + task);
      let taskStr = this.capitalize(task);
      let newTask = {taskName: taskStr , isCompleted: "false", key:  taskStr };
     // console.log('newTask:--'+newTask);
      let taskList = [];
       AsyncStorage.getItem('taskList').then((value) => {
        if(value) {
            //console.log('1--',value);
            //taskList = value
            taskList = JSON.parse(value);
            //console.log('2--',taskList);
            
           
        }
        //console.log('3--',task);
        taskList.push(newTask);
        //console.log('4--',taskList);
        //AsyncStorage.setItem('taskList', JSON.stringify(taskList));
        //  AsyncStorage.setItem('taskList', JSON.stringify(taskList) )
        //     .then( ()=>{
        //     this.setState({ task: '', taskList: taskList, data: taskList});
        //     console.log('It was saved successfully')
        //     } )
        //     .catch( (e)=>{
        //     console.log('There was an error saving the product--',e)
        //     } )   
        this.updateAsynStorage(taskList, 'false');
        }) ;
      
   }

   updateAsynStorage = (taskList, isCompleted) => {
        AsyncStorage.setItem('taskList', JSON.stringify(taskList) )
            .then( ()=>{
            this.setState({ task: '', taskList: taskList}, () => {
                this.filterTask(isCompleted);
            });
            console.log('It was saved successfully')
            } )
            .catch( (e)=>{
            console.log('There was an error saving the product--',e)
        } )  

        //this.filterTask(isCompleted);
   }

   filterTask = (isCompleted) => {
     console.log('Inside filterTask--', isCompleted );
     const taskList = this.state.taskList;
     let data = [];
     if(isCompleted === 'none'){
      data = taskList; 
     } else {
     taskList.forEach( function(task){
      console.log('22--', task.isCompleted );
       if(task.isCompleted === isCompleted){
        console.log('33--', task );
         data.push(task);
       }
     })
    }
    console.log('44--',data);
     this.setState({data: data, isCompleted: isCompleted});
   }

   markTaskComplete = (taskName) => {
    console.log('markTaskComplete--', taskName );
    const taskList = this.state.taskList;
     //let data = [];
     taskList.forEach( function(task){
      console.log('markTaskComplete 22--', task.key );
       if(task.key === taskName){
        console.log('markTaskComplete 33--', task );
        task.isCompleted = "true";
         //data.push(task);
       }
     })

     console.log("markTaskComplete taskList--", taskList);
     this.setState({ taskList: taskList}, () => {
         console.log('this.state.isCompleted--:', this.state.isCompleted);
          //this.filterTask(this.state.isCompleted);
          this.updateAsynStorage(taskList, this.state.isCompleted);
       }
    );
    
     
  }

  deleteTask = (taskName) => {
    console.log('deleteTask--', taskName );
    const taskList = this.state.taskList;
    let indexDelete = -1;
     //let data = [];
     taskList.forEach( function(task, index){
      console.log('deleteTask 22--', task.key );
       if(task.key === taskName){
        indexDelete = index;
         //data.push(task);
       }
     })

     if (indexDelete !== -1) {
      taskList.splice(indexDelete, 1);
     }
     console.log("deleteTask taskList--", taskList);
     this.setState({ taskList: taskList, data: taskList});
     this.updateAsynStorage(taskList, this.state.isCompleted);
  }


   render() {
    console.log('111--'+this.state.taskList+'**'+ Object.keys(this.state.taskList).length);
    console.log('222--'+this.state.data+'**'+ Object.keys(this.state.data).length);
      return (
         <View style = {styles.container}>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Task name"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               value={this.state.task}
               onChangeText = {this.handleTask} />           
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.addTask(this.state.task)
               }>
               <Text style = {styles.submitButtonText}> Add Task </Text>
            </TouchableOpacity>
                <View style = {styles.menuContainer}>
                <TouchableOpacity
                  style = {styles.menuButton}
                  onPress = {
                      () => this.filterTask('false')
                  }>
                  <Text style = {styles.submitButtonText}> Pending </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style = {styles.menuButton}
                  onPress = {
                      () => this.filterTask('true')
                  }>
                  <Text style = {styles.submitButtonText}> Completed </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style = {styles.menuButton}
                  onPress = {
                      () => this.filterTask('none')
                  }>
                  <Text style = {styles.submitButtonText}> All Tasks</Text>
                </TouchableOpacity>
                </View>
                {/* <View style = {styles.gridContainer}> */}
                   <GridData  data={this.state.data} markTaskComplete={this.markTaskComplete} deleteTask={this.deleteTask}/>
                {/* </View> */}
          </View>
      )
   }
}

export default AddTask

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingTop: 20,
      backgroundColor: '#F5FCFF',
      justifyContent: 'center',
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      color: 'white',
      justifyContent: 'center',
   },
   menuContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      margin: 15,
   },
   menuButton: {
      backgroundColor: '#7a42f4',
      height: 30,
      padding: 10,
      justifyContent: 'center',
      borderLeftColor: '#F5FCFF',
      borderLeftWidth: 5,
      borderRightColor: '#F5FCFF',
      borderRightWidth: 5,
 }, 
   gridContainer: {
       margin: 5,
},

})