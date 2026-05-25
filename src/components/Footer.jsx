const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4 fixed bottom-0 w-full shadow-sm">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by
          DevTinder Team
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
