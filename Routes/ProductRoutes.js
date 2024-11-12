import express from 'express'
const router = express.Router()
import CreateProduct from '../controllers/ProductControllers/CreateProduct.js'
import UpdateProduct from '../controllers/ProductControllers/UpdateProduct.js'
import DeleteProduct from '../controllers/ProductControllers/DeleteProduct.js'
import AuthToken from '../Middlewares/AuthToken.js'
import LikeProduct from '../controllers/ProductControllers/LikeProduct.js'
import DisLikeProduct from '../controllers/ProductControllers/DislikeProduct.js'
import CommentProduct from '../controllers/ProductControllers/CommentProduct.js'
import GetCommentProduct from '../controllers/ProductControllers/GetProductComment.js'
import AddToMyPurchaces from '../controllers/ProductControllers/AddToMyPurchaces.js'
import GetProduct from '../controllers/ProductControllers/GetProduct.js'
import GetAllProducts from '../controllers/ProductControllers/GetAllProducts.js'
import AddToBag from   '../controllers/ProductControllers/AddToBag.js' 
import DeleteProductFromBag from '../controllers/ProductControllers/DeleteProductFromBag.js'
import DeleteProductFromCart from '../controllers/ProductControllers/DeleteProductFromCart.js'
import Search from '../controllers/ProductControllers/Search.js'

router.post('/createProduct' , CreateProduct)
router.put('/updateProduct/:productId' , AuthToken ,UpdateProduct)
router.delete('/delete/:productId' , AuthToken , DeleteProduct)
router.post('/comment/:productId' , AuthToken , CommentProduct)
router.get('/GetProductComments/comments/:productId'  , GetCommentProduct)
router.get('/products/:productId'  , GetProduct)
router.post('/addToMyPurchases/:productId' , AuthToken , AddToMyPurchaces)
router.post('/addToBag/:productId' , AuthToken , AddToBag)
router.get('/search'  , Search)
router.get('/allproducts' , GetAllProducts)
router.delete('/deleteFromBag/:productId' , AuthToken , DeleteProductFromBag )
router.delete('/deleteFromPurchaces/:productId' , AuthToken , DeleteProductFromCart)

export default router