// 
import Image from "next/image";
import SignupForm from "./SignupForm";

export const metadata = {
  title: "Signup - Easy Shop",
};

const SignupPage = () => {
  return (
    
    	<div className="overflow-hidden h-screen"
      style={{backgroundImage:`url("/bg.jpg")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
      <div className="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-8">
        <div className="flex flex-col items-center justify-between xl:flex-row">
          <div className="w-full max-w-xl mb-12 xl:pr-16 xl:mb-0 xl:w-7/12">
            <h2  data-aos="fade-up"className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-black sm:text-4xl sm:leading-none">
              Fast Delivery At Your  <br className="hidden md:block" />
              Door-step!
            </h2>
            <p className="max-w-xl mb-4 text-base text-gray-700 md:text-lg">
            By  shopping with us, you will enjoy unmatched convenience and time savings. Imagine skipping the long checkout lines, avoiding crowded aisles, and shopping for groceries from the comfort of your own home.
            </p>
          
          </div>
          <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
            <div className="relative">
              <svg
                viewBox="0 0 52 24"
                fill="currentColor"
                className="absolute bottom-0 right-0 z-0 hidden w-32 -mb-8 -mr-20 text-teal-400 lg:w-32 lg:-mr-16 sm:block"
              >
                <defs>
                  <pattern
                    id="766323e1-e594-4ffd-a688-e7275079d540"
                    x="0"
                    y="0"
                    width=".135"
                    height=".30"
                  >
                    <circle cx="1" cy="1" r=".7" />
                  </pattern>
                </defs>
                <rect
                  fill="url(#766323e1-e594-4ffd-a688-e7275079d540)"
                  width="52"
                  height="24"
                />
              </svg>
              <div data-aos="fade-left" className="relative bg-white bg-opacity-75 rounded shadow-2xl p-7 sm:p-10">
               <SignupForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
 
  );
};

export default SignupPage;
