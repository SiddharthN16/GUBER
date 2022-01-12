import { Link } from "react-router-dom";

function Contact() {
  return (
    <footer className="contact">
      <p>Guber Inc.</p>
      <div className="terms">
        <Link to="/tos">Terms of Service</Link>
        <Link to="/privacy">Privacy Policy</Link>
      </div>
    </footer>
  );
}

export default Contact;
