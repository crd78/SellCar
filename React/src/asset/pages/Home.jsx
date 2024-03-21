import '../css/Home.css';


const Home = () => {
    return (
        <div className='bodyHome'>
            <div className='headerHome'>
                <h1 className='h1Home'>Bienvenue sur SellCar</h1>
                <img className='imgHome' src='../src/asset/images/home.jpeg'/>
            </div>
            <div className='contentHome'>
                <h2 className='h2Home'> Un plaisir d`acheter chez nous </h2>
                <p className='pHome'> Chez SellCar, nous mettons un point d`honneur à offrir un service client exceptionnel. Notre équipe dévouée est là pour répondre à toutes vos questions, vous guider dans votre processus d`achat et vous assurer une expérience agréable et sans tracas. Nous sommes là pour vous aider à trouver la voiture de vos rêves et nous nous engageons à vous offrir un service personnalisé et de qualité. Faites confiance à SellCar pour un service client inégalé. </p>
                <h2 className='h2Home'> Nos spécialités </h2>
                <div className='gammeContainer'>
                    <div className='contentGamme'>
                        <h3 className='h3Home'> SUV </h3>
                        <p className='pGamme'> Nos meilleurs modeles de SUV disponible à ce jour.</p>
                        <img className='imgGamme' src='../src/asset/images/gammesuv.jpg'/>
                        <img className='imgGamme2' src='../src/asset/images/gammesuv2.jpg'/>
                    </div>
                    <div className='contentGamme'>
                        <h3 className='h3Home'> Berline </h3>
                        <p className='pGamme'> Nos meilleurs modeles de Berline disponible à ce jour.</p>
                        <img className='imgGamme' src='../src/asset/images/gammeberline.jpg'/>
                        <img className='imgGamme2' src='../src/asset/images/gammeberline2.jpg'/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;