console.log("📦 custom.js loaded");

function tryToBindButton(retries = 10) {
  const button = document.getElementById("run-code-button");
  const output = document.getElementById("api-output");

  if (button && output) {
    console.log("✅ Found button and output, binding click");

    button.addEventListener("click", async () => {
      console.log("🖱 Button clicked");
      output.textContent = "⏳ Fetching data...";

      try {
        const response = await fetch(`http://192.168.50.74:5000/api/people`);
        const data = await response.json();
        output.textContent = JSON.stringify(data, null, 2);
        console.log("✅ Data received", data);
      } catch (err) {
        output.textContent = `❌ Error: ${err}`;
        console.error("❌ Fetch failed", err);
      }
    });
  } else {
    if (retries > 0) {
      console.log("⏳ Waiting for button to appear...");
      setTimeout(() => tryToBindButton(retries - 1), 500);
    } else {
      console.warn("❌ Failed to find button after multiple retries");
    }
  }
}

window.tryToBindButton = tryToBindButton;
