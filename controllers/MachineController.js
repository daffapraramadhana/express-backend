const { error } = require("ajv/dist/vocabularies/applicator/dependencies")
const Box = require("../models/box")
const sequelize = require('./../models/db-connection'); // Adjust the path to your database connection file

const { Vonage } = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: "c8c042e3",
  apiSecret: "87IVhAfm25O09UaS"
})

const InjectMachine = async(req, res)=>{

    const listData = [
            {
                box_size:"S",
                box_number:"s1",
                status:false
            },
            {
                box_size:"M",
                box_number:"m1",
                status:false
            },
            {
                box_size:"L",
                box_number:"l1",
                status:false
            },
            {
                box_size:"S",
                box_number:"s2",
                status:false
            },
            {
                box_size:"M",
                box_number:"m2",
                status:false
            },
            {
                box_size:"L",
                box_number:"l2",
                status:false
            },
            {
                box_size:"S",
                box_number:"s3",
                status:false
            },
            {
                box_size:"M",
                box_number:"m3",
                status:false
            },
            {
                box_size:"L",
                box_number:"l3",
                status:false
            },
            {
                box_size:"S",
                box_number:"s4",
                status:false
            },
            {
                box_size:"M",
                box_number:"m4",
                status:false
            },
            {
                box_size:"L",
                box_number:"l4",
                status:false
            }
    ]

    const setTransaction = await sequelize.transaction()
    try{
        await Box.bulkCreate(listData,{transaction:setTransaction})
        setTransaction.commit()
        res.send({
            "status":true
        })
    }catch(error){
        await setTransaction.rollback()
        res.send({
            "status":false
        })
    }
}

const emptyBox = async(req, res)=>{
    try{
        const responseData = {
            code:0,
            latency:"",
            message:""
        }

        let data = []

        const boxS = await Box.findAll({
            where:{
                status:false,
                box_size:"S"
            }
        });
        const boxM = await Box.findAll({
            where:{
                status:false,
                box_size:"M"
            }
        });
        const boxL = await Box.findAll({
            where:{
                status:false,
                box_size:"L"
            }
        });
        
        responseData.code = 200
        data.push(boxS.length)
        data.push(boxM.length)
        data.push(boxL.length)
        responseData.message = "success"

        res.send({
            response: responseData,
            data
        });

    }catch(error){
        console.log("error "+error)
        res.send({
            code:500,
            data:{},
            message:error
        })
    }
}

const testSendViaSms = async(req, res)=>{

    const from = "Vonage APIs"
    const to = "6287785496881"
    const text = 'coba akmal'

    await vonage.sms.send({to, from, text})
        .then(resp => { console.log('Message sent successfully'); console.log(resp); })
        .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });

    res.send({
        "response":true
    })

}

module.exports = {
    InjectMachine,
    emptyBox,
    testSendViaSms
}