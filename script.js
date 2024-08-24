const back = document.querySelector(".card-side.back");
const front = document.querySelector(".card-side.front");

// Toggle between displaying the back and front of the card
function display() {
  back.style.transform = "rotateY(0deg)";
  front.style.transform = "rotateY(180deg)";
}

function hide() {
  back.style.transform = "rotateY(180deg)";
  front.style.transform = "rotateY(0deg)";
}

// document.getElementById("download-btn").addEventListener("click", function () {
//   // Trigger the download of the CV (replace 'cv.pdf' with your actual CV file path)
//   window.location.href = "cv.pdf";
// });

const themeToggleBtn = document.getElementById("theme-toggle");
const body = document.body;

function setTheme(theme) {
  if (theme === "dark") {
    body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  }
}

// Check if the user has previously saved a theme
// const savedTheme = localStorage.getItem("theme");

// if (savedTheme) {
//   setTheme(savedTheme);
// }

// // Add an event listener to the toggle button to switch between themes
// themeToggleBtn.addEventListener("click", () => {
//   const currentTheme = body.classList.contains("dark-mode") ? "dark" : "light";
//   setTheme(currentTheme === "dark" ? "light" : "dark");
// });

// Show a preview of the CV when hovering over a preview link
//   document.getElementById("preview-link").addEventListener("mouseover", function() {
//     const previewURL = this.getAttribute("data-preview");
//     const previewPopup = document.getElementById("preview-popup");

//     // Set position of the popup
//     previewPopup.style.left = `${event.pageX}px`;
//     previewPopup.style.top = `${event.pageY + 10}px`;

//     // Load preview content (e.g., an image or iframe)
//     previewPopup.innerHTML = `<iframe src="${previewURL}" width="100%" height="200px" frameborder="0"></iframe>`;
//     previewPopup.classList.add("active");
//   });

document.addEventListener("DOMContentLoaded", function () {
  const previewLinks = document.querySelectorAll(".link");
  const previewPopup = document.getElementById("preview-popup");

  previewLinks.forEach((link) => {
    link.addEventListener("mouseover", function (event) {
      const previewURL = this.getAttribute("data-preview");

      // Load preview content (e.g., an image or iframe)
      previewPopup.innerHTML = `<iframe src="${previewURL}" width="100%" height="100%" frameborder="0"></iframe>`;
      previewPopup.classList.add("active");

      // Adjust position to avoid going off-screen
      const popupWidth = previewPopup.offsetWidth;
      const popupHeight = previewPopup.offsetHeight;
      let left = event.pageX + 10;
      let top = event.pageY + 10;

      if (left + popupWidth > window.innerWidth) {
        left = window.innerWidth - popupWidth - 10;
      }

      if (top + popupHeight > window.innerHeight) {
        top = window.innerHeight - popupHeight - 10;
      }

      previewPopup.style.left = `${left}px`;
      previewPopup.style.top = `${top}px`;
    });

    link.addEventListener("mouseout", function () {
      previewPopup.classList.remove("active");
      previewPopup.innerHTML = "";
    });
  });
});

/* -------------------------------------------------------------------------- */
/*                                  Research                                  */
/* -------------------------------------------------------------------------- */

// console.log("hamburger:", hamburger); // Check if the element is found
// console.log("navbar:", navbar);

function navigate() {
  const hamburger = document.querySelector(".hamburger");
  const navbar = document.querySelector(".navbar");
  // console.log("click event triggered");
  hamburger.classList.toggle("change");
  navbar.classList.toggle("change");
}

