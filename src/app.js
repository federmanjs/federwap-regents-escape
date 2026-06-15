import { MEMORIES } from "./data/memories.js";
import { getQuestionById, QUESTION_BANK, QUESTION_TOPICS } from "./data/questions.js";
import { STAGES, TEACHER_CONFIG } from "./data/stages.js";
import { AUTH_STORAGE_KEY, findUser, normalizeUsername } from "./data/users.js";

const app = document.querySelector("#app");
const urlTeacherMode = new URLSearchParams(window.location.search).get("teacher") === "1";

const volatileState = {
  loginMessage: "",
  passwordMessage: "",
  passwordTone: "",
  shakingStageId: null,
  wrongAnswerKey: "",
};

const defaultProgress = () => ({
  version: 1,
  started: false,
  currentView: "stage",
  currentStageId: 1,
  activeAchievementStageId: null,
  highestStageUnlocked: 1,
  completedLocks: [],
  completedQuizzes: [],
  finalUnlocked: false,
  usedTopicIds: [],
  quizSessions: {},
});

let currentUser = loadCurrentUser();
let progress = currentUser ? loadProgress() : defaultProgress();

app.addEventListener("click", handleClick);
app.addEventListener("click", handleScreenTap);
app.addEventListener("submit", handleSubmit);

render();

function loadCurrentUser() {
  try {
    const savedUsername = localStorage.getItem(AUTH_STORAGE_KEY);
    return savedUsername ? findUser(savedUsername) : null;
  } catch {
    return null;
  }
}

function saveCurrentUser(user) {
  localStorage.setItem(AUTH_STORAGE_KEY, user.username);
}

function clearCurrentUser() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

function progressStorageKey() {
  return `${TEACHER_CONFIG.progressStorageKey}:${currentUser?.username ?? "guest"}`;
}

function loadProgress() {
  if (!currentUser) return defaultProgress();

  try {
    const saved = localStorage.getItem(progressStorageKey());
    if (!saved) return defaultProgress();
    return normalizeProgress(JSON.parse(saved));
  } catch {
    return defaultProgress();
  }
}

function normalizeProgress(saved) {
  const base = defaultProgress();
  const merged = { ...base, ...saved };
  merged.completedLocks = Array.isArray(saved.completedLocks) ? saved.completedLocks : [];
  merged.completedQuizzes = Array.isArray(saved.completedQuizzes) ? saved.completedQuizzes : [];
  merged.usedTopicIds = Array.isArray(saved.usedTopicIds) ? saved.usedTopicIds : [];
  merged.quizSessions = saved.quizSessions && typeof saved.quizSessions === "object" ? saved.quizSessions : {};
  merged.currentStageId = clamp(Number(merged.currentStageId) || 1, 1, STAGES.length);
  merged.highestStageUnlocked = clamp(Number(merged.highestStageUnlocked) || 1, 1, STAGES.length);
  merged.activeAchievementStageId = merged.activeAchievementStageId
    ? clamp(Number(merged.activeAchievementStageId), 1, STAGES.length)
    : null;
  if (!["stage", "achievement", "memories"].includes(merged.currentView)) {
    merged.currentView = "stage";
  }
  return merged;
}

function saveProgress() {
  if (!currentUser) return;
  localStorage.setItem(progressStorageKey(), JSON.stringify(progress));
}

function render() {
  if (!currentUser) {
    app.innerHTML = renderLoginScreen();
  } else if (!progress.started) {
    app.innerHTML = renderStartScreen();
  } else if (progress.currentView === "achievement" && progress.activeAchievementStageId) {
    app.innerHTML = renderAchievementCutscene();
  } else if (progress.currentView === "memories" && progress.finalUnlocked) {
    app.innerHTML = renderMemoriesScreen();
  } else {
    app.innerHTML = renderStageScreen();
  }

  wireMissingMedia();
}

