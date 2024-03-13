import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";

import app from './config.js'

const dataBase = getDatabase(app)
const auth = getAuth()

const regBtn = document.getElementById('regBtn')

regBtn.addEventListener('click', e => {
    const addUserInputUI = document.getElementsByClassName('form-control')
    
    let newUser = {}

    if(Array.from(addUserInputUI).some(input  => input.value === '')){    
        return false
    } else {
        for(let i = 0; i < addUserInputUI.length; i++){
            let keyData = addUserInputUI[i].getAttribute('data-key')
            let value = addUserInputUI[i].value

            newUser[keyData] = value
        }
        
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user

            set(ref(dataBase,'Customers/' + user.uid),newUser)
            
            setTimeout(() => {
                window.location = 'signin.html'
            }, 1000);
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            alert(errorMessage)
        })
    }
})