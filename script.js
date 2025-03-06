document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("search-btn");
    const userInput = document.getElementById("user-input");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    
    searchBtn.addEventListener("click", async () => {
        const username = userInput.value.trim();
        if (!username) {
            alert("Please enter a username");
            return;
        }
        
        const apiUrl = `https://leetcode-api-faisalshohag.vercel.app/${username}`;
        
        try {
            const response = await fetch(apiUrl, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
        
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
        
            const data = await response.json();
            console.log("API Response:", data); // Debugging full response
        
            if (data && data.totalSolved !== undefined) {
                easyLabel.textContent = data.easySolved;
                mediumLabel.textContent = data.mediumSolved;
                hardLabel.textContent = data.hardSolved;
                updateProgressCircles(data.easySolved, data.mediumSolved, data.hardSolved);
            } else {
                alert("Invalid username or no data found.");
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            alert("Error fetching data. Please try again.");
        }
    });
        
    function updateProgressCircles(easy, medium, hard) {
        const total = easy + medium + hard;
        
        document.querySelector(".easy-progress").style.background = `conic-gradient(#2ecc71 ${easy / total * 360}deg, #ddd 0deg)`;
        document.querySelector(".medium-progress").style.background = `conic-gradient(#f1c40f ${medium / total * 360}deg, #ddd 0deg)`;
        document.querySelector(".hard-progress").style.background = `conic-gradient(#e74c3c ${hard / total * 360}deg, #ddd 0deg)`;
    }
});
