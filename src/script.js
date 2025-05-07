document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = pessoas.length - 1;
    const totalPessoas = pessoas.length;

    const prevArrow = document.getElementById('prevArrow');
    const nextArrow = document.getElementById('nextArrow');
    const previewContainerPrev = document.getElementById('previewContainerPrev');
    const previewContainerNext = document.getElementById('previewContainerNext');
    const personImage = document.getElementById('personImage');
    const personName = document.getElementById('personName');
    const personRank = document.getElementById('personRank');
    const personDescription = document.getElementById('personDescription');
    const navHint = document.getElementById('navHint');

    setTimeout(() => {
        navHint.style.opacity = '1';
    }, 500);
    setTimeout(() => {
        navHint.style.opacity = '0';
    }, 4500);

    const navigation = document.querySelector('.navigation');
    const navIndicators = document.createElement('div');
    navIndicators.className = 'nav-indicators';

    for (let i = 0; i < totalPessoas; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (i === currentIndex) indicator.classList.add('active');
        indicator.addEventListener('click', () => {
            currentIndex = i;
            updatePerson();
            updateIndicators();
        });
        navIndicators.appendChild(indicator);
    }
    navigation.appendChild(navIndicators);

    function updatePerson() {
        const pessoa = pessoas[currentIndex];
        document.querySelector('.content').style.opacity = 0;
        setTimeout(() => {
            personImage.src = pessoa.imagem;
            personName.textContent = pessoa.nome;
            personRank.textContent = pessoa.ranking;
            personDescription.textContent = pessoa.descricao;
            document.querySelector('.content').style.opacity = 1;
        }, 300);
    }

    function updateIndicators() {
        document.querySelectorAll('.indicator').forEach((indicator, index) => {
            indicator.classList[index === currentIndex ? 'add' : 'remove']('active');
        });
    }

    function goToPrevious() {
        currentIndex = (currentIndex - 1 + totalPessoas) % totalPessoas;
        updatePerson();
        updateIndicators();
    }

    function goToNext() {
        currentIndex = (currentIndex + 1) % totalPessoas;
        updatePerson();
        updateIndicators();
    }

    prevArrow.addEventListener('click', goToPrevious);
    nextArrow.addEventListener('click', goToNext);

    prevArrow.addEventListener('mouseenter', () => {
        const prevIndex = (currentIndex - 1 + totalPessoas) % totalPessoas;
        previewContainerPrev.textContent = pessoas[prevIndex].nome;
        previewContainerPrev.style.display = 'block';
        setTimeout(() => previewContainerPrev.style.opacity = 1, 10);
    });

    nextArrow.addEventListener('mouseenter', () => {
        const nextIndex = (currentIndex + 1) % totalPessoas;
        previewContainerNext.textContent = pessoas[nextIndex].nome;
        previewContainerNext.style.display = 'block';
        setTimeout(() => previewContainerNext.style.opacity = 1, 10);
    });

    function hidePreviewPrev() {
        previewContainerPrev.style.opacity = 0;
        setTimeout(() => previewContainerPrev.style.display = 'none', 300);
    }

    function hidePreviewNext() {
        previewContainerNext.style.opacity = 0;
        setTimeout(() => previewContainerNext.style.display = 'none', 300);
    }

    prevArrow.addEventListener('mouseleave', hidePreviewPrev);
    nextArrow.addEventListener('mouseleave', hidePreviewNext);

    document.querySelector('.content').style.transition = 'opacity 0.3s ease';

    // Suporte ao teclado: ←, →, A, D
    document.addEventListener('keydown', (event) => {
        const key = event.key.toLowerCase();
        if (key === 'arrowleft' || key === 'a') {
            goToPrevious();
        } else if (key === 'arrowright' || key === 'd') {
            goToNext();
        }
    });

    updatePerson();
    updateIndicators();
});