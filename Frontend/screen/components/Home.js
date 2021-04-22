import React, { Component } from 'react';
import { Text, ScrollView,StyleSheet, View,Button } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../../shared/baseUrl';
import { Loading } from './Loading';



const mapStateToProps = state => {
    return {
      computers: state.computers
 
    }
  }

function RenderItem(props) {
    
    const item = props.item;



    if (props.isLoading) {
        return(
                <Loading />
        );
    }
    else if (props.errMess) {
        return(
            <View> 
                <Text>{this.props.erreMess}</Text>
            </View>
        );
    }
    else {        
        if (item != null) {
            return(
                <Card>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Divider/>
                    <Card.Image source={item.image} style={styles.image}/>
                    <Text style={{margin: 10}}>
                        Brand: {item.brand} {'\n'}
                        From: ${item.price} {'\n'}
                        {item.description}
                        
                    </Text>
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
    }
}

class Home extends Component {


    render() {



        return(
            // <ScrollView>
            //     <RenderItem item={this.props.computers.computers[0]}
            //         isLoading={this.props.computers.isLoading}
            //         erreMess={this.props.computers.erreMess} 
            //         />
            // </ScrollView>
            <ScrollView>
            {this.props.computers.computers.map((computer)=>
            
                                    
                                                            <RenderItem item={computer}
                                                                isLoading={computer.isLoading}
                                                                errMess={computer.erreMess}
                                                                key={computer._id}
                                                                />)}
            
            </ScrollView>
        );
    }
}


export default connect(mapStateToProps)(Home);


const styles = StyleSheet.create({
    image: {
		width      : null,
		resizeMode : 'contain',
		height     : 220
    }
});



