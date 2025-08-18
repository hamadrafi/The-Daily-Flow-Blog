// Sample blog post data
const blogPosts = [
  {
    id: 1,
    title: "Building Modern Web Applications with JavaScript",
    category: "tech",
    date: "2024-08-15",
    description:
      "Explore the latest techniques and frameworks for creating dynamic, responsive web applications that deliver exceptional user experiences.",
    image:
      "imgs/Ai-Innovation.jpg",
  },
  {
    id: 2,
    title: "Hidden Gems of Southeast Asia",
    category: "travel",
    date: "2024-08-12",
    description:
      "Discover breathtaking destinations off the beaten path, from secluded beaches to ancient temples that will leave you speechless.",
    image:
      "imgs/beach-escape.jpg",
  },
  {
    id: 3,
    title: "The Art of Desserts Delights",
    category: "food",
    date: "2024-08-10",
    description:
      "Learn traditional techniques passed down through generations to create authentic Italian pasta dishes from scratch.",
    image:
      "imgs/Dessert-Delights.jpg",
  },
  {
    id: 4,
    title: "Cloud Computing ",
    category: "tech",
    date: "2024-08-08",
    description:
      "A comprehensive guide to modern CSS layout techniques that will revolutionize how you approach web design.",
    image:
      "imgs/cloud-computing.jpg",
  },
  {
    id: 5,
    title: "City Adventure",
    category: "travel",
    date: "2024-08-05",
    description:
      "Everything you need to know about living and working remotely in this tropical paradise, from coworking spaces to local culture.",
    image:
      "imgs/City-Adventure.jpg",
  },
  {
    id: 6,
    title: "Perfecting the Pizza",
    category: "food",
    date: "2024-08-03",
    description:
      "Master the delicate art of laminated dough to create buttery, flaky croissants that rival those from Parisian bakeries.",
    image:
      "imgs/Pizza-Night.jpg",
  },
  {
    id: 7,
    title: "Minimalist Living in the Digital Age",
    category: "lifestyle",
    date: "2024-08-01",
    description:
      "Discover how to simplify your life and focus on what truly matters while staying connected in our hyperdigital world.",
    image:
      "imgs/digital-minimalism-image.webp",
  },
  {
    id: 8,
    title: "Coding Tips",
    category: "tech",
    date: "2024-07-30",
    description:
      "Deep dive into advanced React Hooks patterns that will make your components more reusable and your code more maintainable.",
    image: "imgs/Coding-Tips.jpg",
  },
  {
    id: 9,
    title: "Mountain Trek",
    category: "travel",
    date: "2024-07-28",
    description:
      "An epic journey through one of the world's last great wildernesses, complete with practical tips for the adventure of a lifetime.",
    image:
      "imgs/Mountain-Trek.jpg",
  },
  {
    id: 10,
    title: "Healthy Eats",
    category: "food",
    date: "2024-07-25",
    description:
      "Explore the fascinating world of fermentation and how this ancient preservation technique can elevate your modern cooking.",
    image:
      "imgs/Healthy-Eats.jpg",
  },
  {
    id: 11,
    title: "Building a Productive Home Office",
    category: "lifestyle",
    date: "2024-07-22",
    description:
      "Design a workspace that maximizes productivity and creativity while maintaining work-life balance in your home environment.",
    image:
      "imgs/Office.webp",
  },
  {
    id: 12,
    title: "Cyber Security Basics",
    category: "tech",
    date: "2024-07-20",
    description:
      "An accessible introduction to machine learning concepts and practical applications for front-end and back-end developers.",
    image:
      "imgs/Cybersecurity.jpg",
  },
];

// Global variables
let currentPage = 1;
const postsPerPage = 6;
let currentCategory = "all";
let currentSearchTerm = "";

// DOM elements
const blogPostsContainer = document.getElementById("blogPosts");
const paginationContainer = document.getElementById("pagination");
const searchInput = document.getElementById("searchInput");
const categoryButtons = document.querySelectorAll(".filter-btn");

// Initialize the blog
function init() {
  setupEventListeners();
  displayPosts();
}