function renderLoginScreen() {
  return `
    <main class="app-shell login-shell">
      <section class="login-card">
        <div class="login-art">
          <img src="public/assets/locks/lock-01-code-1-four-blanks.png" alt="Folder 67 lock screen" />
        </div>
        <form class="login-form" autocomplete="on">
          <p class="eyebrow">Mynderse Regents Escape</p>
          <h1>Student Login</h1>
          <label>
            <span>Username</span>
            <input name="username" type="text" autocomplete="username" autocapitalize="off" spellcheck="false" placeholder="first.last" required />
          </label>
          <label>
            <span>Password</span>
            <input name="password" type="password" autocomplete="current-password" inputmode="numeric" placeholder="MMDDYYYY" required />
          </label>
          <button class="primary-button" type="submit">Enter Escape</button>
          ${
            volatileState.loginMessage
              ? `<p class="form-message error">${escapeHtml(volatileState.loginMessage)}</p>`
              : ""
          }
        </form>
      </section>
    </main>
  `;
}

function renderStartScreen() {
  const firstName = getFirstName();

  return `
    <main class="app-shell start-shell">
      <section class="start-hero">
        <div class="start-story-image">
          <img src="public/assets/story/story-01-empty-classroom-folder-67.png" alt="Students discover Folder 67" />
        </div>
        <div class="hero-copy">
          <p class="eyebrow">Mynderse Regents Escape</p>
          <h1>Regents Escape: Folder 67</h1>
          <p class="start-lede">
            ${escapeHtml(firstName)}, find the clues, unlock the codes, clear the math gates, and reveal the June 5 memories.
          </p>
          <div class="start-actions">
            <button class="primary-button" data-action="start">Start Escape</button>
          </div>
        </div>
      </section>
    </main>
  `;
}

function renderStageScreen() {
  const stage = getStage(progress.currentStageId);
  const lockComplete = progress.completedLocks.includes(stage.id);
  const quizComplete = progress.completedQuizzes.includes(stage.id);
  const canGoBack = stage.id > 1;
  const canGoForward = stage.id < progress.highestStageUnlocked;
  const isFinalLock = Boolean(stage.finalLock);

  return `
    <main class="app-shell stage-shell">
      ${renderTopBar(stage)}
      <section class="screen-layout">
        <article class="riddle-panel">
          <div class="stage-heading">
            <p class="eyebrow">Stage ${stage.id} of ${STAGES.length}</p>
            <h1>${escapeHtml(stage.title)}</h1>
          </div>
          ${renderStageImage(stage)}
          <div class="riddle-text">${formatRiddle(stage.riddle)}</div>
          ${stage.extraHtml ? `<div class="stage-extra">${stage.extraHtml}</div>` : ""}
        </article>

        <aside class="gate-panel">
          ${renderPasswordLock(stage, lockComplete)}
          ${
            lockComplete && isFinalLock
              ? renderFinalUnlockPrompt()
              : lockComplete
                ? renderQuizGate(stage, quizComplete)
                : renderLockedPreview(stage)
          }
        </aside>
      </section>

      ${renderBottomNav(stage, canGoBack, canGoForward)}
    </main>
  `;
}

function renderTopBar(stage) {
  return `
    <header class="top-bar">
      <button class="brand-button" data-action="go-start" aria-label="Regents Escape home">
        <span class="brand-lock" aria-hidden="true">67</span>
        <span>Regents Escape</span>
      </button>
      <div class="progress-dots" aria-label="Progress">
        ${STAGES.map((dotStage) => {
          const unlocked = dotStage.id <= progress.highestStageUnlocked;
          const active = dotStage.id === stage.id;
          const done = progress.completedLocks.includes(dotStage.id);
          return `
            <button
              class="dot ${active ? "active" : ""} ${done ? "done" : ""}"
              data-action="jump-stage"
              data-stage-id="${dotStage.id}"
              ${unlocked ? "" : "disabled"}
              aria-label="Stage ${dotStage.id}${unlocked ? "" : " locked"}"
            >
              ${dotStage.id}
            </button>
          `;
        }).join("")}
      </div>
      <div class="teacher-menu">
        <span class="user-pill">${escapeHtml(getFirstName())}</span>
        <button class="ghost-button" data-action="reset">Reset</button>
        <button class="ghost-button" data-action="logout">Log Out</button>
        ${
          isTeacherMode()
            ? `<button class="ghost-button teacher-only" data-action="teacher-unlock">Unlock</button>
               <button class="ghost-button teacher-only" data-action="teacher-skip-quiz">Skip Quiz</button>
               <button class="ghost-button teacher-only" data-action="teacher-open-final">Final</button>`
            : ""
        }
      </div>
    </header>
  `;
}

