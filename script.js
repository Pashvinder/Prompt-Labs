const API_KEY = "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";

// LOGIN PAGE 
const form = document.getElementById("loginForm");

if (form) {
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const userError = document.getElementById("userError");
  const passError = document.getElementById("passError");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;

    if (username.value.trim() === "") {
      userError.textContent = "Username cannot be empty";
      valid = false;
    } else {
      userError.textContent = "";
    }

    if (password.value.length < 6) {
      passError.textContent = "Password must be at least 6 characters";
      valid = false;
    } else {
      passError.textContent = "";
    }

    if (valid) {
      alert("Login Successful");
      window.location.href = "index.html";
    }
  });
}




// GENERATOR PAGE 
const generateBtn = document.getElementById("generate_btn");

if (generateBtn) {
  generateBtn.addEventListener("click", async function () {

    const promptIdea = document.getElementById("promptInput").value;
    const promptType = document.getElementById("promptType").value;
    const tone = document.getElementById("tone").value;
    const detail = document.getElementById("detailLevel").value;
    const ai = document.getElementById("targetAI").value;
    const outputBox = document.getElementById("outputPrompt");

    // Stop if input is empty
    if (!promptIdea.trim()) {
      outputBox.style.color = "#ff4757";
      outputBox.innerText = "⚠️ Please enter a prompt idea first!";
      return;
    }

    // Show loading
    outputBox.style.color = "#5C6C85";
    outputBox.innerText = "✨ Enhancing your prompt...";

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "user",
              content: `You are an expert prompt engineer with deep expertise in crafting clear, effective, and optimized prompts for AI systems.
You specialize in transforming vague or incomplete instructions into precise, high-performing prompts.
You understand context, intent, and desired outputs, ensuring maximum relevance and accuracy in responses.
You apply best practices in prompt structure, including role definition, constraints, and output formatting.
You continuously refine prompts to improve performance, creativity, and reliability across different use cases.
Create a ${detail} ${promptType} prompt for ${ai}.
Tone: ${tone}.
User's idea: "${promptIdea}"
Return ONLY the final enhanced prompt. No explanation, no intro, no extra text.`
            }
          ]
        })
      });

      const data = await response.json();

      // Show the result
      outputBox.style.color = "white";
      outputBox.innerText = data.choices[0].message.content;

    } catch (error) {
      outputBox.style.color = "#ff4757";
      outputBox.innerText = "Something went wrong. Make sure your API key is correct.";
      console.error(error);
    }

  });
}


function copyPrompt(){

  navigator.clipboard.writeText(outputBox.innerText);
}



//Templates

document.querySelectorAll(".copy").forEach(function(btn) {
  btn.onclick = function() {
    navigator.clipboard.writeText(
      btn.parentElement.querySelector("p").innerText
    );

    btn.innerText = "Copied!";

    setTimeout(function() {
      btn.innerText = "Copy";
    }, 2000);
  };
});

// ============================================================
// ACT AS A PAGE — DOM Day 1 & Day 2 Topics Covered
// ============================================================


// --- GETTING ELEMENTS (Day 1) ---

// 1. Getting element by ID
const actBtn     = document.getElementById("act_btn");
const actOutput  = document.getElementById("actOutput");
const actCopyBtn = document.getElementById("actCopyBtn");

// 2. Getting elements by tag name
//    Gets all <select> tags on the page
const allSelects = document.getElementsByTagName("select");

// 3. Getting elements by class name
//    Gets all elements that have the class "label"
const allLabels = document.getElementsByClassName("label");

// 4. Getting element using querySelector
//    Gets the result box div using its class name
const resultBox = document.querySelector(".act_result");

// 4b. Getting elements using querySelectorAll
//     Gets all <option> elements inside the role dropdown
const allOptions = document.querySelectorAll("#actRole option");


// ============================================================
// PAGE LOAD SETUP
// ============================================================

