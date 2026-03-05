import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

const Footer = () => {
  return (
    <motion.footer
      className="w-full py-6 border-t bg-background/80 backdrop-blur-sm"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
    >
      <div className="container flex justify-center items-center">
        <motion.p
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          © {new Date().getFullYear()} Developed by Darshit Shah. All rights reserved.
        </motion.p>
      </div>
    </motion.footer>
  );
};

export default Footer;