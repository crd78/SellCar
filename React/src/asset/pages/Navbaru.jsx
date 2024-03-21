import '../css/Navbar.css';


const Navbaru = () => {
    return (
        <nav>
            <div className="container">
                <nav className="navbar">
                    <a href="./">Accueil</a>
                    <a href="/vehicule">Catalogue</a>
                    <a href="/Auth/login">Connexion</a>
                </nav>
            </div>
        </nav>
    );
};

export default Navbaru;
