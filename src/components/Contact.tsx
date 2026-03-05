import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Phone, Linkedin, Github, Loader2 } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { staggerContainer, textReveal, buttonPress } from "@/lib/animations";

// Define validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(100, "Subject must be less than 100 characters"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters")
});

type AnimatedInputProps = {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  type?: string;
  error?: string;
};

const AnimatedInput = ({ name, value, onChange, placeholder, type = "text", error }: AnimatedInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const isTextarea = type === "textarea";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative"
        animate={{
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        {isTextarea ? (
          <Textarea
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            required
            className={`min-h-[150px] bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 transition-all duration-300 ${
              error ? 'border-red-500' : isFocused ? 'border-[#60a5fa] shadow-[0_0_0_3px_rgba(96,165,250,0.1)]' : ''
            }`}
          />
        ) : (
          <Input
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            type={type}
            required
            className={`bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 transition-all duration-300 ${
              error ? 'border-red-500' : isFocused ? 'border-[#60a5fa] shadow-[0_0_0_3px_rgba(96,165,250,0.1)]' : ''
            }`}
          />
        )}
      </motion.div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-red-500 text-sm mt-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    try {
      contactSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the form errors before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '6801486e-6299-4208-9e84-9eaaa393f6f6',
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        }),
      });

      if (response.ok) {
        toast.success("Message sent successfully! I'll get back to you soon.");
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-[#1e3a8a] to-gray-800 text-white">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="right" className="space-y-8">
            <div>
              <h2 className="text-5xl font-bold mb-4 text-[#60a5fa]">Contact Me</h2>
              <h3 className="text-2xl font-semibold mb-6">Let's work Together</h3>
              <p className="text-gray-300 leading-relaxed">
                I am passionate about collaborating on innovative projects and driving successful outcomes. 
                Whether you have a question, need a consultation, or are interested in working together, 
                feel free to reach out. I am always excited to connect with like-minded professionals and 
                explore new opportunities!
              </p>
            </div>

            <motion.div
              className="space-y-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div
                className="flex items-center space-x-3 text-gray-300"
                variants={textReveal}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Mail className="w-5 h-5 text-[#60a5fa]" />
                <a href="mailto:shah.darshit@northeastern.edu" className="hover:text-[#60a5fa] transition-colors">
                  shah.darshit@northeastern.edu
                </a>
              </motion.div>
              <motion.div
                className="flex items-center space-x-3 text-gray-300"
                variants={textReveal}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Phone className="w-5 h-5 text-[#60a5fa]" />
                <a href="tel:+18572688973" className="hover:text-[#60a5fa] transition-colors">
                  Call Me
                </a>
              </motion.div>
              <motion.div
                className="flex space-x-4 mt-6"
                variants={staggerContainer}
              >
                <motion.a
                  href="https://linkedin.com/in/darshit131998"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-full hover:bg-[#60a5fa]/20 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  variants={textReveal}
                >
                  <Linkedin className="w-5 h-5 text-[#60a5fa]" />
                </motion.a>
                <motion.a
                  href="https://github.com/Darshit98"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-full hover:bg-[#60a5fa]/20 transition-colors"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                  variants={textReveal}
                >
                  <Github className="w-5 h-5 text-[#60a5fa]" />
                </motion.a>
              </motion.div>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal direction="left">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <AnimatedInput
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    error={errors.name}
                  />
                  <AnimatedInput
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    type="email"
                    error={errors.email}
                  />
                  <AnimatedInput
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    error={errors.subject}
                  />
                  <AnimatedInput
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    type="textarea"
                    error={errors.message}
                  />
                  <motion.div
                    variants={buttonPress}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#60a5fa] hover:opacity-90 transition-opacity disabled:opacity-50 relative overflow-hidden"
                    >
                      <motion.span
                        className="flex items-center justify-center gap-2"
                        animate={isSubmitting ? { opacity: [1, 0.5, 1] } : {}}
                        transition={{ duration: 1, repeat: isSubmitting ? Infinity : 0 }}
                      >
                        {isSubmitting && (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        )}
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </motion.span>
                    </Button>
                  </motion.div>
                </motion.form>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
