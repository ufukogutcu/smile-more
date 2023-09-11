function InstallAlert() {
    return (
        <>
            You can install this app for a better experience!
            <br />
            {navigator.userAgent.includes("iPhone") && "iPhone"}
            {navigator.userAgent.includes("Android") && "Android"}
        </>
    )
}

export default InstallAlert