// Setup event listeners
function setupEventListeners() {
  // Category filter buttons
  categoryButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      currentCategory = e.target.dataset.category;
      currentPage = 1;
      updateActiveFilter(e.target);
      displayPosts();
    });
  });

  // Search input
  searchInput.addEventListener("input", (e) => {
    currentSearchTerm = e.target.value.toLowerCase().trim();
    currentPage = 1;
    displayPosts();
  });
}

// Update active filter button
function updateActiveFilter(activeButton) {
  categoryButtons.forEach((btn) => btn.classList.remove("active"));
  activeButton.classList.add("active");
}

// Filter posts based on category and search term
function getFilteredPosts() {
  return blogPosts.filter((post) => {
    const matchesCategory =
      currentCategory === "all" || post.category === currentCategory;
    const matchesSearch =
      currentSearchTerm === "" ||
      post.title.toLowerCase().includes(currentSearchTerm) ||
      post.description.toLowerCase().includes(currentSearchTerm);
    return matchesCategory && matchesSearch;
  });
}

// Format date
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

// Capitalize category name
function capitalizeCategory(category) {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

// Create post card HTML
function createPostCard(post) {
  return `
                <div class="post-card" data-id="${post.id}">
                    <div class="post-image" style="background-image: url('${
                      post.image
                    }')"></div>
                    <div class="post-content">
                        <div class="post-meta">
                            <span class="post-category">${capitalizeCategory(
                              post.category
                            )}</span>
                            <span class="post-date">${formatDate(
                              post.date
                            )}</span>
                        </div>
                        <h3 class="post-title">${post.title}</h3>
                        <p class="post-description">${post.description}</p>
                    </div>
                </div>
            `;
}

// Display posts with pagination
function displayPosts() {
  const filteredPosts = getFilteredPosts();
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // Ensure current page is valid
  if (currentPage > totalPages && totalPages > 0) {
    currentPage = totalPages;
  }

  // Get posts for current page
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Display posts
  if (currentPosts.length === 0) {
    blogPostsContainer.innerHTML = `
                    <div class="no-results">
                        <div class="no-results-icon">📝</div>
                        <h3>No posts found</h3>
                        <p>Try adjusting your search terms or category filter.</p>
                    </div>
                `;
  } else {
    blogPostsContainer.innerHTML = currentPosts.map(createPostCard).join("");

    // Add click event to post cards
    document.querySelectorAll(".post-card").forEach((card) => {
      card.addEventListener("click", () => {
        const postId = card.dataset.id;
        const post = blogPosts.find((p) => p.id == postId);
        alert(
          `You clicked on: ${post.title}\n\nThis would typically navigate to the full blog post.`
        );
      });
    });
  }

  // Update pagination
  updatePagination(totalPages, totalPosts);
}

// Update pagination controls
function updatePagination(totalPages, totalPosts) {
  if (totalPages <= 1) {
    paginationContainer.style.display = "none";
    return;
  }

  paginationContainer.style.display = "flex";

  const startPost = (currentPage - 1) * postsPerPage + 1;
  const endPost = Math.min(currentPage * postsPerPage, totalPosts);

  let paginationHTML = `
                <button ${
                  currentPage === 1 ? "disabled" : ""
                } onclick="changePage(${currentPage - 1})">
                    ← Previous
                </button>
            `;

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
      paginationHTML += `<button class="active" onclick="changePage(${i})">${i}</button>`;
    } else if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
      paginationHTML += `<button onclick="changePage(${i})">${i}</button>`;
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      paginationHTML += `<span>...</span>`;
    }
  }

  paginationHTML += `
                <button ${
                  currentPage === totalPages ? "disabled" : ""
                } onclick="changePage(${currentPage + 1})">
                    Next →
                </button>
                <div class="page-info">
                    Showing ${startPost}-${endPost} of ${totalPosts} posts
                </div>
            `;

  paginationContainer.innerHTML = paginationHTML;
}

// Change page function
function changePage(page) {
  currentPage = page;
  displayPosts();

  // Smooth scroll to top of posts
  blogPostsContainer.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

// Initialize the blog when DOM is loaded
document.addEventListener("DOMContentLoaded", init);

// Add some visual feedback for interactions
document.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("filter-btn") ||
    e.target.tagName === "BUTTON"
  ) {
    e.target.style.transform = "scale(0.95)";
    setTimeout(() => {
      e.target.style.transform = "";
    }, 150);
  }
});
