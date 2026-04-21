// ============================================================
// LOGIN PAGE — only runs when loginForm exists (login.html)
// ============================================================
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


// ============================================================
// GENERATOR PAGE — only runs when generate_btn exists (generator.html)
// ============================================================
const API_KEY = "AIzaSyBtMmUN5Y2FKuF3oZ3WkuYRaDRBm2b8Ie8";

document.getElementById("generate_btn").addEventListener("click", async function () {

  const promptIdea = document.getElementById("promptInput").value;
  const promptType = document.getElementById("promptType").value;
  const tone = document.getElementById("tone").value;
  const detail = document.getElementById("detailLevel").value;
  const ai = document.getElementById("targetAI").value;

  const outputBox = document.getElementById("outputPrompt");

  // 🛑 Validation
  if (!promptIdea.trim()) {
    outputBox.innerText = "Please enter a prompt idea.";
    return;
  }

  // ✨ Build prompt
  const finalPrompt = `
Create a ${detail.toLowerCase()} ${promptType.toLowerCase()} prompt.

Topic: ${promptIdea}
Tone: ${tone}
Target AI: ${ai}

Make it clear, structured, and optimized for best results.
`;

  outputBox.innerText = "Generating...";

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: finalPrompt }],
            },
          ],
        }),
      }
    );

    // ❌ Handle API errors
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      outputBox.innerText = "API request failed. Check console.";
      return;
    }

    const data = await response.json();

    // ✅ Extract result safely
    const result =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response generated.";

    outputBox.innerText = result;

  } catch (error) {
    console.error("Error:", error);
    outputBox.innerText = "Something went wrong.";
  }
});