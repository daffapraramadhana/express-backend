const Ajv = require('ajv');
const sequelize = require('./../models/db-connection'); // Adjust the path to your database connection file
const Transaction = require('../models/transaction');
const Box = require('../models/box');
const { default: axios } = require('axios');
var nodemailer = require('nodemailer');
require('dotenv').config();
const endPoint = "http://127.0.0.1:8000/tes"

const DropPackage = async(req, res)=>{
  let status = true
  let code = 200
  // let message = "no problem"
  console.log("list body", req.body)
  // request store_name, store_phone_number, box_size
  const requestData = req.body
  const requestTemplate = {
      type: 'object',
      properties: {
        store_name: { type: 'string' },
        store_phone_number: { type: 'string' },
        box_size: { type: 'string' },
        email: { type: 'string' }
      },
      required: ['store_name', 'store_phone_number', 'box_size', 'email']
    };

  const ajv = new Ajv();
  const validate = ajv.compile(requestTemplate);
  const valid = validate(requestData);

  if(!valid){
    console.log("error 1")
    console.log(valid)
    status = false
    code  = 403
  }    

  const setTransaction = await sequelize.transaction()
  try{
    const getBox = await Box.findOne({
      where:{
        box_size:requestData.box_size,
        status:false
      }
    })

    if(getBox === null){
      console.log("error 2")
      status = false
      code = 403
    }

    getBox.update({
      status:true
    })

    await Transaction.create({
      box_id : getBox.id,
      box_location:"pake env",
      store_name:requestData.store_name,
      store_phone_number:requestData.store_phone_number,
      email:requestData.email,
      validate_code: await GenerateCode(),
      store_time:Date.now(),
      sync_flag:false
    },{
      transaction:setTransaction
    })
    await setTransaction.commit()
    
  }catch(error){
    console.log("error 3",error)
    await setTransaction.rollback()
    status = false
    code = 403
  }
  SendValidateCode(requestData.email)
  res.send({
    "status":status,
    "code":code
  })
}

const GetPackage = async(req, res)=>{
  let status = true
  let code = 200
  const requestData = req.body

  const requestTemplate = {
    type:"object",
    properties:{
      validate_code:{type:"string"}
    },
    required:["validate_code"]
  }

  const ajv = new Ajv()
  const validate = ajv.compile(requestTemplate)
  const valid = validate(requestData)

  if(!valid){
    console.log("error 1")
    console.log(valid)
    status = false
    code  = 403
  }

  try{
    const getTransaction = await Transaction.findOne({
      where:{
        validate_code:requestData.validate_code
      }
    })

    console.log("cek transaction",getTransaction)

    if(getTransaction === null){
      status = false
      code = 404
    }else{
      if(getTransaction.collect_time != null || getTransaction.collect_time != undefined || getTransaction.collect_time !=""){
        if(getTransaction.collect_time != null){
          status = false
          code = 204
        }else{
          Box.findOne({
            where:{
              id:getTransaction.box_id
            }
          }).then((respon)=>{
            console.log("dpaat respon",respon)
            respon.update({
              status:false
            })
          }).catch((error)=>{
            console.log("box error", error)
            return
          })
  
          getTransaction.update({
            collect_time:Date.now(),
            sync_flag:false
          })
        }
      }
    }
  }catch(error){
    console.log("terjadi error",error)
    status = false
    code = 500
  }

  res.send({
    "status":status,
    "code":code,
    "message":message
  })
}

const SyncPackage = async (req,res)=>{
  const getUnsyncData = await Transaction.findAll({
    limit:10,
    where:{
      sync_flag:false
    }
  })
  
  for(let i=0; i<getUnsyncData.length; i++){
    console.log("cek data", getUnsyncData[i])
    await axios(endPoint, {
      method:"GET",
      data:getUnsyncData[i], 
      timeout:5000
    })
    .then((response)=>{
      console.log("dapat respon", response.data)
      if(response.data.code != 200){
        console.log("server error", response);
        return false
      }
      getUnsyncData[i].sync_flag = true

      getUnsyncData[i].save();
      console.log("sync success")
    })
    .catch((error)=>{
      console.log("sync error", error)
    })
  }
}

const GenerateCode = ()=>{
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

const SendValidateCode = (receiver)=>{
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
      });

      var mailOptions = {
        from: process.env.EMAIL,
        to: receiver,
        subject: 'Sending Email using Node.js',
        text: 'Your validate code '+GenerateCode()
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

module.exports = {
    DropPackage,
    GetPackage,
    SyncPackage
}