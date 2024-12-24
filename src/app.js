document.addEventListener('DOMContentLoaded', () => {
    const handleNavigation = {
        el: {
            openButton: '#open-navigation',
            closeButton: '#close-navigation',
            navigation: '#navigation'
        },
        init: function () {
            const openButtons = document.querySelectorAll(this.el.openButton);
            const closeButtons = document.querySelectorAll(this.el.closeButton);
            const navigation = document.querySelector(this.el.navigation);

            navigation.classList.add('hidden');

            openButtons.forEach(button => {
                button.addEventListener('click', () => {
                    navigation.classList.remove('hidden');
                    navigation.style.animation = 'toTop 0.2s ease';
                });
            });

            closeButtons.forEach(button => {
                button.addEventListener('click', () => {
                    navigation.style.animation = 'none';
                    navigation.classList.add('hidden');
                });
            });
        }
    }

    handleNavigation.init();

});