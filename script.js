document.addEventListener("DOMContentLoaded", () => {
    const START_YEAR = 2026;
    const END_YEAR = 2126;
    const YEARS = END_YEAR - START_YEAR;

    const IPCC_PROJECTIONS = [
        { year: 2026, co2Ignore: 425, co2Care: 425, tempIgnore: 1.3, tempCare: 1.3 },
        { year: 2050, co2Ignore: 550, co2Care: 440, tempIgnore: 2.0, tempCare: 1.6 },
        { year: 2075, co2Ignore: 750, co2Care: 410, tempIgnore: 3.2, tempCare: 1.5 },
        { year: 2100, co2Ignore: 950, co2Care: 390, tempIgnore: 4.4, tempCare: 1.4 },
        { year: 2126, co2Ignore: 1150, co2Care: 370, tempIgnore: 5.4, tempCare: 1.3 }
    ];

    const MILESTONES = [
        {
            year: 2026,
            ignore: { tag: "Critical decade", title: "The decisive decade begins", description: "A few years of action or delay can shape the whole century." },
            care: { tag: "Turning point", title: "The decisive decade begins", description: "The future is still flexible, and recovery is still possible." }
        },
        {
            year: 2050,
            ignore: { tag: "Escalation", title: "Coasts and cities strain", description: "Heat and rising seas start reshaping daily life." },
            care: { tag: "Transition", title: "Cleaner systems take hold", description: "Smarter design, water systems, and clean energy begin paying off." }
        },
        {
            year: 2075,
            ignore: { tag: "Collapse risk", title: "Extinction accelerates", description: "Habitats fail faster than ecosystems can recover." },
            care: { tag: "Recovery", title: "Resilient cities bloom", description: "Healthy ecosystems and new infrastructure stabilize life." }
        },
        {
            year: 2100,
            ignore: { tag: "Survival mode", title: "Adaptation becomes survival", description: "Large parts of the world face constant stress." },
            care: { tag: "Resilience", title: "A livable century remains possible", description: "The planet is pressured, but still deeply worth inheriting." }
        },
        {
            year: 2126,
            ignore: { tag: "Aftermath", title: "A harsh inheritance", description: "2126 reflects what happened when warnings were ignored." },
            care: { tag: "Legacy", title: "A future worth inheriting", description: "Cleaner cities, secure water, and nature recovery shape a hopeful future." }
        }
    ];

    const ANIMALS = [
        { alive: "🐻‍❄️", name: "Polar Bear", note: "Ice loss risk" },
        { alive: "🐢", name: "Sea Turtle", note: "Heat + plastic" },
        { alive: "🐝", name: "Bees", note: "Pollination collapse" },
        { alive: "🦋", name: "Butterflies", note: "Habitat shifts" },
        { alive: "🐧", name: "Penguins", note: "Warming oceans" },
        { alive: "🐸", name: "Frogs", note: "Water + disease" }
    ];

    const QUIZ_QUESTIONS = [
        {
            question: "How do you usually commute?",
            answers: [
                { text: "Walk, bike, or take public transit.", points: 2 },
                { text: "Carpool or drive a hybrid / EV.", points: 1 },
                { text: "Drive alone in a gas-powered car.", points: -2 }
            ]
        },
        {
            question: "When you go grocery shopping, you...",
            answers: [
                { text: "Bring reusable bags and buy local or seasonal food.", points: 2 },
                { text: "Sometimes forget bags, but you try to recycle.", points: 0 },
                { text: "Always use new plastic bags and buy whatever is cheapest.", points: -2 }
            ]
        },
        {
            question: "What is your relationship with food waste?",
            answers: [
                { text: "You compost and plan meals so almost nothing is wasted.", points: 2 },
                { text: "You throw away leftovers occasionally.", points: -1 },
                { text: "You frequently toss food without thinking about it.", points: -2 }
            ]
        },
        {
            question: "How do you handle energy use at home?",
            answers: [
                { text: "Use efficient lighting, unplug devices, and manage heating / cooling carefully.", points: 2 },
                { text: "Average usage. You remember some of the time.", points: 0 },
                { text: "Leave lights, AC, or heat running most of the time.", points: -2 }
            ]
        },
        {
            question: "What are your shopping habits for clothes and electronics?",
            answers: [
                { text: "Buy second-hand, repair broken items, and only replace what you need.", points: 2 },
                { text: "Buy new sometimes and donate old things when possible.", points: 1 },
                { text: "Constantly buy fast fashion and the newest gadgets.", points: -2 }
            ]
        }
    ];

    const dom = {
        body: document.body,
        muteBtn: document.getElementById("muteBtn"),
        careBtn: document.getElementById("careBtn"),
        ignoreBtn: document.getElementById("ignoreBtn"),
        yearNumber: document.getElementById("yearNumber"),
        timelineContainer: document.getElementById("timelineContainer"),
        timelineSpacer: document.querySelector(".timeline-spacer"),
        timelineNav: document.getElementById("timelineNav"),
        navDots: [...document.querySelectorAll(".nav-dot")],
        progressBar: document.getElementById("timelineProgressBar"),
        scenarioText: document.getElementById("scenarioText"),
        conclusionTitle: document.getElementById("conclusionTitle"),
        conclusionSection: document.querySelector(".conclusion-section"),
        milestoneYear: document.getElementById("milestoneYear"),
        milestoneScenario: document.getElementById("milestoneScenario"),
        milestoneTitle: document.getElementById("milestoneTitle"),
        milestoneDescription: document.getElementById("milestoneDescription"),
        scrollToTimelineBtn: document.getElementById("scrollToTimeline"),
        scrollIndicator: document.getElementById("scrollIndicator"),

        visualScene: document.getElementById("visualScene"),
        skyOverlay: document.getElementById("skyOverlay"),
        stars: document.getElementById("stars"),
        cloudsLayer: document.getElementById("cloudsLayer"),
        atmosphere: document.getElementById("atmosphere"),
        airHaze: document.getElementById("airHaze"),
        horizonGlow: document.getElementById("horizonGlow"),
        mountains: document.getElementById("mountains"),
        sun: document.getElementById("sun"),

        cityBackLayer: document.getElementById("cityBackLayer"),
        cityMidLayer: document.getElementById("cityMidLayer"),
        cityFrontLayer: document.getElementById("cityFrontLayer"),
        skyBridgesLayer: document.getElementById("skyBridgesLayer"),

        windmillsLayerLeft: document.getElementById("windmillsLayerLeft"),
        windmillsLayerRight: document.getElementById("windmillsLayerRight"),
        solarFieldLeft: document.getElementById("solarFieldLeft"),
        solarFieldRight: document.getElementById("solarFieldRight"),
        desalPlant: document.getElementById("desalPlant"),

        forest: document.getElementById("forest"),
        ocean: document.getElementById("ocean"),
        waves: document.querySelector(".waves"),
        wildlife: document.getElementById("wildlife"),
        animalShowcase: document.getElementById("animalShowcase"),
        smogLayer: document.getElementById("smogLayer"),
        satellitesLayer: document.getElementById("satellitesLayer"),
        rain: document.getElementById("rain"),
        fireLayer: document.getElementById("fire"),
        steamLayer: document.getElementById("steamLayer"),
        ashLayer: document.getElementById("ashLayer"),
        faunaLayer: document.getElementById("faunaLayer"),
        lightning: document.getElementById("lightning"),

        statCards: Object.fromEntries(
            [...document.querySelectorAll(".stat-card")].map((card) => [card.dataset.stat, card])
        ),
        statValues: Object.fromEntries(
            [...document.querySelectorAll(".stat-card")].map((card) => [card.dataset.stat, card.querySelector(".stat-value")])
        ),

        quiz: {
            intro: document.getElementById("quizIntro"),
            progressWrap: document.getElementById("quizProgressWrap"),
            progressBar: document.getElementById("quizProgressBar"),
            step: document.getElementById("quizStep"),
            app: document.getElementById("quizApp"),
            questionText: document.getElementById("questionText"),
            options: document.getElementById("quizOptions"),
            result: document.getElementById("quizResult"),
            resultTitle: document.getElementById("resultTitle"),
            resultDesc: document.getElementById("resultDesc"),
            resultAdvice: document.getElementById("resultAdvice"),
            startBtn: document.getElementById("startQuizBtn"),
            restartBtn: document.getElementById("restartQuizBtn"),
            shareBtn: document.getElementById("shareBtn")
        },

        audio: {
            waves: document.getElementById("sound-waves"),
            birds: document.getElementById("sound-birds"),
            wind: document.getElementById("sound-wind"),
            siren: document.getElementById("sound-siren"),
            fire: document.getElementById("sound-fire"),
            thunder: document.getElementById("sound-thunder")
        }
    };

    const performanceProfile = getPerformanceProfile();
    const sceneCache = {
        cityRows: [],
        skyBridges: [],
        windmills: [],
        solarFields: [],
        trees: [],
        birds: [],
        satellites: [],
        clouds: [],
        animalChips: []
    };

    const state = {
        scenario: "ignore",
        year: START_YEAR,
        progress: 0,
        degradation: 0,
        isMuted: false,
        hasInteracted: false,
        ticking: false,
        lightningTimer: null,
        lastRenderKey: "",
        resizeTimer: null,
        quiz: {
            index: 0,
            score: 0,
            result: null
        }
    };

    init();

    function init() {
        dom.body.classList.toggle("lite-effects", performanceProfile.liteEffects);
        buildSceneLayers();
        bindEvents();
        setupQuiz();
        setScenario("ignore", false);
        updateYearFromScroll();
        render(true);
        startLightningLoop();
    }

    function bindEvents() {
        dom.careBtn.addEventListener("click", () => setScenario("care"));
        dom.ignoreBtn.addEventListener("click", () => setScenario("ignore"));

        dom.muteBtn.addEventListener("click", () => {
            state.isMuted = !state.isMuted;
            dom.muteBtn.classList.toggle("is-muted", state.isMuted);
            dom.muteBtn.setAttribute("aria-pressed", String(state.isMuted));

            Object.values(dom.audio).forEach((a) => {
                if (a) a.muted = state.isMuted;
            });

            if (state.isMuted) stopAllSounds();
            else syncAmbientAudio(getSceneState(state.year, state.scenario), true);
        });

        dom.scrollToTimelineBtn.addEventListener("click", () => {
            dom.timelineContainer.scrollIntoView({ behavior: "smooth", block: "start" });
        });

        dom.scrollIndicator.addEventListener("click", () => {
            dom.timelineContainer.scrollIntoView({ behavior: "smooth", block: "start" });
        });

        dom.navDots.forEach((dot) => {
            dot.addEventListener("click", () => {
                const targetYear = Number(dot.dataset.year);
                scrollToYear(targetYear);
            });
        });

        window.addEventListener("scroll", () => {
            if (state.ticking) return;
            state.ticking = true;
            requestAnimationFrame(() => {
                updateYearFromScroll();
                render();
                state.ticking = false;
            });
        }, { passive: true });

        window.addEventListener("resize", () => {
            clearTimeout(state.resizeTimer);
            state.resizeTimer = window.setTimeout(() => {
                buildSceneLayers();
                updateYearFromScroll();
                render(true);
            }, 120);
        }, { passive: true });

        const unlockAudio = () => {
            if (state.hasInteracted) return;
            state.hasInteracted = true;
            syncAmbientAudio(getSceneState(state.year, state.scenario), true);
            window.removeEventListener("pointerdown", unlockAudio);
            window.removeEventListener("keydown", unlockAudio);
            window.removeEventListener("scroll", unlockAudio);
        };

        window.addEventListener("pointerdown", unlockAudio, { passive: true });
        window.addEventListener("keydown", unlockAudio, { passive: true });
        window.addEventListener("scroll", unlockAudio, { passive: true });

        document.addEventListener("visibilitychange", () => {
            if (document.hidden) stopAllSounds();
            else syncAmbientAudio(getSceneState(state.year, state.scenario), true);
        });
    }

    function setupQuiz() {
        dom.quiz.startBtn.addEventListener("click", startQuiz);
        dom.quiz.restartBtn.addEventListener("click", startQuiz);
        dom.quiz.shareBtn.addEventListener("click", shareQuizResult);
    }

    function startQuiz() {
        state.quiz.index = 0;
        state.quiz.score = 0;
        state.quiz.result = null;

        dom.quiz.intro.classList.add("hidden");
        dom.quiz.startBtn.classList.add("hidden");
        dom.quiz.result.classList.add("hidden");
        dom.quiz.progressWrap.classList.remove("hidden");
        dom.quiz.app.classList.remove("hidden");

        renderQuizQuestion();
    }

    function renderQuizQuestion() {
        if (state.quiz.index >= QUIZ_QUESTIONS.length) {
            showQuizResult();
            return;
        }

        const question = QUIZ_QUESTIONS[state.quiz.index];
        dom.quiz.questionText.textContent = question.question;
        dom.quiz.step.textContent = `Question ${state.quiz.index + 1} of ${QUIZ_QUESTIONS.length}`;
        dom.quiz.progressBar.style.width = `${(state.quiz.index / QUIZ_QUESTIONS.length) * 100}%`;

        dom.quiz.options.innerHTML = "";

        question.answers.forEach((answer) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "quiz-option-btn";
            btn.textContent = answer.text;
            btn.addEventListener("click", () => {
                state.quiz.score += answer.points;
                state.quiz.index += 1;
                renderQuizQuestion();
            });
            dom.quiz.options.appendChild(btn);
        });
    }

    function showQuizResult() {
        dom.quiz.app.classList.add("hidden");
        dom.quiz.result.classList.remove("hidden");
        dom.quiz.progressBar.style.width = "100%";
        dom.quiz.step.textContent = "Result";

        let title = "";
        let desc = "";
        let adviceHTML = "";
        let shareText = "";

        if (state.quiz.score >= 6) {
            title = "🌱 Your Earth Survived!";
            desc = "Your daily habits point toward a greener, healthier, and more resilient world by 2126.";
            shareText = "My 2126 Earth survived 🌱";
            adviceHTML = `
        <h5>How to level up your impact:</h5>
        <ul>
          <li>Keep supporting cleaner energy, better city design, and habitat restoration.</li>
          <li>Encourage people around you to make small daily changes too.</li>
          <li>Think long term — the best impact often comes from consistent habits.</li>
        </ul>
        <a href="https://www.earthday.org/take-action/" target="_blank" rel="noopener noreferrer">Explore Earth Day actions</a>
      `;
        } else if (state.quiz.score >= 0) {
            title = "⚖️ Your Earth is on the Edge";
            desc = "Your habits are mixed. The future is still livable, but better choices would make a big difference.";
            shareText = "My 2126 Earth is on the edge ⚖️";
            adviceHTML = `
        <h5>Quick improvements that matter:</h5>
        <ul>
          <li>Swap one weekly car trip for walking, biking, or transit.</li>
          <li>Reduce food waste and buy more intentionally.</li>
          <li>Keep reusable items where you can actually use them every day.</li>
        </ul>
        <a href="https://www.footprintcalculator.org/" target="_blank" rel="noopener noreferrer">Calculate your footprint</a>
      `;
        } else {
            title = "⚠️ Your Earth is in Danger";
            desc = "If everyone lived this way, the world in 2126 would be hotter, harsher, and less stable. It can still change.";
            shareText = "My 2126 Earth is in danger ⚠️";
            adviceHTML = `
        <h5>Where to start right now:</h5>
        <ul>
          <li>Use less energy at home and avoid waste where you can.</li>
          <li>Cut down on single-use plastics and unnecessary buying.</li>
          <li>Be more mindful about transport, food, and water use.</li>
        </ul>
        <a href="https://www.unep.org/interactives/things-you-can-do-climate-emergency/" target="_blank" rel="noopener noreferrer">See actions from UNEP</a>
      `;
        }

        state.quiz.result = { shareText };
        dom.quiz.resultTitle.textContent = title;
        dom.quiz.resultDesc.textContent = desc;
        dom.quiz.resultAdvice.innerHTML = adviceHTML;
    }

    function shareQuizResult() {
        if (!state.quiz.result) return;

        const text = `${state.quiz.result.shareText}. What will your future look like? ${window.location.href}`;

        if (navigator.share) {
            navigator.share({
                title: "Peek into 2126",
                text: state.quiz.result.shareText,
                url: window.location.href
            }).catch(() => {});
            return;
        }

        if (navigator.clipboard?.writeText) {
            navigator.clipboard.writeText(text);
            alert("Result copied to clipboard!");
        } else {
            alert(text);
        }
    }

    function buildSceneLayers() {
        const { sceneCounts } = performanceProfile;

        createCityLayers();
        createSkyBridges();
        createWindmills("left", 3);
        createWindmills("right", 3);
        createSolarField("left", 5);
        createSolarField("right", 5);
        createDesalPlant();
        createSmog();
        createForestTrees(sceneCounts.trees);
        createWildlife(sceneCounts.birds);
        createSatellites(sceneCounts.satellites);
        createClouds(sceneCounts.clouds);
        createFire();
        createSteam(sceneCounts.steam);
        createAsh(sceneCounts.ash);
        createFauna(3);
        createRain(sceneCounts.rain);
        createAnimalShowcase();
        cacheSceneElements();
        state.lastRenderKey = "";
    }

    function cacheSceneElements() {
        sceneCache.cityRows = [dom.cityBackLayer, dom.cityMidLayer, dom.cityFrontLayer].map((el) => ({
            el,
            wrappers: [...el.querySelectorAll(".building-wrapper")].map((wrapper) => ({
                wrapper,
                oldBuilding: wrapper.querySelector(".old-building"),
                ecoBuilding: wrapper.querySelector(".eco-building")
            }))
        }));
        sceneCache.skyBridges = [...dom.skyBridgesLayer.querySelectorAll(".skybridge")];
        sceneCache.windmills = [dom.windmillsLayerLeft, dom.windmillsLayerRight].map((layer) => ({
            layer,
            mills: [...layer.querySelectorAll(".windmill")]
        }));
        sceneCache.solarFields = [dom.solarFieldLeft, dom.solarFieldRight].map((field) => ({
            field,
            panels: [...field.querySelectorAll(".solar-panel")]
        }));
        sceneCache.trees = [...dom.forest.querySelectorAll(".tree")];
        sceneCache.birds = [...dom.wildlife.querySelectorAll(".bird")];
        sceneCache.satellites = [...dom.satellitesLayer.querySelectorAll(".satellite-wrap")];
        sceneCache.clouds = [...dom.cloudsLayer.querySelectorAll(".cloud")];
        sceneCache.animalChips = [...dom.animalShowcase.querySelectorAll(".animal-chip")].map((chip) => ({
            chip,
            emojiEl: chip.querySelector(".animal-emoji"),
            tagEl: chip.querySelector(".animal-tag")
        }));
    }

    function setScenario(scenario, rerender = true) {
        state.scenario = scenario;
        dom.body.dataset.scenario = scenario;

        dom.careBtn.classList.toggle("is-active", scenario === "care");
        dom.ignoreBtn.classList.toggle("is-active", scenario === "ignore");

        dom.scenarioText.textContent = scenario === "care"
            ? "🌱 Scenario: Taking Care of Our Planet"
            : "⚠️ Scenario: Ignoring Environmental Warnings";

        dom.conclusionTitle.textContent = scenario === "care"
            ? "🌱 The Earth survived because of us"
            : "⚠️ This is the world we created";

        if (rerender) render();
        syncAmbientAudio(getSceneState(state.year, state.scenario), true);
    }

    function updateYearFromScroll() {
        const rect = dom.timelineSpacer.getBoundingClientRect();
        const total = Math.max(1, rect.height - window.innerHeight);
        const progress = clamp((-rect.top) / total, 0, 1);

        state.progress = progress;
        state.year = Math.round(START_YEAR + progress * YEARS);
    }

    function render(force = false) {
        const scene = getSceneState(state.year, state.scenario);
        const renderKey = `${scene.scenario}:${scene.year}:${scene.progress.toFixed(performanceProfile.renderPrecision)}`;

        if (!force && state.lastRenderKey === renderKey) return;
        state.lastRenderKey = renderKey;

        state.progress = scene.progress;
        state.degradation = scene.degradation;

        dom.yearNumber.textContent = String(scene.year);
        dom.progressBar.style.width = `${scene.progress * 100}%`;

        updateNavDots(scene.year);
        updateMilestone(scene);
        updateTimelineNavVisibility();
        updateStats(scene.stats);
        updateCity(scene);
        updateSkyBridges(scene);
        updateWindmills(scene);
        updateSolarField(scene);
        updateDesalPlant(scene);
        updateSatellites(scene);
        updateForest(scene);
        updateOceanAndMountains(scene);
        updateAtmosphere(scene);
        updateHorizon(scene);
        updateWeather(scene);
        updateFX(scene);
        updateWildlife(scene);
        updateAnimalShowcase(scene);
        updateSky(scene);

        syncAmbientAudio(scene, false);
    }

    function getSceneState(year, scenario) {
        const progress = clamp((year - START_YEAR) / YEARS, 0, 1);
        const degradation = scenario === "ignore" ? smoothstep(progress) : 0;
        const stats = calculateStats(year, scenario, progress);
        return { year, progress, degradation, stats, scenario };
    }

    function getInterpolatedData(year) {
        let lower = IPCC_PROJECTIONS[0];
        let upper = IPCC_PROJECTIONS[IPCC_PROJECTIONS.length - 1];

        for (let i = 0; i < IPCC_PROJECTIONS.length - 1; i++) {
            if (year >= IPCC_PROJECTIONS[i].year && year <= IPCC_PROJECTIONS[i + 1].year) {
                lower = IPCC_PROJECTIONS[i];
                upper = IPCC_PROJECTIONS[i + 1];
                break;
            }
        }

        const range = upper.year - lower.year;
        const progress = range === 0 ? 0 : (year - lower.year) / range;
        const t = smoothstep(progress);

        return {
            co2Ignore: lower.co2Ignore + (upper.co2Ignore - lower.co2Ignore) * t,
            co2Care: lower.co2Care + (upper.co2Care - lower.co2Care) * t,
            tempIgnore: lower.tempIgnore + (upper.tempIgnore - lower.tempIgnore) * t,
            tempCare: lower.tempCare + (upper.tempCare - lower.tempCare) * t
        };
    }

    function calculateStats(year, scenario, progress) {
        const isIgnore = scenario === "ignore";
        const realData = getInterpolatedData(year);
        const ease = smoothstep(progress);

        const curve = (base, ignoreSlope, careSlope) =>
            base + (isIgnore ? ignoreSlope * ease * YEARS : careSlope * progress * YEARS);

        return {
            co2: isIgnore ? realData.co2Ignore : realData.co2Care,
            temp: isIgnore ? realData.tempIgnore : realData.tempCare,
            sea: clamp(curve(0, 0.9, 0.05), 0, 200),
            species: clamp(curve(8.7, -0.02, 0.0015), 3.0, 10.0),
            forest: clamp(curve(31, -0.18, 0.08), 5, 45),
            water: clamp(curve(70, -0.45, 0.25), 10, 95),
            aqi: clamp(curve(85, 1.8, -0.6), 10, 300)
        };
    }

    function updateMilestone(scene) {
        const active = [...MILESTONES].reverse().find((m) => scene.year >= m.year) || MILESTONES[0];
        const copy = active[scene.scenario];
        dom.milestoneYear.textContent = active.year;
        dom.milestoneScenario.textContent = copy.tag;
        dom.milestoneTitle.textContent = copy.title;
        dom.milestoneDescription.textContent = copy.description;
    }

    function updateNavDots(year) {
        dom.navDots.forEach((dot) => {
            const dotYear = Number(dot.dataset.year);
            dot.classList.toggle("is-active", Math.abs(year - dotYear) < 13);
        });
    }

    function updateTimelineNavVisibility() {
        if (!dom.conclusionSection) return;

        const rect = dom.conclusionSection.getBoundingClientRect();
        const hidden = rect.top <= window.innerHeight * 0.78;
        dom.timelineNav.classList.toggle("is-hidden", hidden);
    }

    function updateStats(stats) {
        const meta = {
            co2: { format: (v) => `${Math.round(v)} ppm`, danger: v => v > 500, safe: v => v < 390 },
            temp: { format: (v) => `+${v.toFixed(1)}°C`, danger: v => v > 2, safe: v => v < 1.5 },
            sea: { format: (v) => `+${Math.round(v)} cm`, danger: v => v > 50, safe: v => v < 20 },
            species: { format: (v) => `${v.toFixed(1)}M`, danger: v => v < 7, safe: v => v >= 8.9 },
            forest: { format: (v) => `${Math.round(v)}%`, danger: v => v < 25, safe: v => v > 32 },
            water: { format: (v) => `${Math.round(v)}%`, danger: v => v < 50, safe: v => v > 75 },
            aqi: { format: (v) => `${Math.round(v)}`, danger: v => v > 150, safe: v => v < 60 }
        };

        Object.entries(meta).forEach(([key, m]) => {
            const card = dom.statCards[key];
            if (!card) return;
            const valueEl = dom.statValues[key];
            if (valueEl) valueEl.textContent = m.format(stats[key]);
            card.classList.toggle("danger", state.scenario === "ignore" && m.danger(stats[key]));
            card.classList.toggle("safe", state.scenario === "care" && m.safe(stats[key]));
        });
    }

    function createCityLayers() {
        createCityRow(dom.cityBackLayer, 8, {
            heights: [70, 82, 90, 76, 84, 72, 88, 74],
            widths:  [46, 52, 58, 48, 54, 50, 56, 46],
            ecoScaleMin: 1.08,
            ecoScaleMax: 1.16
        });

        createCityRow(dom.cityMidLayer, 7, {
            heights: [98, 112, 126, 104, 118, 108, 120],
            widths:  [56, 60, 68, 58, 64, 60, 66],
            ecoScaleMin: 1.12,
            ecoScaleMax: 1.22
        });

        createCityRow(dom.cityFrontLayer, 6, {
            heights: [140, 168, 150, 176, 158, 144],
            widths:  [74, 82, 78, 86, 80, 72],
            ecoScaleMin: 1.16,
            ecoScaleMax: 1.3
        });
    }

    function createCityRow(layerEl, count, config) {
        layerEl.innerHTML = "";

        for (let i = 0; i < count; i++) {
            const wrapper = document.createElement("div");
            wrapper.className = "building-wrapper";

            const height = config.heights[i % config.heights.length];
            const width = config.widths[i % config.widths.length];

            wrapper.style.height = `${height}px`;
            wrapper.style.width = `${width}px`;

            const oldBuilding = document.createElement("div");
            oldBuilding.className = "old-building";
            oldBuilding.dataset.ruinAngle = String(rand(-8, 8));
            oldBuilding.dataset.ruinY = String(rand(18, 56));
            oldBuilding.style.borderRadius = `${rand(8, 16)}px ${rand(8, 16)}px 0 0`;

            if (Math.random() > 0.55) {
                const antenna = document.createElement("div");
                antenna.className = "antenna";
                oldBuilding.appendChild(antenna);
            }

            const cols = Math.max(2, Math.floor(width / 14));
            const rows = Math.max(3, Math.floor(height / 20));

            for (let row = 0; row < rows - 1; row++) {
                for (let col = 0; col < cols; col++) {
                    if (Math.random() > 0.35) {
                        const win = document.createElement("div");
                        win.className = "window";
                        win.style.bottom = `${row * 18 + 12}px`;
                        win.style.left = `${col * 14 + 8}px`;
                        win.style.width = `${rand(4, 7)}px`;
                        win.style.height = `${rand(7, 12)}px`;
                        oldBuilding.appendChild(win);
                    }
                }
            }

            const ecoBuilding = document.createElement("div");
            ecoBuilding.className = "eco-building";
            ecoBuilding.style.height = `${height * rand(config.ecoScaleMin, config.ecoScaleMax)}px`;
            ecoBuilding.style.borderRadius = `${rand(24, 38)}px ${rand(24, 38)}px 0 0`;

            const dome = document.createElement("div");
            dome.className = "eco-dome";
            ecoBuilding.appendChild(dome);

            const terraces = Math.max(3, Math.floor(height / 34));
            for (let t = 0; t < terraces; t++) {
                const terrace = document.createElement("div");
                terrace.className = "green-terrace";
                terrace.style.bottom = `${t * 30 + 20}px`;
                terrace.style.width = `${rand(70, 104)}%`;
                terrace.style.left = `${rand(-2, 4)}%`;
                terrace.style.height = `${rand(6, 9)}px`;
                ecoBuilding.appendChild(terrace);
            }

            const glowCount = Math.max(4, Math.floor(width / 16));
            for (let w = 0; w < glowCount; w++) {
                const glow = document.createElement("div");
                glow.className = "eco-glow-window";
                glow.style.bottom = `${rand(12, height * 1.02)}px`;
                glow.style.left = `${rand(10, width - 16)}px`;
                glow.style.height = `${rand(11, 18)}px`;
                ecoBuilding.appendChild(glow);
            }

            if (Math.random() > 0.2) {
                const ring = document.createElement("div");
                ring.className = "eco-ring";
                ring.style.top = `${rand(18, Math.max(28, height * 0.55))}px`;
                ring.style.width = `${rand(56, 74)}%`;
                ring.style.height = `${rand(8, 11)}px`;
                ecoBuilding.appendChild(ring);
            }

            wrapper.appendChild(oldBuilding);
            wrapper.appendChild(ecoBuilding);
            layerEl.appendChild(wrapper);
        }
    }

    function createSkyBridges() {
        dom.skyBridgesLayer.innerHTML = "";

        const bridges = [
            { left: "22%", top: "36%", width: "18%", rotate: "-4deg" },
            { left: "41%", top: "30%", width: "16%", rotate: "2deg" },
            { left: "56%", top: "40%", width: "14%", rotate: "-3deg" }
        ];

        bridges.forEach((b) => {
            const bridge = document.createElement("div");
            bridge.className = "skybridge";
            bridge.style.left = b.left;
            bridge.style.top = b.top;
            bridge.style.width = b.width;
            bridge.style.transform = `rotate(${b.rotate})`;
            dom.skyBridgesLayer.appendChild(bridge);
        });
    }

    function updateCity(scene) {
        const layers = [
            { cache: sceneCache.cityRows[0], depth: 0.45, parallax: 8, sink: 0.6, rise: 80 },
            { cache: sceneCache.cityRows[1], depth: 0.72, parallax: 12, sink: 0.9, rise: 95 },
            { cache: sceneCache.cityRows[2], depth: 1.0, parallax: 16, sink: 1.1, rise: 110 }
        ];

        layers.forEach(({ cache, depth, parallax, sink, rise }) => {
            if (!cache?.el) return;
            const { el, wrappers } = cache;

            el.style.transform = `translateY(${scene.progress * parallax}px)`;

            if (performanceProfile.liteEffects) {
                el.style.filter = "none";
            } else if (scene.scenario === "ignore") {
                el.style.opacity = String(Math.max(0.18, (0.3 + depth * 0.6) - scene.degradation * 0.14));
                if (el.dataset.sceneMode !== "ignore") {
                    el.style.filter = depth < 0.5 ? "blur(1.2px)" : depth < 0.9 ? "blur(0.45px)" : "none";
                }
            } else {
                el.style.opacity = String(0.42 + depth * 0.58);
                if (el.dataset.sceneMode !== "care") {
                    el.style.filter = depth < 0.5 ? "blur(1px) saturate(1.05)" : depth < 0.9 ? "blur(0.25px) saturate(1.1)" : "saturate(1.15)";
                }
            }
            if (performanceProfile.liteEffects) {
                el.style.opacity = scene.scenario === "ignore"
                    ? String(Math.max(0.18, (0.3 + depth * 0.6) - scene.degradation * 0.14))
                    : String(0.42 + depth * 0.58);
            }
            el.dataset.sceneMode = scene.scenario;

            wrappers.forEach(({ oldBuilding: oldB, ecoBuilding: ecoB }, index) => {
                if (!oldB || !ecoB) return;

                const delay = index * 0.035;
                const localProgress = clamp((scene.progress - delay) * 1.25, 0, 1);

                if (scene.scenario === "ignore") {
                    const angle = Number(oldB.dataset.ruinAngle) * scene.degradation * sink;
                    const sinkY = Number(oldB.dataset.ruinY) * Math.pow(scene.degradation, 1.3) * sink;

                    oldB.style.transform = `translateY(${sinkY}px) rotate(${angle}deg)`;
                    oldB.style.filter = performanceProfile.liteEffects
                        ? "none"
                        : `grayscale(${clamp(scene.progress * 1.05, 0, 1)}) brightness(${1 - scene.degradation * (0.45 + depth * 0.15)})`;
                    oldB.style.opacity = String(Math.max(0.16, 1 - scene.degradation * (0.52 + depth * 0.16)));
                    oldB.style.setProperty("--damage-opacity", String(clamp(scene.degradation * (0.22 + depth * 0.28), 0, 0.62)));

                    ecoB.style.transform = "translateY(120%) scaleY(0.95)";
                    ecoB.style.opacity = "0";
                    ecoB.style.filter = "none";
                } else {
                    oldB.style.transform = `translateY(${localProgress * rise}px)`;
                    oldB.style.opacity = String(1 - localProgress);
                    oldB.style.setProperty("--damage-opacity", "0");

                    ecoB.style.transform = `translateY(${(1 - localProgress) * rise}px) scale(${0.98 + localProgress * 0.04})`;
                    ecoB.style.opacity = String(localProgress);
                    ecoB.style.filter = performanceProfile.liteEffects
                        ? "none"
                        : `brightness(${1 + localProgress * 0.06}) saturate(${1.08 + localProgress * 0.14}) drop-shadow(0 0 ${8 + localProgress * 10}px rgba(103,232,249,0.20))`;
                }
            });
        });
    }

    function updateSkyBridges(scene) {
        sceneCache.skyBridges.forEach((bridge, index) => {
            if (scene.scenario === "care") {
                bridge.style.opacity = String(clamp((scene.progress - index * 0.04) * 1.6, 0, .95));
            } else {
                bridge.style.opacity = "0";
            }
        });
    }

    function createWindmills(side, count) {
        const layer = side === "left" ? dom.windmillsLayerLeft : dom.windmillsLayerRight;
        layer.innerHTML = "";

        const positions = side === "left" ? [14, 40, 68] : [18, 48, 76];

        for (let i = 0; i < count; i++) {
            const windmill = document.createElement("div");
            windmill.className = "windmill";
            windmill.style.left = `${positions[i]}%`;
            windmill.style.bottom = `${i % 2 === 0 ? 0 : 10}px`;

            const scale = rand(0.78, 1.08);
            windmill.dataset.scale = String(scale);
            windmill.style.transform = `scale(${scale})`;

            const pole = document.createElement("div");
            pole.className = "windmill-pole";

            const blades = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            blades.setAttribute("viewBox", "0 0 100 100");
            blades.classList.add("windmill-blades");
            blades.style.animationDuration = `${rand(2.4, 4.4)}s`;
            blades.innerHTML = `
        <path d="M50 50 C48 34, 44 16, 46 8 C47 3, 53 3, 54 8 C56 16, 52 34, 50 50 Z" fill="#e0f2fe"/>
        <path d="M50 50 C66 48, 84 44, 92 46 C97 47, 97 53, 92 54 C84 56, 66 52, 50 50 Z" fill="#e0f2fe"/>
        <path d="M50 50 C52 66, 56 84, 54 92 C53 97, 47 97, 46 92 C44 84, 48 66, 50 50 Z" fill="#e0f2fe"/>
        <path d="M50 50 C34 52, 16 56, 8 54 C3 53, 3 47, 8 46 C16 44, 34 48, 50 50 Z" fill="#e0f2fe"/>
        <circle cx="50" cy="50" r="6" fill="#7dd3fc"/>
      `;

            const core = document.createElement("div");
            core.className = "windmill-core";

            windmill.appendChild(pole);
            windmill.appendChild(blades);
            windmill.appendChild(core);
            layer.appendChild(windmill);
        }
    }

    function updateWindmills(scene) {
        sceneCache.windmills.forEach(({ layer, mills }) => {
            layer.style.opacity = scene.scenario === "care" ? String(clamp(scene.progress * 2.2, 0, 1)) : "0";

            mills.forEach((mill, index) => {
                const delay = index * 0.04;
                const localProgress = clamp((scene.progress - delay) * 1.4, 0, 1);
                mill.style.transform = `translateY(${(1 - localProgress) * 32}px) scale(${mill.dataset.scale})`;
            });
        });
    }

    function createSolarField(side, count) {
        const field = side === "left" ? dom.solarFieldLeft : dom.solarFieldRight;
        field.innerHTML = "";

        for (let i = 0; i < count; i++) {
            const panel = document.createElement("div");
            panel.className = "solar-panel";

            const row = Math.floor(i / 3);
            const col = i % 3;

            const x = 6 + col * 28 + rand(-1.2, 1.2);
            const y = 58 + row * 16 + rand(-1.2, 1.2);
            const rotate = -7 + rand(-1.2, 1.2);
            const scale = rand(0.96, 1.03);

            panel.style.left = `${x}%`;
            panel.style.top = `${y}%`;
            panel.style.transform = `skewX(-18deg) rotate(${rotate}deg) scale(${scale})`;
            panel.innerHTML = `<div class="solar-panel__surface"></div><div class="solar-panel__grid"></div>`;
            field.appendChild(panel);
        }
    }

    function updateSolarField(scene) {
        sceneCache.solarFields.forEach(({ field, panels }) => {
            field.style.opacity = scene.scenario === "care" ? String(clamp((scene.progress - 0.14) * 1.6, 0, 1)) : "0";
            field.style.transform = scene.scenario === "care"
                ? `translateY(${scene.progress * 1.5}px)`
                : `translateY(${scene.degradation * 4}px)`;

            panels.forEach((panel, index) => {
                const delay = index * 0.025;
                const local = clamp((scene.progress - delay) * 1.35, 0, 1);

                if (scene.scenario === "care") {
                    panel.style.opacity = String(local * 0.96);
                    panel.style.filter = performanceProfile.liteEffects
                        ? "none"
                        : `brightness(${0.96 + local * 0.08}) saturate(${1 + local * 0.12})`;
                } else {
                    panel.style.opacity = "0";
                }
            });
        });
    }

    function createDesalPlant() {
        dom.desalPlant.innerHTML = `
      <div class="desal-main"></div>
      <div class="desal-dome"></div>
      <div class="desal-pipe"></div>
      <div class="desal-tank"></div>
      <div class="desal-glow"></div>
    `;
    }

    function updateDesalPlant(scene) {
        if (scene.scenario === "care") {
            const local = clamp((scene.progress - 0.18) * 1.7, 0, 1);
            dom.desalPlant.style.opacity = String(local);
            dom.desalPlant.style.transform = `translateY(${(1 - local) * 18}px) scale(${0.96 + local * 0.04})`;
        } else {
            dom.desalPlant.style.opacity = "0";
            dom.desalPlant.style.transform = "translateY(12px) scale(.96)";
        }
    }

    function createSmog() {
        dom.smogLayer.innerHTML = '<div class="smog-fog"></div>';
    }

    function createForestTrees(count) {
        dom.forest.innerHTML = "";

        for (let i = 0; i < count; i++) {
            const tree = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            tree.classList.add("tree");
            tree.setAttribute("viewBox", "0 0 40 80");
            tree.innerHTML = `
        <rect x="16" y="50" width="8" height="30" fill="#6b4423"/>
        <circle cx="20" cy="35" r="15" fill="#2d5016"/>
        <circle cx="12" cy="40" r="12" fill="#3a6b1f"/>
        <circle cx="28" cy="40" r="12" fill="#3a6b1f"/>
      `;
            tree.style.width = "0px";
            tree.style.margin = "0";
            dom.forest.appendChild(tree);
        }
    }

    function updateForest(scene) {
        const total = sceneCache.trees.length;
        const center = (total - 1) / 2;

        sceneCache.trees.forEach((tree, index) => {
            const distance = Math.abs(index - center);
            let visible = false;
            let currentScale = 0;

            if (scene.scenario === "ignore") {
                const maxDistance = 4 - scene.degradation * 4;
                visible = distance <= maxDistance;
                if (visible) currentScale = 1 - scene.degradation * 0.28;
            } else {
                const maxDistance = 4 + scene.progress * 5;
                visible = distance <= maxDistance;
                if (visible) currentScale = 1 + scene.progress * 0.35 - distance * 0.05;
            }

            if (visible) {
                tree.style.width = "40px";
                tree.style.margin = "0 2px";
                tree.style.opacity = scene.scenario === "ignore"
                    ? String(Math.max(0, 1 - scene.degradation * 1.5))
                    : "1";
                tree.style.transform = `scale(${currentScale})`;
            } else {
                tree.style.width = "0px";
                tree.style.margin = "0";
                tree.style.opacity = "0";
                tree.style.transform = "scale(0)";
            }
        });
    }

    function createWildlife(count) {
        dom.wildlife.innerHTML = "";

        for (let i = 0; i < count; i++) {
            const bird = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            bird.classList.add("bird");
            bird.setAttribute("viewBox", "0 0 24 16");
            bird.setAttribute("width", "24");
            bird.setAttribute("height", "16");
            bird.style.left = `${(i * 83 + 20) % 100}%`;
            bird.style.top = `${18 + (i * 7) % 46}%`;
            bird.style.animation = `flyAcross ${14000 + i * 1700}ms linear infinite ${i * 700}ms`;
            bird.innerHTML = `<path d="M12 8 Q6 4, 0 6 Q6 6, 12 8 Q18 6, 24 6 Q18 4, 12 8" fill="#4a5568" opacity="0.85"/>`;
            dom.wildlife.appendChild(bird);
        }
    }

    function updateWildlife(scene) {
        sceneCache.birds.forEach((bird) => {
            bird.style.opacity = scene.scenario === "ignore"
                ? String(Math.max(0, 1 - scene.degradation * 1.5))
                : String(clamp(0.45 + scene.progress, 0.45, 1));
        });
    }

    function createSatellites(count) {
        dom.satellitesLayer.innerHTML = "";

        for (let i = 0; i < count; i++) {
            const wrap = document.createElement("div");
            wrap.className = "satellite-wrap";
            wrap.style.top = `${rand(5, 25)}%`;
            wrap.style.left = `${rand(10, 70)}%`;

            wrap.innerHTML = `
        <div class="sat-flame"></div>
        <svg class="satellite-svg" viewBox="0 0 100 50">
          <rect class="sat-panel" x="0" y="15" width="35" height="20" rx="2"></rect>
          <rect class="sat-panel" x="65" y="15" width="35" height="20" rx="2"></rect>
          <circle class="sat-body" cx="50" cy="25" r="12"></circle>
          <path class="sat-body" d="M48,13 L52,13 L50,0 Z"></path>
        </svg>
      `;
            wrap.dataset.ignoreAnimation = `satelliteFall ${2600 + i * 900}ms linear infinite ${i * -700}ms`;
            wrap.dataset.careAnimation = `satelliteFly ${18000 + i * 3000}ms ease-in-out infinite ${i * -3000}ms`;

            dom.satellitesLayer.appendChild(wrap);
        }
    }

    function updateSatellites(scene) {
        sceneCache.satellites.forEach((sat) => {
            const nextAnimation = scene.scenario === "ignore" ? sat.dataset.ignoreAnimation : sat.dataset.careAnimation;
            if (sat.dataset.activeAnimation !== nextAnimation) {
                sat.style.animation = nextAnimation;
                sat.dataset.activeAnimation = nextAnimation;
            }

            if (scene.scenario === "ignore") {
                sat.style.opacity = String(clamp(scene.degradation * 1.6, 0, 1));
            } else {
                sat.style.opacity = String(clamp((scene.progress - 0.1) * 2, 0, 1));
            }
        });
    }

    function createClouds(count) {
        dom.cloudsLayer.innerHTML = "";

        for (let i = 0; i < count; i++) {
            const cloud = document.createElement("div");
            cloud.className = "cloud";
            cloud.style.top = `${rand(8, 35)}%`;
            cloud.style.left = `${rand(-20, 80)}%`;
            cloud.style.width = `${rand(140, 280)}px`;
            cloud.style.height = `${rand(40, 72)}px`;
            cloud.style.animationDuration = `${rand(48, 90)}s`;
            cloud.style.animationDelay = `${rand(-60, 0)}s`;
            dom.cloudsLayer.appendChild(cloud);
        }
    }

    function updateWeather(scene) {
        dom.waves.style.opacity = scene.scenario === "ignore"
            ? String(clamp(0.18 + scene.degradation * 0.22, 0.18, 0.4))
            : String(clamp(0.45 + scene.progress * 0.12, 0.45, 0.62));

        sceneCache.clouds.forEach((cloud, index) => {
            const driftY = Math.sin(scene.progress * 5 + index) * 4;
            cloud.style.transform = `translateY(${driftY}px)`;

            if (scene.scenario === "care") {
                cloud.style.opacity = String(clamp(0.12 + scene.progress * 0.16 - index * 0.01, 0.08, 0.28));
                if (cloud.dataset.weatherMode !== "care") {
                    cloud.style.filter = performanceProfile.liteEffects ? "none" : "blur(10px)";
                    cloud.style.background = performanceProfile.liteEffects
                        ? "rgba(255,255,255,0.22)"
                        : "radial-gradient(circle at 30% 45%, rgba(255,255,255,0.75), rgba(255,255,255,0.32) 60%, transparent 100%)";
                    cloud.dataset.weatherMode = "care";
                }
            } else {
                cloud.style.opacity = String(clamp(0.08 + scene.degradation * 0.24 - index * 0.01, 0.04, 0.24));
                if (cloud.dataset.weatherMode !== "ignore") {
                    cloud.style.filter = performanceProfile.liteEffects ? "none" : "blur(12px)";
                    cloud.style.background = performanceProfile.liteEffects
                        ? "rgba(120,136,158,0.18)"
                        : "radial-gradient(circle at 30% 45%, rgba(148,163,184,0.45), rgba(71,85,105,0.22) 60%, transparent 100%)";
                    cloud.dataset.weatherMode = "ignore";
                }
            }
        });
    }

    function createFire() {
        dom.fireLayer.innerHTML = "";
        ["small", "", "big", "", "small", "big", "", "small"].forEach((size) => {
            const flame = document.createElement("div");
            flame.className = `flame ${size}`.trim();
            dom.fireLayer.appendChild(flame);
        });
    }

    function createSteam(count) {
        dom.steamLayer.innerHTML = "";
        for (let i = 0; i < count; i++) {
            const plume = document.createElement("div");
            plume.className = "steam-plume";
            plume.style.animationDelay = `${rand(0, 3)}s`;
            plume.style.animationDuration = `${rand(3, 5)}s`;
            plume.style.transform = `scale(${rand(0.8, 1.5)})`;
            dom.steamLayer.appendChild(plume);
        }
    }

    function createAsh(count) {
        dom.ashLayer.innerHTML = "";
        for (let i = 0; i < count; i++) {
            const particle = document.createElement("div");
            particle.className = "ash-particle";
            particle.style.left = `${rand(0, 100)}vw`;
            particle.style.animationDelay = `${rand(0, 4)}s`;
            particle.style.animationDuration = `${rand(3, 7)}s`;
            particle.style.transform = `scale(${rand(0.5, 1.5)})`;
            dom.ashLayer.appendChild(particle);
        }
    }

    function createFauna(count) {
        dom.faunaLayer.innerHTML = "";
        for (let i = 0; i < count; i++) {
            const dolphin = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            dolphin.classList.add("dolphin");
            dolphin.setAttribute("viewBox", "0 0 100 50");
            dolphin.style.left = `${rand(10, 80)}%`;
            dolphin.style.animationDelay = `${rand(0, 5)}s`;
            dolphin.style.animationDuration = `${rand(4, 6)}s`;
            dolphin.innerHTML = `<path d="M10,40 Q30,10 60,20 T90,40 Q70,30 40,35 T10,40"></path>`;
            dom.faunaLayer.appendChild(dolphin);
        }
    }

    function createRain(count) {
        dom.rain.innerHTML = "";
        for (let i = 0; i < count; i++) {
            const drop = document.createElement("div");
            drop.className = "rain-drop";
            drop.style.left = `${Math.random() * 100}%`;
            drop.style.animationDuration = `${rand(600, 1600)}ms`;
            drop.style.opacity = String(rand(0.1, 0.35));
            drop.style.height = `${rand(10, 24)}px`;
            drop.style.width = `${rand(1, 2.3)}px`;
            drop.style.animationDelay = `${rand(0, 1200)}ms`;
            dom.rain.appendChild(drop);
        }
    }

    function updateFX(scene) {
        const isIgnore = scene.scenario === "ignore";
        const waterRise = scene.degradation * 110;

        if (isIgnore) {
            const fireIntensity = clamp(scene.degradation * 3, 0, 1);
            const waterOverFire = Math.max(0, waterRise - 20);
            const extinguishFactor = clamp(waterOverFire / 40, 0, 1);

            dom.fireLayer.style.transform = `scaleY(${1 - extinguishFactor})`;
            dom.fireLayer.style.opacity = String((1 - extinguishFactor) * fireIntensity);
            dom.steamLayer.style.opacity = String(extinguishFactor * fireIntensity * 0.9);
            dom.ashLayer.style.opacity = String(clamp(scene.degradation * 2, 0, 1));
            dom.faunaLayer.style.opacity = "0";
            dom.rain.style.opacity = clamp((scene.degradation - 0.15) * 1.4, 0, 1).toFixed(2);
            dom.smogLayer.style.opacity = String(clamp(scene.degradation * 2.5, 0, 1));
        } else {
            dom.fireLayer.style.opacity = "0";
            dom.steamLayer.style.opacity = "0";
            dom.ashLayer.style.opacity = "0";
            dom.rain.style.opacity = "0";
            dom.smogLayer.style.opacity = "0";
            dom.faunaLayer.style.opacity = String(clamp((scene.progress - 0.18) * 1.6, 0, 1));
        }
    }

    function updateOceanAndMountains(scene) {
        if (scene.scenario === "ignore") {
            const seaLevelRise = scene.degradation * 110;
            dom.ocean.style.height = `calc(25% + ${seaLevelRise}px)`;
            dom.ocean.style.background = lerpColor(14, 165, 233, 120, 113, 108, scene.degradation);
        } else {
            dom.ocean.style.height = "25%";
            dom.ocean.style.background = lerpColor(14, 165, 233, 6, 182, 212, scene.progress);
        }

        dom.mountains.style.transform = `translateY(${scene.progress * 40}px)`;
    }

    function updateAtmosphere(scene) {
        if (scene.scenario === "ignore") {
            dom.atmosphere.style.background =
                scene.degradation > 0.08
                    ? `linear-gradient(to bottom, rgba(10,10,10,${scene.degradation * 0.35}), rgba(249,115,22,${scene.degradation * 0.2}), transparent)`
                    : "transparent";
            dom.airHaze.style.opacity = clamp((scene.stats.aqi - 40) / 180, 0, 1).toFixed(2);
        } else {
            dom.atmosphere.style.background =
                scene.progress > 0.15
                    ? `linear-gradient(to bottom, rgba(255,255,255,${scene.progress * 0.16}), transparent 45%)`
                    : "transparent";
            dom.airHaze.style.opacity = (clamp((scene.stats.aqi - 40) / 180, 0, 1) * 0.22).toFixed(2);
        }
    }

    function updateHorizon(scene) {
        if (scene.scenario === "care") {
            dom.horizonGlow.style.opacity = String(clamp(0.22 + scene.progress * 0.24, 0.22, 0.48));
            dom.horizonGlow.style.background =
                "radial-gradient(ellipse at center, rgba(255,183,77,0.30), rgba(125,211,252,0.18), transparent 72%)";
            dom.horizonGlow.style.transform = `translateY(${scene.progress * 6}px) scaleX(${1 + scene.progress * 0.03})`;
        } else {
            dom.horizonGlow.style.opacity = String(clamp(0.12 + scene.degradation * 0.42, 0.12, 0.5));
            dom.horizonGlow.style.background =
                "radial-gradient(ellipse at center, rgba(249,115,22,0.30), rgba(127,29,29,0.20), transparent 74%)";
            dom.horizonGlow.style.transform = `translateY(${scene.degradation * 12}px) scaleX(${1 + scene.degradation * 0.03})`;
        }
    }

    function updateSky(scene) {
        dom.visualScene.style.filter = performanceProfile.liteEffects
            ? "none"
            : scene.scenario === "ignore"
                ? `saturate(${1 - scene.degradation * 0.28}) contrast(${1 + scene.degradation * 0.12})`
                : `saturate(${1.04 + scene.progress * 0.08})`;

        dom.sun.style.top = `calc(42px + ${scene.progress * 180}px)`;
        dom.sun.style.opacity = scene.scenario === "ignore"
            ? String(Math.max(0, 1 - scene.degradation * 0.82))
            : "1";

        dom.skyOverlay.style.opacity = String(clamp((scene.progress - 0.2) * 1.5, 0, 1));
        dom.skyOverlay.style.background = scene.scenario === "ignore"
            ? "linear-gradient(to bottom, rgba(69,10,10,0.16), rgba(153,27,27,0.68))"
            : "linear-gradient(to bottom, rgba(255,166,77,0.10), rgba(168,85,247,0.10), rgba(30,58,138,0.06))";

        dom.stars.style.opacity = scene.scenario === "care"
            ? String(clamp((scene.progress - 0.45) * 1.9, 0, 1))
            : "0";
    }

    function createAnimalShowcase() {
        dom.animalShowcase.innerHTML = ANIMALS.map((animal, index) => `
      <div class="animal-chip" data-index="${index}">
        <div class="animal-emoji">${animal.alive}</div>
        <div class="animal-text">
          <div class="animal-tag">SAVED SPECIES</div>
          <div class="animal-name">${animal.name}</div>
          <div class="animal-note">${animal.note}</div>
        </div>
      </div>
    `).join("");
    }

    function updateAnimalShowcase(scene) {
        sceneCache.animalChips.forEach(({ chip, emojiEl, tagEl }, index) => {
            const stagger = index * 0.05;
            const baseOpacity = clamp(1 - stagger, 0, 1);
            chip.style.opacity = String(baseOpacity);
            chip.style.transform = `translateY(${(1 - baseOpacity) * 10}px)`;

            if (scene.scenario === "ignore") {
                const dead = scene.degradation > 0.18 + index * 0.07;
                chip.classList.toggle("dead", dead);
                tagEl.textContent = dead ? "LOST SPECIES" : "AT RISK";
                emojiEl.textContent = dead ? "☠️" : ANIMALS[index].alive;
            } else {
                chip.classList.remove("dead");
                tagEl.textContent = "SAVED SPECIES";
                emojiEl.textContent = ANIMALS[index].alive;
            }
        });
    }

    function startLightningLoop() {
        if (state.lightningTimer) clearInterval(state.lightningTimer);

        state.lightningTimer = setInterval(() => {
            const scene = getSceneState(state.year, state.scenario);
            if (scene.scenario !== "ignore") return;

            const rainOpacity = parseFloat(getComputedStyle(dom.rain).opacity || "0");
            const chance = 0.05 + rainOpacity * 0.25 + scene.degradation * 0.25;

            if (Math.random() < chance) {
                dom.lightning.classList.remove("flash");
                void dom.lightning.offsetWidth;
                dom.lightning.classList.add("flash");
                playThunderRandom();
            }
        }, performanceProfile.liteEffects ? 1400 : 800);
    }

    function syncAmbientAudio(scene, forcePlay = false) {
        if (!state.hasInteracted || state.isMuted) {
            stopAllSounds();
            return;
        }

        const { waves, birds, wind, siren, fire } = dom.audio;

        if (scene.scenario === "care") {
            ensurePlaying(waves, forcePlay);
            ensurePlaying(birds, forcePlay);
            ensurePlaying(wind, forcePlay);
            pauseAudio(siren);
            pauseAudio(fire);

            if (waves) waves.volume = 0.15 + scene.progress * 0.2;
            if (birds) birds.volume = 0.15 + scene.progress * 0.25;
            if (wind) wind.volume = 0.12 + scene.progress * 0.18;
        } else {
            ensurePlaying(wind, forcePlay);
            ensurePlaying(siren, forcePlay);
            ensurePlaying(fire, forcePlay);
            pauseAudio(waves);
            pauseAudio(birds);

            if (wind) wind.volume = 0.2 + scene.degradation * 0.25;
            if (siren) siren.volume = 0.08 + scene.degradation * 0.28;
            if (fire) fire.volume = 0.12 + scene.degradation * 0.35;
        }
    }

    function stopAllSounds() {
        Object.values(dom.audio).forEach((audio) => {
            if (audio) audio.pause();
        });
    }

    function ensurePlaying(audio, forcePlay = false) {
        if (!audio || state.isMuted) return;
        if (!audio.paused && !forcePlay) return;
        audio.play().catch(() => {});
    }

    function pauseAudio(audio) {
        if (audio && !audio.paused) audio.pause();
    }

    function playThunderRandom() {
        const thunder = dom.audio.thunder;
        if (!thunder || state.scenario !== "ignore" || state.isMuted || !state.hasInteracted) return;
        if (Math.random() < 0.35) {
            thunder.currentTime = 0;
            thunder.volume = 0.35;
            thunder.play().catch(() => {});
        }
    }

    function scrollToYear(targetYear) {
        const progress = clamp((targetYear - START_YEAR) / YEARS, 0, 1);
        const spacerTop = dom.timelineSpacer.getBoundingClientRect().top + window.scrollY;
        const scrollPos = spacerTop + progress * (dom.timelineSpacer.offsetHeight - window.innerHeight);
        window.scrollTo({ top: scrollPos, behavior: "smooth" });
    }

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function smoothstep(t) {
        return t * t * (3 - 2 * t);
    }

    function rand(min, max) {
        return Math.random() * (max - min) + min;
    }

    function getPerformanceProfile() {
        const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
        const isSmallScreen = window.innerWidth < 960;
        const lowCoreCount = typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 4;
        const lowMemory = typeof navigator.deviceMemory === "number" && navigator.deviceMemory <= 4;
        const liteEffects = prefersReducedMotion || isSmallScreen || lowCoreCount || lowMemory;

        return {
            liteEffects,
            renderPrecision: liteEffects ? 2 : 3,
            sceneCounts: liteEffects
                ? { trees: 12, birds: 10, satellites: 4, clouds: 4, steam: 6, ash: 16, rain: 40 }
                : { trees: 18, birds: 18, satellites: 6, clouds: 7, steam: 10, ash: 34, rain: 90 }
        };
    }

    function lerpColor(r1, g1, b1, r2, g2, b2, t) {
        const r = Math.round(r1 + (r2 - r1) * t);
        const g = Math.round(g1 + (g2 - g1) * t);
        const b = Math.round(b1 + (b2 - b1) * t);
        return `rgb(${r}, ${g}, ${b})`;
    }
});
