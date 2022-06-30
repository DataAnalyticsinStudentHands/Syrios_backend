import { request } from "@strapi/helper-plugin";
import axios from "axios";

const baseURL = 'https://api.zotero.org'
const wysiwygRequests = {
  findContentTypes:async()=>{
    return await request(`/content-manager/content-types`, {
      method: "GET",
    });
  },
  findCollectionTypes:async(collection)=>{
    return await request(`/content-manager/collection-types/api::${collection}.${collection}`, {
      method: "GET",
    });
  },
  findOneCollectionType: async (collection,id) => {
    return await request(`/content-manager/collection-types/api::${collection}.${collection}/${id}`, {
      method: "GET",
    });
  },
  findSingleTypes: async (collection) => {
    return await request(`/content-manager/single-types/api::${collection}.${collection}`, {
      method: "GET",
    });
  },
  
  getZoteroOneItem: async(itemKey)=>{
      return await axios(`${baseURL}/groups/4721497/items/${itemKey}`,{
          method:'GET',
          headers: {
              'Zotero-API-Version': '3',
              'Zotero-API-Key':'QtlUSBKdwlVRuIJzNaCbi9VD'
          },
      })
  },
  getZoteroOneItemBib: async(itemKey)=>{
      return await axios(`${baseURL}/groups/4721497/items/${itemKey}`,{
          method:'GET',
          headers: {
              'Zotero-API-Version': '3',
              'Zotero-API-Key':'QtlUSBKdwlVRuIJzNaCbi9VD'
          },
          params:{
              format:"bib"
          }
      })
  },
};

export default wysiwygRequests;