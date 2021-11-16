// PRELOAD
var progress = 0;
document.onreadystatechange = function () {
    if (document.readyState = "interactive") {
        var allElement = $("*");
        var length = allElement.length;
        for (var i = 0; i < length; i++) {
            set_element(allElement[i], length);
        }
    }
}
function set_element(element, totalElement) {
    var percetage = 100 / 4; //instead of 8 we can also put totalElement
    if ($(element).length == 1) {
        $("#preloader_fill").animate({ width: progress + percetage + "%" }, 1000, function () {
            if (document.getElementById("preloader_fill").style.width == "100%") {
                $(".preloader_main").fadeOut(500);
            }
        });
        progress = progress + percetage;
    }
}
var loader = document.querySelector(".loading");
window.addEventListener("load", vanish);
function vanish(){
    loader.classList.add("disapper");
}
/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu');

    } );
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu');
    });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav_link');

function linkAction(){
    //when we click on each nav_link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills_content'),
      skillsHeader = document.querySelectorAll('.skills_header');

function toggleSkills(){
    let itemClass = this.parentNode.className;

    for(i=0 ; i<skillsContent.length; i++){
        skillsContent[i].className = 'skills_content skills_close';
    }
    if(itemClass == 'skills_content skills_close'){
        this.parentNode.className = 'skills_content skills_open';
    }
}

skillsHeader.forEach((el) =>{
    el.addEventListener('click', toggleSkills);
})

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'), 
      tabContents = document.querySelectorAll('[data-content]');

tabs.forEach(tab =>{
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target);

        tabContents.forEach(tabContent =>{
            tabContent.classList.remove('qualification_active');
        })
        target.classList.add('qualification_active');

        tabs.forEach(tab =>{
            tab.classList.remove('qualification_active');
        })
        tab.classList.add('qualification_active');
    })
})

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll('.services_modal'),
      modalBtns = document.querySelectorAll('.services_button'),
      modalCloses = document.querySelectorAll('.services_modal-close');

let modal = function(modalClick){
    modalViews[modalClick].classList.add('active-modal');
}

modalBtns.forEach( (modalBtn, i) =>{
    modalBtn.addEventListener('click', ()=>{
        modal(i);
    })
} )

modalCloses.forEach( (modalClose) =>{
    modalClose.addEventListener('click', ()=>{
        modalViews.forEach( (modalView) =>{
            modalView.classList.remove('active-modal')
        } )
    })
} )
/*==================== PORTFOLIO SWIPER  ====================*/
// import Swiper, {Navigation, Pagination} from 'swiper';
// Swiper.use([Navigation, Pagination]);
// let swiper = new Swiper('.portfolio-container', {
//     cssMode: true,
//     loop: true,

//     navigation: {
//         nextE1 : '.swiper-button-next',
//         prevE1 : '.swiper-button-prev',
//     },
//     pagination: {
//         e1: '.swiper-pagination',
//         clickable: true,
//     },
// });

/*==================== TESTIMONIAL ====================*/


/*==================== SCROLL SECTIONS ACTIVE LINK ==================== (error)*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        let sectionId = current.getAttribute('id')

        if(scrollY>sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.add('active-link')
        }
        else{
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.remove('active-link')

        }
    })
}

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header')
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    if(this.scrollY>=560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp)

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

//previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

//We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = ()=> document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = ()=> themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

//We validate if the user previously chose a topic
if(selectedTheme){
    //if validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark theme
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

//Activate or deactivate the theme manually with the button
themeButton.addEventListener('click', ()=>{
    //add or remove the dark/icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    //we save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})