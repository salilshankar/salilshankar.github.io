console.log("📦 custom.js loaded");

function tryToBindButton(retries = 10) {
  const button = document.getElementById("run-code-button");
  const output = document.getElementById("api-output");

  if (button && output) {
    console.log("✅ Found button and output, binding click");

    let visible = false;
    let dataFetched = false;
    let cachedData = "";

    button.addEventListener("click", async () => {
      if (visible) {
        output.style.display = "none";
        button.textContent = "▶️ Run Code";
        visible = false;
        return;
      }

      output.style.display = "block";
      button.textContent = "🙈 Hide Output";
      visible = true;

      if (dataFetched) {
        output.textContent = cachedData;
        return;
      }

      output.textContent = "⏳ Fetching data...";

      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
        const data = await response.json();
        cachedData = JSON.stringify(data, null, 2);
        output.textContent = cachedData;
        output.style.whiteSpace = "pre-wrap";
        dataFetched = true;
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

setTimeout(tryToBindButton, 0);
