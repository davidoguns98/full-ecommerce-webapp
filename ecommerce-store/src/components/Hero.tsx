import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const heroImages = [
  {
    url: "https://media.istockphoto.com/id/2150506690/photo/e-commerce-online-shopping-concept-with-digital-add-to-cart-feature-on-circuit-background.jpg?s=612x612&w=is&k=20&c=-qY43gT35MxFDwzoE4-I1_BIY7UbnGVlhhUjDwO2Tqk=",
    heading: "Shop the Latest Trends",
    subtext: "Discover the newest arrivals and best deals today!",
  },
  {
    url: "https://media.istockphoto.com/id/2187887661/photo/shopping-cart-sign-and-binary-code-background-promotion-for-digital-sales-and-online-shopping.webp?a=1&b=1&s=612x612&w=0&k=20&c=1wDdwdN5P0YbKhh-drXc0bnre6Yqu2vG0hElmF1kiK8=",
    heading: "Upgrade Your Style",
    subtext: "Hand-picked styles for every occasion.",
  },
  {
    url: "https://media.istockphoto.com/id/1972284692/photo/digital-cart-icon-on-future-tech-background-online-shopping-evolution-futuristic-shopping.webp?a=1&b=1&s=612x612&w=0&k=20&c=K7G451e5Hrxv-Akc7jFFvO7qdDLbt_zwxoS2Fh1AR9o=",
    heading: "Exclusive Offers",
    subtext: "Limited-time discounts on top products!",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change slide every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[70vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.4 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 h-full w-full"
        >
          <div
            className="h-full w-full bg-cover bg-center "
            style={{
              backgroundImage: `url(${heroImages[current].url})`,
            }}
          >
            <div className=" bg-opacity-50 h-full flex items-center justify-center">
              <div className="text-center px-4 md:px-8 text-white">
                <motion.h1
                  className="text-3xl md:text-5xl font-bold mb-4"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {heroImages[current].heading}
                </motion.h1>
                <motion.p
                  className="text-lg md:text-xl mb-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {heroImages[current].subtext}
                </motion.p>
                <Link
                  to="/products"
                  className="inline-block bg-yellow-400 text-gray-800 py-2 px-6 rounded-lg text-lg hover:bg-yellow-300"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Hero;
