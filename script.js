const API_KEY = "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";

// LOGIN PAGE 
const form = document.getElementById("loginForm");

if (form) {
  const username  = document.getElementById("username");
  const password  = document.getElementById("password");
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
    const tone       = document.getElementById("tone").value;
    const detail     = document.getElementById("detailLevel").value;
    const ai         = document.getElementById("targetAI").value;
    const outputBox  = document.getElementById("outputPrompt");

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
              content: `You are an expert prompt engineer.
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