function renderBottomNav(stage, canGoBack, canGoForward) {
  return `
    <nav class="bottom-nav" aria-label="Stage navigation">
      <button class="nav-arrow" data-action="prev-stage" ${canGoBack ? "" : "disabled"} aria-label="Previous stage">
        <span aria-hidden="true">&lsaquo;</span>
      </button>
      <div class="nav-count" aria-label="Stage ${stage.id} of ${STAGES.length}">
        ${stage.id} / ${STAGES.length}
      </div>
      <button class="nav-arrow" data-action="next-stage" ${canGoForward ? "" : "disabled"} aria-label="Next stage">
        <span aria-hidden="true">&rsaquo;</span>
      </button>
    </nav>
  `;
}

function renderStageImage(stage) {
  const imagePath = stage.storyImage || stage.image;

  if (!imagePath) {
    return `
      <div class="image-frame image-missing">
        <div class="image-placeholder">
          <span class="placeholder-icon">?</span>
          <strong>Code assembly</strong>
        </div>
      </div>
    `;
  }

  return `
    <div class="image-frame story-frame">
      <img src="${imagePath}" alt="${escapeHtml(stage.title)} story image" />
      <div class="image-placeholder">
        <span class="placeholder-icon">67</span>
        <strong>Story image placeholder</strong>
        <small>${escapeHtml(imagePath.replace("public/assets/", ""))}</small>
      </div>
    </div>
  `;
}

function renderPasswordLock(stage, lockComplete) {
  const messageVisible = volatileState.passwordMessage && volatileState.passwordTone && volatileState.shakingStageId === stage.id;
  const shakeClass = volatileState.shakingStageId === stage.id && volatileState.passwordTone === "error" ? "shake" : "";

  if (lockComplete) {
    return `
      <section class="lock-panel unlocked">
        <p class="eyebrow">Password lock</p>
        <h2>Unlocked</h2>
        ${renderAchievementImage(stage)}
        <p class="success-text">This code is cleared.</p>
      </section>
    `;
  }

  return `
    <section class="lock-panel lock-panel-visual ${shakeClass}">
      <form class="password-form lock-screen-form" data-stage-id="${stage.id}">
        <div class="lock-screen-art">
          <img src="${stage.lockImage}" alt="Code ${stage.id} password lock screen" />
          <label class="sr-only" for="password-${stage.id}">Stage ${stage.id} password</label>
          <input
            id="password-${stage.id}"
            class="lock-screen-input"
            name="password"
            type="text"
            autocomplete="off"
            autocapitalize="off"
            spellcheck="false"
            inputmode="text"
          />
        </div>
        <button class="primary-button" type="submit">Unlock</button>
      </form>
      ${messageVisible ? `<p class="form-message ${volatileState.passwordTone}">${escapeHtml(volatileState.passwordMessage)}</p>` : ""}
    </section>
  `;
}

function renderAchievementImage(stage) {
  if (!stage.achievementImage) return "";

  return `
    <div class="achievement-art">
      <img src="${stage.achievementImage}" alt="${escapeHtml(stage.title)} achievement artwork" />
    </div>
  `;
}

function renderAchievementCutscene() {
  const stage = getStage(progress.activeAchievementStageId);
  const isFinal = Boolean(stage.finalLock);
  const image = stage.achievementImage || stage.storyImage || stage.lockImage;

  return `
    <main class="app-shell cutscene-shell">
      <section class="cutscene-card">
        <div class="cutscene-art">
          <img src="${image}" alt="${escapeHtml(stage.title)} unlocked artwork" />
        </div>
        <div class="cutscene-copy">
          <p class="eyebrow">${isFinal ? "Final Secret Unlocked" : "Achievement Unlocked"}</p>
          <h1>${isFinal ? "June 5 Memories" : `Code ${stage.id} Cleared`}</h1>
          <p>
            ${
              isFinal
                ? "The final code opened the memory collection."
                : stage.id === 8
                  ? "The full code worked. One final lock remains."
                  : "The lock opened. Clear the math gate to reveal the next clue."
            }
          </p>
          <button class="primary-button" data-action="continue-achievement">
            ${isFinal ? "Open Memories" : stage.id === 8 ? "Continue" : "Start Math Gate"}
          </button>
        </div>
      </section>
    </main>
  `;
}

function renderLockedPreview(stage) {
  const nextStage = getStage(stage.id + 1);
  if (!nextStage) return "";

  return `
    <section class="preview-panel locked-preview">
      <p class="eyebrow">Next reveal</p>
      <h2>${escapeHtml(nextStage.title)}</h2>
      <p>Locked until this code is solved.</p>
    </section>
  `;
}

