import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import { Home, Cart, Product, Crown, BuyPage, CreditCard } from "../pages/";
import { BuyCartPage } from "../pages/order/BuyCartPage";
import { OneProductCreditCard } from "../pages/order/credit-card/OneProductCreditCard";
import PaymentSuccess from "../pages/order/success/PaymentSuccess";
import PixPayment from "../pages/order/pix/PixPayment";
import SendVoucher from "../pages/order/pix/voucher/SendVoucher";
import PixCartPayment from "../pages/order/pix/CartPixPayment";
import CartSendVoucher from "../pages/order/pix/voucher/CartSendVoucher";
import Dashbot from "../pages/bot/Dashbot";
import BuyBotPage from "../pages/order/BuyBotPage";
import CreditCardBot from "../pages/order/credit-card/CreditCardBot";
import Nenbot from "../pages/bot/Nenbot";
import PixBot from "../pages/order/pix/PixBot";
import BotSendVoucher from "../pages/order/pix/voucher/BotSendVoucher";
import Login from "../pages/admin/security/Login";
import Dashboard from "../pages/admin/core/Dashboard";
import ProductPage from "../components/admin/product/ProductPage";
import CreateProduct from "../components/admin/product/CreateProduct";
import UpdateProduct from "../components/admin/product/UpdateProduct";
import OrderPage from "../components/admin/order/OrderPage";
import UserPage from "../components/admin/order/UserPage";
import DashbotPage from "../components/admin/bots/DashbotPage";
import NenbotPage from "../components/admin/bots/NenbotPage";
import KeysNenbot from "../components/admin/bots/KeysNenbot";
import CreateKey from "../components/admin/bots/CreateKey";
import CouponPage from "../components/admin/coupons/CouponPage";
import CreateCoupon from "../components/admin/coupons/CreateCoupon";
import PrivateRoutes from "../../private-route";
import Newsletter from "../components/admin/Newsletter";
import Loading from "../components/loading/Loading";
import { useLoading } from "../../LoadingProvider";

function Router() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/product/crown" element={<Crown />} />
        <Route path="/buy/:id/:quantity" element={<BuyPage />} />
        <Route path="/buy/cart/:discount" element={<BuyCartPage />} />
        <Route path="/payment/credit-card/cart" element={<CreditCard />} />
        <Route path="/payment/success/:orderId" element={<PaymentSuccess />} />
        <Route
          path="/payment/credit-card/:id/:quantity"
          element={<OneProductCreditCard />}
        />
        <Route path="/payment/pix/:id/:quantity" element={<PixPayment />} />
        <Route path="/payment/pix/cart" element={<PixCartPayment />} />
        <Route
          path="/payment/pix/voucher/:id/:quantity"
          element={<SendVoucher />}
        />
        <Route path="/payment/pix/voucher/cart" element={<CartSendVoucher />} />

        <Route path="/dashbot/:day" element={<Dashbot />} />
        <Route path="/nenbot/:day/:id" element={<Nenbot />} />

        <Route
          path="/buy/bot/dashbot"
          element={<BuyBotPage botType={"dashbot"} />}
        />
        <Route
          path="/buy/bot/nenbot/"
          element={<BuyBotPage botType={"nenbot"} />}
        />

        <Route
          path="/payment/credit-card/dashbot"
          element={<CreditCardBot botType={"Dashbot"} />}
        />
        <Route
          path="/payment/credit-card/nenbot"
          element={<CreditCardBot botType={"Nenbot"} />}
        />
        <Route
          path="/payment/pix/dashbot"
          element={<PixBot botType={"Dashbot"} />}
        />
        <Route
          path="/payment/pix/nenbot"
          element={<PixBot botType={"Nenbot"} />}
        />
        <Route
          path="/payment/pix/voucher/nenbot"
          element={<BotSendVoucher botType={"Nenbot"} />}
        />
        <Route
          path="/payment/pix/voucher/dashbot"
          element={<BotSendVoucher botType={"Dashbot"} />}
        />

        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/dashboard/home"
          element={
            <>
              <PrivateRoutes>
                <Dashboard />
              </PrivateRoutes>
            </>
          }
        />
        <Route
          path="/admin/dashboard/product"
          element={
            <>
              <PrivateRoutes>
                <ProductPage />
              </PrivateRoutes>
            </>
          }
        />
        <Route
          path="/admin/dashboard/product/create/"
          element={
            <>
              <PrivateRoutes>
                <CreateProduct />
              </PrivateRoutes>
            </>
          }
        />
        <Route
          path="/admin/dashboard/product/edit/:id"
          element={
            <>
              <PrivateRoutes>
                <UpdateProduct />
              </PrivateRoutes>
            </>
          }
        />

        <Route
          path="/admin/dashboard/order"
          element={
            <>
              <PrivateRoutes>
                <OrderPage />
              </PrivateRoutes>
            </>
          }
        />
        <Route
          path="/admin/dashboard/user/:id"
          element={
            <>
              <PrivateRoutes>
                <UserPage />
              </PrivateRoutes>
            </>
          }
        />
        <Route
          path="/admin/dashboard/dashbots"
          element={
            <>
              <PrivateRoutes>
                <DashbotPage />
              </PrivateRoutes>
            </>
          }
        />
        <Route
          path="/admin/dashboard/nenbots"
          element={
            <>
              <PrivateRoutes>
                <NenbotPage />
              </PrivateRoutes>
            </>
          }
        />
        <Route
          path="/admin/dashboard/nenbots/keys"
          element={
            <>
              <PrivateRoutes>
                <KeysNenbot />
              </PrivateRoutes>
            </>
          }
        />
        <Route
          path="/admin/dashboard/nenbots/keys/create"
          element={
            <>
              <PrivateRoutes>
                <CreateKey />
              </PrivateRoutes>
            </>
          }
        />
        <Route
          path="/admin/dashboard/coupons"
          element={
            <>
              <PrivateRoutes>
                <CouponPage />
              </PrivateRoutes>
            </>
          }
        />
        <Route
          path="/admin/dashboard/coupons/create"
          element={
            <>
              <PrivateRoutes>
                <CreateCoupon />
              </PrivateRoutes>
            </>
          }
        />
        <Route
          path="/admin/dashboard/newsletter"
          element={
            <>
              <PrivateRoutes>
                <Newsletter />
              </PrivateRoutes>
            </>
          }
        />
      </Routes>
    </>
  );
}

export default Router;
