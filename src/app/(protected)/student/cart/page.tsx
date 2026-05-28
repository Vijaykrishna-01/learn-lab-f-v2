"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { selectUserCart, setUserData } from "@/redux/slices/userSlice";
import { removeCartItem, setCartItems, clearCart } from "@/redux/slices/cartSlice";
import {
  createCheckoutSessionAPI,
  fetchCartCoursesAPI,
  removeFromCartAPI
} from "@/services/cartService";

interface Course {
  _id: string;
  title: string;
  image?: { url: string };
  modules?: Array<{
    _id?: string;
    title?: string;
    lessons?: Array<{
      _id?: string;
      title?: string;
      duration?: string | number
    }>
  }>;
  price: number;
  averageRating: number;
  instructorDetails?: { name: string };
}

interface UserData {
  _id: string;
  name: string;
  cart: string[];
  courses?: string[];
}

const calculateCourseDuration = (course: Course): number => {
  if (!course.modules || !Array.isArray(course.modules)) return 0;

  let totalMinutes = 0;
  course.modules.forEach(module => {
    if (module.lessons && Array.isArray(module.lessons)) {
      module.lessons.forEach(lesson => {
        if (lesson.duration) {
          const durationNum = typeof lesson.duration === 'string'
            ? parseInt(lesson.duration, 10)
            : lesson.duration;
          totalMinutes += isNaN(durationNum) ? 0 : durationNum;
        }
      });
    }
  });

  return totalMinutes / 60;
};

const getSafeRating = (course: Course): number => {
  return course.averageRating && !isNaN(course.averageRating)
    ? course.averageRating
    : 0;
};

export default function CartPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

  const initialLoadRef = useRef(false);

  const userData = useSelector((state: RootState) => state.user.userData) as UserData | null;
  const userCart = useSelector(selectUserCart);
  const cartItems = useSelector((state: RootState) => state.cart.items) as Course[];

  // Fetch cart courses
  const fetchCartCourses = useCallback(async () => {
    if (!userData?._id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (userData.cart && userData.cart.length > 0) {
        const courses = await fetchCartCoursesAPI(userData.cart);
        dispatch(setCartItems(courses || []));
      } else {
        dispatch(setCartItems([]));
      }
    } catch (err: any) {
      console.error("Error fetching cart:", err);
      setError(err.message || "Failed to load cart");
    } finally {
      setLoading(false);
    }
  }, [userData, dispatch]);

  // Initial cart load
  useEffect(() => {
    if (!initialLoadRef.current && userData) {
      initialLoadRef.current = true;

      if (cartItems.length === 0) {
        fetchCartCourses();
      } else {
        setLoading(false);
      }
    }

    if (!userData) {
      setLoading(false);
    }
  }, [userData, cartItems.length, fetchCartCourses]);

  // Remove item from cart
  const handleRemoveFromCart = async (courseId: string) => {
    if (!userData) return;

    try {
      setError(null);

      dispatch(removeCartItem(courseId));
      const updatedCart = userCart.filter(id => id !== courseId);
      dispatch(setUserData({ ...userData!, cart: updatedCart }));

      await removeFromCartAPI(courseId);
    } catch (err: any) {
      console.error("Remove from cart error:", err);
      await fetchCartCourses();
      setError("Failed to remove item. Please try again.");
    }
  };

  // Handle checkout
  const handleCheckout = async () => {
    if (cartItems.length === 0 || !userData) {
      setError("Cart is empty or user not logged in");
      return;
    }

    setIsProcessingCheckout(true);
    setError(null);

    try {
      const { sessionId, url } = await createCheckoutSessionAPI({
        courseIds: cartItems.map(c => c._id),
        userId: userData._id
      });

      if (sessionId) {
        localStorage.setItem("lastCheckoutSessionId", sessionId);
        localStorage.setItem("checkoutTimestamp", Date.now().toString());
      }

      if (url) {
        window.location.href = url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (err: any) {
      console.error("Checkout error:", err);
      setError(err.message || "Failed to process checkout. Please try again.");
      setIsProcessingCheckout(false);
    }
  };

  // Calculate totals
  const totalPrice = cartItems.reduce((sum, course) => {
    const price = course.price && !isNaN(course.price) ? course.price : 0;
    return sum + price;
  }, 0);

  const totalHours = cartItems.reduce((sum, course) => {
    return sum + calculateCourseDuration(course);
  }, 0);

  const handleRetry = () => {
    setError(null);
    fetchCartCourses();
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center gap-4 text-xl text-blue-500 dark:text-gray-100">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p>Loading your cart...</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="max-w-[82vw] mx-auto px-4 py-18">
        <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Shopping Cart
        </h2>

        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center justify-between">
            <p className="text-red-600 dark:text-red-400">{error}</p>
            {!error.includes("contact support") && (
              <button 
                onClick={handleRetry}
                className="px-4 py-1 text-sm bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            )}
          </div>
        )}

        <p className="mb-4 text-gray-600 dark:text-gray-400">
          {cartItems.length} Course{cartItems.length !== 1 ? "s" : ""} in cart
        </p>

        {cartItems.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="mb-4 text-6xl">🛒</div>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">Your cart is empty</p>
            <button
              onClick={() => router.push("/courses")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* CART ITEMS */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {cartItems.map((course) => {
                const courseHours = calculateCourseDuration(course);
                const safeRating = getSafeRating(course);
                const moduleCount = course.modules?.length || 0;
                const instructorName = course.instructorDetails?.name || "Unknown Instructor";
                const imageUrl = course.image?.url || "/placeholder-course.jpg";
                const coursePrice = course.price && !isNaN(course.price) ? course.price : 0;

                return (
                  <div 
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 transition-all duration-300 hover:shadow-md"
                    key={course._id}
                  >
                    <img
                      src={imageUrl}
                      alt={course.title}
                      className="w-full sm:w-52 h-24 object-cover rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder-course.jpg";
                      }}
                    />

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-gray-100 truncate">
                        {course.title || "Untitled Course"}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        By {instructorName}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                        {safeRating.toFixed(1)} ⭐ • {moduleCount} Modules • {courseHours.toFixed(1)} Hours
                      </p>
                      <button
                        className="mt-2 text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => handleRemoveFromCart(course._id)}
                        disabled={isProcessingCheckout}
                      >
                        Remove from cart
                      </button>
                    </div>

                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 whitespace-nowrap">
                      ₹ {coursePrice.toLocaleString("en-IN")}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CHECKOUT SECTION */}
            <div className="flex flex-col gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Summary</h3>
                
                <div className="flex justify-between mb-2 text-gray-600 dark:text-gray-400">
                  <span>Subtotal:</span>
                  <span>₹ {totalPrice.toLocaleString("en-IN")}</span>
                </div>
                
                <div className="flex justify-between mb-4 text-gray-600 dark:text-gray-400">
                  <span>Total Hours:</span>
                  <span>{totalHours.toFixed(1)} hours</span>
                </div>
                
                <hr className="border-gray-200 dark:border-gray-700 mb-4" />
                
                <div className="flex justify-between mb-4">
                  <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">Total:</span>
                  <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    ₹ {totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
                
                <button
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleCheckout}
                  disabled={isProcessingCheckout || cartItems.length === 0}
                >
                  {isProcessingCheckout ? "Processing..." : "Proceed to Checkout"}
                </button>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Promotions</h3>
                <div className="flex gap-2">
                  <input
                    placeholder="Enter Coupon Code"
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isProcessingCheckout}
                  />
                  <button 
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isProcessingCheckout}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}