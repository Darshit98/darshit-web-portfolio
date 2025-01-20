const Footer = () => {
  return (
    <footer className="w-full py-6 border-t bg-background/80 backdrop-blur-sm">
      <div className="container flex justify-center items-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Developed by Darshit Shah. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;