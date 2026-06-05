document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
    document.body.classList.add('light-theme');
  }

  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  const projectsData = {
    db: {
      title: "Base de données Alimentaire",
      type: "Base de données · Fév–Mars 2026",
      dotClass: "dot-db",
      longDesc: "Ce projet consistait à modéliser et concevoir une base de données relationnelle complète pour la gestion de produits alimentaires, de leurs ingrédients et de leurs valeurs nutritionnelles. J'ai réalisé la conception du modèle conceptuel de la base de données, puis le modèle physique sous PostgreSQL, et écrit des requêtes complexes pour analyser les apports caloriques.",
      tasks: [
        "Modélisation conceptuelle",
        "Normalisation des tables pour éviter la redondance",
        "Écriture de scripts SQL d'insertion pour peupler la base de test",
        "Développement de requêtes d'analyse complexes (jointures, regroupements)"
      ],
      duration: "4 semaines",
      context: "Projet académique (BUT Informatique)",
      techs: ["SQL", "PostgreSQL"]
    },
    sys: {
      title: "Installation Poste de Travail",
      type: "Système · Octobre 2025",
      dotClass: "dot-sys",
      longDesc: "Configuration complète d'un environnement de développement sous Linux (Debian/Ubuntu) avec automatisation via scripts Bash. L'objectif était de mettre en place un poste fonctionnel",
      tasks: [
        "Installation de l'OS Linux",
        "Création de scripts d'automatisation Bash pour l'installation des logiciels",

      ],
      duration: "2 semaines",
      context: "Projet d'administration système",
      techs: ["Linux", "Shell"]
    },
    bot: {
      title: "Création d'un ChatBot",
      type: "Java · Février 2026",
      dotClass: "dot-bot",
      longDesc: "Création d'une application Java de chat automatisé avec interface en ligne de commande. Le robot analyse les saisies de l'utilisateur pour y répondre intelligemment en utilisant une base de connaissances locale pré-configurée.",
      tasks: [
        "Conception orientée objet",
        "Détection des intentions utilisateur par matching de mots-clés",
        "Gestion de l'historique de conversation",
        "Chargement dynamique de la base de réponses depuis un fichier de configuration externe"
      ],
      duration: "3 semaines",
      context: "Projet programmation orientée objet",
      techs: ["Java"]
    }
  };

  // Modal elements
  const modal = document.getElementById('project-modal');
  const modalClose = modal.querySelector('.modal-close');
  const modalBackdrop = modal.querySelector('.modal-backdrop');

  const modalTitle = document.getElementById('modal-title');
  const modalType = document.getElementById('modal-type');
  const modalDot = document.getElementById('modal-dot');
  const modalDesc = document.getElementById('modal-desc');
  const modalTasks = document.getElementById('modal-tasks');
  const modalDuration = document.getElementById('modal-duration');
  const modalContext = document.getElementById('modal-context');
  const modalTech = document.getElementById('modal-tech');

  let activeCard = null; // Store card that opened the modal to restore focus later

  const openModal = (projectId, triggeringElement) => {
    const project = projectsData[projectId];
    if (!project) return;

    activeCard = triggeringElement;

    modalTitle.textContent = project.title;
    modalType.textContent = project.type;

    // Reset dot classes and set current
    modalDot.className = 'project-dot ' + project.dotClass;

    modalDesc.textContent = project.longDesc;

    // Build tasks list
    modalTasks.innerHTML = '';
    project.tasks.forEach(task => {
      const li = document.createElement('li');
      li.textContent = task;
      modalTasks.appendChild(li);
    });

    // Build tech tags
    modalTech.innerHTML = '';
    project.techs.forEach(tech => {
      const span = document.createElement('span');
      span.className = 'tag';
      if (tech === 'SQL' || tech === 'MySQL' || tech === 'PostgreSQL') {
        span.classList.add('grn');
      } else if (tech === 'Linux' || tech === 'Shell' || tech === 'Java') {
        span.classList.add('cyan');
      }
      span.textContent = tech;
      modalTech.appendChild(span);
    });

    modalDuration.textContent = project.duration;
    modalContext.textContent = project.context;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Lock background scroll

    // Focus modal close button for accessibility
    setTimeout(() => {
      modalClose.focus();
    }, 100);
  };

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Unlock scroll

    // Restore focus to card
    if (activeCard) {
      activeCard.focus();
    }
  };

  // Bind events to cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    const nameEl = card.querySelector('.project-name');
    const cardName = nameEl ? nameEl.textContent : 'Projet';
    card.setAttribute('aria-label', `Voir les détails du projet : ${cardName}`);

    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project');
      openModal(projectId, card);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const projectId = card.getAttribute('data-project');
        openModal(projectId, card);
      }
    });
  });

  // Bind close buttons
  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);

  // Close on ESC key and trap focus inside modal
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeModal();
      return;
    }

    // Simple focus trap
    if (e.key === 'Tab') {
      const focusableElements = modal.querySelectorAll('button, [tabindex="0"]');
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) { // Shift + Tab
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else { // Tab
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  });
});
