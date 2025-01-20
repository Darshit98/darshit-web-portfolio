import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { FileText, Loader2, Download } from "lucide-react";
import { z } from "zod";

const resumeRequestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().max(500, "Message must be less than 500 characters").optional()
});

const ResumeRequestDialog = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      resumeRequestSchema.parse(formData);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Error",
        description: "Please fix the form errors before submitting.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

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
          message: formData.message,
          subject: 'New Resume Request',
        }),
      });

      if (response.ok) {
        toast({
          title: "Request Sent!",
          description: "Thank you for your interest. I'll send my resume to your email shortly.",
        });
        setFormData({ name: "", email: "", message: "" });
        setOpen(false);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your request. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="group relative overflow-hidden bg-gradient-to-r from-primary to-[#ff8c00] 
                     hover:opacity-90 text-white px-8 py-6 rounded-full text-lg font-semibold 
                     shadow-lg hover:shadow-xl transition-all duration-300 
                     animate-in fade-in slide-in-from-bottom-4"
        >
          <span className="absolute inset-0 bg-white/20 transform -skew-x-12 
                         translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          <span className="relative flex items-center gap-2">
            <FileText className="w-5 h-5 animate-bounce" />
            <span>Request Full Resume</span>
            <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-background text-foreground">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">Request Resume</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Input 
              placeholder="Your Name" 
              required 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`bg-background text-foreground placeholder:text-muted-foreground ${
                errors.name ? 'border-red-500' : ''
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <Input 
              type="email" 
              placeholder="Your Email" 
              required 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`bg-background text-foreground placeholder:text-muted-foreground ${
                errors.email ? 'border-red-500' : ''
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <Textarea 
              placeholder="Brief message (optional)" 
              className={`min-h-[100px] bg-background text-foreground placeholder:text-muted-foreground ${
                errors.message ? 'border-red-500' : ''
              }`}
              name="message"
              value={formData.message}
              onChange={handleInputChange}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-primary to-[#ff8c00] hover:opacity-90 text-white" 
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              'Submit Request'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeRequestDialog;