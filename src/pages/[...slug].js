import MainRouter from "../components/MainRouter";
import MainLayout from "../components/MainLayout";
import DisplayRegion from "../components/DisplayRegion";
import React from "react";
import { useRouter } from "next/router";
import MuraHelper,{getRootPath,getMuraPaths} from "../helpers/MuraHelper";
import Head from 'next/head';

export async function getStaticPaths() {
  const paths = await getMuraPaths();
  
  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  console.log("CON",context);
  let props = await MuraHelper(context);
  return props;
}

export default function Slug(props) { 
  const { modules, navigation } = props;
  const router = useRouter();

  return (
    <MainLayout {...props}>
      <Head>
        <link href={getRootPath() + '/core/modules/v1/core_assets/css/mura.10.min.css'} rel="stylesheet" key="min"/>
        <link href={getRootPath() + '/core/modules/v1/core_assets/css/mura.10.skin.css'} rel="stylesheet" key="skin"/>
      </Head>
      <MainRouter items={navigation} />
        {modules && <DisplayRegion {...props} />}
    </MainLayout>
  );

}