if (actBtn) {

  // --- ADDING ATTRIBUTES (Day 1) ---

  // 5. setAttribute — overwrite the placeholder on the textarea
  document.getElementById("actInput").setAttribute("placeholder", "E.g. I have lower back pain after sitting for long hours...");

  // 6. Without setAttribute — directly set a property on the button
  actBtn.title = "Click to get advice from the selected expert";

  // 7. classList.add — add a class to the first label to highlight it
  if (allLabels.length > 0) {
    allLabels[0].classList.add("active-label");
  }

  // --- ADDING STYLE (Day 1) ---

  // Adding Style Color — teal color on the first label
  if (allLabels.length > 0) {
    allLabels[0].style.color = "#19BDD3";
  }


  // --- ADDING TEXT (Day 1) ---

  // 8. textContent — set the heading inside result box
  const resultHeading = resultBox.querySelector("h4");
  resultHeading.textContent = "Expert Response";

  // 9. innerHTML — set placeholder text with bold formatting
  //    actOutput is a DIV so innerHTML works correctly here
  actOutput.innerHTML = "Your <strong>expert advice</strong> will appear here.";


  // ============================================================
  // MAIN GENERATE CLICK
  // ============================================================

  actBtn.addEventListener("click", async function () {

    const actRole     = document.getElementById("actRole").value;
    const actTone     = document.getElementById("actTone").value;
    const actLanguage = document.getElementById("actLanguage").value;
    const actLength   = document.getElementById("actLength").value;
    const actAge      = document.getElementById("actAge").value;
    const actInput    = document.getElementById("actInput").value;

    // Stop if textarea is empty
    if (!actInput.trim()) {
      actOutput.style.color = "#ff4757";          // Adding Style Color
      actOutput.textContent = "⚠️ Please describe your problem first!";
      return;
    }


    // --- ADDING STYLE (Day 1) during loading ---

    actOutput.style.color           = "#5C6C85";  // Adding Style Color
    actOutput.style.backgroundColor = "#0f1525";  // Adding Style Background Color
    actOutput.style.fontSize        = "0.9rem";   // Adding Style Font Size
    actOutput.textContent           = "✨ Getting expert advice...";


    // --- DOM DAY 2: CREATE ELEMENT & APPEND CHILD ---

    // Creating an element — a small loading badge inside the output div
    const loadingBadge = document.createElement("span");

    // Add text to it using textContent
    loadingBadge.textContent = " ⏳";

    // Give it an id using setAttribute so we can find it later
    loadingBadge.setAttribute("id", "actLoadingBadge");

    // Style it so it stays small and inline
    loadingBadge.style.color           = "#19BDD3";
    loadingBadge.style.fontSize        = "0.85rem";
    loadingBadge.style.backgroundColor = "transparent";

    // Appending child — add the badge inside the output div (not the whole panel)
    actOutput.appendChild(loadingBadge);

    // Disable button while waiting (without setAttribute)
    actBtn.disabled = true;


    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "user",
              content: `You are an experienced ${actRole}. Respond in ${actLanguage} language using a ${actTone} tone.
Keep the response ${actLength}. The user is in the age group: ${actAge}.
Give clear, practical, and actionable advice.
Start with a brief assessment, then give step-by-step recommendations, then a short summary.
User's problem: "${actInput}"
Return ONLY the advice. No extra text or intro.`
            }
          ]
        })
      });

      const data       = await response.json();
      const resultText = data.choices[0].message.content;

      // --- SHOW RESULT ---

      // Adding Style Color
      actOutput.style.color = "white";

      // Adding Style Font Size — back to normal
      actOutput.style.fontSize = "0.95rem";

      // Adding Style Background Color — restore the output area
      actOutput.style.backgroundColor = "transparent";

      // innerHTML — safely set result text inside the div
      actOutput.innerHTML = resultText;

      // 16. classList.remove — remove the highlight from the label
      if (allLabels.length > 0) {
        allLabels[0].classList.remove("active-label");
        allLabels[0].style.color = "#8da2c0";
      }


    } catch (error) {
      actOutput.style.color           = "#ff4757";
      actOutput.style.backgroundColor = "transparent";
      actOutput.textContent           = "Something went wrong. Make sure your API key is correct.";
      console.error(error);

    } finally {

      // --- DOM DAY 2: REMOVE CHILD ---
      // Remove the loading badge from inside actOutput
      const badgeToRemove = document.getElementById("actLoadingBadge");
      if (badgeToRemove) {
        actOutput.removeChild(badgeToRemove);
      }

      // Re-enable the button
      actBtn.disabled = false;
    }

  }); // end actBtn click

} // end if(actBtn)


// ============================================================
// COPY FUNCTION
// ============================================================

function copyActOutput() {
  const actOutput  = document.getElementById("actOutput");
  const actCopyBtn = document.getElementById("actCopyBtn");

  navigator.clipboard.writeText(actOutput.innerText);

  actCopyBtn.textContent = "Copied!";

  setTimeout(function () {
    actCopyBtn.textContent = "Copy";
  }, 2000);
}








let users = JSON.parse(sessionStorage.getItem("users")) || [];

// SIGN UP
let signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();
    let dob = document.getElementById("dob").value;
    let education = document.getElementById("education").value;
    let occupation = document.getElementById("occupation").value.trim();
    let aiLevel = document.getElementById("aiLevel").value;

    if (!username || !password || !dob || !education || !aiLevel) {
      document.getElementById("message").innerText = "Fill all required fields";
      return;
    }

    let user = { username, password, dob, education, occupation, aiLevel };
    users.push(user);

    sessionStorage.setItem("users", JSON.stringify(users));

    document.getElementById("message").innerText = "Signup successful!";
    signupForm.reset();
  });
}

// SIGN IN
let signinForm = document.getElementById("signinForm");
if (signinForm) {
  signinForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let username = document.getElementById("loginUser").value.trim();
    let password = document.getElementById("loginPass").value.trim();

    let found = users.find(u => u.username === username && u.password === password);

    if (found) {
      document.getElementById("loginMessage").innerText = "Login successful!";
    } else {
      document.getElementById("loginMessage").innerText = "Invalid credentials";
    }
  });
}