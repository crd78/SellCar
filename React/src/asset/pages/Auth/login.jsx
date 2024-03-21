import React from "react";

const Login = () => {
  return (
        <form>
            <div className="group">
                <label htmlFor="login">identifiant</label>
                <input type="text" name="login" required></input>
            </div>
            <div className="group">
                <label htmlFor="password">mot de passe</label>
                <input type="password" name="password" required></input>
            </div>
            <div className="group">
                <button>Se connecter</button>
            </div>
        </form>
    )
}

export default Login;