import './Footer.css'


function Footer() {


    return (
        <div className='information-container'>
            <div className='ciara-div'>
                <p className='name'>Ciara Fumar Christensen</p>
                <div>
                    <a className='github-button' href='https://github.com/c-iarraa' style={{fontFamily: 'Helvetica'}}><i class="fa-brands fa-github fa-1x"></i></a>
                </div>
                <div>
                    <a className='linkedin-button' href='https://www.linkedin.com/in/ciara-fumar-christensen-913972268/' style={{fontFamily: 'Helvetica'}}><i class="fa-brands fa-linkedin"></i></a>
                </div>
            </div>
        </div>
    )
}

export default Footer;