function renderFinalUnlockPrompt() {
  return `
    <section class="preview-panel final-ready">
      <p class="eyebrow">Escape complete</p>
      <h2>June 5 memories unlocked</h2>
      <p>The final code opens the memory collection from the last day at Mynderse.</p>
      <button class="primary-button" data-action="open-memories">Open Memories</button>
    </section>
  `;
}

function renderQuizGate(stage, quizComplete) {
  ensureQuizSession(stage.id);
  const session = progress.quizSessions[stage.id];
  const completedCount = session.questions.filter((item) => item.correct).length;

  if (quizComplete || session.completed) {
    return `
      <section class="quiz-panel">
        <div class="quiz-header">
          <p class="eyebrow">Math gate</p>
          <h2>3 of 3 correct</h2>
        </div>
        <div class="review-list">
          ${session.questions.map((item, index) => renderCompletedQuestion(item, index)).join("")}
        </div>
        ${stage.id < STAGES.length ? `<button class="primary-button" data-action="next-stage">Continue</button>` : ""}
      </section>
    `;
  }

  const currentItem = session.questions[session.currentIndex];
  const question = getQuestionById(currentItem.questionId);
  const answeredCorrect = currentItem.correct;
  const wrongKey = `${stage.id}:${session.currentIndex}:${currentItem.lastWrongChoiceIndex ?? ""}`;

  return `
    <section class="quiz-panel">
      <div class="quiz-header">
        <p class="eyebrow">Math gate</p>
        <h2>${completedCount} of 3 correct</h2>
      </div>
      ${completedCount > 0 ? `<div class="review-list compact">${session.questions.slice(0, session.currentIndex).map((item, index) => renderCompletedQuestion(item, index)).join("")}</div>` : ""}
      <article class="question-card">
        <p class="topic-label">${escapeHtml(question.topicName)}</p>
        <div class="question-prompt">${question.prompt}</div>
        <div class="choice-list">
          ${currentItem.choiceOrder.map((choiceIndex, displayIndex) => {
            const selected = currentItem.answeredChoiceIndex === choiceIndex;
            const wrong = currentItem.lastWrongChoiceIndex === choiceIndex && volatileState.wrongAnswerKey === wrongKey;
            return `
              <button
                class="choice-button ${selected ? "selected correct" : ""} ${wrong ? "wrong" : ""}"
                data-action="answer-choice"
                data-stage-id="${stage.id}"
                data-choice-index="${choiceIndex}"
                ${answeredCorrect ? "disabled" : ""}
              >
                <span class="choice-number">(${displayIndex + 1})</span>
                <span>${question.choices[choiceIndex]}</span>
              </button>
            `;
          }).join("")}
        </div>
        ${
          volatileState.wrongAnswerKey === wrongKey
            ? `<p class="form-message error">Try again.</p>`
            : ""
        }
        ${
          answeredCorrect
            ? `<div class="explanation-block">
                ${question.strategy ? `<div class="strategy-block">${question.strategy}</div>` : ""}
                ${question.explanation}
                <button class="primary-button" data-action="next-question" data-stage-id="${stage.id}">
                  ${completedCount === 3 ? "Finish Gate" : "Next Question"}
                </button>
              </div>`
            : ""
        }
      </article>
    </section>
  `;
}

function renderCompletedQuestion(item, index) {
  const question = getQuestionById(item.questionId);
  const selectedChoice = Number.isInteger(item.answeredChoiceIndex) ? question.choices[item.answeredChoiceIndex] : "";

  return `
    <article class="completed-question">
      <p class="eyebrow">Question ${index + 1}</p>
      <div class="question-prompt small">${question.prompt}</div>
      <p class="answer-line"><strong>Answer:</strong> ${selectedChoice}</p>
      <div class="mini-explanation">${question.explanation}</div>
    </article>
  `;
}

