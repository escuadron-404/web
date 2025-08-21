const ws = new WebSocket(`ws://${window.location.host}/ws`);

ws.onmessage = async (event) => {
	// Made async to use await
	const signal = event.data;
	console.log(`Received signal: ${signal}`);

	if (signal === "reload") {
		console.log("Hot-reloading HTML content...");
		try {
			const response = await fetch(window.location.href);
			const html = await response.text();

			// Parse the fetched HTML
			const parser = new DOMParser();
			const doc = parser.parseFromString(html, "text/html");

			// Find the body of the fetched document
			const newBody = doc.body;

			// Find the current body
			const currentBody = document.body;

			// Replace the content of the current body with the new body's content
			currentBody.innerHTML = newBody.innerHTML;

			// Re-execute scripts that were part of the newly injected HTML.
			// This is crucial because innerHTML doesn't execute scripts automatically.
			Array.from(newBody.querySelectorAll("script")).forEach((oldScript) => {
				if (oldScript.id == "dev-js") {
					return;
				}
				const newScript = document.createElement("script");
				// Copy attributes (like `src` for external scripts)
				Array.from(oldScript.attributes).forEach((attr) =>
					newScript.setAttribute(attr.name, attr.value),
				);
				// Copy content for inline scripts
				newScript.textContent = oldScript.textContent;
				currentBody.appendChild(newScript); // Append to re-execute
				// If it's an external script with a 'src', it will be fetched and executed.
			});

			console.log("HTML content reloaded successfully.");
		} catch (error) {
			console.error(
				"Failed to hot-reload HTML, falling back to full page reload:",
				error,
			);
			window.location.reload(); // Fallback if partial fails
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
