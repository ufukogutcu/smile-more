import { useAuth } from "../contexts/AuthContext"
import styles from "./AuthenticationPage.module.css"
import big_vertical_logo from "../static/big_vertical_logo.png"
import text_logo from "../static/small_text_logo.png"
import google_logo from "../static/google_logo.svg"
import apple_logo from "../static/apple_slogo.svg"

function AuthenticationPage() {
    const { guestLogin, googleLogin, appleLogin } = useAuth()
    
    return (
        <div className={styles.middle}>
            <img className={styles.big_vertical_logo} alt="big vertical logo" src={big_vertical_logo}></img>
            <div className={styles.loginblock}>
                <img className={styles.text_logo} alt="text logo" src={text_logo}></img>
                <button className={styles.button} onClick={googleLogin}>
                    <img className={styles.login_logo} alt="google logo" src={google_logo}></img>
                        <b className={styles.login_text}>
                            Sign in with Google
                        </b>
                    </button>
                <button className={styles.button} onClick={appleLogin}>
                    <img className={`${styles.login_logo} ${styles.apple_logo}`} alt="apple logo" src={apple_logo}></img>
                    <b className={styles.login_text}>
                        Sign in with Apple (N/A)
                    </b>
                    </button>
                <b>or</b>
                <button className={`${styles.button} ${styles.guest_button}`} onClick={guestLogin}>
                    <b className={styles.guest_text}>
                        Sign in as a guest
                    </b>
                    <br></br>
                    <b className={styles.guest_warning}>
                        (Your data will be lost after signing out)
                    </b>
                </button>
            </div>
        </div>
            )
}

export default AuthenticationPage