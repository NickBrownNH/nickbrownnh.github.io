// Define image arrays for each project carousel
const projectImages = {
    1: [
        `../imgs/reservations.png`,
        `../imgs/admin.png`,
        `../imgs/login1.png`,
        `../imgs/memberdirectory.png`,
        `../imgs/mainpage.png`
    ],
    2: [
        `../imgs/setupforresearch.png`,
        `../imgs/researchdemonstration.png`
    ],
    3: [
        `../imgs/chefbotstartup.png`,
        `../imgs/chefbotmenu.png`,
        `../imgs/chefbotinterface.png`,
        `../imgs/chefbotinterface1.png`
    ]
};

// Track the current image index for each carousel
const currentIndex = { 1: 0, 2: 0, 3: 0 };

// Show the image at the given index for the given carousel
function showSlide(carousel, idx) {
    const img = document.getElementById(`carousel${carousel}-img`);
    if (img && projectImages[carousel]) {
        img.src = projectImages[carousel][idx];
    }
}

// Go to the previous image in the carousel
function prevSlide(carousel) {
    if (!projectImages[carousel]) return;
    currentIndex[carousel] = (currentIndex[carousel] - 1 + projectImages[carousel].length) % projectImages[carousel].length;
    showSlide(carousel, currentIndex[carousel]);
}

// Go to the next image in the carousel
function nextSlide(carousel) {
    if (!projectImages[carousel]) return;
    currentIndex[carousel] = (currentIndex[carousel] + 1) % projectImages[carousel].length;
    showSlide(carousel, currentIndex[carousel]);
}

// Initialize all carousels to show their first image on page load
window.addEventListener(`DOMContentLoaded`, () => {
    Object.keys(projectImages).forEach(carousel => {
        showSlide(carousel, 0);
    });
});
