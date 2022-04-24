import { lazy } from 'react'

const Home = lazy(() => import('./container/Home'))
const Profile = lazy(() => import('./container/User/Profile'))
const SingleProduct = lazy(() => import('./Shop/ProductID'))
const Shop = lazy(() => import('./Shop'))
const CartDisplay = lazy(() => import('./container/Cart/Cart'))
const SignIn = lazy(() => import('./container/User'))
const Shipping = lazy(() => import('./container/OrderPayment/Shipping'))
const PaymentForm = lazy(() => import('./container/OrderPayment/PaymentForm'))
const PlaceOrder = lazy(() => import('./container/OrderPayment/PlaceOrder'))
const Order = lazy(() => import('./container/OrderPayment/Order'))
const NoPage = lazy(() => import('./container/NoPage'))
const Wishlist = lazy(() => import('./container/User/SavedProduct'))

const routes = {
  public: [
    {
      path: '/',
      exact: true,
      element: Home,
    },

    {
      path: '/products/:productId',
      element: SingleProduct,
    },
    {
      path: '/products/shop',
      element: Shop,
    },
    {
      path: '/products/shop/search/:keyword',
      element: Shop,
    },
    {
      path: '/products/shop/page/:pagenumber',
      element: Shop,
    },
    {
      path: '/products/shop/search/:keyword/page/:pageNumber',
      element: Shop,
    },
    {
      path: '/cart',
      element: CartDisplay,
    },
    {
      path: '/cart/:productId',
      element: CartDisplay,
    },
    {
      path: '/auth',
      element: SignIn,
    },
    {
      path: '*',
      element: NoPage,
    },
  ],
  private: [
    {
      path: '/profile',
      element: Profile,
    },
    {
      path: '/shipping',
      element: Shipping,
    },
    {
      path: '/paymentform',
      element: PaymentForm,
    },
    {
      path: '/placeorder',
      element: PlaceOrder,
    },
    {
      path: '/order/:orderId',
      element: Order,
    },
    {
      path: '/wishlist',
      element: Wishlist,
    },
    {
      path: '/wishlist/:id',
      element: Wishlist,
    },
  ],
}

export default routes
