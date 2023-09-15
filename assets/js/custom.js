document.addEventListener("DOMContentLoaded", function () {
    const onClickRadio = document.getElementById("onClick");
    const pageLoadRadio = document.getElementById("pageLoad");
    const selectElementBox = document.querySelector(".select-element");
    const linkNameBox = document.querySelector(".link-name");
    const insertButton = document.getElementById("insert");
    const linkNameInput = document.getElementById("link-name");
    const previewButton = document.getElementById("previewButton");
    const messageTextarea = document.getElementById("message");
    const previewDiv = document.getElementById("preview");
	const generateCodeButton = document.getElementById("GenerateCode");
    selectElementBox.style.display = "block";
    linkNameBox.style.display = "block";
    function resetPreview() {
	const linkName = linkNameInput.value;
	previewDiv.innerHTML = `<h2>Preview</h2><button id="previewButton" onclick="alert('${linkName}')">Click Me!</button>`;
    }
    onClickRadio.addEventListener("change", () => {
        selectElementBox.style.display = "block";
        linkNameBox.style.display = "block";
        resetPreview();
    });

	// on page lode  button click 
	insertButton.addEventListener("click", function () {
		if(pageLoadRadio.checked && messageText !== "" ){
			selectElementBox.style.display = "none";
        linkNameBox.style.display = "none";
        previewDiv.innerHTML = "<h2>Preview</h2><p>Window on load show alert. Click Generate button and run code.</p>";
		}
	})
    insertButton.addEventListener("click", function () {
		const messageText = messageTextarea.value.trim();
		const messageValidation = document.getElementById("messageValidation");
		if (messageText !== "") {
			if (pageLoadRadio.checked) {
				previewDiv.innerHTML = "<h2>Preview</h2><p>Window on load show alert. Click Generate button and run code.</p>";
			} else {
				const linkName = linkNameInput.value;
				resetPreview();
				const previewButton = previewDiv.querySelector("button");
				previewButton.innerText = linkName;
				previewButton.onclick = function () {
					alert(messageText);
				};
			}
			const selectElementLink = document.getElementById("link");
			if (selectElementLink.checked) {
				const linkName = linkNameInput.value;
				const linkPreview = `<a href="#" class="linkbtn" onclick="alert('${messageText}')">${linkName}</a>`;
				previewDiv.innerHTML = `<h2>Preview</h2>${linkPreview}`;
			}
		}else
		{
			messageValidation.textContent = "Please enter a message in the Message box.";
		}
    });
	messageTextarea.addEventListener("input", function () {
		const messageText = messageTextarea.value.trim();
		if (messageText !== "") {
			messageValidation.textContent = "";
		}
		else{
			messageValidation.textContent = "Please enter a message in the Message box.";
		}
	});
	function generateCode() {
        if (pageLoadRadio.checked) {
			const code = `<body onload="alert('${messageTextarea.value}')">`;
            document.getElementById("generatedCode").value = code;
        } 
		else {
            const linkName = linkNameInput.value;
            const alertCode = `alert('${messageTextarea.value}')`;
            if (button.checked) {
                const code = `<button id="alertButton" onclick="${alertCode}">${linkName}</button>`;
                document.getElementById("generatedCode").value = code;
            } else if (link.checked) {
                const code = `<a href="#" onclick="${alertCode}">${linkName}</a>`;
                document.getElementById("generatedCode").value = code;
            }
        }
    }
    generateCodeButton.addEventListener("click", generateCode);
	// Copy Generated Code
	document.getElementById("copyCodeButton").addEventListener("click", function () {
		const generatedCodeTextArea = document.getElementById("generatedCode");
		generatedCodeTextArea.select();
		document.execCommand("copy");
		const copyCodeButton = document.getElementById("copyCodeButton");
		copyCodeButton.innerHTML = '<i class="fa fa-clipboard"></i> Copied';
		generatedCodeTextArea.classList.add("fade-out");
		setTimeout(function () {
			window.getSelection().removeAllRanges(); // Deselect the text
			copyCodeButton.innerHTML = '<i class="fa fa-clone"></i> Copy Code';
			generatedCodeTextArea.classList.remove("fade-out");
		}, 1000);
	});



	// Run Generated Code in a New Tab/Window
	document.getElementById("runCodeButton").addEventListener("click", function () {
		const generatedCode = document.getElementById("generatedCode").value;
		const newTab = window.open('about:blank');
		newTab.document.open();
		newTab.document.write(generatedCode);
		newTab.document.close();
	});
});