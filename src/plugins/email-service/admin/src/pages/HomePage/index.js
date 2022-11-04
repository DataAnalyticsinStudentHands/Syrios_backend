import React, { memo, useState, useEffect } from 'react';
import {
  Layout, 
  BaseHeaderLayout,
  ContentLayout,
} from "@strapi/design-system/Layout";
import { Stack } from '@strapi/design-system/Stack';
// import pluginId from '../../pluginId';
import { Field, FieldLabel, FieldHint, FieldError, FieldInput, FieldAction } from '@strapi/design-system/Field';
import { Textarea } from '@strapi/design-system/Textarea';
import { Box } from '@strapi/design-system/Box';
import { Button } from '@strapi/design-system/Button';

import { LoadingIndicatorPage } from "@strapi/helper-plugin";
import emailRequests from '../../api/emailservice';
const HomePage = () => {
  // const [emailFrom, setEmailFrom] = useState("tshao@uh.edu")
  const [isLoading, setIsLoading] = useState(true)
  const [emailFrom, setEmailFrom] = useState("")
  const [emailTo, setEmailTo] = useState("")
  const [emailCC, setEmailCC] = useState("")
  const [emailBCC, setEmailBCC] = useState("")
  const [emailSubject, setEmailSubject] = useState("")
  const [emailTemp, setEmailTemp] = useState("")

  const fetchData = async () =>{
    if (isLoading === false ) setIsLoading(true)

    const emailData = await emailRequests.findEmail()
    // console.log(emailData.data.attributes)
    setEmailFrom(emailData.data.attributes.emailFrom)
    setEmailTo(emailData.data.attributes.emailTo)
    setEmailCC(emailData.data.attributes.emailCC)
    // setEmailBCC(emailData.data.attributes.emailBCC)
    setEmailSubject(emailData.data.attributes.emailSubject)
    setEmailTemp(emailData.data.attributes.emailTemp)

    setIsLoading(false)
  }

  useEffect(async ()=>{
    await fetchData();
  },[])

  async function updateEmail(data){
    await emailRequests.updateEmail(data);
    await fetchData();
  }

  async function testSend(){
    await emailRequests.sendEmail();
  }

  if(isLoading) return <LoadingIndicatorPage/>;
  return (
    <Layout>
      <BaseHeaderLayout title='Custom Emails' subtitle='Edit Emials here' as='h2'/>
      <ContentLayout>
      <Stack spacing={4} padding={3}>
        <Box>
        <Field name="emailFrom">
          <Stack spacing={1}>
            <FieldLabel>From</FieldLabel>
            <FieldInput type="text" value={emailFrom} disabled={true}/>
          </Stack>
        </Field>
        <Field name="emailTo">
          <Stack spacing={1}>
            <FieldLabel>To</FieldLabel>
            <FieldInput type="text" value={emailTo} onChange={(e)=>{setEmailTo(e.target.value)}}/>
          </Stack>
        </Field>
        <Field name="emailCC">
          <Stack spacing={1}>
            <FieldLabel>CC</FieldLabel>
            <FieldInput type="text" value={emailCC} onChange={(e)=>{setEmailCC(e.target.value)}}/>
          </Stack>
        </Field>
        {/* <Field name="emailBCC">
          <Stack spacing={1}>
            <FieldLabel>BCC</FieldLabel>
            <FieldInput type="text" value={emailBCC} onChange={(e)=>{setEmailBCC(e.target.value)}}/>
          </Stack>
        </Field> */}
        <Field name="emailSubject">
          <Stack spacing={1}>
            <FieldLabel>Subject</FieldLabel>
            <FieldInput type="text" value={emailSubject} onChange={(e)=>{setEmailSubject(e.target.value)}}/>
          </Stack>
        </Field>
          <Textarea placeholder="This is a email template" label="Template" name="emailTemplate" onChange={(e) => {setEmailTemp(e.target.value)}} >
            {emailTemp}
          </Textarea>
        </Box>
        <Box>
          <Button variant='default'
            onClick={()=>{
              let data = {}
              data.emailTo = emailTo
              data.emailCC = emailCC
              data.emailBCC = emailBCC
              data.emailSubject = emailSubject
              data.emailTemp = emailTemp
              updateEmail(data)
            }}>Save</Button>
        </Box>
        <Box>
          <Button variant='default'
              onClick={()=>testSend()}>Send Test Email</Button>
          </Box>
        </Stack>
      </ContentLayout>
    </Layout>
  );
};

export default memo(HomePage);
