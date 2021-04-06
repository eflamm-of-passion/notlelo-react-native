import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal, SafeAreaView } from 'react-native';
import Svg, { Path, Polyline, Line } from 'react-native-svg';
import ViewPager from '@react-native-community/viewpager';
import EventService from './EventService';
import i18n from './i18n';


export default function LibraryScreen() {
  const [productList, setProductList] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = useCallback(async () => {
    const flatProductList = await EventService.getProducts();
    const productList = deserializeFlatProductList(flatProductList);
    setProductList(productList);
  }, []);

  const deserializeFlatProductList = (flatProductList) => {
    const eventMap = new Map();
    for(const flatProduct of flatProductList) {
      const mealMap = eventMap.get(flatProduct.event);
      if(mealMap) {
        const product = deserializeProduct(flatProduct); 
        const productList = mealMap.get(flatProduct.meal);
        if(productList) {
          productList.push(product);
          mealMap.set(flatProduct.meal, productList);
        } else {
          // the meal does not exist
          mealMap.set(flatProduct.meal, [product]);
        }
        eventMap.set(flatProduct.event, mealMap);
      } else {
        // the event does not exist
        const product = deserializeProduct(flatProduct);
        const newMealMap = new Map();
        newMealMap.set(flatProduct.meal, [product]);
        eventMap.set(flatProduct.event, newMealMap);
      }
    }
    return eventMap;
  }

  const deserializeProduct = (flatProduct) => {
    return {
      uuid: flatProduct.uuid,
      name: flatProduct.name,
      photos: flatProduct.photos,
      date: flatProduct.date
    }
  }

  const deleteProduct = async (product) => {
    await EventService.removeProduct(product);
    fetchProducts();
  }

  const shareEvent = async (event) => {
    await EventService.shareEvent(event);
  }

  const displayProducts = (products) => {
    return products.map(product => (
      <View style={styles.productContainer} key={Math.random()}>
        <View style={styles.productTitle}>
          <Text style={styles.productTitleText}>{product.name}</Text>
          <TouchableOpacity style={styles.deleteProductButton} onPress={() => deleteProduct(product)}>
            <Svg fill="none" stroke="red" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
              <Polyline points="3 6 5 6 21 6"/><Path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><Line x1="10" x2="10" y1="11" y2="17"/><Line x1="14" x2="14" y1="11" y2="17"/>
            </Svg>
          </TouchableOpacity>
        </View>
        <View style={styles.photoList}>
          {displayPhotos(product.photos)}
        </View>
      </View>
    ));
  }

  const displayPhotos = (photoList) => {
    
    return photoList ? photoList.map(photo => 
      <TouchableOpacity key={Math.random()} onPress={() => setSelectedPhoto(photo)}>
        <Image style={styles.photo} source={{uri: photo.uri}}/> 
      </TouchableOpacity>
      ) : null
  }

  const displayModal = () => {
    return  <Modal animationType="slide" transparent={true} visible={selectedPhoto != null}>
              <View style={styles.modalView}>
                { selectedPhoto
                  ? <Image style={styles.modalPhoto} source={{uri: selectedPhoto.uri}}/>
                  : null }
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalCloseButton]}
                  onPress={() => setSelectedPhoto(null)}
                ><Text style={styles.modalButtonText}>{i18n.t('library.close')}</Text></TouchableOpacity>
              </View>
            </Modal>
  }

  const displayMeals = (mealMap) => {
    const mealList = [];
    for(const [mealName, products] of mealMap) {
      mealList.push({name: mealName, products: products});
    }
    return mealList.map(meal => (
      <View style={styles.mealContainer} key={Math.random()}>
        <Text style={styles.mealTitle}>{meal.name}</Text>
        {displayProducts(meal.products)}
      </View>
    ));
  }

  const displayEvents = (eventMap) => {
    const eventList = [];
    for(const [eventName, mealMap] of eventMap) {
      eventList.push({name: eventName, mealMap: mealMap});
    }
    return eventList.map(event => (
      <View style={styles.eventContainer} key={Math.random()}>
        <View style={styles.eventTitle}>
          <Text  style={styles.eventTitleText}>{event.name}</Text>
          <TouchableOpacity style={styles.compressEventButton} onPress={() => shareEvent(event.name)}>
            <Svg viewBox="0 0 384.973 384.973" style="enable-background:new 0 0 384.973 384.973;" fill="white">
              <Path d="M103.751,256.682h24.241c16.866-95.677,100.2-168.424,200.714-168.424c4.211,0,8.217,0.036,12.259,0.072l-44.079,44.067 c-4.704,4.704-4.704,12.307,0,17.011c2.346,2.346,5.426,3.525,8.505,3.525s6.16-1.179,8.505-3.525l71.075-72.94l-71.063-72.94 c-4.704-4.704-12.307-4.704-17.011,0c-4.704,4.704-4.704,12.307,0,17.011l43.682,43.682c-3.826-0.012-7.459-0.036-11.369-0.036 C215.284,64.197,121.099,147.627,103.751,256.682z"/>
              <Path d="M348.88,180.458c-6.641,0-12.03,5.39-12.03,12.03v168.424H24.062V120.306h108.273c6.641,0,12.03-5.39,12.03-12.03 c0-6.641-5.39-12.03-12.03-12.03h-0.361H24.062c-13.281,0-24.061,10.779-24.061,24.061v240.606 c0,13.281,10.779,24.061,24.061,24.061H336.85c13.281,0,24.061-10.779,24.061-24.061V192.488 C360.911,185.847,355.521,180.458,348.88,180.458z"/>
            </Svg>
          </TouchableOpacity>
        </View>
        {displayMeals(event.mealMap)}
        {displayModal()}
      </View>
    ));
  }

  return (
      <SafeAreaView style={styles.container}>
          <ViewPager style={styles.viewPager} initialPage={0}>
              {productList.size ? displayEvents(productList) : null}
          </ViewPager>
      </SafeAreaView>
  );

}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    eventTitle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#003a5d'
    },
    eventTitleText: {
      paddingTop: 20,
      paddingLeft: 10,
      color: 'white',
      textTransform: 'uppercase',
      fontSize: 40,
      letterSpacing: 8,
    },
    viewPager: {
      flex: 1
    },
    eventContainer: {
        
    },
    mealContainer: {
        
    },
    mealTitle: {
      fontSize: 25,
      paddingLeft: 40,
      letterSpacing: 3,
      color: '#404040',
      textTransform: 'uppercase'   
    },
    productContainer: {
        
    },
    productTitle: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    productTitleText: {
      fontSize: 20,
      paddingLeft: 80,
      letterSpacing: 1,
      color: '#404040',
    },
    photoList: {
      flexWrap: 'wrap',
      flexDirection: 'row',
    },  
    photo: {
        width: 120,
        height: 120,
        marginTop: 10,
        marginLeft: 10,
        borderRadius: 5,
    },
    modalView: {
      flex: 1,
      marginTop: 100,
      alignItems: "center",

    },
    modalPhoto: {
      flex: 1,
      width: '100%',
      marginBottom: 10,
      borderRadius: 5
    },
    modalButton: {
      marginRight: 10,
      padding: 10,
      borderRadius: 5
    },
    modalCloseButton: {
      backgroundColor: 'red'
    },
    modalButtonText: {
      color: 'white',
      textTransform: 'uppercase'
    },
    deleteProductButton: {
      width: 30,
      height: 30,
      marginLeft: 10,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    compressEventButton: {
      alignSelf : 'center',
      width: 35,
      height: 35,
      marginTop: 10,
      marginRight: 20,
      justifyContent: 'center',
      alignItems: 'center',
    }
});