import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity,Image } from 'react-native';

const axios = require('axios');

const formatData = (data, numColumns) => {
  const totalRows = Math.floor(data.length / numColumns);

  let totalLastRow = data.length - (totalRows * numColumns);
  while (totalLastRow !== numColumns && totalLastRow !== 0) {
    data.push({ key: `blank-${totalLastRow}`, empty: true });
    totalLastRow++;
  }

  return data;
};

const numColumns = 2;


export default function Homepage({navigation}) {


    const [info,setInfo] = useState([]);

    function getInfo(){
      axios.get('https://api.harvardartmuseums.org/object?apikey=f317d3b0-a5b2-48f1-9723-6c0b2798bc47').then(resp => {
        setInfo(resp.data.records);
      });
    }

    useEffect(()=>{
      getInfo()
    },[])

    const presshandler = (item) =>{
      navigation.navigate('Details',{
        item: item
      });
    }

    if(!info){
      return null
    }
    
    return (
      <FlatList
        data={formatData(info, numColumns)}
        style={styles.container}
        renderItem={({ item }) => {  
          if (item.empty === true) {
          return <View style={[styles.item, styles.itemInvisible]} />;
          }
          return (
          <TouchableOpacity style={styles.item} onPress = {() => presshandler(item)}>
            <View style={styles.item}>
              <Text style={styles.itemText}>{item.title}</Text>
              
              {item.primaryimageurl != null ? (
                <Image
                style={styles.logo}
                source={{
                  uri: item.primaryimageurl,
                }}
              />
              ) : (
                <View style={styles.logo}>
                  <Text style={{textAlign: 'center', alignItems:'center', color:'#fff'}}>No Image Found</Text>
                </View>
              )}
              
  
              <Text style={styles.bottomText}>{item.people[0]["displayname"]}</Text>
              <Text style={styles.bottomText}>{item.people[0]["culture"]}</Text>
  
            </View>
          </TouchableOpacity>
          )}}
          numColumns={numColumns}
      />
    );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5
  },
  item: {
    backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 5,
    height: 335
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
    textAlign: 'center'
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 20,
    justifyContent:'center'
  },
  bottomText: {
    color: '#fff',
    marginTop: 20,
    textAlign: 'center'
  }
});