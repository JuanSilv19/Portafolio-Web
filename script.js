const STORAGE_KEY = 'portafolio_trabajos';

let works = [];
let currentFile = null;
let currentFilter = 'all';

function init() {
    loadWorks();
    renderWorks();
    setupEventListeners();
    applyTheme();
}

function getFixedWorks() {
    return [
        {
            id: 1,
            name: 'Infografía de Ciberseguridad',
            description: 'Infografía sobre ciberseguridad realizada en el primer corte',
            category: 'imagen',
            date: '2026-05-15',
            type: 'imagen',
            url: 'media/infografia.jpg',
            isFixed: true
        },
        {
            id: 2,
            name: 'Gráfica Matriz BCG',
            description: 'Gráfica Matriz BCG Profesional realizada en el primer corte',
            category: 'imagen',
            date: '2026-05-15',
            type: 'imagen',
            url: 'media/matriz-bcg.jpg',
            isFixed: true
        },
        {
            id: 3,
            name: 'Video Primer Corte',
            description: 'Video realizado durante el primer corte de Contenidos Digitales',
            category: 'video',
            date: '2026-05-15',
            type: 'video',
            url: 'https://www.youtube.com/embed/9oOhJGo0gHA',
            isEmbed: true,
            isFixed: true
        },
        {
            id: 8,
            name: 'Quiz Matemático',
            description: 'Quiz matemático interactivo realizado en Scratch',
            category: 'web',
            date: '2026-05-17',
            type: 'web',
            url: 'media/quiz_matematico.sb3.zip',
            isFixed: true
        },
        {
            id: 9,
            name: 'Presentación App Inventor',
            description: 'Presentación sobre App Inventor y Actividades Educativas',
            category: 'documento',
            date: '2026-05-17',
            type: 'documento',
            url: 'media/Presentación App Inventor.pdf',
            isFixed: true
        },
        {
            id: 10,
            name: 'Trabajo MIT App',
            description: 'Trabajo sobre MIT App Inventor',
            category: 'documento',
            date: '2026-05-17',
            type: 'documento',
            url: 'media/Trabajo MIT App.docx',
            isFixed: true
        },
        {
            id: 11,
            name: 'Primer App',
            description: 'Primera aplicación desarrollada en App Inventor',
            category: 'web',
            date: '2026-05-17',
            type: 'web',
            url: 'media/Primer_App.apk',
            isFixed: true
        },
        {
            id: 12,
            name: 'Brújula App',
            description: 'Aplicación de brújula desarrollada en App Inventor',
            category: 'web',
            date: '2026-05-17',
            type: 'web',
            url: 'media/Brujula.apk',
            isFixed: true
        },
        {
            id: 13,
            name: 'Entrega 1 Portafolio Web',
            description: 'Entrega 1 corte de Portafolio Web',
            category: 'documento',
            date: '2026-05-17',
            type: 'documento',
            url: 'Entrega1_PortafolioWeb.pdf',
            isFixed: true
        },
        {
            id: 14,
            name: 'Actividad 4',
            description: 'Entrega 1 corte de Portafolio Web',
            category: 'documento',
            date: '2026-05-17',
            type: 'documento',
            url: 'Actividad 4.docx',
            isFixed: true
        }
    ];
}

function loadWorks() {
    const fixedWorks = getFixedWorks();
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        const userWorks = JSON.parse(stored);
        works = [...fixedWorks, ...userWorks];
    } else {
        works = [...fixedWorks, ...getDefaultWorks()];
        saveWorks();
    }
}

function getDefaultWorks() {
    return [
        {
            id: 4,
            name: 'Diseño de Identidad Visual',
            description: 'Creación de identidad visual completa para una marca ficticia de tecnología sostenible, incluyendo logo, paleta de colores y tipografía.',
            category: 'diseño',
            date: '2026-03-15',
            type: 'imagen',
            url: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800',
            isDefault: true
        },
        {
            id: 5,
            name: 'Video Promocional',
            description: 'Video promocional de 30 segundos para campaña de conciencia ambiental.',
            category: 'video',
            date: '2026-04-02',
            type: 'video',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isEmbed: true,
            isDefault: true
        },
        {
            id: 6,
            name: 'Infografía Interactiva',
            description: 'Infografía digital sobre el impacto del cambio climático con elementos interactivos.',
            category: 'diseño',
            date: '2026-04-20',
            type: 'imagen',
            url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
            isDefault: true
        },
        {
            id: 7,
            name: 'Fotografía Urbana',
            description: 'Serie de fotografías urbanas capturadas durante el proyecto de documentación visual de la ciudad.',
            category: 'imagen',
            date: '2026-05-01',
            type: 'imagen',
            url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
            isDefault: true
        }
    ];
}

