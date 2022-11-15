import React, { memo, useState, useEffect } from 'react';

import {
  Layout, 
  BaseHeaderLayout,
  ContentLayout,
} from "@strapi/design-system/Layout";
// import {LoadingIndicatorPage} from "@strapi/helper-plugin";

import { EmptyStateLayout } from "@strapi/design-system/EmptyStateLayout";
import { Button } from "@strapi/design-system/Button";
import { Stack } from '@strapi/design-system/Stack';
import Check from "@strapi/icons/Check";
import Refresh from '@strapi/icons/Refresh';
import { Illo } from "../../components/Illo";
import { Alert } from '@strapi/design-system/Alert';
// import pluginId from '../../pluginId';
import wysiwygRequests from '../../api/wysiwug';

import ReferenceTable from '../../components/ReferenceTable';
import ReferenceCount from '../../components/ReferenceCount';
const HomePage = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [newReference, setNewReference] = useState([])
  const [unpublish, setUnpublish]= useState(0)

  const[showLoading, setShowLoading]=useState(false)

  const fetchData = async () =>{
    if(isLoading === false) setIsLoading(true);
    const zoteroResults = await wysiwygRequests.findZoteroTopitems();
    const serverResult = await wysiwygRequests.findCollectionTypes('reference')

    function getDifference(zotero, server) {
      return zotero.filter(object1 => {
        return !server.some(object2 => {
          return object1.key === object2.item_key;
        });
      });
    }
    setNewReference(getDifference(zoteroResults.data,serverResult.results))

    let unpublish = 0
    serverResult.results.forEach(async(ref)=>{if(ref.publishedAt === null){unpublish++}})
    setUnpublish(unpublish)
    setIsLoading(false);
  }

  useEffect(async ()=>{
    await fetchData();
  },[unpublish])

  async function addReference(){
    setShowLoading(true)
    newReference.forEach(async(reference)=>{await wysiwygRequests.createReference(reference)})
    setShowLoading(false)
    await fetchData();
  }

  // async function publichReference(){
  //   let result = await wysiwygRequests.findCollectionTypes('reference')
  //   result.results.forEach(async(ref)=>{if(ref.publishedAt === null){await wysiwygRequests.publicReference(ref.id)}})
  //   setUnpublish(0)
  // }

  return (
    <Layout>
      <BaseHeaderLayout title='New Zotero Reference' subtitle='Add new references from Zotero' as='h2'/>
      <ContentLayout>
        {newReference.length===0 ?(
          <EmptyStateLayout icon={<Illo />} content="You don't have any new References that need to insert..."
            action={
              <Stack spacing={4} horizontal padding={4}>
                <Button
                  onClick={fetchData}
                  variant="secondary"
                  startIcon={<Refresh />}>Refresh the Table</Button>
                {/* {unpublish===0?(<Button variant="ghost">All the References are Published!</Button>):(
                  <Button
                    onClick={publichReference}
                    variant="secondary"
                    endIcon={<Check />}
                    loading ={showLoading}>{unpublish} References need to be Published</Button>)} */}
              </Stack>}
          />
          ):(<>
            <ReferenceCount count={newReference.length} addReference={addReference}/>
            <ReferenceTable referenceData = {newReference}/>
          </>)}
      </ContentLayout>
    </Layout>
  );
};

export default memo(HomePage);
