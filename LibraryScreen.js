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

  const displayProducts = (products) => {
    return products.map(product => (
      <View style={styles.productContainer} key={Math.random()}>
        <Text style={styles.productTitle}>{product.name}</Text>
        <View style={styles.photoList}>
          {displayPhotos(product.photos)}
        </View>
        <TouchableOpacity key={Math.random()} style={styles.deleteProductButton} onPress={() => deleteProduct(product)}>
          <Svg fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
            <Polyline points="3 6 5 6 21 6"/><Path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><Line x1="10" x2="10" y1="11" y2="17"/><Line x1="14" x2="14" y1="11" y2="17"/>
          </Svg>
        </TouchableOpacity>
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

  const displayEvents = (eventMap) => {
    const eventList = [];
    for(const [eventName, mealMap] of eventMap) {
      eventList.push({name: eventName, mealMap: mealMap});
    }
    return eventList.map(event => (
      <View style={styles.eventContainer} key={Math.random()}>
        <Text style={styles.eventTitle}>{event.name}</Text>
        <TouchableOpacity key={Math.random()} style={styles.compressEventButton} onPress={() => shareEvent(event.name)}>
          <Svg viewBox="0 0 183 171" fill="white">
            <Path fill-rule="evenodd" clip-rule="evenodd" d="M122.88,35.289L87.945,70.578v-17.58c-22.091-4.577-39.542,0.468-52.796,17.271 c2.301-34.558,25.907-51.235,52.795-52.339L87.945,0L122.88,35.289L122.88,35.289z"/><Path d="M6.908,23.746h35.626c-4.587,3.96-8.71,8.563-12.264,13.815H13.815v62.943h80.603V85.831l13.814-13.579v35.159 c0,3.814-3.093,6.907-6.907,6.907H6.908c-3.815,0-6.908-3.093-6.908-6.907V30.653C0,26.838,3.093,23.746,6.908,23.746L6.908,23.746 z"/>
          </Svg>
        </TouchableOpacity>
        {displayMeals(event.mealMap)}
        {displayModal()}
      </View>
    ));
  }

  return (
      <SafeAreaView style={styles.container}>
          <Text style={styles.title}>{i18n.t('library.library')}</Text>
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
    title: {
      paddingTop: 10,
      paddingLeft: 10,
      color: 'white',
      textTransform: 'uppercase',
      fontSize: 30,
      letterSpacing: 8,
      backgroundColor: '#003a5d'
    },
    viewPager: {
      flex: 1
    },
    eventContainer: {
        
    },
    eventTitle: {
      fontSize: 20,
      paddingLeft: 10,
      letterSpacing: 4,
      color: '#404040',
      textTransform: 'uppercase'
    },
    mealContainer: {
        
    },
    mealTitle: {
      fontSize: 15,
      paddingLeft: 40,
      letterSpacing: 3,
      color: '#404040',
      textTransform: 'uppercase'   
    },
    productContainer: {
        
    },
    productTitle: {
      fontSize: 15,
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
      width: 60,
      height: 60,
      marginTop: 10,
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: 5
    },
    deleteProductButtonLabel: {
      color: 'white',
      fontSize: 20,
      letterSpacing: 2
    },
    compressEventButton: {
      alignSelf : 'end',
      width: 60,
      height: 60,
      marginTop: 10,
      backgroundColor: 'blue',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: 5
    },
    compressEventButtonLabel: {
      color: 'white',
      fontSize: 20,
      letterSpacing: 2
    }
});