const Footer = () => {
  return (
    <>
       <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Your Company Name. All Rights Reserved.</p>
      <div className="footer-links">
        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>
        <a href="/terms-of-service" target="_blank" rel="noopener noreferrer">
          Terms of Service
        </a>
        <a href="/contact" target="_blank" rel="noopener noreferrer">
          Contact Us
        </a>
      </div>
    </footer>
    </>
  )
}
export default Footer