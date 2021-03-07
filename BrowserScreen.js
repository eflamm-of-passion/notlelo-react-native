import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal, SafeAreaView, ScrollView } from 'react-native';
import EventService from './EventService';


export default function BrowserScreen() {
    const [productList, setProductList] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const fetchProducts = useCallback(async () => {
          setProductList(await EventService.getProducts());
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

  const displayProductList = (productList) => {
    
    return productList.map(product => ( 
      <View key={product.uuid}>
      <Text style={styles.productTitle}>{product.event} - {product.meal} - {product.name} </Text>
      <View style={styles.photoList}>
        {displayPhotoList(product.photos)}
      </View>

      </View>
    ));
  }

    const displayPhotoList = (photoList) => {
      return photoList ? photoList.map(photoUri => 
        <TouchableOpacity key={Math.random()} style={styles.takePictureButton} onPress={() => setSelectedPhoto(photoUri)}>
          <Image style={styles.photo} source={{uri: photoUri}}/> 
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
              ><Text style={styles.modalButtonText}>Close</Text></TouchableOpacity>
            </View>
          </Modal>
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Browser</Text>
            <ScrollView style={styles.productList}>
                {productList.length ? displayProductList(productList) : null}
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
    productList: {
        
    },
    productTitle: {
      fontSize: 20,
      paddingLeft: 10,
      letterSpacing: 1,
      color: '#404040',
    },
    photoList: {
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
});