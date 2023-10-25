"use client";
import { Loader } from "@/components/Loader";
import { loginService } from "@/services/login.service";
import { useUserStore } from "@/store/userStore";
import { setCookie } from "@/utils/cookies";
import { validateInput } from "@/utils/validator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { Toaster, toast } from "sonner";

export default function Login() {
  const { push } = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    "password-login": "",
  });
  const [loginErrors, setLoginErrors] = useState({
    email: "",
    "password-login": "",
  });
  const { setUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { email, "password-login": password } = loginData;
    if (!email || !password) {
      setLoginErrors({
        email: "Email is required",
        "password-login": "Password is required",
      });
      return;
    }

    try {
      setIsLoading(true);
      const session = await loginService(email, password);
      if (session.statusCode === 400) {
        return toast.error(session.message?.[0]);
      }

      const { id, name, token } = session;

      setUser({ id, name });
      setCookie("token", token);
      push("/");
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    setLoginData({
      ...loginData,
      [input.name]: input.value,
    });

    const resultError = validateInput({ key: input.name, value: input.value });
    setLoginErrors({ ...loginErrors, [input.name]: resultError });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="pb-8 relative">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50  border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  onChange={handleChange}
                />
                {loginErrors.email && (
                  <p className="text-red-500 absolute bottom-1 left-0">
                    {loginErrors.email}
                  </p>
                )}
              </div>
              <div className="pb-8 relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password-login"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleChange}
                />
                {loginErrors["password-login"] && (
                  <p className="text-red-500 absolute bottom-1 left-0">
                    {loginErrors["password-login"]}
                  </p>
                )}
              </div>
              <div className="relative flex items-center justify-center mb-4">
                <button
                  type="submit"
                  className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                >
                  Sign in
                </button>

                {isLoading && (
                  <span className="absolute right-0 top-1/2 -translate-y-1/2">
                    <Loader />
                  </span>
                )}
              </div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?
                <Link
                  href={"/register"}
                  className="ml-3 font-medium text-gray-600 hover:underline dark:text-gray-500"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Toaster richColors />
    </div>
  );
}
