function modal() {
    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden'; //убираем скролл страницы пока открыто модальное окно
        clearInterval(modalTimerId);//после открытия модального окна, оно больше открываться по таймеру не будет
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);      
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = ''; //возвращаем скролл страницы после закрытия модального окна
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') { //закрытие модального окна при клике вне окна, на странице или на крестике
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);//убираем повторные появления модального окна вконце
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;