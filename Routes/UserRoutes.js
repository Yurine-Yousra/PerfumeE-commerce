import express from 'express'
const router = express.Router()
import GetMyBag from '../controllers/UserControllers/GetMyBag.js'
import GetMyPurchaces from '../controllers/UserControllers/GetMyPurchases.js'
import AuthToken from '../Middlewares/AuthToken.js'
import UpdateUserProfile from '../controllers/UserControllers/UpdateUserProfile.js'
import GetMyLikedProducts from '../controllers/UserControllers/GetMyLikedProducts.js'
import ConfirmPurchases from '../controllers/ProductControllers/ConfirmPurchases.js'
import GetMyBills from '../controllers/UserControllers/GetMyBills.js'
import GetMyProfile from '../controllers/UserControllers/GetMyProfile.js'

router.get('/mybag' , AuthToken , GetMyBag)
router.get('/mypurs' , AuthToken , GetMyPurchaces)
router.get('/liked' , AuthToken , GetMyLikedProducts)
router.get('/confirmPurchase' , AuthToken , ConfirmPurchases)
router.get('/myBills' , AuthToken , GetMyBills)
router.get('/myprofil' , AuthToken , GetMyProfile)
router.put('/update' , AuthToken , UpdateUserProfile)


export default router