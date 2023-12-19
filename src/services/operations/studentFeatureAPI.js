import { toast } from "react-hot-toast";
import { studentEndpoints } from "../api";
import { apiConnector } from "../ApiConnector";
import { setPaymentLoading } from "../../components/Slice/courseSlice";
import { resetCart } from "../../components/Slice/cartSlice";
import RZPLOGO from '../../assets/logos/png/logo-no-background.png'


const {COURSE_PAYMENT_API,COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_EMAIL_API}=studentEndpoints;


// Load the Razorpay SDK from the CDN
function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = src
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }
  
  // Buy the Course
  export async function buyCourse(
    token,
    courses,
    user_details,
    navigate,
    dispatch
  ) {
    const toastId = toast.loading("Loading...")
    try {
      // Loading the script of Razorpay SDK
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
      console.log("hello script")
  
      if (!res) {
        toast.error(
          "Razorpay SDK failed to load. Check your Internet Connection."
        )
        return
      }
  
      // Initiating the Order in Backend
      const orderResponse = await apiConnector(
        "POST",
        COURSE_PAYMENT_API,
        {
          courses,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      )
  
      if (!orderResponse.data.success) {
        throw new Error(orderResponse.data.message)
      }
      console.log("PAYMENT RESPONSE FROM BACKEND............", orderResponse.data)
  
      // Opening the Razorpay SDK
      const options = {
        key: "rzp_test_HLDnBiwvJDvBVL",
        currency: orderResponse.data.message.currency,
        amount: `${orderResponse.data.message.amount}`,
        order_id: orderResponse.data.message.id,
        name: "StudyHub",
        description: "Thank you for Purchasing the Course.",
        image: RZPLOGO,
        prefill: {
          name: `${user_details.firstName} ${user_details.lastName}`,
          email: user_details.email,
        },
        handler: function (response) {
          sendPaymentSuccessEmail(response, orderResponse.data.message.amount, token)
          verifyPayment({ ...response, courses }, token, navigate, dispatch)
        },
        // modal: {
        //     confirm_close: true, // this is set to true, if we want confirmation when clicked on cross button.
        //     // This function is executed when checkout modal is closed
        //     // There can be 3 reasons when this modal is closed.
        //     ondismiss: async (reason) => {
        //       const {
        //         reason: paymentReason, field, step, code,
        //       } = reason && reason.error ? reason.error : {};
        //       // Reason 1 - when payment is cancelled. It can happend when we click cross icon or cancel any payment explicitly. 
        //       if (reason === undefined) {
        //         console.log('cancelled');
        //         // handlePayment('Cancelled');
        //       } 
        //       // Reason 2 - When modal is auto closed because of time out
        //       else if (reason === 'timeout') {
        //         console.log('timedout');
        //         // handlePayment('timedout');
        //       } 
        //       // Reason 3 - When payment gets failed.
        //       else {
        //         console.log('failed');
        //         // handlePayment('failed', {
        //         //   paymentReason, field, step, code,
        //         // });
        //       }
        //     },
        //   },
        //   // This property allows to enble/disable retries.
        //   // This is enabled true by default. 
        //   retry: {
        //     enabled: false,
        //   },
        //   timeout: 900, // Time limit in Seconds
          theme: {
            color: '#eccff4', // Custom color for your checkout modal.
          },
      }
      const paymentObject = new window.Razorpay(options)
  
      paymentObject.open()
      paymentObject.on("payment.failed", function (response) {
        toast.error("Oops! Payment Failed.")
        console.log(response.error)
      })
    } catch (error) {
      console.log("PAYMENT API ERROR............", error)
      toast.error("Could Not make Payment.")
    }
    toast.dismiss(toastId)
  }
  
  // Verify the Payment
  async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment...")
    dispatch(setPaymentLoading(true))
    try {
      const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
        Authorization: `Bearer ${token}`,
      })
  
      console.log("VERIFY PAYMENT RESPONSE FROM BACKEND............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
  
      toast.success("Payment Successful. You are Added to the course ")
      navigate("/dashboard/enrolled-courses")
      dispatch(resetCart())
    } catch (error) {
      console.log("PAYMENT VERIFY ERROR............", error)
      toast.error("Could Not Verify Payment.")
    }
    toast.dismiss(toastId)
    dispatch(setPaymentLoading(false))
  }
  
  // Send the Payment Success Email
  async function sendPaymentSuccessEmail(response, amount, token) {
    try {
      await apiConnector(
        "POST",
        SEND_PAYMENT_SUCCESS_EMAIL_API,
        {
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          amount,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      )
    } catch (error) {
      console.log("PAYMENT SUCCESS EMAIL ERROR............", error)
    }
  }