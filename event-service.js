import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getAssetsAsync,
  getAlbumAsync,
  removeAssetsFromAlbumAsync,
} from "expo-media-library";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import JSZip from "jszip";

import { albumName } from "./global";

/**
 * Creates the product array, if it does not exist. And clean the list of products.
 */
export const init = async () => {
  const products = await getProducts();
  if (!products) {
    // initialize the list of products
    setProducts([]);
  } else {
    cleanProductsWithDeletedPhotos(products);
  }
};

/**
 * If the photos do not exist anymore, then the product is deleted. So it is not showing in the library.
 * @param {*} products
 */
const cleanProductsWithDeletedPhotos = async (products) => {
  const albumId = await getAlbumAsync(albumName);
  if (albumId) {
    let productsToDelete = [];
    const assets = await getAssetsAsync({
      album: albumId,
    });
    const allExistingPhotos = assets.assets.map((asset) => asset.uri);
    products.forEach((product) => {
      const existingProductPhotos = product.photos.filter((photo) =>
        allExistingPhotos.includes(photo.uri)
      );
      if (existingProductPhotos.length === 0) {
        // the product has no existing photos anymore, so it needs to be deleted
        productsToDelete.push(product);
      }
      if (existingProductPhotos.length !== product.photos.length) {
        // the product has some photos that do not exist anymore, so it needs to be updated
        const productToUpdate = { ...product, photos: existingProductPhotos };
        updateProduct(productToUpdate);
      }
    });
    productsToDelete.forEach((product) => removeProduct(product));
  } else {
    setProducts([]);
  }
};

/**
 * Get the products from the database
 * @returns an array of products
 */
export const getProducts = () => {
  try {
    return AsyncStorage.getItem("products").then((jsonValue) =>
      jsonValue != null ? JSON.parse(jsonValue) : null
    );
  } catch (e) {
    console.error(e);
  }
};

export const getProductsByEventName = (eventName) => {
  try {
    return getProducts().then((productList) =>
      productList.filter((product) => product.event === eventName)
    );
  } catch (e) {
    console.error(e);
  }
};

/**
 * The the product array in the database
 * @param {array of objects} products
 * @returns void
 */
export const setProducts = (products) => {
  try {
    return AsyncStorage.setItem("products", JSON.stringify(products));
  } catch (e) {
    console.error(e);
  }
};

/**
 * There is only one table in the database and all the information for a product is stored in one line.
 * The function parses all the lines to build a json object following this architecture
 * events -> dates -> meal -> products
 * @param {*} flatProductList - all the lines from the database
 * @returns json object
 */
export const deserializeFlatProductList = (flatProductList) => {
  // yeah... I know
  const eventMap = new Map();
  for (const flatProduct of flatProductList) {
    const dateMap = eventMap.get(flatProduct.event);
    if (dateMap) {
      const mealMap = dateMap.get(flatProduct.date);
      if (mealMap) {
        const product = deserializeProduct(flatProduct);
        const productList = mealMap.get(flatProduct.meal);
        if (productList) {
          productList.push(product);
          mealMap.set(flatProduct.meal, productList);
        } else {
          // the meal does not exist
          mealMap.set(flatProduct.meal, [product]);
        }
        dateMap.set(flatProduct.date, mealMap);
      } else {
        // the date does not exist
        const product = deserializeProduct(flatProduct);
        const newMealMap = new Map();
        newMealMap.set(flatProduct.meal, [product]);
        dateMap.set(flatProduct.date, newMealMap);
      }
    } else {
      // the event does not exist
      const product = deserializeProduct(flatProduct);
      const newDateMap = new Map();
      const newMealMap = new Map();
      newMealMap.set(flatProduct.meal, [product]);
      newDateMap.set(flatProduct.date, newMealMap);
      eventMap.set(flatProduct.event, newDateMap);
    }
  }
  return eventMap;
};

const deserializeProduct = (flatProduct) => {
  return {
    uuid: flatProduct.uuid,
    name: flatProduct.name,
    photos: flatProduct.photos,
    date: flatProduct.date,
  };
};

/**
 * Returns the MediaLibrary assets, and the album id
 * @param {object} product
 * @returns
 */
export const getProductPhotos = async (product) => {
  // get the dates of the first and last photo taken for the product
  const dates = product.photos.map((photo) => photo.creationDate);
  const firstDate = Math.min(...dates);
  const lastDate = Math.max(...dates);
  const album = await getAlbumAsync(albumName);
  const photoFilenames = product.photos.map((photo) =>
    photo.uri.split("/").pop()
  );
  const assetsObject = await getAssetsAsync({ first: 9999 }); // FIXME find a better way to find the taken photos
  const assets = assetsObject.assets.filter((asset) =>
    photoFilenames.includes(asset.filename)
  );
  const results = {
    assets: assets,
    albumId: album.id,
  };

  return results;
};

/**
 * Adds a product and the reference to its photos in the database
 * @param {object} product, the product to add
 * @param {string[]} takenPhotoFilenames, the filenames of the taken photos, to fetch from all the assets
 */
