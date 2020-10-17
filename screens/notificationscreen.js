import React,{Component}from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    FlatList} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import Myheader from '../components/header';
import {ListItem} from 'react-native-elements'
export default class NotificationScreen extends Component{
    constructor(){
        super();
        this.state={
            emailid:firebase.auth().currentUser().email(),
allnotifications:[],

        }
        this.notificationref=null;
    }
    getnotifications=()=>{
        this.requestref = db.collection("allnotifications").where("notificationstatus", "==", "unread")
        .where("targeteduserid",'==',this.state.emaild).onSnapshot((snapshot)=>
        { var allNotifications = [] 
            snapshot.docs.map((doc) =>
            { var notification = doc.data()
                 notification["docid"] = doc.id 
                 allNotifications.push(notification) });
                  this.setState({ allnotifications : allNotifications }); 
                }) 
            }
componentDidMount(){
    this.getnotifications();
}
componentWillUnmount(){
this.notificationref();
}
keyExtractor = (item, index) => index.toString()
 renderItem = ({item,index}) =>
 { return ( 
 <ListItem key={index}
  leftElement={<Icon name="book" 
  type="font-awesome"
   color ='#696969'/>}
    title={item.bookname} 
    titleStyle={{ color: 'black', 
    fontWeight: 'bold' }}
 subtitle={item.message} bottomDivider /> ) }
    render(){
        return(
            <View style={{flex:1}}>

<View style={{flex:0.1}}>
     <MyHeader title={"notifications"} navigation={this.props.navigation}/> </View>

            </View>
        )
    }
}