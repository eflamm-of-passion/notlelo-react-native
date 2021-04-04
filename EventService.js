import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAssetsAsync, getAlbumAsync, removeAssetsFromAlbumAsync } from 'expo-media-library';
import * as FileSystem from "expo-file-system";
import * as Sharing from 'expo-sharing';
import JSZip from "jszip";

const ALBUM_NAME = "Batch Number";

export default class EventService {

    /**
     * Creates the product array, if it does not exist
     */
    static init(){
        this.getProducts().then(products => {
            if(!products) {
                this.setProducts([]);
            }
        });
    }

    /**
     * Get the products from the database
     * @returns an array of products
     */
    static getProducts() {
        try {
            return AsyncStorage.getItem('products').then(jsonValue => jsonValue != null ? JSON.parse(jsonValue) : null);
          } catch(e) {
            console.error(e);
          }
    }

    /**
     * The the product array in the database
     * @param {array of objects} products 
     * @returns void
     */
    static setProducts(products) {
        try {
            return AsyncStorage.setItem('products', JSON.stringify(products));
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * Returns the MediaLibrary assets, and the album id
     * @param {object} product 
     * @returns 
     */
    static async getProductPhotos(product) {
        // get the dates of the first and last photo taken for the product
        const dates = product.photos.map(photo => photo.creationDate);
        const firstDate = Math.min(...dates);
        const lastDate = Math.max(...dates);
        const album = await getAlbumAsync(ALBUM_NAME);
        // search between those dates, and the app album
        const getOption = {
            createdBefore: lastDate + 100, // a bit after
            createdAfter: firstDate - 100, // a bit before
            albumId: album.id
        };
        const results = await getAssetsAsync(getOption);
        const assets = {
            assets: results.assets,
            albumId: album.id
        }
        
        return assets;
    }

    /**
     * Adds a product and the reference to its photos in the database
     * @param {object} product, the product to add
     * @param {date} creationDate, the date of creation of the product, to fetch its the assets
     */
    static async addProduct(product, creationDate) {
        const now = new Date();
        const today = `${now.getDate() > 9 ? (now.getDate()) : "0"+(now.getDate())}-${now.getMonth() > 8 ? (now.getMonth()+1) : "0"+(now.getMonth()+1) }-${now.getFullYear()}`;
        const assets = await getAssetsAsync({createdAfter: creationDate});
        const photos = assets.assets.map(a => ({uri: a.uri, creationDate: a.creationTime}));
        const productToCreate = {
            uuid: UUID(),
            event: product.event ? product.event : "none",
            date: product.date ? product.date : today,
            meal: product.meal ? product.meal : "none",
            name: product.name ? product.name : "none",
            photos: photos
        };
        // add the product to the existing products
        const products = await this.getProducts();
        products.push(productToCreate);
        this.setProducts(products);
    }

    /**
     * Removes a product from the database, and its photos in the album
     * @param {object} product 
     */
    static async removeProduct(product) {
        const assets = await this.getProductPhotos(product);
        await removeAssetsFromAlbumAsync(assets.assets, assets.albumId);
        let products = await this.getProducts();
        products = products.filter(p => p.uuid !== product.uuid);
        return await this.setProducts(products);
    }

    /**
     * Creates a zip files with all the products and their photos, and share it through another app
     * @param {string} eventName - the name of the event
     */
    static async shareEvent(eventName) {
        // prepare the zip structure with all photos
        const zip = new JSZip();
        const products = await this.getProducts();
        const photosToZip = [];
        for(const p of products) {
            if(p.event === eventName) {
                for(photo of p.photos) {
                    const photoName = photo.uri.split('/').pop();
                    const photoBlob = await FileSystem.readAsStringAsync(photo.uri, {encoding: FileSystem.EncodingType.Base64});
                    console.log(photoName);
                    console.log(photoBlob);
                    const photoToZip = zip.folder(p.event).folder(p.meal).folder(p.name).file(photoName, photoBlob, {binary: true, base64: true});
                    photosToZip.push(photoToZip);
                }
            }
        }
        // generate the zip
        const blob = await zip.generateAsync({type: "base64"});
        // save the zip into the internal storage
        const zipFilePath = FileSystem.documentDirectory + eventName + ".zip";
        await FileSystem.writeAsStringAsync(zipFilePath, blob, {encoding: FileSystem.EncodingType.Base64});
        // share the zip
        const UTI = 'public.item';
        await Sharing.shareAsync(zipFilePath, {UTI});   
        // clear the zip from the internal storage
        await FileSystem.deleteAsync(zipFilePath);
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