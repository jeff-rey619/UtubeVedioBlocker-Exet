// Function to check and hide videos
function blockVideos() {
    chrome.storage.sync.get(["blockedKeywords"], (data) => {
        let blockedKeywords = data.blockedKeywords || []; // Load stored keywords

        let videos = document.querySelectorAll("ytd-video-renderer, ytd-grid-video-renderer");

        videos.forEach(video => {
            let titleElement = video.querySelector("#video-title");
            if (titleElement) {
                let title = titleElement.innerText.toLowerCase();
                if (blockedKeywords.some(keyword => title.includes(keyword))) {
                    video.style.display = "none"; // Hide the video
                }
            }
        });
    });
}

// Run when YouTube page loads
setInterval(blockVideos, 5000); // Check every 2 seconds
