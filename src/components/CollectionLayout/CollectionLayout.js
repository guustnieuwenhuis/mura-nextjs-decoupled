import React,{useState} from 'react';
//import Link from "next/link";
/*
  The link component throws an error when rerending after being 
  reconfigured in edit mode. So I think we'll another component that 
  can conditionally use the vanilla anchor tags when rerending.
*/
const CollectionLayout = ({props,collection}) => {
  console.log(collection.getAll().items)
  return (
    <div>
      <ul>
        {collection.get('items').map(function(item, i){
          return <li key={item.get('contentid')}>
            <a href={`/${item.get('filename')}`}>
              {item.get('title')}
            </a>
          </li>;
        })}
      </ul>
    </div>
  )
}

export default CollectionLayout;