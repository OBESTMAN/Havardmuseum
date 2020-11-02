import React from 'react';
import { StyleSheet, View, Text, Image, Button, Dimensions, Linking, ScrollView} from 'react-native';

export default function Detailspage({route}){

  const { item } = route.params;
  return (
    <View>
      <ScrollView>
        <View style={styles.logo}>
          {item.primaryimageurl != null ? (
              <Image
              style={styles.logo}
              source={{
                uri: item.primaryimageurl,
              }}
            />
            ) : (
              <View style={styles.noimage}>
                <Text style={{textAlign: 'center', alignItems:'center', color:'#fff'}}>No Image Found</Text>
              </View>
            )}

        </View>
        <View style={{width:400, height:50, flex:1, flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.titleText}>Art Info</Text>
          <Image source={(item.verificationlevel == 0 ? require('../assets/redcancel.png') : require('../assets/greentick.png'))} style={{width:20, height:20, marginTop: 20, marginLeft:5}}/>
        </View>
        <Text style={styles.divisionText}>{"medium: " + item.medium}</Text>
        <Text style={styles.divisionText}>{"Division: " + item.division}</Text>
        <Text style={styles.divisionText}>{"Artist: " +item.people[0]["displayname"]}</Text>
        <Text style={styles.titleText}>{(item.description != null ? "Description: " + item.description : " ")}</Text>
        <Text style={styles.titleText}>{(item.provenance != null ? "Provenance" : " ")}</Text>
        <Text style={styles.divisionText}>{item.provenance}</Text>
        <Button title = "Click for more info" style ={{marginTop:30}} onPress={ ()=>{ Linking.openURL(item.url)}}></Button>
      </ScrollView>

    </View>
    
  );
}

const styles = StyleSheet.create({
  noimage: {
    width: Dimensions.get('window').width,
    height: 260,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4D243D'
  },
  logo: {
    width: Dimensions.get('window').width,
    height: 260,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divisionText: {
    color: '#000',
    marginTop: 20,
    textAlign: 'center',
    fontSize: 15
  },
  titleText: {
    color: '#000',
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  }
});