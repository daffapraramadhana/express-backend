const express = require("express");
// const Transaksi = require("./models/transaksi");
const { DropPackage, GetPackage, SyncPackage } = require("./controllers/TransactionController");
const { InjectMachine, emptyBox, emailSender, testSendViaSms } = require("./controllers/MachineController");
const cron = require("node-cron")

const router = express.Router();

router.get("/inject-machine", InjectMachine)


router.post("/drop-package", DropPackage)
router.post("/get-package", GetPackage)
router.post("/sync-package", SyncPackage)
router.post("/empty-box", emptyBox)
router.post("/send-sms", testSendViaSms);

cron.schedule('*/5 * * * *', ()=>{
    console.log("cron job executed every 30 seconds")
    SyncPackage()
})


// router.get("/tes-aja", (req, res)=>{
//     console.log("get body",req.body)
//     try{
//         Transaksi.create({
//             box_id: 1,
//             box_location: "ioasjf",
//             collect_time: "pasjdjf",
//             store_name: "lallaaa",
//             store_phone_number: "povm",
//             validate_code: "1243242",
//             store_time: "lovnidnp["
//         })
//         res.send({
//             "tes":123
//         })
//     }catch(error){
//         console.error(error);
//     return res.status(500).json({ message: 'Error creating contact' });
//     }
// })

module.exports = {
    routes:router
}