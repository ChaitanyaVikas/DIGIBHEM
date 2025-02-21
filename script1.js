// Add these event listeners to your existing JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Your existing code...

    // Header button handlers
    const loginButton = document.querySelector('.login-button');
    const signupButton = document.querySelector('.signup-button');

    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        showLoginModal();
    });

    signupButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'https://www.instagram.com/accounts/emailsignup/';
    });

    // Scroll handler for header shadow
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.instagram-header');
        if (window.scrollY > 0) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // Handle window resize for responsive adjustments
    window.addEventListener('resize', () => {
        const header = document.querySelector('.instagram-header');
        const mainContent = document.querySelector('.main-content');
        mainContent.style.paddingTop = `${header.offsetHeight + 20}px`;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const likeBtn = document.querySelector('.like-btn');
    const postImage = document.querySelector('.post-image');
    const postOverlay = document.querySelector('.post-overlay');
    const commentInput = document.querySelector('.comment-input input');
    const postCommentBtn = document.querySelector('.post-comment-btn');
    const followBtn = document.querySelector('.follow-btn');
    const likeCount = document.querySelector('.like-count');
    let isLiked = false;
    let doubleClickTimeout;
    let likeAnimationTimeout;

    // Enhanced Follow button functionality
    followBtn.addEventListener('click', () => {
        if (followBtn.textContent === 'Follow') {
            followBtn.textContent = 'Following';
            followBtn.style.color = '#262626';
        } else {
            followBtn.textContent = 'Follow';
            followBtn.style.color = '#0095f6';
        }
    });

    // Enhanced Like functionality
    function updateLikeCount(increment) {
        const currentLikes = parseInt(likeCount.textContent);
        const newLikes = increment ? currentLikes + 1 : currentLikes - 1;
        likeCount.textContent = `${newLikes.toLocaleString()} likes`;
    }

    function toggleLike() {
        const likeSvg = likeBtn.querySelector('svg');
        isLiked = !isLiked;
        
        if (isLiked) {
            likeSvg.innerHTML = `<path fill="#ed4956" d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>`;
            updateLikeCount(true);
        } else {
            likeSvg.innerHTML = `<path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>`;
            updateLikeCount(false);
        }
        
        likeBtn.classList.toggle('liked');
    }

    // Enhanced double-tap like animation
    function showLikeAnimation() {
        clearTimeout(likeAnimationTimeout);
        
        const heart = postOverlay.querySelector('i');
        postOverlay.style.opacity = '1';
        heart.style.transform = 'scale(0)';
        
        requestAnimationFrame(() => {
            heart.style.transform = 'scale(1.2)';
            
            setTimeout(() => {
                heart.style.transform = 'scale(1)';
                
                setTimeout(() => {
                    postOverlay.style.opacity = '0';
                    heart.style.transform = 'scale(0)';
                }, 500);
            }, 200);
        });

        if (!isLiked) {
            toggleLike();
        }
    }

    likeBtn.addEventListener('click', toggleLike);

    postImage.addEventListener('dblclick', (e) => {
        clearTimeout(doubleClickTimeout);
        showLikeAnimation();
    });

    // Enhanced mobile double-tap detection
    let lastTap = 0;
    postImage.addEventListener('touchstart', (e) => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        
        if (tapLength < 300 && tapLength > 0) {
            e.preventDefault();
            showLikeAnimation();
        }
        lastTap = currentTime;
    });

    // Comment input handler
    commentInput.addEventListener('input', () => {
        postCommentBtn.classList.toggle('active', commentInput.value.trim().length > 0);
    });
}); 

document.addEventListener('DOMContentLoaded', () => {
    const likeButton = document.getElementById('likeButton');
    const modal = document.getElementById('authModal');
    const closeButton = modal.querySelector('.close-button');
    const loginButton = modal.querySelector('.auth-button.login');
    const signupButton = modal.querySelector('.auth-button.signup');
  
    // Show modal when like button is clicked
    likeButton.addEventListener('click', () => {
      modal.style.display = 'flex';
    });
  
    // Close modal when close button is clicked
    closeButton.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  
    // Prevent modal close when clicking modal content
    modal.querySelector('.modal-content').addEventListener('click', (event) => {
      event.stopPropagation();
    });
  
    // Login button click handler
    loginButton.addEventListener('click', () => {
      console.log('Login clicked');
      // Add your login logic here
    });
  
    // Signup button click handler
    signupButton.addEventListener('click', () => {
      console.log('Signup clicked');
      // Add your signup logic here
    });
  });