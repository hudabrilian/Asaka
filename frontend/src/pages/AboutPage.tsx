import { Layout } from "../sections/Layout";
import { motion } from "framer-motion";

export const AboutPage = () => {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        exit={{ opacity: 0 }}
      >
        <p>About Page</p>
      </motion.div>
    </Layout>
  );
};