document.addEventListener("DOMContentLoaded", function () {
  const storiesContainer = document.querySelector(".content-container");
  const topicsList = document.querySelector(".topics ul");
  const filter = document.getElementById("filter");
  const prevStoryBtn = document.getElementById("prev-story");
  const nextStoryBtn = document.getElementById("next-story");
  const commentsList = document.getElementById("comments-list");

  let stories = [];
  let currentStoryIndex = 0;

  // Load stories from the JSON file
  fetch("stories.json")
    .then((response) => response.json())
    .then((data) => {
      stories = data;
      populateTopics(stories);
      displayCurrentDateStory(stories); // Display the story for the current date by default
      loadComments();
    });

  // Display stories
  function displayStories(storiesToDisplay) {
    if (storiesToDisplay.length > 0) {
      const currentStory = storiesToDisplay[currentStoryIndex];
      storiesContainer.querySelector(".story .title").textContent =
        currentStory?.title || "No stories available";
      storiesContainer.querySelector(".story .date-time").textContent = `${
        currentStory?.date || ""
      } ${currentStory?.time || ""}`;
      storiesContainer.querySelector(".story .content").textContent =
        currentStory?.content || "";

      displayComments(currentStory?.comments || []);
      updateNavigationButtons(storiesToDisplay);
    } else {
      displayNoStoriesMessage();
    }
  }

  // Display comments
  function displayComments(comments) {
    commentsList.innerHTML = "";
    comments.forEach((comment) => {
      const commentLi = document.createElement("li");
      const commentDiv = document.createElement("div");
      commentDiv.className = "comment";

      const author = document.createElement("div");
      author.className = "comment-author";
      author.textContent = comment.author;

      const dateTime = document.createElement("div");
      dateTime.className = "comment-date-time";
      dateTime.textContent = comment.dateTime;

      const content = document.createElement("div");
      content.className = "comment-content";
      content.textContent = comment.content;

      commentDiv.appendChild(author);
      commentDiv.appendChild(dateTime);
      commentDiv.appendChild(content);
      commentLi.appendChild(commentDiv);
      commentsList.appendChild(commentLi);
    });
  }

  // Save comments to local storage
  function saveComments(comments) {
    const story = stories[currentStoryIndex];
    localStorage.setItem(`comments-${story.date}`, JSON.stringify(comments));
  }

  // Load comments from local storage
  function loadComments() {
    const story = stories[currentStoryIndex];
    const storedComments = JSON.parse(
      localStorage.getItem(`comments-${story.date}`)
    );
    if (storedComments) {
      displayComments(storedComments);
    }
  }

  // Handle comment submission
  document.getElementById("submit").addEventListener("click", function (e) {
    e.preventDefault();
    const commentField = document.getElementById("comment-field");
    const newComment = {
      author: "Anonymous",
      dateTime: new Date().toLocaleString(),
      content: commentField.value,
    };

    const story = stories[currentStoryIndex];
    story.comments = story.comments || [];
    story.comments.push(newComment);
    saveComments(story.comments);
    displayComments(story.comments);
    commentField.value = "";
  });

  // Populate topics list
  function populateTopics(stories) {
    topicsList.innerHTML = "";
    const uniqueTags = [...new Set(stories.map((story) => story.tag))];
    uniqueTags.forEach((tag) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#";
      a.textContent = tag;
      li.appendChild(a);
      topicsList.appendChild(li);
    });
  }

  // Display the story for the current date
  function displayCurrentDateStory(stories) {
    const today = new Date().toLocaleDateString();
    const todaysStories = stories.filter(
      (story) => new Date(story.date).toLocaleDateString() === today
    );

    if (todaysStories.length > 0) {
      currentStoryIndex = 0; // Reset to the first story of the day
      displayStories(todaysStories);
    } else {
      displayNoStoriesMessage();
    }
  }

  // Filter stories by tag
  filter.addEventListener("change", function () {
    const selectedTag = filter.value;
    if (selectedTag === "select option") {
      displayCurrentDateStory(stories);
    } else {
      const filteredStories = stories.filter(
        (story) => story.tag === selectedTag
      );
      currentStoryIndex = 0;
      displayStories(filteredStories);
    }
  });

  // Navigate between stories
  prevStoryBtn.addEventListener("click", function () {
    if (currentStoryIndex > 0) {
      currentStoryIndex--;
      displayStories(getStoriesByTag(filter.value));
    }
  });

  nextStoryBtn.addEventListener("click", function () {
    if (currentStoryIndex < getStoriesByTag(filter.value).length - 1) {
      currentStoryIndex++;
      displayStories(getStoriesByTag(filter.value));
    }
  });

  // Update navigation buttons state
  function updateNavigationButtons(storiesToDisplay) {
    prevStoryBtn.disabled = currentStoryIndex === 0;
    nextStoryBtn.disabled = currentStoryIndex >= storiesToDisplay.length - 1;
  }

  // Get stories by selected tag
  function getStoriesByTag(tag) {
    return stories.filter((story) => story.tag === tag);
  }

  // Display a message when no stories are available
  function displayNoStoriesMessage() {
    storiesContainer.querySelector(".story .title").textContent =
      "No stories available for today yet.";
    storiesContainer.querySelector(".story .date-time").textContent = "";
    storiesContainer.querySelector(".story .content").textContent = "";
    commentsList.innerHTML = "";
  }

  // Navigate to a specific tag's stories from topics list
  topicsList.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      const tag = e.target.textContent.trim();
      filter.value = tag; // Set the filter dropdown to the selected tag
      const storiesToDisplay = getStoriesByTag(tag);
      currentStoryIndex = 0;
      displayStories(storiesToDisplay);
    }
  });
});
