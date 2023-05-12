function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; //убираем скролл страницы пока открыто модальное окно

    if (modalTimerId) {
        clearInterval(modalTimerId);//после открытия модального окна, оно больше открываться по таймеру не будет
    }
    
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = ''; //возвращаем скролл страницы после закрытия модального окна
}

function modal(triggerSelector, modalSelector, modalTimerId) {

    const modalTrigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));      
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') { //закрытие модального окна при клике вне окна, на странице или на крестике
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);//убираем повторные появления модального окна вконце
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};