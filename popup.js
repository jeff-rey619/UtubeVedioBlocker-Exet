document.addEventListener("DOMContentLoaded", () => {
    const keywordInput = document.getElementById("keyword");
    const addButton = document.getElementById("add");
      const clearButton = document.getElementById("clear");
    const list = document.getElementById("list");

    chrome.storage.sync.get(["blockedKeywords"], (data) => {
        let keywords = data.blockedKeywords || [];
        updateUI(keywords);
    });

    addButton.addEventListener("click", () => {
        let keyword = keywordInput.value.trim().toLowerCase();
        if (keyword) {
            chrome.storage.sync.get(["blockedKeywords"], (data) => {
                let keywords = data.blockedKeywords || [];
                if (!keywords.includes(keyword)) {
                    keywords.push(keyword);
                    chrome.storage.sync.set({ blockedKeywords: keywords }, () => {
                        updateUI(keywords);
                    });
                }
            });
            keywordInput.value = "";
        }
    });

    clearButton.addEventListener("click", () => {
        chrome.storage.sync.remove("blockedKeywords", () => {
            updateUI([]); 
           
        });
    });

    function updateUI(keywords) {
        list.innerHTML = "";
        keywords.forEach((keyword, index) => {
            let item = document.createElement("li");
            item.textContent = keyword;
            list.appendChild(item);
        });
    }
});
