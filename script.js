const reveals = document.querySelectorAll(".reveal");
const bgm = document.getElementById("bgm");
const btn = document.getElementById("musicBtn");
const opening = document.getElementById("opening");
const enterBtn = document.getElementById("enterBtn");

const scrollGuide = document.querySelector(".scroll-guide");

let playing = false;

/*  REVEAL（上下都會動） */
const observer = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }

  });

}, {
  threshold: 0.2
});

reveals.forEach(r => observer.observe(r));


/* letter control */
const musicTooltip = document.querySelector(".music-tooltip");
enterBtn.addEventListener("click", async () => {

  try {
    await bgm.play();
    playing = true;
    btn.style.opacity = 1;
  } catch (err) {
    console.log("music blocked", err);
  }

  opening.classList.add("hide");

  if (scrollGuide) {
    scrollGuide.classList.add("is-active");
  }

  if (musicTooltip) {
    musicTooltip.classList.add('is-active');
    
    // 3000毫秒後，自動移除 is-active 狀態
    setTimeout(() => {
      musicTooltip.classList.remove('is-active');
    }, 3000);
  }

  
});

/* music control */
btn.addEventListener("click", () => {

  if (playing) {
    bgm.pause();
    btn.style.opacity = 0.4;
  } else {
    bgm.play();
    btn.style.opacity = 1;
  }

  playing = !playing;

});

/* 🌫 HERO video ） */
window.addEventListener("scroll", () => {

  const video = document.querySelector(".hero-video");

  if (!video) return;

  video.style.transform =
    `translateY(${window.scrollY * 0.15}px) scale(1.05)`;

});

//婚紗本
const book = document.getElementById('myBook');
const pages = document.querySelectorAll('.page');
const totalPages = pages.length;

pages.forEach((page, index) => {
  page.style.zIndex = totalPages - index;

  page.addEventListener('click', () => {
    if (!page.classList.contains('flipped')) {
    
      page.style.zIndex = totalPages + 1;
      page.classList.add('flipped');
      
      setTimeout(() => {
        page.style.zIndex = index + 1;
      }, 800);

    } else {
      page.style.zIndex = totalPages + 1;
      page.classList.remove('flipped');

      setTimeout(() => {
        page.style.zIndex = totalPages - index;
      }, 800);
    }
    // 點擊後，檢查現在有幾頁flipped
    const flippedPagesCount = document.querySelectorAll('.page.flipped').length;
    
    if (flippedPagesCount === 0) {
      // 全部闔上 移除所有平移，回到正中央
      book.classList.remove('open', 'closed-back');
      
    } else if (flippedPagesCount === totalPages) {
      // 全部翻開 移除一半平移，換成推到底
      book.classList.remove('open');
      book.classList.add('closed-back');
      
    } else {
      // 閱讀中 (部分翻開) 加上一半平移，移除推到底
      book.classList.add('open');
      book.classList.remove('closed-back');
    }
  });
});