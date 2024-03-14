import { getAuth, signInWithEmailAndPassword,onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-database.js";

import app from './config.js'

const auth = getAuth()

loginBtn.addEventListener('click', e => {
    const email = document.getElementById('email').value
    const password = document.getElementById('pass').value
    console.log(email);
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user

            sessionStorage.setItem('keyUsername', email)
            sessionStorage.setItem('keyPassword', password)
            sessionStorage.setItem('daLiJeAktivnaSesija', true)
            
            location.href = 'index.html'
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message 

            if (errorCode === 'auth/internal-error') {
                $('#messageError').text('Niste uneli podatke')
            } else if(errorCode === 'auth/invalid-email') {
                $('#messageError').text('Niste uneli validan email')
            } else if(errorCode === 'auth/invalid-login-credentials'){
                $('#messageError').text('Niste uneli validan password')
            }
        })
})