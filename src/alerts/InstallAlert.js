import Alert from "./Alert"

function InstallAlert() {
    return (
        <Alert>
            {navigator.userAgent.includes("iPhone") && <>On Safari click Share &gt; Add to Home Screen to install this app for a better experience!</>}
            {navigator.userAgent.includes("Android") && <>On your browser click Settings &gt; Add page to &gt; Home Screen to install this app for a better experience!</>}
            {!navigator.userAgent.includes("Android") && !navigator.userAgent.includes("iPhone") && <>You can install this app for a better experience!</> }
        </Alert>

                
    )
}

export default InstallAlert