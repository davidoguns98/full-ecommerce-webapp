import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const heroImages = [
  {
    url: "https://media.istockphoto.com/id/1867213758/photo/caucasian-female-photographer-taking-photos-of-the-female-fashion-model-black-ethnicity-while.webp?a=1&b=1&s=612x612&w=0&k=20&c=8QtePISE5T8gmj6ivdUbOEPnmXFWb41uTlxf8ffuN6g=",
    heading: "Shop the Latest Trends",
    subtext: "Discover the newest arrivals and best deals today!",
  },
  {
    url: "https://media.istockphoto.com/id/2161842568/photo/business-persons-on-meeting-in-the-office.webp?a=1&b=1&s=612x612&w=0&k=20&c=0Yb0lGE7e4ARdM6nETu0j197NStV_0IZqIbNDoytcUU=",
    heading: "Upgrade Your Style",
    subtext: "Hand-picked styles for every occasion.",
  },
  {
    url: "https://media.istockphoto.com/id/1498065619/photo/shot-of-a-desk-in-an-office-with-a-mobile-phone-laptop-camera-power-bank-and-watch-timepiece.webp?a=1&b=1&s=612x612&w=0&k=20&c=s-lLVhydQblcsc62p4r1_17Ep7Vucs6hEx5PtLGL-Fs=",
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
          className="absolute inset-0"
        >
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImages[current].url})` }}
          >
            <div className="bg-black bg-opacity-50 h-full flex items-center justify-center">
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
                <motion.a
                  href="/products"
                  className="inline-block bg-yellow-400 text-gray-800 py-2 px-6 rounded-lg text-lg hover:bg-yellow-300"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ delay: 0.6 }}
                >
                  Shop Now
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Hero;
