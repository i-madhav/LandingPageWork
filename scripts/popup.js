export function handlePopUp() {
    let popupHtml = `<div class="container2">
    <div class="popup">
        <h2>Talk to us</h2>
        <label for="workEmail" class="work display">Work email</label>
        <input type="email" placeholder="Work email*" id="workEmail" class="commonCss">
        <div class="inputName">
            <input type="text" placeholder="First name*" id="firstName" class="commonCss">

            <input type="text" placeholder="Last name*" id="lastName" class="commonCss">
        </div>

        <div class="check">
            <input type="checkbox" id="check">
            <span>I agree to Fyle's terms and conditions, and provide consent to send me
                communication.</span>
        </div>

        <div class="popupBtn">
            <button>Contact Us</button>
        </div>
    </div>
</div>`

const popContainer = document.createElement('div');
popContainer.innerHTML = popupHtml;
document.body.appendChild(popContainer);

const popupBtn = document.querySelector(".popupBtn button");
const checkbox = document.querySelector('input[type="checkbox"]');
const inputs = document.querySelectorAll('input[type="text"]');
const labels = document.querySelectorAll('label');

popupBtn.addEventListener("click" , sendData);

function sendData() {
    const workEmail = document.querySelector("#workEmail")
    let workValue = workEmail.value;
   

    const firstName = document.querySelector("#firstName");
    let firstValue = firstName.value;

    const lastName = document.querySelector("#lastName");
    let lastValue = lastName.value;

    if(!checkbox.checked) return alert("Accept our condition!");

   const valueObj = {
    workEmail:workValue,
    firstName:firstValue,
    lastName:lastValue
   }

   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   if(!emailRegex.test(valueObj.workEmail)) return alert("Enter valid email");

   handlePopUpSubmission(valueObj);
   console.log(valueObj);

   workEmail.value = " ";
   firstName.value = " ";
   lastName.value = " ";

   document.body.removeChild(popContainer);
}

async function handlePopUpSubmission(value){
    try {
        const response = await fetch(`https://getform.io/f/eapdkqja`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:value
        });

        console.log(response);
    } catch (error) {
        console.log(error.message);
    }
}

inputs.forEach((input) => {
    input.addEventListener("click", () => {
        // Hide all labels initially
        labels.forEach((label) => {
            label.classList.add("display");
        });

        // Show the label associated with the clicked input
        const inputId = input.id;
        const label = document.querySelector(`label[for="${inputId}"]`);
        if (label) {
            label.classList.remove("display");
        }

        // Remove placeholder on click
        input.addEventListener("input", () => {
            input.placeholder = " ";
        });
    });
});
}
