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


// --- GETTING ELEMENTS ---

// 1. Getting element by ID
const actBtn    = document.getElementById("act_btn");
const actOutput = document.getElementById("actOutput");
const actCopyBtn = document.getElementById("actCopyBtn");

// 2. Getting elements by tag name
//    Gets all <select> tags on the page (role + tone dropdowns)
const allSelects = document.getElementsByTagName("select");

// 3. Getting elements by class name
//    Gets all elements with class "label" (the input labels)
const allLabels = document.getElementsByClassName("label");

// 4. Getting element using querySelector
//    Gets the first element matching the CSS selector
const resultBox = document.querySelector(".act_result");

// 4b. Getting elements using querySelectorAll
//     Gets all <option> elements inside #actRole dropdown
const allOptions = document.querySelectorAll("#actRole option");


// ============================================================
// PAGE LOAD SETUP — runs as soon as the Act As A page loads
// ============================================================

if (actBtn) {

  // --- ADDING ATTRIBUTES ---

  // 5. Adding attribute using setAttribute
  //    Sets the placeholder text on the textarea
  document.getElementById("actInput").setAttribute("placeholder", "E.g. I have lower back pain after sitting for long hours...");

  // 6. Adding attribute without setAttribute
  //    Directly sets the title property on the button
  actBtn.title = "Click to get advice from the selected expert";

  // 7. Adding class using classList.add
  //    Highlights the first label on the page with a teal color class
  if (allLabels.length > 0) {
    allLabels[0].classList.add("active-label");
  }

  // Inline style for that active-label class effect (no separate CSS needed)
  if (allLabels.length > 0) {
    allLabels[0].style.color = "#19BDD3";   // Adding Style Color (Day 1)
  }


  // --- ADDING TEXT TO HTML ELEMENTS ---

  // 8. Adding text using textContent
  //    Updates the result box heading text
  const resultHeading = resultBox.querySelector("h4");
  resultHeading.textContent = "Expert Response";

  // 9. Adding text using innerHTML
  //    Sets the placeholder paragraph with HTML formatting
  actOutput.innerHTML = "Your <strong>expert advice</strong> will appear here.";


  // ============================================================
  // MAIN GENERATE CLICK — API call + all remaining DOM topics
  // ============================================================

  actBtn.addEventListener("click", async function () {

    const actRole  = document.getElementById("actRole").value;
    const actTone  = document.getElementById("actTone").value;
    const actInput = document.getElementById("actInput").value;

    // Stop if textarea is empty
    if (!actInput.trim()) {
      actOutput.style.color = "#ff4757";        // Adding Style Color
      actOutput.textContent = "⚠️ Please describe your problem first!";
      return;
    }


    // --- ADDING STYLE ---

    // 10. Adding Style Color — loading text color
    actOutput.style.color = "#5C6C85";

    // 11. Adding Style Background Color — highlight result box while loading
    resultBox.style.backgroundColor = "#0f1525";

    // 12. Adding Style Font Size — slightly smaller during loading
    actOutput.style.fontSize = "0.9rem";

    // Set loading text
    actOutput.textContent = "✨ Getting expert advice...";


    // --- DOM DAY 2: CREATING ELEMENTS ---

    // 13. Creating an element — a small "loading badge" shown inside result box
    const loadingBadge = document.createElement("span");

    // 14. Add text to the created element using textContent
    loadingBadge.textContent = "⏳ Thinking...";

    // Add a temporary id so we can find and remove it later
    loadingBadge.setAttribute("id", "actLoadingBadge");   // setAttribute (reuse)

    // Inline style for the badge
    loadingBadge.style.color           = "#19BDD3";
    loadingBadge.style.fontSize        = "0.8rem";
    loadingBadge.style.backgroundColor = "#0D2837";

    // 15. Appending the created element (badge) as a child of resultBox
    resultBox.appendChild(loadingBadge);

    // Disable button while loading (attribute without setAttribute)
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
              content: `You are an experienced ${actRole}. Respond in a ${actTone} tone.
Give clear, practical, and actionable advice for the user's problem.
Start with a brief assessment, then give step-by-step recommendations, then a short summary.
User's problem: "${actInput}"
Return ONLY the advice. No extra text or intro.`
            }
          ]
        })
      });

      const data = await response.json();
      const resultText = data.choices[0].message.content;

      // --- SHOW RESULT ---

      // Adding Style Color — white for result text
      actOutput.style.color = "white";

      // Adding Style Font Size — back to normal
      actOutput.style.fontSize = "0.95rem";

      // Adding Style Background Color — restore result box background
      resultBox.style.backgroundColor = "#0D111F";

      // Adding text using innerHTML — wraps the response in a paragraph tag
      actOutput.innerHTML = "<p>" + resultText + "</p>";

      // 16. Removing a class using classList.remove
      //     Remove the active-label highlight from the first label after generation
      if (allLabels.length > 0) {
        allLabels[0].classList.remove("active-label");
      }


    } catch (error) {
      actOutput.style.color = "#ff4757";
      actOutput.textContent = "Something went wrong. Make sure your API key is correct.";
      console.error(error);

    } finally {

      // 17. Removing a child element from its parent
      //     Find the loading badge and remove it from resultBox
      const badgeToRemove = document.getElementById("actLoadingBadge");
      if (badgeToRemove) {
        resultBox.removeChild(badgeToRemove);
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
