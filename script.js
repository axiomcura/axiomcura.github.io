const DATA_URL = 'data/site.json';

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

function createElement(tag, options = {}) {
    const element = document.createElement(tag);

    if (options.className) {
        element.className = options.className;
    }

    if (options.text) {
        element.textContent = options.text;
    }

    if (options.attrs) {
        Object.entries(options.attrs).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                element.setAttribute(key, value);
            }
        });
    }

    return element;
}

function createLink(link, className) {
    const anchor = createElement('a', {
        className,
        text: link.label,
        attrs: {
            href: link.url,
            target: link.external ? '_blank' : undefined,
            rel: link.external ? 'noopener noreferrer' : undefined,
            'aria-label': link.ariaLabel || undefined
        }
    });

    return anchor;
}

function renderNavigation(navigation) {
    const nav = $('[data-nav-links]');
    nav.replaceChildren();

    navigation.forEach((item) => {
        const listItem = createElement('li');
        listItem.append(createLink(item, 'nav-link'));
        nav.append(listItem);
    });
}

function renderHero(profile) {
    $('[data-site-name]').textContent = profile.name;
    $('[data-hero-eyebrow]').textContent = `${profile.role} at ${profile.institution}`;
    $('[data-hero-title]').textContent = profile.name;
    $('[data-hero-subtitle]').textContent = profile.tagline;
    $('[data-hero-summary]').textContent = profile.summary;

    const profileImage = $('[data-profile-image]');
    profileImage.src = profile.image.src;
    profileImage.alt = profile.image.alt;

    const actions = $('[data-hero-actions]');
    actions.replaceChildren(
        createLink(profile.primaryAction, 'button button-primary'),
        createLink(profile.secondaryAction, 'button button-secondary')
    );
}

function renderAbout(about) {
    const container = $('[data-about]');
    container.replaceChildren();

    about.paragraphs.forEach((paragraph) => {
        container.append(createElement('p', { text: paragraph }));
    });

    const details = createElement('dl', { className: 'profile-details' });
    about.details.forEach((detail) => {
        details.append(
            createElement('dt', { text: detail.label }),
            createElement('dd', { text: detail.value })
        );
    });

    container.append(details);
}

function renderFocusAreas(focusAreas) {
    const grid = $('[data-focus-areas]');
    grid.replaceChildren();

    focusAreas.forEach((area) => {
        const card = createElement('article', { className: 'focus-card reveal' });
        card.append(
            createElement('p', { className: 'card-label', text: area.label }),
            createElement('h3', { text: area.title }),
            createElement('p', { text: area.description })
        );
        grid.append(card);
    });
}

function renderSoftware(software) {
    $('[data-software-description]').textContent = software.description;
    const grid = $('[data-software]');
    grid.replaceChildren();

    software.items.forEach((item) => {
        const card = createElement('article', { className: 'project-card reveal' });
        const logoWrap = createElement('div', { className: 'software-logo-container' });
        logoWrap.append(createElement('img', {
            className: 'software-logo',
            attrs: {
                src: item.logo,
                alt: `${item.name} logo`,
                loading: 'lazy'
            }
        }));

        const links = createElement('div', { className: 'inline-links' });
        item.links.forEach((link) => links.append(createLink(link, 'text-link')));

        card.append(
            logoWrap,
            createElement('h3', { text: item.name }),
            createElement('p', { text: item.description }),
            links
        );
        grid.append(card);
    });
}

function renderPublications(publications, links = []) {
    const list = $('[data-publications]');
    list.replaceChildren();

    publications.forEach((publication) => {
        const item = createElement('article', { className: 'publication-item reveal' });
        const title = createElement('h3');
        title.append(createLink({
            label: publication.title,
            url: publication.url,
            external: true
        }, 'publication-title-link'));

        item.append(
            title,
            createElement('p', { className: 'publication-authors', text: publication.authors }),
            createElement('p', { className: 'publication-venue', text: publication.venue })
        );
        list.append(item);
    });

    const actions = $('[data-publication-links]');
    actions.replaceChildren();
    links.forEach((link) => {
        actions.append(createLink(link, 'button button-secondary'));
    });
}

function renderSkills(skills) {
    const grid = $('[data-skills]');
    grid.replaceChildren();

    skills.forEach((category) => {
        const card = createElement('article', { className: 'skill-card reveal' });
        card.append(createElement('h3', { text: category.title }));

        if (category.description) {
            card.append(createElement('p', { text: category.description }));
        }

        if (category.items) {
            const list = createElement('ul', { className: 'tag-list' });
            category.items.forEach((item) => {
                list.append(createElement('li', { text: item }));
            });
            card.append(list);
        }

        grid.append(card);
    });
}

function renderEducation(education) {
    const timeline = $('[data-education]');
    timeline.replaceChildren();

    education.forEach((item) => {
        const entry = createElement('article', { className: 'timeline-item reveal' });
        entry.append(
            createElement('p', { className: 'timeline-date', text: item.dates }),
            createElement('h3', { text: item.institution }),
            createElement('p', { className: 'timeline-degree', text: item.degree }),
            createElement('p', { className: 'timeline-location', text: item.location })
        );
        timeline.append(entry);
    });
}

function renderContact(contact) {
    $('[data-contact-copy]').textContent = contact.copy;

    const actions = $('[data-contact-actions]');
    actions.replaceChildren();

    contact.links.forEach((link) => {
        actions.append(createLink(link, 'button button-secondary'));
    });
}

function renderFooter(profile) {
    $('[data-footer]').textContent = `© ${new Date().getFullYear()} ${profile.name}. All rights reserved.`;
}

function setupInteractions() {
    const toggle = $('.nav-toggle');
    const nav = $('[data-nav-links]');

    toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!expanded));
        toggle.classList.toggle('active');
        nav.classList.toggle('active');
    });

    $$('.nav-link').forEach((link) => {
        link.addEventListener('click', () => {
            toggle.setAttribute('aria-expanded', 'false');
            toggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    $$('.reveal').forEach((element) => observer.observe(element));
}

function updateMetadata(data) {
    document.title = data.meta.title;
    $('meta[name="description"]').setAttribute('content', data.meta.description);
    $('meta[name="author"]').setAttribute('content', data.profile.name);
    $('meta[property="og:title"]').setAttribute('content', data.meta.title);
    $('meta[property="og:description"]').setAttribute('content', data.meta.description);
}

async function init() {
    try {
        const response = await fetch(DATA_URL);
        if (!response.ok) {
            throw new Error(`Unable to load ${DATA_URL}`);
        }

        const data = await response.json();
        updateMetadata(data);
        renderNavigation(data.navigation);
        renderHero(data.profile);
        renderAbout(data.about);
        renderFocusAreas(data.focusAreas);
        renderSoftware(data.software);
        renderPublications(data.publications, data.publicationLinks);
        renderSkills(data.skills);
        renderEducation(data.education);
        renderContact(data.contact);
        renderFooter(data.profile);
        setupInteractions();
    } catch (error) {
        const main = $('#main');
        main.replaceChildren(createElement('section', {
            className: 'section container load-error',
            text: 'Portfolio content could not be loaded. Please run this site from a local server or check data/site.json.'
        }));
        console.error(error);
    }
}

init();