export const addProduct = async (product, takenPhotoFilenames) => {
  const now = new Date();
  const today = `${
    now.getDate() > 9 ? now.getDate() + 1 : "0" + now.getDate()
  }-${
    now.getMonth() > 8 ? now.getMonth() + 1 : "0" + (now.getMonth() + 1)
  }-${now.getFullYear()}`;
  const assetsObject = await getAssetsAsync({ first: 9999 }); // FIXME find a better way to find the taken photos
  const assets = assetsObject.assets.filter((asset) =>
    takenPhotoFilenames.includes(asset.filename)
  );
  const photos = assets.map((a) => ({
    uri: a.uri,
    creationDate: a.creationTime ? a.creationTime : a.modificationTime,
  }));
  const productToCreate = {
    uuid: UUID(),
    event: product.event ? product.event : "none",
    date: product.date ? product.date : today,
    meal: product.meal ? product.meal : "none",
    name: product.name ? product.name : "none",
    photos: photos,
  };
  // add the product to the existing products
  const products = await getProducts();
  products.push(productToCreate);
  setProducts(products);
};

/**
 * Updates a product in the database
 * @param {*} product
 */
export const updateProduct = async (productToUpdate) => {
  let products = await getProducts();
  products = products.map((product) => {
    if (product.uuid === productToUpdate.uuid) {
      return productToUpdate;
    } else {
      return product;
    }
  });
  return await setProducts(products);
};

/**
 * Removes a product from the database, and its photos in the album
 * @param {object} product
 */
export const removeProduct = async (product) => {
  // remove the photo from the album
  const assets = await getProductPhotos(product);
  await removeAssetsFromAlbumAsync(assets.assets, assets.albumId);
  // remove the product from the database
  let products = await getProducts();
  products = products.filter((p) => p.uuid !== product.uuid);
  return await setProducts(products);
};

/**
 * Remove the products from an event, and delete the photos in the album
 * @param {*} eventName, the name of the event
 */
export const deleteEvent = async (eventName) => {
  const productsToRemove = await getProductsByEventName(eventName);
  for (const productToRemove of productsToRemove) {
    await removeProduct(productToRemove);
  }
};

/**
 * Creates a zip files with all the products and their photos, and share it through another app
 * @param {string} eventName - the name of the event
 */
export const shareEvent = async (eventName) => {
  // prepare the zip structure with all photos
  const zip = new JSZip();
  const products = await getProducts();
  const photosToZip = [];
  for (const p of products) {
    if (p.event === eventName) {
      for (const photo of p.photos) {
        const photoName = photo.uri.split("/").pop();
        const photoBlob = await FileSystem.readAsStringAsync(photo.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const photoToZip = zip
          .folder(p.event)
          .folder(p.date)
          .folder(p.meal)
          .folder(p.name)
          .file(photoName, photoBlob, { binary: true, base64: true });
        photosToZip.push(photoToZip);
      }
    }
  }
  // generate the zip
  const blob = await zip.generateAsync({ type: "base64" });
  // save the zip into the internal storage
  const zipFilePath = FileSystem.documentDirectory + eventName + ".zip";
  await FileSystem.writeAsStringAsync(zipFilePath, blob, {
    encoding: FileSystem.EncodingType.Base64,
  });
  // share the zip
  const UTI = "public.item";
  await Sharing.shareAsync(zipFilePath, { UTI });
  // clear the zip from the internal storage
  await FileSystem.deleteAsync(zipFilePath);
};

/**
 * Returns a list of the product names from and event and their occurrence
 * @param {*} eventName
 * @returns [{name: string, occurrence: integer}]
 */
export const getProductNamesAndOccurrences = async (eventName) => {
  const products = await getProductsByEventName(eventName);
  const productNames = products.map((product) => product.name);
  const productNamesAndOccurrencesMap = new Map();
  productNames.forEach((productName) => {
    if (productNamesAndOccurrencesMap.get(productName)) {
      productNamesAndOccurrencesMap.set(
        productName,
        productNamesAndOccurrencesMap.get(productName) + 1
      );
    } else {
      productNamesAndOccurrencesMap.set(productName, 1);
    }
  });
  let productNamesAndOccurrencesList = [];
  productNamesAndOccurrencesMap.forEach((value, key) =>
    productNamesAndOccurrencesList.push({ name: key, occurrence: value })
  );
  productNamesAndOccurrencesList = productNamesAndOccurrencesList.sort(
    (a, b) => b.occurrence - a.occurrence
  );
  return productNamesAndOccurrencesList;
};

/**
 * Gives a list of product names based on the most frequent names and a string that can be contained in the name.
 * @param {*} productNamesAndOccurrences - the list of the product names and their occurrences
 * @param {*} filterName - string contained in the name
 * @param {*} maxSuggestions - the number of suggestions in the list
 * @returns a list of strings
 */
export const getProductNameSuggestions = (
  productNamesAndOccurrences,
  filterName,
  maxSuggestions
) => {
  return productNamesAndOccurrences
    .map((productNameAndOccurrence) => productNameAndOccurrence.name)
    .filter((productName) =>
      filterName
        ? productName.includes(filterName) && productName !== filterName
        : true
    )
    .slice(0, maxSuggestions);
};

/**
 * Returns the list of all the events, starting by most recently updated
 */
export const getEventNames = async () => {
  const productList = await getProducts();
  const eventNameMap = new Map();
  // find the last date of each event
  for (const product of productList) {
    const lastDate = eventNameMap.get(product.event)
      ? getDate(eventNameMap.get(product.event))
      : null;
    const productDate = getDate(product.date);
    if (lastDate < productDate) {
      eventNameMap.set(product.event, product.date);
    }
  }
  // sort the events by date, and keep only the name
  let eventList = [];
  eventNameMap.forEach((value, key) =>
    eventList.push({ name: key, date: getDate(value) })
  );
  return eventList.sort((a, b) => b.date - a.date).map((event) => event.name);
};

function getDate(date) {
  const arr = date.split("-");
  return new Date(arr[2], arr[1], arr[0]);
}

function UUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}
