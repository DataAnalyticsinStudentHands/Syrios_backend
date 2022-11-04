import { request } from "@strapi/helper-plugin";

const emailRequests = {
    findEmail: async ()=>{
        return await request("/email-service/find",{
            method:"GET",
        })
    },
    updateEmail: async (data)=>{
        return await request("/email-service/update",{
            method:"PUT",
            body:{data:data},
        })
    },
    sendEmail: async ()=>{
        return await request("/email-service/send",{
            method:"POST",
        })
    },
}
export default emailRequests