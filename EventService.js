import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAssetsAsync } from 'expo-media-library';
import { deleteAsync } from 'expo-file-system';

const ALBUM_NAME = "Batch Number";

export default class EventService {

    static init(){
        this.getProducts().then(products => {
            if(!products) {
                this.setProducts([]);
            }
        });
    }

    static getProducts() {
        try {
            return AsyncStorage.getItem('products').then(jsonValue => jsonValue != null ? JSON.parse(jsonValue) : null);
          } catch(e) {
            // error reading value
          }
    }
    
    static setProducts(products) {
        try {
            return AsyncStorage.setItem('products', JSON.stringify(products));
        } catch (e) {
            // saving error
        }
    }

    static async addProduct(product, creationDate) {
        const now = new Date();
        const today = `${now.getDate()}-${now.getMonth() > 8 ? now.getMonth()+1 : "0"+now.getMonth()+1 }-${now.getFullYear()}`;
        const assets = await getAssetsAsync({createdAfter: creationDate});
        const photos = assets.assets.map(a => a.uri);
        const productToCreate = {
            uuid: UUID(),
            event: product.event ? product.event : "none",
            date: product.date ? product.date : today,
            meal: product.meal ? product.meal : "none",
            name: product.name ? product.name : "none",
            photos: photos
        };
        const products = await this.getProducts();
        products.push(productToCreate);
        this.setProducts(products);
    }

    static async removeProduct(product) {
        try {
            for(let photo of product.photos) {
                console.log(JSON.stringify(photo));
                await deleteAsync(photo);
            }
        } catch (error) {
        console.log(error);
        }
        let products = await this.getProducts();
        products = products.filter(p => p.uuid ==! product.uuid);
        // this.setProducts(products);
    }

}

function UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}