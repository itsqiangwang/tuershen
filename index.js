document.getElementById("downloadButton").addEventListener("click", function () {
    try {
        // Get the current local date and time
        const now = new Date();

        // Format the date for the file name (YYYYMMDD)
        const dateForFilename = now.toLocaleDateString('en-CA').replace(/-/g, ''); // YYYYMMDD (using Canadian format as it matches ISO)

        // Format the time for the file name (HHMMSS) in 24-hour format
        const timeForFilename = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
                                    .replace(/:/g, ''); // Remove colons

        // Format the date for the default text (YYYY-MM-DD)
        const formattedDateForText = now.toLocaleDateString('en-CA'); // YYYY-MM-DD

        // Format the time for the default text in 24-hour format
        const formattedTimeForText = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

        // Define the default pre-populated text with the formatted date and time
        const defaultText = `缘开运至 TO SERENDIPITY\n愿满福升 TO FELICITY\n\n兔儿神坛 Tu'er Shen Web Altar\n${formattedDateForText} @ ${formattedTimeForText}`;

        // Define the separator (horizontal line of dashes)
        const separator = "\n\n————————————————————————————\n"; // This creates a horizontal line of dashes

        // Get the user's input, if any
        const userText = document.getElementById("wish-note").value.trim();

        // Combine the user input and default text (with separator in between)
        const textToDownload = userText + (userText ? separator : "") + defaultText;

        // Create a blob with the combined text content
        const blob = new Blob([textToDownload], { type: "text/plain" });

        // Generate the current date and time for the filename
        const filename = `心愿_Wish_Note_${dateForFilename}_${timeForFilename}.txt`;

        // Create a temporary link element
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;

        // Append link to the document, trigger the download, and remove the link
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up the temporary object URL
        URL.revokeObjectURL(link.href);
    } catch (error) {
        console.error("Error downloading file:", error);
        alert("An error occurred while trying to download the file.");
    }
});