function saveWorks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(works));
}

function renderWorks() {
    const grid = document.getElementById('cardsGrid');
    const filteredWorks = currentFilter === 'all' 
        ? works 
        : works.filter(w => w.category === currentFilter || w.type === currentFilter);

    if (filteredWorks.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <i class="fas fa-folder-open"></i>
                <h3>No hay trabajos</h3>
                <p>Agrega tu primer trabajo haciendo clic en el botón de arriba</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filteredWorks.map(work => `
        <div class="card" data-id="${work.id}">
            <div class="card-image">
                ${work.type === 'video' && work.isEmbed 
                    ? `<i class="fas fa-video"></i>`
                    : work.type === 'documento'
                        ? `<i class="fas fa-file-pdf"></i>`
                        : work.type === 'web'
                            ? `<i class="fas fa-code"></i>`
                            : work.url 
                                ? `<img src="${work.url}" alt="${work.name}">`
                                : `<i class="fas fa-image"></i>`
                }
                <span class="card-type">${getCategoryLabel(work.category)}</span>
                ${!work.isDefault ? `<button class="card-delete" onclick="event.stopPropagation(); deleteWork(${work.id})"><i class="fas fa-trash"></i></button>` : ''}
            </div>
            <div class="card-content">
                <h3 class="card-title">${work.name}</h3>
                <p class="card-description">${work.description || 'Sin descripción'}</p>
                <div class="card-meta">
                    <span class="card-category">${getCategoryLabel(work.category)}</span>
                    <span class="card-date"><i class="fas fa-calendar"></i> ${formatDate(work.date)}</span>
                </div>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => openWorkModal(parseInt(card.dataset.id)));
    });
}

function getCategoryLabel(category) {
    const labels = {
        imagen: 'Imagen',
        video: 'Video',
        diseño: 'Diseño',
        documento: 'Documento',
        web: 'Web'
    };
    return labels[category] || category;
}

function formatDate(dateStr) {
    if (!dateStr) return 'Sin fecha';
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
}

function openWorkModal(workId) {
    const work = works.find(w => w.id === workId);
    if (!work) return;

    document.getElementById('modalTitle').textContent = work.name;
    document.getElementById('modalDescription').textContent = work.description || 'Sin descripción';
    document.getElementById('modalCategory').textContent = getCategoryLabel(work.category);
    document.getElementById('modalDate').textContent = formatDate(work.date);

    const mediaContainer = document.getElementById('modalMedia');
    
    if (work.type === 'video' && work.isEmbed) {
        mediaContainer.innerHTML = `<div class="iframe-container"><iframe src="${work.url}" allowfullscreen></iframe></div>`;
    } else if (work.type === 'documento') {
        mediaContainer.innerHTML = `<iframe src="${work.url}" style="width: 100%; height: 500px; border: none;"></iframe>`;
    } else if (work.url) {
        const isImage = work.type === 'imagen' || work.type === 'diseño';
        mediaContainer.innerHTML = isImage 
            ? `<img src="${work.url}" alt="${work.name}">`
            : `<div style="padding: 2rem; text-align: center;"><i class="fas fa-${work.type === 'web' ? 'code' : 'file'}"></i><p>Contenido disponible en: <a href="${work.url}" target="_blank">${work.url}</a></p></div>`;
    } else {
        mediaContainer.innerHTML = `<div style="padding: 2rem;"><i class="fas fa-${work.type === 'web' ? 'code' : 'file'}" style="font-size: 3rem;"></i></div>`;
    }

    document.getElementById('viewModal').classList.add('active');
}

function deleteWork(workId) {
    const work = works.find(w => w.id === workId);
    if (work && work.isFixed) {
        alert('Este trabajo no se puede eliminar');
        return;
    }
    if (confirm('¿Estás seguro de que quieres eliminar este trabajo?')) {
        works = works.filter(w => w.id !== workId);
        const userWorks = works.filter(w => !w.isFixed);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userWorks));
        renderWorks();
    }
}

function setupEventListeners() {
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('closeModal').addEventListener('click', closeViewModal);
    document.getElementById('viewModal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeViewModal();
    });

    document.getElementById('closeFormModal').addEventListener('click', closeFormModal);
    document.getElementById('cancelBtn').addEventListener('click', closeFormModal);
    document.getElementById('formModal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeFormModal();
    });

    const fileDropZone = document.getElementById('fileDropZone');
    const fileInput = document.getElementById('fileInput');

    fileDropZone.addEventListener('click', () => fileInput.click());
    fileDropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileDropZone.style.background = 'rgba(99, 102, 241, 0.1)';
    });
    fileDropZone.addEventListener('dragleave', () => {
        fileDropZone.style.background = '';
    });
    fileDropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        fileDropZone.style.background = '';
        if (e.dataTransfer.files.length) {
            handleFile(e.dataTransfer.files[0]);
        }
    });
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) {
            handleFile(e.target.files[0]);
        }
    });

    document.getElementById('workForm').addEventListener('submit', handleFormSubmit);
    document.getElementById('urlInput').addEventListener('input', handleUrlInput);

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderWorks();
        });
    });
}

function handleFile(file) {
    currentFile = file;
    const preview = document.getElementById('filePreview');
    const fileType = file.type.split('/')[0];
    
    let previewContent = `<div class="file-info"><i class="fas fa-file"></i> ${file.name}</div>`;
    
    if (fileType === 'image') {
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.innerHTML = `${previewContent}<img src="${e.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    } else {
        preview.innerHTML = previewContent;
    }
    
    preview.style.display = 'block';
    document.getElementById('urlInput').value = '';
}

function handleUrlInput(e) {
    currentFile = null;
    const url = e.target.value;
    if (url) {
        document.getElementById('filePreview').style.display = 'none';
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('workName').value;
    const description = document.getElementById('workDescription').value;
    const category = document.getElementById('workCategory').value;
    const date = document.getElementById('workDate').value;
    const urlInput = document.getElementById('urlInput').value;
    
    let type = category;
    let finalUrl = '';
    let isEmbed = false;

    if (currentFile) {
        const fileType = currentFile.type.split('/')[0];
        if (fileType === 'image') {
            const reader = new FileReader();
            reader.onload = (e) => {
                finalUrl = e.target.result;
                saveNewWork(name, description, category, date, type, finalUrl, isEmbed);
            };
            reader.readAsDataURL(currentFile);
            return;
        } else if (fileType === 'video') {
            finalUrl = URL.createObjectURL(currentFile);
        } else {
            finalUrl = URL.createObjectURL(currentFile);
        }
    } else if (urlInput) {
        if (urlInput.includes('youtube.com') || urlInput.includes('youtu.be')) {
            const videoId = urlInput.includes('youtu.be') 
                ? urlInput.split('/').pop()
                : urlInput.split('v=')[1]?.split('&')[0];
            finalUrl = `https://www.youtube.com/embed/${videoId}`;
            isEmbed = true;
        } else if (urlInput.includes('vimeo.com')) {
            finalUrl = urlInput.replace('vimeo.com', 'player.vimeo.com/video');
            isEmbed = true;
        } else if (urlInput.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
            finalUrl = urlInput;
            type = 'imagen';
        } else {
            finalUrl = urlInput;
        }
    }

    saveNewWork(name, description, category, date, type, finalUrl, isEmbed);
}

function saveNewWork(name, description, category, date, type, url, isEmbed) {
    const newWork = {
        id: Date.now(),
        name,
        description,
        category,
        date: date || new Date().toISOString().split('T')[0],
        type,
        url,
        isEmbed,
        isDefault: false
    };
    
    works.unshift(newWork);
    const userWorks = works.filter(w => !w.isFixed);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userWorks));
    renderWorks();
    closeFormModal();
    resetForm();
}

function resetForm() {
    document.getElementById('workForm').reset();
    document.getElementById('filePreview').style.display = 'none';
    currentFile = null;
}

function openFormModal() {
    document.getElementById('formModal').classList.add('active');
}

function closeFormModal() {
    document.getElementById('formModal').classList.remove('active');
    resetForm();
}

function closeViewModal() {
    document.getElementById('viewModal').classList.remove('active');
}

function toggleTheme() {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    updateThemeIcon();
}

function applyTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark');
    }
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = document.querySelector('#themeToggle i');
    if (document.body.classList.contains('dark')) {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeViewModal();
        closeFormModal();
    }
});

init();