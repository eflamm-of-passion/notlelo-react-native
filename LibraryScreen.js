import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal, SafeAreaView, ScrollView } from 'react-native';
import EventService from './EventService';
import i18n from './i18n';


export default function LibraryScreen() {
  const [productList, setProductList] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    fetchProducts();
}, [fetchProducts, deleteProduct]);

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

  const deleteProduct = (product) => {
    // EventService.removeProduct(product);
    EventService.getProductPhotos(product);
  }
  
  const displayEvents = (eventMap) => {
    const eventList = [];
    for(const [eventName, mealMap] of eventMap) {
      eventList.push({name: eventName, mealMap: mealMap});
    }
    return eventList.map(event => (
      <View style={styles.eventContainer} key={Math.random()}>
        <Text style={styles.eventTitle}>{event.name}</Text>
        {displayMeals(event.mealMap)}
      </View>
    ));
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
          <Text style={styles.deleteProductButtonLabel}>{i18n.t('library.delete')}</Text>
        </TouchableOpacity>
      </View>
    ));
  }

  const displayPhotos = (photoList) => {
    
    return photoList ? photoList.map(photo => 
      <TouchableOpacity key={Math.random()} style={styles.takePictureButton} onPress={() => setSelectedPhoto(photo)}>
        <Image style={styles.photo} source={{uri: photo.uri}}/> 
        {displayModal()}
      </TouchableOpacity>
      ) : null
  }

  const displayModal = () => {
    return <Modal
          animationType="slide"
          transparent={true}
          visible={selectedPhoto != null}
        >
          <View style={styles.modalView}>
            <Image style={styles.modalPhoto} source={{uri: selectedPhoto}}/>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalCloseButton]}
              onPress={() => setSelectedPhoto(null)}
            ><Text style={styles.modalButtonText}>{i18n.t('library.close')}</Text></TouchableOpacity>
          </View>
        </Modal>
  }

  return (
      <SafeAreaView style={styles.container}>
          <Text style={styles.title}>{i18n.t('library.library')}</Text>
          <ScrollView style={styles.productList}>
              {productList.size ? displayEvents(productList) : null}
          </ScrollView>
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
      flex: 1,
      width: '98%',
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
    }
});