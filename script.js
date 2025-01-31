document.addEventListener("DOMContentLoaded", function () {
    const output = document.getElementById("output");
    const input = document.getElementById("command");

    let inStonksMenu = false;
    let inDiaryMenu = false;
    let isAgeVerified = false;
    let diaryEntries = [];

    function printMessage(message) {
        const line = document.createElement("div");
        line.textContent = `> ${message}`;
        line.classList.add("output-line");
        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
    }

    function clearScreen() {
        output.innerHTML = "";
    }

    function fetchDiaryEntries() {
        fetch("diary-entries.json")
            .then(response => response.json())
            .then(data => {
                diaryEntries = data;
            })
            .catch(error => {
                console.error("Error loading diary entries:", error);
                diaryEntries = [];
            });
    }

    function showAgeVerification() {
        clearScreen();
        printMessage("Hi Anon, I've been waiting for you. Are you over 18 years old? (yes/no)");
    }

    function handleCommand(command) {
        const cmd = command.toLowerCase().trim();
    
        if (!isAgeVerified) {
            if (cmd === "yes") {
                isAgeVerified = true;
                clearScreen();
                printMessage("Access granted. Type 'startgame', 'diary', 'about', or 'stonks' to proceed.");
            } else if (cmd === "no") {
                clearScreen();
                printMessage("Access denied.");
                input.disabled = true;
            }
            return;
        }
    
        if (inStonksMenu) {
            if (cmd === "juncoin") {
                window.location.href = "https://pump.fun/coin/4QXSvMiEABmKo4HQAdJBHBZaM49WuJGEmrbHBNrwpump"; // Replace with real URL
            } else if (cmd === "back") {
                inStonksMenu = false;
                clearScreen();
                printMessage("Access granted. Type 'startgame', 'diary', 'about', or 'stonks' to proceed.");
            } else {
                printMessage("Invalid option. Type 'juncoin' or 'back'.");
            }
            return;
        }
    
        if (inDiaryMenu) {
            if (cmd === "back") {
                inDiaryMenu = false;
                clearScreen();
                printMessage("Access granted. Type 'startgame', 'diary', 'about', or 'stonks' to proceed.");
                return;
            } else {
                const entryNumber = parseInt(cmd);
                if (!isNaN(entryNumber) && entryNumber > 0 && entryNumber <= diaryEntries.length) {
                    inDiaryEntry = true; // Set diary entry mode
                    inDiaryMenu = false; // Exit the diary menu
                    clearScreen();
                    printMessage(diaryEntries[entryNumber - 1].content);
                    printMessage("Press 'Esc' to return to diary list.");
                }
            }
            return;
        }
    
        switch (cmd) {
            case "startgame":
                window.location.href = "https://incontinentcell.itch.io/factorial-omega"; // Replace with actual game URL
                break;
    
            case "diary":
                inDiaryMenu = true;
                clearScreen();
                printMessage("Jun's Diary:");
                diaryEntries.forEach((entry, index) => printMessage(`Entry ${index + 1}`));
                printMessage("Type an entry number to read it or 'back' to return.");
                break;
    
            case "about":
                printMessage("Don't worry, Master, I won't dump you, this is only phase 1.");
                break;
    
            case "stonks":
                inStonksMenu = true;
                clearScreen();
                printMessage("Stonks terminal.");
                printMessage("Available options:");
                printMessage("- juncoin");
                printMessage("- back");
                break;
    
            default:
                // Do nothing for invalid commands
                break;
        }
    }

    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            const command = input.value;
            printMessage(command);
            handleCommand(command);
            input.value = "";
        }
    });

    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape" && inDiaryEntry) {
            inDiaryEntry = false; // Reset diary entry mode
            inDiaryMenu = true;  // Ensure we are back in the diary menu
            clearScreen();
            printMessage("Jun's Diary:");
            diaryEntries.forEach((entry, index) => printMessage(`Entry ${index + 1}`));
            printMessage("Type an entry number to read it or 'back' to return.");
        }
    });

    fetchDiaryEntries();
    showAgeVerification();
});
