import '../App.css'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube, FaMailBulk } from "react-icons/fa"

function Footer() {
    return (
        <>
            <div className="Footer">
                <div className="FooterLine"></div>
                <br />
                <div className="MissionStatement">
                </div>
                <br />
                <div>
                    <a className="FooterIcons" href="https://fb.me/GalvanizeHQ/" target="_blank" rel="noopener noreferrer"><FaFacebook style={{ color: "rgb(59, 89, 152)", width: "30px", height: "30px" }} /></a>
                    <a className="FooterIcons" href="https://twitter.com/galvanize/" target="_blank" rel="noopener noreferrer"><FaTwitter style={{ color: "rgb(0, 172, 238)", width: "30px", height: "30px" }} /></a>
                    <a className="FooterIcons" href="https://instagr.am/GalvanizeHQ/" target="_blank" rel="noopener noreferrer"><FaInstagram style={{ color: "#d6249f", width: "30px", height: "30px" }} /></a>
                    <a className="FooterIcons" href="https://www.linkedin.com/school/galvanize-it/" target="_blank" rel="noopener noreferrer"><FaLinkedin style={{ color: "rgb(0, 114, 177)", width: "30px", height: "30px" }} /></a>
                    <a className="FooterIcons" href="https://www.youtube.com/@Galvanize_HackReactor/videos/" target="_blank" rel="noopener noreferrer"><FaYoutube style={{ color: "red", width: "30px", height: "30px" }} /></a>
                    <a className="FooterIcons" href="mailto:marketing@galvanize.com" rel="noopener noreferrer"><FaMailBulk style={{ color: "#0072c6", width: "30px", height: "30px" }} /></a>
                </div>
                <br />
                <h3>© 2022 Inventory Manager, All rights reserved.</h3>
            </div>
        </>
    )
}

export default Footer;