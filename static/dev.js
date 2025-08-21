const ws = new WebSocket(`ws://${window.location.host}/ws`);

ws.onmessage = async (event) => {
	const signal = event.data;
	console.log(`Received signal: ${signal}`);

	if (signal === "reload") {
		console.log("Hot-reloading HTML content...");
		try {
			const response = await fetch(window.location.href);
			const html = await response.text();
			const parser = new DOMParser();
			const doc = parser.parseFromString(html, "text/html");

			const newBody = doc.body;
			const currentBody = document.body;
			currentBody.innerHTML = newBody.innerHTML;

			// reload scripts
			Array.from(newBody.querySelectorAll("script")).forEach((oldScript) => {
				// ignore this script
				if (oldScript.id == "dev-js") {
					return;
				}
				const newScript = document.createElement("script");
				Array.from(oldScript.attributes).forEach((attr) =>
					newScript.setAttribute(attr.name, attr.value),
				);
				newScript.textContent = oldScript.textContent;
				currentBody.appendChild(newScript);
			});

			console.log("HTML content reloaded successfully.");
		} catch (error) {
			console.error(
				"Failed to hot-reload HTML, falling back to full page reload:",
				error,
			);
			window.location.reload();
		}
	} else if (signal === "reload_page") {
		console.log("Static file change detected. Performing full page reload...");
		window.location.reload();
	}
};

ws.onclose = () => {
	console.log("WebSocket closed.");
};
ws.onerror = (error) => {
	console.error("WebSocket error:", error);
};
