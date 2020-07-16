import { useEffect } from "react";
import { useRouter } from 'next/router';
import ReactMarkdown from "react-markdown";

const CollectionLayout = ({props,collection,link}) => {
  const router = useRouter();
  let pos = 0;

  if(router){
    pos = router.query.n ? parseInt(router.query.n) >= 0 ? parseInt(router.query.n) : 0 : 0;
    useEffect(() => {
      console.log("POSITION: ",pos);
    }, [router.query.n])
  }
  else {
    pos = 0;
  }

return (
  <div>
    <h2>CollectionLayout!</h2>
    <ul style={{'listStyle': 'none'}}>
      <CurrentItems collection={collection} pos={pos} link={link} {...props} />
    </ul>
    <div>
      <CollectionNav collection={collection} pos={pos} link={link} {...props} />   
    </div>
  </div>
  )
}

const CurrentItems = (props) => {
  const {collection,nextn,link,pos,fields} = props;
  let itemsList = [];
  let item = '';
  const Link = link;
  const items = collection.get('items');
  const itemsTo = pos+nextn > items.length ? items.length : pos+nextn;
  const fieldlist = "";

  // FOR TESTING ONLY!
//  fieldlist.push('summary');
  console.log('layout',props.layout);
  console.log('fieldlist',fieldlist);

  for(let i = pos;i < itemsTo;i++) {
    item = items[i];
    itemsList.push(
    <li key={item.get('contentid')}>
        <h1>
          <Link href={`/${item.get('filename')}`}>
            {item.get('title')}
          </Link>
        </h1>
        <ReactMarkdown source={item.get('summary')}/>
      <Link href={`/${item.get('filename')}`}>
        Read More
      </Link>
    </li>
    );
  }

  return itemsList;
}

const CollectionNav = (props) => {
  const {collection,link,pos,nextn} = props;
  const Link = link;
  const router = useRouter();
  const items = collection.get('items');
  const next = pos+nextn;
  const prev = pos > 0 ? pos-nextn > 0 ? pos-nextn : 0 : 0;
  let nav = [];

  if(!router) {
    return nav;
  }

  if(pos > 0) {
    const prevAS =  `/${router.query.page}?n=${prev}`;

    nav.push (
      <Link href={prevAS} key="prev">
          Prev
      </Link>
    )    
  }

  if(next<items.length) {
    const nextAS =  `/${router.query.page}?n=${next}`;

      nav.push (
      <Link href={nextAS} key="next">
      Next
      </Link>
    )
  }

  return nav;
}

export const getStaticProps = () => {
  const data = {};
  
  data['fields'] = "title,summary,filename";

  return data;
};

export default CollectionLayout;