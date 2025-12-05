declare global {
    interface Window {
        onRecaptchaLoaded?: () => void;
    }
}