function renderMemoriesScreen() {
  const firstName = getFirstName();

  return `
    <main class="app-shell memories-shell">
      <header class="top-bar">
        <button class="brand-button" data-action="back-to-final">
          <span class="brand-lock" aria-hidden="true">67</span>
          <span>Back to Escape</span>
        </button>
        <div class="teacher-menu">
          <span class="user-pill">${escapeHtml(firstName)}</span>
          <button class="ghost-button" data-action="reset">Reset</button>
          <button class="ghost-button" data-action="logout">Log Out</button>
        </div>
      </header>

      <section class="memories-hero">
        <div class="final-story-banner">
          <img src="public/assets/story/story-08-june-5-memory-reveal.png" alt="June 5 memory reveal artwork" />
        </div>
        <div>
          <p class="eyebrow">Escape complete</p>
          <h1>${escapeHtml(firstName)}'s June 5 Memories</h1>
          <p>${escapeHtml(firstName)}, you escaped the Regents madness. You found the path, cracked the codes, and proved the group could make a way to see him.</p>
        </div>
      </section>

      <section class="decoded-message">
        <p class="eyebrow">Decoded message</p>
        <h2>ELITE GROUP MISS TEACHER BUT FIND A WAY TO SEE HIM</h2>
      </section>

      <section class="memory-grid" aria-label="June 5 memory collection">
        ${MEMORIES.map(renderMemoryCard).join("")}
      </section>
    </main>
  `;
}

function renderMemoryCard(memory) {
  const media = memory.src
    ? memory.type === "video"
      ? `<video controls preload="metadata" src="${memory.src}"></video>`
      : `<img src="${memory.src}" alt="${escapeHtml(memory.title)}" />`
    : "";

  return `
    <article class="memory-card">
      <div class="memory-media ${memory.src ? "" : "image-missing"}">
        ${media}
        <div class="image-placeholder memory-placeholder">
          <span class="placeholder-icon">${memory.type === "video" ? "play" : "photo"}</span>
          <strong>${escapeHtml(memory.title)}</strong>
        </div>
      </div>
      <div class="memory-copy">
        <h2>${escapeHtml(memory.title)}</h2>
        <p>${escapeHtml(memory.caption)}</p>
      </div>
    </article>
  `;
}

async function handleSubmit(event) {
  const loginForm = event.target.closest(".login-form");
  if (loginForm) {
    event.preventDefault();
    const data = new FormData(loginForm);
    const username = normalizeUsername(data.get("username"));
    const password = normalizeLoginPassword(data.get("password"));
    const user = findUser(username);
    const hash = await sha256(password);

    if (user && hash === user.passwordHash) {
      currentUser = user;
      saveCurrentUser(user);
      progress = loadProgress();
      clearVolatile();
      render();
      return;
    }

    volatileState.loginMessage = "Login not found. Check the username and birthday password.";
    render();
    return;
  }

  const form = event.target.closest(".password-form");
  if (!form) return;

  event.preventDefault();
  const stageId = Number(form.dataset.stageId);
  const stage = getStage(stageId);
  const input = new FormData(form).get("password")?.toString().trim() ?? "";
  const valueToHash = TEACHER_CONFIG.caseSensitivePasswords ? input : input.toLowerCase();
  const hash = await sha256(valueToHash);

  if (hash === stage.passwordHash) {
    completeLock(stage);
    volatileState.passwordMessage = "Unlocked.";
    volatileState.passwordTone = "success";
    volatileState.shakingStageId = stageId;
    saveProgress();
    render();
    return;
  }

  volatileState.passwordMessage = "Not yet - check your clue and try again.";
  volatileState.passwordTone = "error";
  volatileState.shakingStageId = stageId;
  render();
}

