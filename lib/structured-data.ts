import {siteName,siteUrl} from "./site";
export function collectionSchema(name:string,path:string,items:{name:string;path:string}[]){return {
  "@context":"https://schema.org","@type":"CollectionPage","@id":`${siteUrl}${path}#page`,url:`${siteUrl}${path}`,name,
  isPartOf:{"@type":"WebSite","@id":`${siteUrl}/#website`,name:siteName,url:siteUrl},
  mainEntity:{"@type":"ItemList",numberOfItems:items.length,itemListElement:items.map((item,i)=>({"@type":"ListItem",position:i+1,name:item.name,url:`${siteUrl}${item.path}`}))},
};}
