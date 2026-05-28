"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CART_ITEMS_API } from "@/utils/constants/api";

interface Lesson {
  duration: string;
}

interface Module {
  lessons: Lesson[];
}

interface UserData {
  _id: string;
  name: string;
  cart: string[];
}

interface Course {
  _id: string;
  userId: string;
  title: string;
  image?: { url: string };
  modules: Module[];
  price: number;
  averageRating: number;
  instructorDetails?: {
    name: string;
  };
}

export default function Page() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const userData = useSelector(
    (state: RootState) => state.user.userData
  ) as UserData;

  console.log(userData, "userDatataata");

  useEffect(() => {
    const fetchCourses = async () => {
      if (userData && userData.cart && userData.cart.length > 0) {
        setLoading(true);
        try {
          const response = await axios.post(
            CART_ITEMS_API,
            {
              ids: userData.cart,
            }
          );

          console.log(response.data, "this is res");

          setCourses(response?.data?.courses);
        } catch (err) {
          console.error("Error fetching courses:", err);
          setError((err instanceof Error ? err.message : "Something went wrong!") || "Something went wrong!");
        } finally {
          setLoading(false);
        }
      } else {
        setCourses([]);
        setLoading(false);
      }
    };

    fetchCourses();
  }, [userData.cart]);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-xl text-primary-500 dark:text-dark-text-primary">
        Loading...
      </div>
    );
  }

  console.log(courses, "successs");

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-[82vw] mx-auto px-4 py-8 min-h-screen">
        <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Shopping Cart
        </h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          {courses.length} Course{courses.length > 1 ? "s" : ""} in cart
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* ---------------------------- */}
          {/* CART ITEMS */}
          {/* ---------------------------- */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {courses.length === 0 ? (
              <p>No items in cart</p>
            ) : (
              courses.map((course: Course) => {
                return (
                  <div 
                    className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 transition-all duration-300"
                    key={course._id}
                  >
                    <img
                      src={course.image?.url || "/placeholder.jpg"}
                      alt={course.title}
                      className="w-52 h-24 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-gray-100">
                        {course.title}
                      </h3>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        By <strong>{course.instructorDetails?.name}</strong>
                      </p>

                      <button className="mt-2 text-sm text-blue-500 hover:underline">
                        Remove from cart
                      </button>
                    </div>

                    <p className="text-lg font-semibold py-4 text-gray-900 dark:text-gray-100">
                      ₹ {course.price}
                    </p>
                  </div>
                );
              })
            )}
          </div>

          {/* ---------------------------- */}
          {/* CHECKOUT SECTION */}
          {/* ---------------------------- */}
          <div className="flex flex-col gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300">
              <h3 className="text-lg font-semibold mb-2">Total:</h3>
              <p className="text-2xl font-bold">
                ₹ {courses.reduce((sum, c) => sum + c.price, 0)}
              </p>
              <button className="w-full mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                Checkout
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300">
              <h3 className="text-lg font-semibold">Promotions</h3>

              <div className="flex gap-2.5 mt-4">
                <input 
                  placeholder="Enter Coupon" 
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}