function handleClick(event) {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  const action = button.dataset.action;

  if (action === "start") {
    progress.started = true;
    progress.currentView = "stage";
    progress.currentStageId = Math.min(progress.currentStageId || 1, progress.highestStageUnlocked);
    saveProgress();
    render();
    return;
  }

  if (action === "go-start") {
    progress.currentView = "stage";
    progress.currentStageId = 1;
    saveProgress();
    render();
    return;
  }

  if (action === "reset") {
    const confirmed = window.confirm("Reset this device and start the escape over?");
    if (!confirmed) return;
    localStorage.removeItem(progressStorageKey());
    progress = defaultProgress();
    clearVolatile();
    render();
    return;
  }

  if (action === "logout") {
    clearCurrentUser();
    currentUser = null;
    progress = defaultProgress();
    clearVolatile();
    render();
    return;
  }

  if (action === "teacher-unlock" && isTeacherMode()) {
    const stage = getStage(progress.currentStageId);
    completeLock(stage);
    saveProgress();
    render();
    return;
  }

  if (action === "teacher-skip-quiz" && isTeacherMode()) {
    teacherSkipQuiz(progress.currentStageId);
    saveProgress();
    render();
    return;
  }

  if (action === "teacher-open-final" && isTeacherMode()) {
    teacherOpenFinal();
    saveProgress();
    render();
    return;
  }

  if (action === "prev-stage") {
    setStage(progress.currentStageId - 1);
    return;
  }

  if (action === "next-stage") {
    setStage(progress.currentStageId + 1);
    return;
  }

  if (action === "jump-stage") {
    setStage(Number(button.dataset.stageId));
    return;
  }

  if (action === "answer-choice") {
    answerChoice(Number(button.dataset.stageId), Number(button.dataset.choiceIndex));
    return;
  }

  if (action === "next-question") {
    advanceQuestion(Number(button.dataset.stageId));
    return;
  }

  if (action === "open-memories") {
    progress.currentView = "memories";
    progress.activeAchievementStageId = null;
    saveProgress();
    render();
    return;
  }

  if (action === "continue-achievement") {
    const stage = getStage(progress.activeAchievementStageId);
    if (stage.finalLock) {
      progress.currentView = "memories";
      progress.activeAchievementStageId = null;
    } else {
      progress.currentView = "stage";
      progress.currentStageId = stage.id;
      progress.activeAchievementStageId = null;
    }
    saveProgress();
    render();
    return;
  }

  if (action === "back-to-final") {
    progress.currentView = "stage";
    progress.currentStageId = 9;
    saveProgress();
    render();
  }
}

function handleScreenTap(event) {
  if (event.defaultPrevented || !currentUser || progress.currentView !== "stage") return;
  if (event.target.closest("button, input, textarea, select, a, label, form, [data-action], video")) return;

  const edgeWidth = Math.min(110, window.innerWidth * 0.22);
  if (event.clientX <= edgeWidth) {
    setStage(progress.currentStageId - 1);
  } else if (event.clientX >= window.innerWidth - edgeWidth) {
    setStage(progress.currentStageId + 1);
  }
}

function completeLock(stage) {
  addUnique(progress.completedLocks, stage.id);
  progress.currentView = "achievement";
  progress.activeAchievementStageId = stage.id;

  if (stage.finalLock) {
    progress.finalUnlocked = true;
    progress.highestStageUnlocked = STAGES.length;
    return;
  }

  ensureQuizSession(stage.id);
}

function teacherSkipQuiz(stageId) {
  const stage = getStage(stageId);
  if (!stage || stage.finalLock) {
    progress.finalUnlocked = true;
    progress.currentView = "memories";
    progress.activeAchievementStageId = null;
    return;
  }

  addUnique(progress.completedLocks, stage.id);
  const session = ensureQuizSession(stage.id);
  if (session) {
    session.questions.forEach((item) => {
      const question = getQuestionById(item.questionId);
      item.answeredChoiceIndex = question.correctIndex;
      item.correct = true;
      item.lastWrongChoiceIndex = null;
    });
    session.currentIndex = session.questions.length - 1;
    session.completed = true;
  }
  addUnique(progress.completedQuizzes, stage.id);
  progress.highestStageUnlocked = Math.max(progress.highestStageUnlocked, Math.min(stage.id + 1, STAGES.length));
  progress.currentStageId = Math.min(stage.id + 1, STAGES.length);
  progress.currentView = "stage";
  progress.activeAchievementStageId = null;
}

function teacherOpenFinal() {
  progress.started = true;
  progress.currentView = "memories";
  progress.currentStageId = 9;
  progress.highestStageUnlocked = STAGES.length;
  progress.activeAchievementStageId = null;
  progress.finalUnlocked = true;
  progress.completedLocks = STAGES.map((stage) => stage.id);
  progress.completedQuizzes = STAGES.filter((stage) => !stage.finalLock).map((stage) => stage.id);
}

function answerChoice(stageId, choiceIndex) {
  const session = progress.quizSessions[stageId];
  if (!session || session.completed) return;

  const item = session.questions[session.currentIndex];
  const question = getQuestionById(item.questionId);
  if (!question || item.correct) return;

  if (choiceIndex === question.correctIndex) {
    item.answeredChoiceIndex = choiceIndex;
    item.correct = true;
    item.lastWrongChoiceIndex = null;
    volatileState.wrongAnswerKey = "";
    saveProgress();
    render();
    return;
  }

  item.lastWrongChoiceIndex = choiceIndex;
  volatileState.wrongAnswerKey = `${stageId}:${session.currentIndex}:${choiceIndex}`;
  saveProgress();
  render();
}

