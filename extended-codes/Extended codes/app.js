async function generateResponse() {
  const prompt = document.getElementById("prompt").value;
  const responseBox = document.getElementById("response-box");
  responseBox.innerHTML = "⏳ Generating your budget plan...";
  try {
    const res = await fetch("http://54.147.4.244:8000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    responseBox.innerText = data.output;
  } catch (err) {
    responseBox.innerText = "❌ Error contacting Gemini backend.";
  }
}

function parseCSV(event) {
  const file = event.target.files[0];
  if (!file) return;
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: function(results) {
      const labels = Object.keys(results.data[0] || {});
      const values = labels.map(label => {
        return results.data.reduce((sum, row) => sum + Number(row[label] || 0), 0);
      });

      const ctx = document.getElementById("chart").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels,
          datasets: [{
            label: "CSV Data Visualization",
            data: values,
            backgroundColor: "#3b82f6"
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false }
          }
        }
      });
    }
  });
}