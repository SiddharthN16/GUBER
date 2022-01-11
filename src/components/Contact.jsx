import { Link } from "react-router-dom";

function Contact(){
  return (
    <div className = "contact">
      <p>Guber Inc.</p>
      <div className = "terms">
        <Link to = "/tos">Terms of Service</Link>
        <Link to = "/privacy">Privacy Policy</Link>
      </div>
    </div>
  );
}

export default Contact;