function advanceQuestion(stageId) {
  const session = progress.quizSessions[stageId];
  if (!session) return;

  const correctCount = session.questions.filter((item) => item.correct).length;
  if (correctCount >= 3) {
    session.completed = true;
    addUnique(progress.completedQuizzes, stageId);
    progress.highestStageUnlocked = Math.max(progress.highestStageUnlocked, Math.min(stageId + 1, STAGES.length));
    progress.currentStageId = Math.min(stageId + 1, STAGES.length);
    saveProgress();
    render();
    return;
  }

  session.currentIndex = Math.min(session.currentIndex + 1, session.questions.length - 1);
  saveProgress();
  render();
}

function ensureQuizSession(stageId) {
  const stage = getStage(stageId);
  if (!stage || stage.finalLock) return null;

  const existing = progress.quizSessions[stageId];
  if (existing?.questions?.length === 3) return existing;

  const selectedQuestions = drawQuestions(3);
  progress.quizSessions[stageId] = {
    currentIndex: 0,
    completed: false,
    questions: selectedQuestions.map((question) => ({
      questionId: question.id,
      choiceOrder: shuffle([0, 1, 2, 3]),
      answeredChoiceIndex: null,
      lastWrongChoiceIndex: null,
      correct: false,
    })),
  };

  return progress.quizSessions[stageId];
}

function drawQuestions(count) {
  const selected = [];
  const usedThisDraw = new Set();

  while (selected.length < count) {
    let availableTopics = QUESTION_TOPICS.filter(
      (topicId) => !progress.usedTopicIds.includes(topicId) && !usedThisDraw.has(topicId)
    );

    if (availableTopics.length === 0) {
      progress.usedTopicIds = [];
      availableTopics = QUESTION_TOPICS.filter((topicId) => !usedThisDraw.has(topicId));
    }

    const topicId = availableTopics[randomInt(availableTopics.length)];
    const variations = QUESTION_BANK.filter((question) => question.topicId === topicId);
    const question = variations[randomInt(variations.length)];
    selected.push(question);
    usedThisDraw.add(topicId);
    addUnique(progress.usedTopicIds, topicId);
  }

  return selected;
}

async function sha256(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function setStage(stageId) {
  const nextStageId = clamp(stageId, 1, progress.highestStageUnlocked);
  progress.currentView = "stage";
  progress.activeAchievementStageId = null;
  progress.currentStageId = nextStageId;
  clearVolatile();
  saveProgress();
  render();
}

function wireMissingMedia() {
  document
    .querySelectorAll(".image-frame img, .memory-media img, .memory-media video, .lock-screen-art img, .cutscene-art img, .start-story-image img")
    .forEach((media) => {
    media.addEventListener("error", () => {
      media.closest(".image-frame, .memory-media, .lock-screen-art, .cutscene-art, .start-story-image")?.classList.add("image-missing");
    });
    if (media.complete && media.naturalWidth === 0) {
      media.closest(".image-frame, .memory-media, .lock-screen-art, .cutscene-art, .start-story-image")?.classList.add("image-missing");
    }
  });
}

function clearVolatile() {
  volatileState.loginMessage = "";
  volatileState.passwordMessage = "";
  volatileState.passwordTone = "";
  volatileState.shakingStageId = null;
  volatileState.wrongAnswerKey = "";
}

function getFirstName() {
  return currentUser?.displayName?.split(" ")[0] ?? "Student";
}

function isTeacherMode() {
  return currentUser?.role === "teacher" && urlTeacherMode;
}

function normalizeLoginPassword(value) {
  return String(value ?? "").replace(/\D/g, "");
}

function formatRiddle(text) {
  return escapeHtml(text)
    .split(/\n{2,}/)
    .map((stanza) => `<p>${stanza.replace(/\n/g, "<br>")}</p>`)
    .join("");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getStage(stageId) {
  return STAGES.find((stage) => stage.id === stageId) ?? STAGES[0];
}

function addUnique(list, value) {
  if (!list.includes(value)) list.push(value);
}

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInt(index + 1);
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
