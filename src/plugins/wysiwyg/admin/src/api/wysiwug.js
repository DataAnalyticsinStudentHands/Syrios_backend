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
    return await request(`/content-manager/collection-types/api::${collection}.${collection}?pageSize=100`, {
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
  createReference: async (reference) => {
    return await request(`/content-manager/collection-types/api::reference.reference`, {
      method: "POST",
      body:{
        item_key:reference.key,
        title:reference.data.title,
        authorLastName:reference.data.creators[0].lastName + ': ' + reference.data.title.substr(0,20) + '...'
      }
    });
  },
  publicReference: async (id) => {
    return await request(`/content-manager/collection-types/api::reference.reference/${id}/actions/publish`, {
      method: "POST",
    });
  },

  findZoteroTopitems: async()=>{
      return await axios(`${baseURL}/groups/4740395/items/top`,{
        method:'GET',
        headers: {
            'Zotero-API-Version': '3',
            'Zotero-API-Key':'QtlUSBKdwlVRuIJzNaCbi9VD'
        },
    })
  },
  getZoteroOneItem: async(itemKey)=>{
      return await axios(`${baseURL}/groups/4740395/items/${itemKey}`,{
          method:'GET',
          headers: {
              'Zotero-API-Version': '3',
              'Zotero-API-Key':'QtlUSBKdwlVRuIJzNaCbi9VD'
          },
      })
  },
  getZoteroOneItemBib: async(itemKey)=>{
      return await axios(`${baseURL}/groups/4740395/items/${itemKey}`,{
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