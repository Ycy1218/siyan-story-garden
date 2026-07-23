"use strict";

const learnerName = "思妍";
const CLOUD_ENV_ID = "siyan-garden-d5g194j0ed3d000eb";
const CLOUD_FUNCTION_NAME = "writingGardenApi";
let cloudAppPromise = null;
let ownerCode = "";

function getCloudApp() {
  if (!cloudAppPromise) {
    cloudAppPromise = Promise.resolve().then(() => {
      const sdk = window.cloudbase;
      if (!sdk) throw new Error("云端服务还没有加载完成，请刷新页面再试。");
      const app = sdk.init({ env: CLOUD_ENV_ID });
      const auth = app.auth?.();
      return Promise.resolve(auth?.signInAnonymously?.()).catch(() => null).then(() => app);
    });
  }
  return cloudAppPromise;
}

async function callCloudWritingApi(action, data = {}) {
  const app = await getCloudApp();
  const response = await app.callFunction({ name: CLOUD_FUNCTION_NAME, data: { action, ...data } });
  const rawResult = response?.result ?? response;
  const result = typeof rawResult === "string" ? JSON.parse(rawResult) : rawResult || {};
  if (!result.ok) throw new Error(result.message || response?.message || "云端暂时不可用，请稍后再试。");
  return result;
}

const exercises = [
  {
    id: "qiuyu",
    level: "基础",
    title: "名字“秋雨”",
    source: "2025 新课标 II 卷",
    summary: "一名叫“秋雨”的中国留学生在爱尔兰上学。同学总是读错她的名字，她感到尴尬，也意识到自己可能错过了介绍中国文化的机会。",
    reading: {
      setting: "爱尔兰的学校，课堂讨论前后",
      people: "中国留学生“秋雨”和她的外国同学",
      before: ["同学常常读错“Qiuyu”这个名字，秋雨因此感到尴尬。", "她后来不太敢再纠正别人，却意识到名字背后还有值得分享的中国文化。"],
      last: "课堂讨论中，秋雨被邀请解释自己名字的含义；她需要决定要不要勇敢开口。",
      translations: ["课堂讨论时，我被邀请解释自己名字的含义。", "课后，许多同学产生了兴趣，走到我面前。"]
    },
    starts: [
      "In a class discussion, I was invited to explain the meaning of my name.",
      "Many of my classmates got interested and came up to me after class."
    ],
    plot: [
      ["原文最后的问题", "主人公怕别人不耐烦，不敢再纠正名字发音。"],
      ["第一段必须写", "解释“秋雨”的含义，让同学产生兴趣。"],
      ["第一段结尾", "同学认真倾听，对名字和中国文化感到好奇。"],
      ["第二段必须写", "同学练习发音、表达尊重，主人公心态变化。"],
      ["最终主题", "名字不只是标签，也是文化身份的一部分。"]
    ],
    chain: "紧张 → 解释名字 → 描述中国秋雨 → 同学认真倾听 → 练习发音 → 从尴尬变为自豪",
    warning: "不要突然写“外面下起秋雨”，也不要添加老师表扬、获奖等新情节。",
    sentences: [
      "I took a deep breath and began to explain.",
      "I told them that “Qiu” meant autumn and “Yu” meant rain.",
      "I also described the gentle beauty of autumn rain in China.",
      "To my surprise, everyone listened carefully.",
      "They tried their best to pronounce “Qiuyu” correctly.",
      "No one laughed or became impatient.",
      "I no longer felt embarrassed about my name.",
      "I realized that my name was an important part of my culture."
    ]
  },
  {
    id: "health",
    level: "基础",
    title: "熬夜与健康",
    source: "2026 新课标 II 卷",
    summary: "主人公长期熬夜，父母和室友多次劝说也不听。后来他出现头痛和胸口疼，医生严肃警告他必须改变作息。",
    reading: {
      setting: "大学生活中，去医院检查之后",
      people: "长期熬夜的主人公、父母、室友和医生",
      before: ["主人公长期熬夜，父母和室友多次劝说，他都没有认真改变。", "后来他出现头痛和胸口疼，医生严肃提醒：再这样下去，健康会受到伤害。"],
      last: "受到医生警告后，主人公知道必须改变；但早睡早起并不会一下子就成功。",
      translations: ["受到医生警告的震动，我知道自己必须改变。", "慢慢地，我调整新作息的努力有了回报。"]
    },
    starts: [
      "Struck by the doctor's warning, I knew I had to make a change.",
      "Slowly but surely, my efforts to adjust to the new routine paid off."
    ],
    plot: [
      ["原文最后的问题", "长期熬夜已经损害健康，主人公受到医生警告。"],
      ["第一段必须写", "制订并执行新作息，同时写出开始时的不适应。"],
      ["第一段结尾", "主人公没有放弃，逐渐适应早睡早起。"],
      ["第二段必须写", "精神、学习和健康逐步改善。"],
      ["最终主题", "健康比熬夜娱乐或“假努力”更重要。"]
    ],
    chain: "医生警告 → 下定决心 → 关手机、订计划 → 起初不适应 → 坚持新作息 → 身体改善 → 获得感悟",
    warning: "第一段不要直接写“完全康复”。第二段段首已经告诉你：改变是慢慢见效的。",
    sentences: [
      "That night, I turned off my phone at ten.",
      "I also made a simple daily plan.",
      "At first, I found it hard to fall asleep early.",
      "However, my roommates encouraged me to keep trying.",
      "After several weeks, I began to wake up early.",
      "I had more energy and could study better.",
      "The doctor said that my health was improving.",
      "I realized that good health was more important than staying up late."
    ]
  },
  {
    id: "david",
    level: "进阶",
    title: "David 参加越野赛",
    source: "2022 新高考 I 卷",
    summary: "David 身体有缺陷，但一直认真参加越野训练。比赛前他担心被其他学校的学生嘲笑，准备退出。“我”找到情绪低落的 David。",
    reading: {
      setting: "越野赛开始前，运动场边",
      people: "David、“我”和即将参赛的学生",
      before: ["David 身体有缺陷，却一直认真参加越野训练。", "比赛前，他担心其他学校的学生会嘲笑自己，情绪低落，甚至想退出。"],
      last: "“我”找到 David，坐到他身边，想让他重新获得参加比赛的勇气。",
      translations: ["我们挨着坐下，但 David 没有看我。", "我看着 David 和其他跑者一起走向起跑线。"]
    },
    starts: [
      "We sat down next to each other, but David didn't look at me.",
      "I watched as David moved up to the starting line with the other runners."
    ],
    plot: [
      ["原文最后的问题", "David 害怕被嘲笑，因此不敢参加比赛。"],
      ["第一段必须写", "“我”理解并鼓励 David，让他重新获得勇气。"],
      ["第一段结尾", "David 作出参赛决定，走向起跑线。"],
      ["第二段必须写", "David 虽然跑得艰难，但坚持完成比赛。"],
      ["最终主题", "真正的胜利不是第一名，而是战胜恐惧、突破自己。"]
    ],
    chain: "低头难过 → 得到鼓励 → 恢复信心 → 走向起点 → 艰难奔跑 → 坚持完成 → 获得掌声",
    warning: "不要写 David 获得第一名。合理结局是完成比赛、战胜恐惧。",
    sentences: [
      "I gently put my hand on his shoulder.",
      "Then I told him that the race was not only about winning.",
      "“What matters is that you try your best,” I said.",
      "After a moment of silence, David raised his head and nodded.",
      "The race began and David started running slowly.",
      "Although he became tired, he refused to give up.",
      "Everyone cheered when he crossed the finish line.",
      "David smiled proudly because he had defeated his fear."
    ]
  },
  {
    id: "gunter",
    level: "进阶",
    title: "善良的出租车司机",
    source: "2024 新课标 II 卷",
    summary: "主人公赶最后一班大巴，出租车司机 Gunter 帮他及时到达车站。可是主人公没有现金，银行卡刷不了，取款机也坏了，大巴马上要开走。",
    reading: {
      setting: "维也纳的汽车站，最后一班大巴即将离开",
      people: "赶车的主人公和出租车司机 Gunter",
      before: ["主人公急着赶最后一班大巴，Gunter 帮他及时赶到车站。", "可是主人公没有现金，银行卡无法刷卡，车站取款机也坏了；大巴马上就要开走。"],
      last: "主人公既付不出车费，又不想辜负 Gunter 的帮助；他必须说明情况并赶上大巴。",
      translations: ["我跑回 Gunter 身边，把这个坏消息告诉了他。", "四天后，我回到维也纳，按照约定给 Gunter 打了电话。"]
    },
    starts: [
      "I ran back to Gunter and told him the bad news.",
      "Four days later, when I was back in Vienna, I called Gunter as promised."
    ],
    plot: [
      ["原文最后的问题", "主人公无法支付车费，同时最后一班大巴即将开走。"],
      ["第一段必须写", "向司机说明情况；司机选择信任并让主人公先赶车。"],
      ["第一段结尾", "双方留下联系方式，主人公赶上大巴。"],
      ["第二段必须写", "四天后兑现承诺，支付车费并表达感谢。"],
      ["最终主题", "陌生人的善意和人与人之间的信任。"]
    ],
    chain: "无法付钱 → 道歉说明 → 司机选择信任 → 留联系方式 → 赶上大巴 → 四天后还钱 → 感谢善意",
    warning: "第一段必须让主人公赶上大巴，并留下“以后还钱”的约定。",
    sentences: [
      "I apologized to him and explained everything.",
      "To my surprise, he told me to catch the bus first.",
      "“Don't worry about the money,” he said with a smile.",
      "I wrote down his phone number and ran towards the bus.",
      "Four days later, I called him as promised.",
      "I paid him and thanked him again and again.",
      "Gunter simply smiled and said it was no big deal.",
      "His kindness made the strange city feel warm to me."
    ]
  }
];

const beginnerSupport = {
  qiuyu: {
    sentenceMeanings: [
      "我深吸一口气，开始解释。",
      "我告诉他们，Qiu 的意思是秋，Yu 的意思是雨。",
      "我还描述了中国秋雨的温柔之美。",
      "出乎我的意料，大家都认真听着。",
      "他们尽力把 Qiuyu 读正确。",
      "没有人笑，也没有人变得不耐烦。",
      "我不再为自己的名字感到尴尬。",
      "我意识到，名字是我的文化的重要一部分。"
    ],
    words: [["take a deep breath", "深吸一口气"], ["meaning", "含义"], ["describe", "描述"], ["gentle", "温柔的"], ["pronounce", "发音"], ["culture", "文化"]]
  },
  health: {
    sentenceMeanings: [
      "那天晚上，我十点关掉了手机。",
      "我还制定了一个简单的日计划。",
      "一开始，我发现早睡很难。",
      "然而，室友们鼓励我继续尝试。",
      "几周后，我开始早起。",
      "我精力更充沛了，学习也更好了。",
      "医生说我的健康正在改善。",
      "我意识到，健康比熬夜更重要。"
    ],
    words: [["warning", "警告"], ["make a change", "作出改变"], ["routine", "日常作息"], ["fall asleep", "入睡"], ["energy", "精力"], ["improve", "改善"]]
  },
  david: {
    sentenceMeanings: [
      "我轻轻地把手放在他的肩膀上。",
      "然后我告诉他，这场比赛不只是为了获胜。",
      "我说：“重要的是你尽了最大的努力。”",
      "沉默了一会儿，David 抬起头，点了点头。",
      "比赛开始了，David 慢慢跑了起来。",
      "虽然他感到疲惫，但他拒绝放弃。",
      "当他冲过终点线时，大家都为他欢呼。",
      "David 自豪地笑了，因为他战胜了恐惧。"
    ],
    words: [["gently", "轻轻地"], ["shoulder", "肩膀"], ["matter", "要紧，重要"], ["raise one's head", "抬起头"], ["refuse to", "拒绝做某事"], ["defeat fear", "战胜恐惧"]]
  },
  gunter: {
    sentenceMeanings: [
      "我向他道歉，并解释了一切。",
      "令我惊讶的是，他让我先去赶大巴。",
      "他笑着说：“别担心钱。”",
      "我记下他的电话号码，朝大巴跑去。",
      "四天后，我按照约定给他打了电话。",
      "我付给他车费，并一次又一次地向他道谢。",
      "Gunter 只是笑着说：“没什么大不了的。”",
      "他的善良让陌生的城市对我来说温暖起来。"
    ],
    words: [["apologize", "道歉"], ["to one's surprise", "令某人惊讶的是"], ["catch the bus", "赶上大巴"], ["write down", "记下"], ["as promised", "按照约定"], ["kindness", "善良，善意"]]
  }
};

const outlineFields = [
  ["problem", "原文最后的问题", "人物现在最担心什么？", "例如：担心同学不耐烦，不敢再解释名字。"],
  ["actionOne", "第一段主要动作", "谁先做了什么？", "例如：深呼吸后，开始解释名字的含义。"],
  ["bridge", "第一段必须写到", "怎样接住第二段段首？", "例如：同学认真倾听，并对中国文化感兴趣。"],
  ["actionTwo", "第二段主要动作", "接着发生了什么变化？", "例如：同学练习发音，表达尊重。"],
  ["outcome", "结局和人物感悟", "问题怎样合理解决？", "例如：不再尴尬，认识到名字是文化的一部分。"]
];

const checks = [
  "人物没有突然增加或消失。",
  "时间、地点和人称与原文一致。",
  "主要时态使用一般过去时。",
  "第一段结尾能自然接到第二段段首。",
  "第二段真正解决了原文的问题。",
  "结局合理，没有突然获奖或奇迹发生。",
  "每段都有动作，并至少有一处语言或心理。",
  "拼写、单复数和标点已经检查。"
];

const checkEncouragements = [
  "思妍检查得很细，人物线索稳稳的，继续保持呀。",
  "时间、地点和人称都对上啦，读起来更顺了。",
  "时态检查完成，句子变得更整齐啦。",
  "两段衔接得很自然，故事的小桥搭好啦。",
  "问题解决得很漂亮，结尾更有力量啦。",
  "这个结局很自然，思妍的故事收得很好。",
  "动作、语言和心理都有啦，画面感出来了。",
  "最后一项也认真检查完了，思妍真的很细心。"
];
const weekPlan = ["读例题，写情节链", "翻译 8 个基础句", "替换人物做仿写", "填写五节点构思", "只写第一段 4 句", "补写第二段 4 句", "检查后改写一遍"];
const foundationTerms = [
  ["续写", "题目给你故事前半段，你把后半段写出来。"],
  ["段首句", "题目已经给好的每段第一句话，要从它继续写。"],
  ["情节", "故事发生了什么，例如“走失 → 帮忙 → 找到家人”。"],
  ["衔接", "前一句和后一句接得上，不突然跳到无关的事。"]
];
const monthRoadmap = [
  ["第 1 周", "读懂故事", "用中文说出：谁、发生了什么、最后可能怎样。"],
  ["第 2 周", "写 3-4 句", "只用简单过去时；一个动作、一种感受、一个结果。"],
  ["第 3 周", "练两段", "每段写 2-3 句，确保第二段解决问题。"],
  ["第 4 周", "完成短文", "先写中文思路，再用英语写 80-100 词。"]
];
const sentenceToolkit = [
  ["情绪", "He/She felt nervous.", "他/她感到紧张。"],
  ["决定", "He/She decided to help.", "他/她决定帮助别人。"],
  ["动作", "He/She ran to the ...", "他/她跑向……"],
  ["调整", "He/She took a deep breath.", "他/她深吸了一口气。"],
  ["坚持", "He/She did not give up.", "他/她没有放弃。"],
  ["变化", "To his/her surprise, ...", "令他/她惊讶的是……"],
  ["结果", "Finally, ...", "最后，……"],
  ["感受", "He/She felt happy/proud.", "他/她感到开心/自豪。"]
];
const beginnerStories = [
  ["妹妹不见了", "着急 → 求助 → 找到妹妹 → 感谢", "Tom looked around the supermarket carefully."],
  ["害怕比赛", "害怕 → 得到鼓励 → 开始比赛 → 坚持到底", "David was still afraid."],
  ["帮助老人", "看到问题 → 伸手帮助 → 联系家人 → 得到感谢", "Lily ran to the old man."],
  ["雨天救小狗", "发现小狗 → 设法帮助 → 小狗脱困 → 感到开心", "Xiao Ming ran to the dog."]
];
const pathSteps = [
  { id: "problem", label: "问题", kicker: "第一步 · 找到卡点", title: "故事现在卡在哪里？", question: "先说清楚人物最担心什么，后面的行动才不会跑题。", example: (exercise) => exercise.plot[0][1], color: "coral" },
  { id: "emotion", label: "情绪", kicker: "第二步 · 看见心情", title: "人物此刻是什么感觉？", question: "把紧张、尴尬、害怕或着急写出来，故事就有了变化。", example: (exercise) => `先抓住这句话里的感觉：${exercise.plot[0][1]}`, color: "amber" },
  { id: "action", label: "行动", kicker: "第三步 · 让人物动起来", title: "谁先做了什么？", question: "续写不是只写想法，要安排一个看得见的动作来推动故事。", example: (exercise) => exercise.plot[1][1], color: "teal" },
  { id: "result", label: "结果", kicker: "第四步 · 接住第二段", title: "第一段要走到哪里？", question: "第一段结尾要留下一个自然的变化，正好接上第二段段首。", example: (exercise) => exercise.plot[2][1], color: "blue" },
  { id: "growth", label: "成长", kicker: "第五步 · 留下一个收获", title: "人物最后明白了什么？", question: "结尾不必夸张，写出人物心态或认识的一点变化就很好。", example: (exercise) => exercise.plot[4][1], color: "ink" }
];
const STORAGE_KEY = "continuation-lab-v1";
const initialStore = { selectedId: "qiuyu", filter: "all", pathStep: "problem", pathProgress: {}, outlines: {}, drafts: {}, records: [] };
let store = loadStore();
let timerSeconds = 20 * 60;
let timerId = null;
let toastId = null;

function loadStore() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || typeof saved !== "object" || Array.isArray(saved)) return { ...initialStore, outlines: {}, drafts: {}, records: [] };
    return {
      ...initialStore,
      ...saved,
      pathStep: pathSteps.some((step) => step.id === saved.pathStep) ? saved.pathStep : initialStore.pathStep,
      pathProgress: saved.pathProgress && typeof saved.pathProgress === "object" && !Array.isArray(saved.pathProgress) ? saved.pathProgress : {},
      outlines: saved.outlines && typeof saved.outlines === "object" && !Array.isArray(saved.outlines) ? saved.outlines : {},
      drafts: saved.drafts && typeof saved.drafts === "object" && !Array.isArray(saved.drafts) ? saved.drafts : {},
      records: Array.isArray(saved.records) ? saved.records.filter((record) => record && typeof record === "object") : []
    };
  } catch {
    return { ...initialStore, outlines: {}, drafts: {}, records: [] };
  }
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    return true;
  } catch {
    showToast("浏览器没有保存成功，当前内容仍留在本页。 ");
    return false;
  }
}
function getExercise(id = store.selectedId) { return exercises.find((item) => item.id === id) || exercises[0]; }
function escapeHtml(value = "") { return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char])); }
function dayKey(value = new Date()) { const d = new Date(value); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; }
function wordCount(text = "") { return (text.match(/[A-Za-z]+(?:['-][A-Za-z]+)*/g) || []).length; }
function totalWords() { return store.records.reduce((sum, item) => sum + (item.words || 0), 0); }
function completedFor(id) { return store.records.some((record) => record.exerciseId === id); }
function getDraft(id = store.selectedId) {
  if (!store.drafts[id] || typeof store.drafts[id] !== "object" || Array.isArray(store.drafts[id])) store.drafts[id] = { paragraphOne: "", paragraphTwo: "", nickname: "", checks: Array(checks.length).fill(false) };
  const draft = store.drafts[id];
  if (!Array.isArray(draft.checks)) draft.checks = Array(checks.length).fill(false);
  if (typeof draft.nickname !== "string") draft.nickname = "";
  return draft;
}
function getOutline(id = store.selectedId) {
  if (!store.outlines[id] || typeof store.outlines[id] !== "object" || Array.isArray(store.outlines[id])) store.outlines[id] = {};
  return store.outlines[id];
}
function getStreak() {
  const dates = new Set(store.records.map((item) => dayKey(item.savedAt)));
  let streak = 0;
  const cursor = new Date();
  while (dates.has(dayKey(cursor))) { streak += 1; cursor.setDate(cursor.getDate() - 1); }
  return streak;
}
function recordsThisWeek() {
  const start = new Date(); start.setHours(0, 0, 0, 0); start.setDate(start.getDate() - 6);
  return store.records.filter((item) => new Date(item.savedAt) >= start);
}
function formatDate(value = new Date()) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "日期未知";
  return new Intl.DateTimeFormat("zh-CN", { month: "long", day: "numeric", weekday: "short" }).format(date);
}

function splitSentences(text = "") {
  return text.split(/[.!?。！？]+/).map((item) => item.trim()).filter(Boolean);
}

function countHits(text = "", words = []) {
  const lower = text.toLowerCase();
  return words.reduce((count, word) => count + (lower.includes(word.toLowerCase()) ? 1 : 0), 0);
}

function escapeRegExp(value = "") { return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

function detectLanguageErrors(text = "", location = "正文") {
  const errors = [];
  const seen = new Set();
  const add = (type, original, suggestion, reason) => {
    const key = `${type}|${original.toLowerCase()}|${suggestion}|${location}`;
    if (!seen.has(key)) { seen.add(key); errors.push({ type, original, suggestion, reason, location }); }
  };
  const spellingMap = {
    becuase: "because", beacuse: "because", recieve: "receive", recieved: "received", thier: "their", teh: "the", definately: "definitely", seperate: "separate", alots: "a lot", alot: "a lot", begining: "beginning", embarassed: "embarrassed", embarrased: "embarrassed", pronouce: "pronounce", pronouced: "pronounced", suprise: "surprise", surprize: "surprise", enviroment: "environment", tommorow: "tomorrow", studing: "studying", writting: "writing", happend: "happened", langauge: "language", untill: "until", wich: "which", throught: "through", sucess: "success", sucessful: "successful", diffrent: "different", importent: "important", beautifull: "beautiful", responsability: "responsibility", knowlege: "knowledge"
  };
  Object.entries(spellingMap).forEach(([wrong, right]) => {
    const match = text.match(new RegExp(`\\b${escapeRegExp(wrong)}\\b`, "i"));
    if (match) add("拼写错误", match[0], right, "这个词的拼写可能不正确。");
  });
  const rules = [
    { regex: /\b(he|she|it)\s+(are|were)\b/gi, suggestion: (match) => `${match[1]} was`, reason: "第三人称单数作主语时，过去时应使用 was。" },
    { regex: /\b(I)\s+(am|feel|think|go)\b/gi, suggestion: (match) => `I ${({ am: "was", feel: "felt", think: "thought", go: "went" }[match[2].toLowerCase()])}`, reason: "读后续写通常使用一般过去时，这里的现在时可以改为过去时。" },
    { regex: /\b(he|she|it)\s+(is|goes|go|feels|thinks)\b/gi, suggestion: (match) => `${match[1]} ${({ is: "was", goes: "went", go: "went", feels: "felt", thinks: "thought" }[match[2].toLowerCase()])}`, reason: "叙事使用过去时，第三人称主语后的动词要改为相应的过去式。" },
    { regex: /\b(they|we)\s+(are|go|feel|think)\b/gi, suggestion: (match) => `${match[1]} ${({ are: "were", go: "went", feel: "felt", think: "thought" }[match[2].toLowerCase()])}`, reason: "叙事使用过去时，复数主语后的动词要改为相应的过去式。" },
    { regex: /\b(i)\s+(is|are)\b/gi, suggestion: (match) => "I was", reason: "叙事使用过去时，I 后面应使用 was。" },
    { regex: /\b(they|we)\s+was\b/gi, suggestion: (match) => `${match[1]} were`, reason: "复数主语的过去时应使用 were。" },
    { regex: /\bto\s+(went|ran|said|told|came|saw|felt|made|was|were)\b/gi, suggestion: (match) => `to ${({ went: "go", ran: "run", said: "say", told: "tell", came: "come", saw: "see", felt: "feel", made: "make", was: "be", were: "be" }[match[1].toLowerCase()])}`, reason: "to 后面要接动词原形。" },
    { regex: /\b(a)\s+(important|interesting|exciting|honest)\b/gi, suggestion: (match) => `an ${match[2]}`, reason: "元音音素开头的单词前应使用 an。" },
    { regex: /\b(an)\s+(good|great|beautiful|big|brave)\b/gi, suggestion: (match) => `a ${match[2]}`, reason: "辅音音素开头的单词前应使用 a。" },
    { regex: /\binterested\s+on\b/gi, suggestion: "interested in", reason: "固定搭配是 be interested in。" },
    { regex: /\bafraid\s+with\b/gi, suggestion: "afraid of", reason: "固定搭配是 be afraid of。" },
    { regex: /\bexplain\s+(me|him|her|them)\b/gi, suggestion: (match) => `explain to ${match[1]}`, reason: "explain 后接人时要使用 to。" },
    { regex: /\bmake\s+a\s+deep\s+breath\b/gi, suggestion: "take a deep breath", reason: "固定表达是 take a deep breath。" },
    { regex: /\bdiscuss\s+about\b/gi, suggestion: "discuss", reason: "discuss 本身可以直接接讨论内容，不需要 about。" },
    { regex: /\bmore\s+(easier|better|happier|beautiful)\b/gi, suggestion: (match) => match[1], reason: "比较级前不需要再使用 more。" },
    { regex: /\bthere\s+is\s+(many|several|two|three)\b/gi, suggestion: (match) => `there are ${match[1]}`, reason: "后面的名词是复数时，应使用 there are。" },
    { regex: /\b(many|several)\s+classmate\b/gi, suggestion: (match) => `${match[1]} classmates`, reason: "many/several 后面的可数名词要使用复数。" },
    { regex: /\b(one\s+of\s+my)\s+classmates?\b/gi, suggestion: "one of my classmates", reason: "one of 后面要接复数名词。" },
    { regex: /\bbecause\s+of\s+(he|she|they|i)\b/gi, suggestion: (match) => `because ${match[1]}`, reason: "because of 后面不能直接接完整主语加动词的句子。" },
    { regex: /\balthough\b[^.!?]{0,100}\bbut\b/gi, suggestion: "although ...（删去 but）", reason: "although 和 but 不要在同一个句子里重复使用。" },
    { regex: /\b(very\s+very|again\s+again)\b/gi, suggestion: (match) => match[1].split(/\s+/)[0], reason: "避免同一个副词连续重复。" },
    { regex: /\b([A-Za-z]+)\s+\1\b/gi, suggestion: (match) => match[1], reason: "这个词可能被重复输入了。" }
  ];
  rules.forEach(({ regex, suggestion, reason }) => {
    const matches = text.matchAll(regex);
    for (const match of matches) add("语法/用词", match[0], typeof suggestion === "function" ? suggestion(match) : suggestion, reason);
  });
  if (/\bi\b/.test(text)) add("大小写", "i", "I", "英语中的第一人称 I 必须大写。");
  if (/[.!?]\s+[a-z]/.test(text)) add("大小写", "句号后的首字母", "改为大写", "每个英文句子的开头要大写。 ");
  if (/[.!?,][A-Za-z]/.test(text)) add("标点", "标点后没有空格", "标点后加空格", "英文标点后通常需要留一个空格。 ");
  return errors.slice(0, 14);
}

function getExpectedSignals(exercise) {
  const signals = {
    qiuyu: ["name", "meaning", "autumn", "rain", "classmates", "pronounce", "culture", "interested"],
    health: ["warning", "change", "routine", "phone", "sleep", "energy", "health", "improve"],
    david: ["David", "race", "shoulder", "starting line", "run", "finish", "fear", "cheer"],
    gunter: ["Gunter", "bus", "money", "phone", "promise", "called", "paid", "kindness"]
  };
  return signals[exercise.id] || [];
}

function buildReviewAnalysis(exercise, draft = {}) {
  const paragraphOne = (draft.paragraphOne || "").trim();
  const paragraphTwo = (draft.paragraphTwo || "").trim();
  const text = `${paragraphOne} ${paragraphTwo}`.trim();
  const words = wordCount(text);
  const p1Words = wordCount(paragraphOne);
  const p2Words = wordCount(paragraphTwo);
  const sentenceCount = splitSentences(text).length;
  const checksDone = Array.isArray(draft.checks) ? draft.checks.filter(Boolean).length : 0;
  const hasChinese = /[\u4e00-\u9fa5]/.test(text);
  const hasTwoParagraphs = Boolean(paragraphOne && paragraphTwo);
  const signals = countHits(text, getExpectedSignals(exercise));
  const connectors = countHits(text, ["then", "after", "finally", "however", "although", "because", "when", "slowly", "to my surprise", "at first"]);
  const emotions = countHits(text, ["afraid", "worried", "nervous", "embarrassed", "proud", "touched", "relieved", "surprised", "sad", "happy", "felt", "smiled"]);
  const actions = countHits(text, ["ran", "walked", "turned", "looked", "said", "asked", "told", "started", "began", "continued", "crossed", "called", "wrote", "raised", "nodded", "tried"]);
  const pastTense = countHits(text, ["was", "were", "did", "had", "said", "told", "asked", "felt", "went", "came", "began", "started", "tried", "looked", "smiled", "realized", "watched", "moved", "crossed", "called", "paid", "thanked"]);
  const presentSuspects = countHits(` ${text.toLowerCase()} `, [" i am ", " he is ", " she is ", " it is ", " they are ", " we are ", " i feel ", " i think ", " he goes ", " she goes ", " i go ", " they go ", " we go "]);
  const hasSpeech = /["“”]/.test(text) || /\b(said|asked|told)\b/i.test(text);
  const punctuationOk = (!paragraphOne || /[.!?]$/.test(paragraphOne)) && (!paragraphTwo || /[.!?]$/.test(paragraphTwo));
  const languageErrors = [
    ...detectLanguageErrors(paragraphOne, "第一段"),
    ...detectLanguageErrors(paragraphTwo, "第二段")
  ].slice(0, 14);
  const spellingErrors = languageErrors.filter((item) => item.type === "拼写错误");
  const grammarErrors = languageErrors.filter((item) => item.type !== "拼写错误");

  const contentScore = Math.min(7, (hasTwoParagraphs ? 2 : 0) + Math.min(3, signals) + (checksDone >= 5 ? 1 : 0) + (!hasChinese && words >= 80 ? 1 : 0));
  const plotScore = Math.min(6, (connectors >= 2 ? 2 : connectors) + (actions >= 3 ? 2 : Math.min(1, actions)) + (emotions >= 1 ? 1 : 0) + (hasSpeech ? 1 : 0));
  const languageScore = Math.min(6, (sentenceCount >= 6 ? 2 : sentenceCount >= 4 ? 1 : 0) + (connectors >= 3 ? 1 : 0) + (words >= 110 && words <= 180 ? 2 : words >= 80 ? 1 : 0) + (emotions + actions >= 5 ? 1 : 0));
  const baseGrammarScore = (pastTense >= 5 ? 2 : pastTense >= 2 ? 1 : 0) + (presentSuspects === 0 ? 1 : 0) + (punctuationOk && !hasChinese ? 1 : 0);
  const languageErrorPenalty = Math.min(2, Math.ceil(languageErrors.length / 4));
  const grammarScore = Math.max(0, Math.min(4, baseGrammarScore - languageErrorPenalty));
  const formatScore = Math.min(2, (hasTwoParagraphs ? 1 : 0) + (p1Words >= 35 && p2Words >= 35 ? 1 : 0));
  const score = contentScore + plotScore + languageScore + grammarScore + formatScore;

  const strengths = [];
  if (hasTwoParagraphs) strengths.push("两段结构完整，已经具备读后续写的基本答题形态。");
  if (signals >= 4) strengths.push("能抓住本题关键词，内容没有明显跑题。");
  if (connectors >= 2) strengths.push("使用了连接词，情节推进比单句堆叠更自然。");
  if (emotions >= 1) strengths.push("写到了人物感受，故事有了情绪变化。");
  if (hasSpeech) strengths.push("出现了语言描写，人物互动更清楚。");
  if (!strengths.length) strengths.push("已经完成了第一版草稿，下一步重点是把故事内容补完整。");

  const priorities = [];
  if (spellingErrors.length) priorities.push(`发现 ${spellingErrors.length} 处拼写错误，先按“错误原文 → 建议改法”逐条改正。`);
  if (grammarErrors.length) priorities.push(`发现 ${grammarErrors.length} 处语法或用词问题，重点看主谓一致、时态、冠词和固定搭配。`);
  if (words < 100) priorities.push("篇幅偏短，建议补到 120-160 词：第一段多写动作和心理，第二段多写结果和感悟。");
  if (signals < 4) priorities.push(`本题核心信息还不够明显，建议补入：${getExpectedSignals(exercise).slice(0, 5).join(" / ")}。`);
  if (connectors < 2) priorities.push("句子之间衔接偏弱，建议加入 then, finally, however, to my surprise 等过渡词。");
  if (emotions < 1) priorities.push("人物心理还不够突出，建议写出担心、惊讶、感动、自豪等变化。");
  if (!hasSpeech) priorities.push("可以加一句人物语言，例如鼓励、道歉、感谢或解释，让画面更真实。");
  if (presentSuspects > 0 || pastTense < 3) priorities.push("叙事时态需要统一，读后续写通常以一般过去时为主。");
  if (hasChinese) priorities.push("正文里还出现中文，正式作文要改成英文表达。");
  if (!punctuationOk) priorities.push("段落结尾要补全英文句号、问号或感叹号。");
  if (!priorities.length) priorities.push("主要框架已经不错，下一次可以提升句式变化和细节描写。");

  const corrections = [];
  if (presentSuspects > 0) corrections.push({ type: "时态纠正", problem: "现在时和过去时可能混用。", fix: "把 I am / he is / I feel / I think 这类表达改成 I was / he was / I felt / I thought。" });
  if (connectors < 2) corrections.push({ type: "衔接纠正", problem: "动作之间可能跳得太快。", fix: "每段至少加 1 个连接词：At first, Then, Finally, To my surprise。" });
  if (emotions < 1) corrections.push({ type: "心理纠正", problem: "人物变化不够明显。", fix: "补一句：He felt ... but he decided to ...，让人物有转变。" });
  if (!hasSpeech) corrections.push({ type: "语言纠正", problem: "人物互动偏少。", fix: "补一句直接或间接语言，例如 “You can do it,” I said softly。" });
  if (words < 100) corrections.push({ type: "内容纠正", problem: "词数偏少，细节不足。", fix: "第一段补“动作 + 心理 + 过渡”，第二段补“结果 + 反应 + 感悟”。" });
  if (!punctuationOk) corrections.push({ type: "标点纠正", problem: "段落末尾标点不完整。", fix: "每个英文句子末尾补上 . / ? / !。" });
  if (!corrections.length) corrections.push({ type: "提升建议", problem: "基础错误不多。", fix: "下一步把普通句改成动作、心理、语言结合的细节句。" });

  const rubric = [
    { name: "内容契合", score: contentScore, max: 7, comment: signals >= 4 ? "贴合题目较好。" : "需要更明显地写出本题核心信息。" },
    { name: "情节推进", score: plotScore, max: 6, comment: actions >= 3 && connectors >= 2 ? "推进较自然。" : "动作链和过渡还可以更清楚。" },
    { name: "语言表达", score: languageScore, max: 6, comment: sentenceCount >= 6 ? "表达有基本层次。" : "建议增加完整句和细节句。" },
    { name: "语法准确", score: grammarScore, max: 4, comment: languageErrors.length ? `已发现 ${languageErrors.length} 处语言问题，请按下方清单修改。` : pastTense >= 5 ? "过去时意识较好。" : "重点检查一般过去时。" },
    { name: "格式规范", score: formatScore, max: 2, comment: hasTwoParagraphs ? "两段格式已具备。" : "需要补齐两段。" }
  ];

  const nextSteps = [
    `先按“${priorities[0]}”修改一遍。`,
    `第一段围绕：${exercise.plot[1][1]}`,
    `第二段围绕：${exercise.plot[3][1]}`,
    `可参考骨架：${exercise.sentences.slice(0, 2).join(" / ")}`
  ];
  const level = score >= 22 ? "优秀" : score >= 18 ? "良好" : score >= 14 ? "基础达标" : "需要补强";
  return { score, level, words, p1Words, p2Words, strengths, priorities, corrections, rubric, nextSteps, languageErrors, spellingErrors, grammarErrors };
}

function getRecordAnalysis(record) {
  const storedAnalysis = record?.analysis;
  if (storedAnalysis && Array.isArray(storedAnalysis.languageErrors)) return storedAnalysis;
  return buildReviewAnalysis(getExercise(record.exerciseId), record);
}

function renderLanguageErrorPanel(title, errors, emptyMessage) {
  const list = Array.isArray(errors) ? errors : [];
  return `<section class="language-review-panel ${list.length ? "has-errors" : "is-clear"}"><div class="language-review-head"><div><p class="section-kicker">${title}</p><h3>${list.length ? `需要改正 ${list.length} 处` : "这一项暂未发现常见问题"}</h3></div><span class="language-review-count">${list.length ? `${list.length} 处` : "✓"}</span></div>${list.length ? `<div class="language-error-list">${list.map((item, index) => `<article class="language-error-item"><div class="language-error-meta"><span>问题 ${String(index + 1).padStart(2, "0")}</span><b>${escapeHtml(item.location)}</b></div><div class="language-error-change"><code>${escapeHtml(item.original)}</code><span>改为</span><strong>${escapeHtml(item.suggestion)}</strong></div><p>${escapeHtml(item.reason)}</p></article>`).join("")}</div>` : `<p class="language-clear-message">${emptyMessage}</p>`}</section>`;
}

function renderReviewAnalysis(record) {
  const exercise = getExercise(record.exerciseId);
  if (!record.paragraphOne && !record.paragraphTwo) {
    return `<div class="empty-state"><h2>这条旧记录没有保存作文正文</h2><p>从现在开始，点击“保存到复盘”会自动保存原文并生成完整批改报告。</p><button class="button primary" type="button" data-view="write">去写一篇新的</button></div>`;
  }
  const analysis = getRecordAnalysis(record);
  return `<section class="teacher-review"><div class="teacher-review-head"><div><p class="section-kicker">专业批改报告</p><h2>${escapeHtml(record.title)} · ${analysis.level}</h2><p>${analysis.words} 词 · 第一段 ${analysis.p1Words} 词 · 第二段 ${analysis.p2Words} 词</p><p class="score-rule">评分档位：22-25 优秀 · 18-21 良好 · 14-17 基础达标 · 0-13 需要补强</p></div><div class="score-badge"><strong>${analysis.score}</strong><span>/ 25</span></div></div>
    <div class="rubric-grid">${analysis.rubric.map((item) => `<article><div><b>${escapeHtml(item.name)}</b><span>${item.score}/${item.max}</span></div><meter min="0" max="${item.max}" value="${item.score}"></meter><p>${escapeHtml(item.comment)}</p></article>`).join("")}</div>
    <div class="language-review-note">拼写、语法和用词检查会标出常见规则问题，建议先改完下方清单，再读一遍全文确认语意自然。</div>
    <div class="language-review-grid">${renderLanguageErrorPanel("拼写错误", analysis.spellingErrors, "暂未发现内置词表中的常见拼写错误。")}${renderLanguageErrorPanel("语法与用词", analysis.grammarErrors, "暂未发现内置规则中的明显语法或用词问题。")}</div>
    <div class="review-columns"><section><p class="section-kicker">优点</p><ul>${analysis.strengths.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section><section><p class="section-kicker">主要扣分点</p><ul>${analysis.priorities.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section></div>
    <section class="correction-panel"><p class="section-kicker">纠正系统</p><h3>按这个顺序改</h3><div class="correction-list">${analysis.corrections.map((item, index) => `<article><span>0${index + 1}</span><div><b>${escapeHtml(item.type)}</b><p>${escapeHtml(item.problem)}</p><strong>${escapeHtml(item.fix)}</strong></div></article>`).join("")}</div></section>
    <section class="next-guide"><p class="section-kicker">下一次写作方向</p><h3>思妍下一篇重点练什么</h3><ol>${analysis.nextSteps.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol></section>
    <details class="draft-review"><summary>查看本次原文</summary><div><span>第一段</span><p>${escapeHtml(record.paragraphOne)}</p></div><div><span>第二段</span><p>${escapeHtml(record.paragraphTwo)}</p></div></details>
  </section>`;
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastId);
  toastId = setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

function setView(view) {
  if (!document.getElementById(view)) return;
  document.querySelectorAll(".page").forEach((page) => page.classList.toggle("is-active", page.id === view));
  document.querySelectorAll("[data-view]").forEach((button) => {
    const isActiveNavigation = button.dataset.view === view && button.classList.contains("nav-link");
    button.classList.toggle("is-active", isActiveNavigation);
    if (button.classList.contains("nav-link")) {
      if (isActiveNavigation) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    }
  });
  history.replaceState(null, "", `#${view}`);
  renderAll();
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

function getPathProgress(id = store.selectedId) {
  const saved = store.pathProgress[id];
  return Object.fromEntries(pathSteps.map((step) => [step.id, Boolean(saved?.[step.id])]));
}

function renderPathPlayground() {
  const playground = document.getElementById("path-playground");
  if (!playground) return;
  const exercise = getExercise();
  const current = pathSteps.find((step) => step.id === store.pathStep) || pathSteps[0];
  const currentIndex = pathSteps.findIndex((step) => step.id === current.id);
  const progress = getPathProgress(exercise.id);
  const completedCount = pathSteps.filter((step) => progress[step.id]).length;
  const nextStep = pathSteps[currentIndex + 1];
  playground.innerHTML = `
    <div class="path-playground-head">
      <div><p class="section-kicker">小羊陪练 · 点一点就会</p><h2 id="path-playground-title">把这道题走成一条完整故事</h2><p>当前练习：${escapeHtml(exercise.title)}。每次只想一个节点，完成五步后就可以带着清楚的思路去写作。</p></div>
      <div class="path-progress-label"><strong>${completedCount} / ${pathSteps.length}</strong><span>个节点已完成</span></div>
    </div>
    <div class="path-tabs" role="tablist" aria-label="五节点互动构思">
      ${pathSteps.map((step, index) => `<button class="path-tab ${step.color} ${step.id === current.id ? "is-active" : ""} ${progress[step.id] ? "is-complete" : ""}" type="button" role="tab" aria-selected="${step.id === current.id}" data-action="path-step" data-path-step="${step.id}"><span>${String(index + 1).padStart(2, "0")}</span><b>${step.label}</b>${progress[step.id] ? '<em aria-label="已完成">✓</em>' : ""}</button>`).join("")}
    </div>
    <div class="path-card ${current.color}">
      <div class="path-card-number">${String(currentIndex + 1).padStart(2, "0")}</div>
      <div class="path-card-content"><p class="section-kicker">${current.kicker}</p><h3>${current.title}</h3><p>${current.question}</p><div class="path-example"><span>思妍可以先这样想</span><strong>${escapeHtml(current.example(exercise))}</strong></div><div class="path-card-actions"><button class="button primary" type="button" data-action="complete-path-step">${progress[current.id] ? "这一步已完成 ✓" : "我想好了，完成这一步"}</button>${nextStep ? `<button class="text-button" type="button" data-action="next-path-step">下一步：${nextStep.label} →</button>` : `<span class="path-finished">五个节点都走完了，可以开始写作。</span>`}</div></div>
    </div>
    <div class="path-progress-track" aria-label="构思完成进度"><span style="width: ${completedCount * 20}%"></span></div>`;
}

function renderOverview() {
  const exercise = getExercise();
  renderPathPlayground();
  document.getElementById("today-label").textContent = formatDate();
  document.getElementById("today-task-title").textContent = `${learnerName}今天的故事：${exercise.title}`;
  document.getElementById("today-task-copy").textContent = `今天练习 ${exercise.source}：先用五个节点把故事想顺，再写两段英语。`;
  document.getElementById("stat-completed").textContent = store.records.length;
  document.getElementById("stat-words").textContent = totalWords();
  document.getElementById("stat-streak").textContent = getStreak();
  document.getElementById("stat-goal").textContent = `${Math.min(recordsThisWeek().length, 3)} / 3`;
  const progress = getPathProgress(exercise.id);
  document.querySelectorAll(".hero-path-step").forEach((button) => {
    const isActive = button.dataset.pathStep === store.pathStep;
    button.classList.toggle("is-active", isActive);
    button.classList.toggle("is-complete", progress[button.dataset.pathStep]);
    button.setAttribute("aria-pressed", String(isActive));
  });
  const weekday = (new Date().getDay() + 6) % 7;
  document.getElementById("weekly-plan").innerHTML = weekPlan.map((item, index) => `<div class="day-chip ${index === weekday ? "is-today" : ""}"><span>第 ${index + 1} 天</span><b>${escapeHtml(item)}</b></div>`).join("");
}

function renderReadingGuide(exercise, compact = false) {
  const reading = exercise.reading;
  return `<section class="reading-guide ${compact ? "is-compact" : ""}">
    <div class="reading-guide-head"><div><p class="section-kicker">写前先读</p><h2>原文导读</h2></div><span>先弄清故事，再写续写</span></div>
    <p class="reading-summary">${escapeHtml(exercise.summary)}</p>
    <dl class="reading-facts"><div><dt>场景</dt><dd>${escapeHtml(reading.setting)}</dd></div><div><dt>人物</dt><dd>${escapeHtml(reading.people)}</dd></div></dl>
    <div class="reading-before"><span>原文已经发生的事</span><ol>${reading.before.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol></div>
    <div class="reading-last"><span>原文最后停在这里</span><p>${escapeHtml(reading.last)}</p></div>
    <div class="start-meaning"><div><span>第一段段首 · 中文意思</span><p>${escapeHtml(reading.translations[0])}</p></div><div><span>第二段段首 · 中文意思</span><p>${escapeHtml(reading.translations[1])}</p></div></div>
  </section>`;
}

function renderBeginnerCoach(exercise) {
  const support = beginnerSupport[exercise.id] || beginnerSupport.qiuyu;
  const chunks = [
    ["第一段 · 开始", "先接住第一段段首，写一个看得见的动作。", [0, 1]],
    ["第一段 · 变化", "补充细节和人物反应，让第一段自然走向结尾。", [2, 3]],
    ["第二段 · 继续", "顺着第二段段首继续写，不要突然换人或换场景。", [4, 5]],
    ["第二段 · 结果", "写出问题解决和人物最后的感受。", [6, 7]]
  ];
  return `<section class="beginner-coach">
    <div class="beginner-coach-head"><div><p class="section-kicker">新手跟写 · 一句一句学</p><h2>不知道下一句写什么？照着这四步走</h2><p>先看英文，再看中文意思。你可以先仿写，熟悉以后再换成自己的句子。</p></div><span>本题专属</span></div>
    <div class="beginner-coach-grid"><div class="guided-route">${chunks.map(([title, instruction, indexes], chunkIndex) => `<article class="guided-step"><span class="guided-step-number">0${chunkIndex + 1}</span><div><p class="section-kicker">${title}</p><h3>${instruction}</h3><div class="guided-sentences">${indexes.map((sentenceIndex) => `<div class="guided-sentence"><strong>${escapeHtml(exercise.sentences[sentenceIndex])}</strong><span>${escapeHtml(support.sentenceMeanings[sentenceIndex])}</span></div>`).join("")}</div></div></article>`).join("")}</div><aside class="word-bank"><p class="section-kicker">本题小词典</p><h3>先记这 6 个词</h3><dl>${support.words.map(([word, meaning]) => `<div><dt>${escapeHtml(word)}</dt><dd>${escapeHtml(meaning)}</dd></div>`).join("")}</dl><div class="beginner-tip"><span>写作小提醒</span><p>${escapeHtml(exercise.warning)}</p></div></aside></div>
  </section>`;
}

function renderPractice() {
  const selected = getExercise();
  const filtered = store.filter === "all" ? exercises : exercises.filter((item) => item.level === store.filter);
  document.querySelectorAll(".filter-button").forEach((button) => button.classList.toggle("is-active", button.dataset.filter === store.filter));
  document.getElementById("practice-list").innerHTML = filtered.map((item, index) => `
    <button type="button" class="practice-card ${item.id === selected.id ? "is-selected" : ""}" data-action="select-exercise" data-id="${item.id}">
      <div class="practice-card-top"><span class="tag ${item.level === "进阶" ? "advanced" : ""}">${item.level}</span>${completedFor(item.id) ? '<span class="tag done">已练</span>' : `<span>${String(index + 1).padStart(2, "0")}</span>`}</div>
      <h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.source)}</p>
    </button>`).join("");
  document.getElementById("practice-detail").innerHTML = `
    <div class="detail-top"><div><p class="section-kicker">${escapeHtml(selected.source)}</p><h2>${escapeHtml(selected.title)}</h2></div><span class="tag ${selected.level === "进阶" ? "advanced" : ""}">${selected.level}</span></div>
    ${renderReadingGuide(selected)}
    ${renderBeginnerCoach(selected)}
    <div class="detail-grid"><div class="detail-block"><h3>第一段段首</h3><p class="prompt">${escapeHtml(selected.starts[0])}</p></div><div class="detail-block"><h3>第二段段首</h3><p class="prompt">${escapeHtml(selected.starts[1])}</p></div></div>
    <div class="chain-box"><span>情节链</span><p>${escapeHtml(selected.chain)}</p></div>
    <p class="detail-note">易错提醒：${escapeHtml(selected.warning)}</p>
    <div class="action-row"><button class="button primary" type="button" data-action="open-outline">先做五节点构思 <span aria-hidden="true">→</span></button><button class="button secondary" type="button" data-action="open-write">直接写作</button></div>
    <details class="sentence-preview"><summary>查看 8 句基础骨架</summary><ol>${selected.sentences.map((sentence) => `<li>${escapeHtml(sentence)}</li>`).join("")}</ol></details>`;
}

function renderMaterials() {
  const materials = document.getElementById("materials-workspace");
  if (!materials) return;
  const exercise = getExercise();
  const terms = [
    ["场景", exercise.reading.setting],
    ["人物", exercise.reading.people],
    ["原文冲突", exercise.plot[0][1]],
    ["最终方向", exercise.plot[4][1]]
  ];
  const methodSteps = [
    ["看懂原文", exercise.reading.before[0]],
    ["接住第一段", `${exercise.starts[0]} ${exercise.plot[1][1]}`],
    ["接住第二段", `${exercise.plot[2][1]} ${exercise.plot[3][1]}`],
    ["收束成长", exercise.plot[4][1]]
  ];
  const route = [
    ["读懂本题", `${exercise.reading.setting}。${exercise.reading.before[0]}`],
    ["写第一段", `${exercise.starts[0]} ${exercise.plot[1][1]}`],
    ["接第二段", `${exercise.plot[2][1]} ${exercise.reading.last}`],
    ["完成结尾", `${exercise.starts[1]} ${exercise.plot[3][1]} ${exercise.plot[4][1]}`]
  ];
  const sentenceTags = ["开场动作", "关键信息", "细节展开", "人物反应", "继续行动", "变化出现", "结果落地", "主题感悟"];
  const sentenceNotes = ["先从动作开始", "补上题目里的关键线索", "让画面更具体", "写出人物或他人的回应", "推动本题情节继续", "表现人物心情或状态变化", "把问题真正解决", "最后留下人物收获"];
  materials.innerHTML = `
    <section class="materials-intro current-materials-intro">
      <div class="materials-intro-heading"><div><p class="section-kicker">当前题目资料库</p><h2>${escapeHtml(exercise.title)}</h2><p>${escapeHtml(exercise.source)} · ${escapeHtml(exercise.summary)}</p></div><label class="materials-picker">切换题目<select data-action="choose-material-exercise" aria-label="切换资料库题目">${exercises.map((item) => `<option value="${item.id}" ${item.id === exercise.id ? "selected" : ""}>${escapeHtml(item.title)} · ${item.level}</option>`).join("")}</select></label></div>
      <div class="current-starts"><article><span>第一段段首</span><strong>${escapeHtml(exercise.starts[0])}</strong><small>${escapeHtml(exercise.reading.translations[0])}</small></article><article><span>第二段段首</span><strong>${escapeHtml(exercise.starts[1])}</strong><small>${escapeHtml(exercise.reading.translations[1])}</small></article></div>
    </section>
    <section class="materials-grid">
      <article class="material-panel terms-panel"><p class="section-kicker">本题先看懂</p><h2>四个关键信息</h2><dl class="term-list">${terms.map(([term, explanation]) => `<div><dt>${escapeHtml(term)}</dt><dd>${escapeHtml(explanation)}</dd></div>`).join("")}</dl></article>
      <article class="material-panel method-map"><p class="section-kicker">围绕本题倒推</p><h2>四步写作路线</h2><ol class="method-list">${methodSteps.map(([title, description]) => `<li><b>${escapeHtml(title)}</b><span>${escapeHtml(description)}</span></li>`).join("")}</ol></article>
      <article class="material-panel story-panel"><p class="section-kicker">本题情节速记</p><h2>先用中文走完</h2><div class="story-list"><div><b>原文已经发生</b><span>${escapeHtml(exercise.reading.before.join(" "))}</span></div><div><b>原文停在这里</b><span>${escapeHtml(exercise.reading.last)}</span></div><div><b>情节链</b><em>${escapeHtml(exercise.chain)}</em></div></div></article>
    </section>
    <section class="roadmap-section"><div class="section-heading"><div><p class="section-kicker">本题练习路线</p><h2>从读懂到写完</h2></div><p>这四步专门围绕${escapeHtml(exercise.title)}展开。</p></div><div class="roadmap-grid">${route.map(([title, copy], index) => `<article class="roadmap-step"><span>${String(index + 1).padStart(2, "0")}</span><p>第 ${index + 1} 步</p><h3>${escapeHtml(title)}</h3><small>${escapeHtml(copy)}</small></article>`).join("")}</div></section>
    <section class="toolkit-section"><div class="section-heading"><div><p class="section-kicker">本题句子工具箱</p><h2>8 句基础骨架</h2></div><p>每一句都来自当前题目的情节，不再混用别的故事。</p></div><div class="sentence-grid">${exercise.sentences.map((sentence, index) => `<article class="sentence-card"><span>${sentenceTags[index]}</span><strong>${escapeHtml(sentence)}</strong><p>${sentenceNotes[index]} · ${escapeHtml(exercise.title)}</p></article>`).join("")}</div></section>
    <section class="exam-section"><div class="section-heading"><div><p class="section-kicker">题目切换</p><h2>其它题目也在这里</h2></div><p>点选其它题目后，资料库上方的全部内容会跟着更新。</p></div><div class="exam-grid">${exercises.map((item, index) => `<article class="exam-card ${item.id === exercise.id ? "is-current" : ""}"><span>${String(index + 1).padStart(2, "0")}</span><p class="tag ${item.level === "进阶" ? "advanced" : ""}">${item.id === exercise.id ? "当前题目" : item.level}</p><h3>${escapeHtml(item.title)}</h3><small>${escapeHtml(item.source)}</small><p>${escapeHtml(item.chain)}</p><button class="text-button" type="button" data-action="open-material-exercise" data-id="${item.id}">查看拆解 →</button></article>`).join("")}</div></section>
    <section class="materials-footer"><div><p class="section-kicker">本题交卷前</p><h2>检查：${escapeHtml(exercise.title)}</h2><p class="materials-warning">易错提醒：${escapeHtml(exercise.warning)}</p></div><ul>${checks.map((item) => `<li>${item}</li>`).join("")}</ul></section>`;
}

function getOutlineNodes(exercise) {
  const firstChainStep = exercise.chain.split("→")[0].trim();
  return [
    { key: "problem", node: "问题", color: "coral", title: "找到原文最后的卡点", question: "人物现在最担心什么？先用一句中文说清眼前的麻烦。", reference: exercise.plot[0][1], hint: "这一格只写“现在的问题”，不要提前写结局。", placeholder: "例如：人物担心……，所以不敢/不能……。" },
    { key: "actionOne", node: "情绪", color: "amber", title: "写出人物当下的心情", question: "因为这个问题，人物是什么感觉？他为什么会这样想？", reference: `${firstChainStep}，人物需要从这种感受里重新作出决定。`, hint: "可以写紧张、尴尬、害怕、着急、后悔或下定决心。", placeholder: "例如：他/她感到……，但又想……。" },
    { key: "bridge", node: "行动", color: "teal", title: "安排第一段的关键动作", question: "谁先做了什么，才能推动故事继续？", reference: exercise.plot[1][1], hint: `第一段最后要为第二段段首铺路：${exercise.starts[1]}`, placeholder: "例如：他/她先……，然后……，让……发生变化。" },
    { key: "actionTwo", node: "结果", color: "blue", title: "接住第二段并解决问题", question: "第二段开始后，人物还要做什么？问题怎样真正解决？", reference: exercise.plot[3][1], hint: "不要只写“大家很开心”，要写一个具体结果或变化。", placeholder: "例如：接着……，最后……，问题得到解决。" },
    { key: "outcome", node: "成长", color: "ink", title: "留下最后的感悟", question: "事情结束后，人物有什么新的认识或变化？", reference: exercise.plot[4][1], hint: "感悟要从本题故事里长出来，不要突然写无关的道理。", placeholder: "例如：我明白了……，以后我会……。" }
  ];
}

function renderOutlineFlow(exercise) {
  const nodes = getOutlineNodes(exercise);
  return `<section class="outline-flow"><div><p class="section-kicker">先把故事走一遍</p><h2>问题 → 情绪 → 行动 → 结果 → 成长</h2><p>点上面的节点，就能直接跳到对应输入框。</p></div><div class="outline-flow-steps" role="tablist" aria-label="跳转到五节点输入框">${nodes.map((node, index) => `<button class="outline-flow-step ${node.color}" type="button" data-action="jump-outline-node" data-outline-key="${node.key}" data-outline-target="outline-node-${node.key}" aria-label="填写${node.node}"><span>0${index + 1}</span><b>${node.node}</b></button>`).join("")}</div></section>`;
}

function renderOutline() {
  const exercise = getExercise();
  const outline = getOutline(exercise.id);
  const nodes = getOutlineNodes(exercise);
  document.getElementById("outline-workspace").innerHTML = `
    <section class="workspace-head"><div><p class="section-kicker">当前题目 · ${escapeHtml(exercise.source)}</p><h2>${escapeHtml(exercise.title)}</h2><p>${escapeHtml(exercise.chain)}</p></div><button class="text-button" type="button" data-view="practice">查看真题拆解 →</button></section>
    ${renderReadingGuide(exercise, true)}
    ${renderOutlineFlow(exercise)}
    <div class="outline-grid">${nodes.map((node, index) => `<article id="outline-node-${node.key}" class="outline-field outline-node ${node.color}"><div class="outline-node-head"><span class="outline-number">${String(index + 1).padStart(2, "0")}</span><div><p class="outline-node-label">${node.node}</p><h3>${node.title}</h3></div></div><p class="outline-question">${node.question}</p><div class="outline-reference"><span>本题参考思路 · 不是唯一答案</span><p>${escapeHtml(node.reference)}</p></div><div class="outline-hint"><span>写这一格时注意</span><p>${node.hint}</p></div><textarea data-outline-key="${node.key}" placeholder="${node.placeholder}">${escapeHtml(outline[node.key] || "")}</textarea></article>`).join("")}</div>
    <div class="outline-footer"><p>写中文就够了。五个格子连起来，应该能自然接到两个段首。</p><div class="action-row"><button class="button secondary" type="button" data-action="save-outline">保存构思</button><button class="button primary" type="button" data-action="open-write">带着构思去写作 <span aria-hidden="true">→</span></button></div></div>`;
}

function renderWritingReference(exercise) {
  const support = beginnerSupport[exercise.id] || beginnerSupport.qiuyu;
  const outline = getOutline(exercise.id);
  const nodes = getOutlineNodes(exercise);
  return `<section class="writing-reference">
    <div class="writing-reference-head"><div><p class="section-kicker">写作时随手看</p><h3>这道题的故事路线</h3></div><button class="text-button" type="button" data-action="open-outline">修改五节点 →</button></div>
    <p class="writing-reference-summary">${escapeHtml(exercise.summary)}</p>
    <div class="writing-reference-facts"><div><span>场景</span><p>${escapeHtml(exercise.reading.setting)}</p></div><div><span>人物</span><p>${escapeHtml(exercise.reading.people)}</p></div></div>
    <div class="writing-reference-block"><span>原文已经发生</span><ul>${exercise.reading.before.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>
    <div class="writing-reference-block writing-reference-stop"><span>原文停在这里</span><p>${escapeHtml(exercise.reading.last)}</p></div>
    <div class="writing-reference-starts"><div><span>第一段段首 · 中文意思</span><p>${escapeHtml(exercise.reading.translations[0])}</p></div><div><span>第二段段首 · 中文意思</span><p>${escapeHtml(exercise.reading.translations[1])}</p></div></div>
    <div class="writing-reference-block"><span>续写必须写到</span><ul class="writing-plot-list">${exercise.plot.slice(1, 5).map(([label, detail]) => `<li><b>${escapeHtml(label)}</b><p>${escapeHtml(detail)}</p></li>`).join("")}</ul></div>
    <div class="writing-chain"><span>情节链</span><p>${escapeHtml(exercise.chain)}</p></div>
    <div class="writing-outline-sync"><div class="writing-outline-head"><div><p class="section-kicker">构思同步</p><h3>前面写的中文思路</h3></div><span>自动更新</span></div><ol class="writing-outline-list">${nodes.map((node, index) => `<li><span class="writing-outline-number">0${index + 1}</span><div><b>${node.node}</b><p data-outline-preview="${node.key}" class="${outline[node.key] ? "" : "is-empty"}">${escapeHtml(outline[node.key] || "还没有填写，先点击“修改五节点”。")}</p></div></li>`).join("")}</ol></div>
    <p class="writing-reference-warning"><b>易错提醒：</b>${escapeHtml(exercise.warning)}</p>
    <details class="writing-sentence-bank" open><summary>展开本题 8 句基础骨架</summary><ol class="skeleton-sentences">${exercise.sentences.map((sentence, index) => `<li><strong>${escapeHtml(sentence)}</strong><span>${escapeHtml(support.sentenceMeanings[index])}</span></li>`).join("")}</ol></details>
  </section>`;
}

function updateWritingOutlinePreview() {
  const outline = getOutline();
  document.querySelectorAll("[data-outline-preview]").forEach((element) => {
    const value = outline[element.dataset.outlinePreview]?.trim();
    element.textContent = value || "还没有填写，先点击“修改五节点”。";
    element.classList.toggle("is-empty", !value);
  });
}

function renderWriting() {
  const exercise = getExercise();
  const draft = getDraft(exercise.id);
  const count = wordCount(`${draft.paragraphOne} ${draft.paragraphTwo}`);
  const checkedCount = draft.checks.filter(Boolean).length;
  const timerLabel = timerId ? "暂停计时" : timerSeconds === 0 ? "重新计时" : timerSeconds < 20 * 60 ? "继续计时" : "开始计时";
  const timerValue = `${String(Math.floor(timerSeconds / 60)).padStart(2, "0")}:${String(timerSeconds % 60).padStart(2, "0")}`;
  const timerDisplay = document.getElementById("timer-display");
  const timerButton = document.querySelector("[data-action='toggle-timer']");
  if (timerDisplay) timerDisplay.textContent = timerValue;
  if (timerButton) timerButton.textContent = timerLabel;
  document.getElementById("writing-workspace").innerHTML = `
    <div class="writing-layout">
      <aside class="writing-brief"><p class="section-kicker">当前题目</p><h2>先看约束，再动笔</h2><select data-action="choose-writing-exercise" aria-label="选择练习题目">${exercises.map((item) => `<option value="${item.id}" ${item.id === exercise.id ? "selected" : ""}>${escapeHtml(item.title)} · ${item.level}</option>`).join("")}</select>
        <div class="prompt-card"><span>第一段段首</span><p>${escapeHtml(exercise.starts[0])}</p></div><div class="prompt-card second"><span>第二段段首</span><p>${escapeHtml(exercise.starts[1])}</p></div>
        ${renderWritingReference(exercise)}
      </aside>
      <div class="writing-column"><section class="writing-area"><div class="editor-head"><h2>写你的两段</h2><span class="word-meter" id="word-count">${count} 词</span></div><label for="paragraph-one">第一段：接住第一个段首，写动作、变化，并铺垫第二段。</label><textarea id="paragraph-one" data-draft-part="paragraphOne" placeholder="在这里写第一段……">${escapeHtml(draft.paragraphOne)}</textarea><label for="paragraph-two">第二段：接住第二个段首，解决问题，写出结果和感悟。</label><textarea id="paragraph-two" data-draft-part="paragraphTwo" placeholder="在这里写第二段……">${escapeHtml(draft.paragraphTwo)}</textarea><div class="write-actions"><p class="save-note">草稿会自动保存在当前浏览器。</p><div class="action-row"><button class="button danger" type="button" data-action="clear-writing">清空草稿</button><button class="button primary" type="button" data-action="save-review">保存到复盘</button></div></div></section>
        <section class="submission-panel"><div><p class="section-kicker">交给思妍看看</p><h2>提交后，我可以帮你批改</h2><p>点击提交后，这两段正文和批改结果会发送到思妍的批改台。昵称可以不填，请不要写姓名、电话等隐私信息。</p></div><label>昵称（可不填）<input type="text" maxlength="40" data-submission-nickname value="${escapeHtml(draft.nickname)}" placeholder="例如：小雨"></label><div class="submission-actions"><span>仅点击提交后才会上传</span><button class="button secondary" type="button" data-action="submit-writing">提交给思妍</button></div></section>
        <section class="check-panel"><div class="check-panel-head"><div><p class="section-kicker">交卷前检查</p><h2>用一分钟做这 8 项检查</h2></div><span class="check-progress" data-check-progress>${checkedCount} / ${checks.length} 已完成</span></div><p class="check-feedback" data-check-feedback aria-live="polite">${getCheckFeedback(checkedCount)}</p><div class="check-list">${checks.map((item, index) => `<label class="check-item ${draft.checks[index] ? "is-checked" : ""}"><input type="checkbox" data-check-index="${index}" ${draft.checks[index] ? "checked" : ""}/><span>${item}</span><em>已完成</em></label>`).join("")}</div></section>
      </div>
    </div>`;
}

function renderReview() {
  const recent = [...store.records].sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
  const latest = recent[0];
  const latestAnalysis = latest ? getRecordAnalysis(latest) : null;
  const today = new Date();
  const days = Array.from({ length: 7 }, (_, index) => { const date = new Date(today); date.setDate(today.getDate() - (6 - index)); return date; });
  const finishedDates = new Set(store.records.map((item) => dayKey(item.savedAt)));
  document.getElementById("review-workspace").innerHTML = `
    <div class="review-summary"><section class="review-card"><p class="section-kicker">最近七天</p><h2>${getStreak() ? `${learnerName}已经连续练习 ${getStreak()} 天` : `${learnerName}，今天完成第一次练习`}</h2><p class="lede">这一周保存了 ${recordsThisWeek().length} 次练习，累计写下 ${totalWords()} 个英语词。</p><div class="week-strip">${days.map((date) => `<div class="week-day ${finishedDates.has(dayKey(date)) ? "is-complete" : ""}"><span>${["一", "二", "三", "四", "五", "六", "日"][(date.getDay() + 6) % 7]}</span><b>${finishedDates.has(dayKey(date)) ? "✓" : "·"}</b></div>`).join("")}</div></section>
      <section class="history-panel"><p class="section-kicker">下一次改什么</p><h2>${latestAnalysis ? latestAnalysis.level + " · 先改一个重点" : "每次只改一个重点"}</h2><p class="lede">${latestAnalysis ? escapeHtml(latestAnalysis.priorities[0]) : "先保证故事衔接和过去时，再增加动作、语言、心理等细节。"}</p></section></div>
    <section class="history-panel history-panel-spaced"><p class="section-kicker">批改中心</p><h2>${learnerName}的作文诊断</h2>${latest ? renderReviewAnalysis(latest) : `<div class="empty-state"><h2>${learnerName}还没有保存的练习</h2><p>完成一次两段写作后，点击“保存到复盘”，这里会出现评分、扣分点和修改建议。</p><button class="button primary" type="button" data-view="write">开始写作</button></div>`}</section>
    ${recent.length ? `<section class="history-panel history-panel-spaced"><p class="section-kicker">保存记录</p><h2>历史批改</h2><div class="history-list">${recent.map((record) => { const analysis = record.paragraphOne || record.paragraphTwo ? getRecordAnalysis(record) : null; return `<article class="history-item"><div><h3>${escapeHtml(record.title)}</h3><p>${record.words} 词 · 已完成 ${record.checkedCount}/${checks.length} 项检查${analysis ? ` · 评分 ${analysis.score}/25` : " · 旧记录暂无正文"}</p></div><time>${formatDate(record.savedAt)}</time></article>`; }).join("")}</div></section>` : ""}`;
}

function formatSubmissionDate(value) {
  const candidate = value && typeof value === "object" ? value.$date || value.value || value : value;
  return formatDate(candidate);
}

function renderSubmissionResults(items = []) {
  const container = document.getElementById("submissions-results");
  if (!container) return;
  if (!items.length) {
    container.innerHTML = `<div class="empty-state submission-empty"><h2>还没有收到作文</h2><p>学习者点击“提交给思妍”后，作文会出现在这里。</p></div>`;
    return;
  }
  container.innerHTML = `<section class="history-panel submission-results"><div class="submission-results-head"><div><p class="section-kicker">云端提交记录</p><h2>共收到 ${items.length} 份作文</h2><p>最新提交会排在最前面。</p></div><button class="button secondary" type="button" data-action="refresh-submissions">刷新列表</button></div><div class="submission-list">${items.map((item, index) => { const errors = Array.isArray(item.languageErrors) ? item.languageErrors : []; const submissionId = item._id || item.id || ""; return `<article class="submission-card"><div class="submission-card-head"><div><span class="submission-number">${String(index + 1).padStart(2, "0")}</span><h3>${escapeHtml(item.nickname || "匿名小作者")}</h3><p>${escapeHtml(item.title || "未命名练习")} · ${escapeHtml(item.level || "待评估")}</p></div><div class="submission-card-tools"><div class="submission-score"><strong>${Number(item.score) || 0}</strong><span>/ 25</span></div>${submissionId ? `<button class="text-button delete-submission" type="button" data-action="delete-submission" data-submission-id="${escapeHtml(submissionId)}">删除</button>` : ""}</div></div><div class="submission-meta"><span>${formatSubmissionDate(item.submittedAt)}</span><span>${errors.length ? `发现 ${errors.length} 处语言问题` : "未发现常见语言问题"}</span></div><details class="submission-original"><summary>查看两段原文</summary><div><b>第一段</b><p>${escapeHtml(item.paragraphOne || "")}</p></div><div><b>第二段</b><p>${escapeHtml(item.paragraphTwo || "")}</p></div></details></article>`; }).join("")}</div></section>`;
}

function renderSubmissions() {
  const container = document.getElementById("submissions-workspace");
  if (!container) return;
  container.innerHTML = `<section class="owner-gate"><div><p class="section-kicker">思妍的批改台</p><h2>只给你看的提交记录</h2><p>学习者提交的作文会保存在云端，这里需要管理口令才能查看。请不要把口令发到练习群里。</p></div><div class="owner-gate-form"><label for="owner-code">管理口令</label><input id="owner-code" type="password" autocomplete="current-password" data-owner-code value="${escapeHtml(ownerCode)}" placeholder="输入你的管理口令"><button class="button primary" type="button" data-action="load-submissions">查看收到的作文</button><p class="owner-status" data-owner-status aria-live="polite">口令只会留在当前页面，不会显示在公开链接里。</p></div></section><div id="submissions-results"></div>`;
}

async function loadSubmissions(button) {
  const input = document.querySelector("[data-owner-code]");
  const status = document.querySelector("[data-owner-status]");
  const code = input?.value.trim() || "";
  if (!code) { if (status) status.textContent = "先输入管理口令。"; return; }
  button.disabled = true;
  if (status) status.textContent = "正在读取云端提交记录……";
  try {
    const result = await callCloudWritingApi("list", { adminCode: code });
    ownerCode = code;
    renderSubmissionResults(result.items || []);
    if (status) status.textContent = `已读取 ${result.items?.length || 0} 份提交。`;
  } catch (error) {
    if (status) status.textContent = error.message || "读取失败，请检查网络或口令。";
    showToast(error.message || "读取失败，请稍后再试。");
  } finally {
    button.disabled = false;
  }
}

function renderAll() { renderOverview(); renderMaterials(); renderPractice(); renderOutline(); renderWriting(); renderReview(); renderSubmissions(); }

function updateWordMeter() {
  const draft = getDraft();
  const meter = document.getElementById("word-count");
  if (meter) meter.textContent = `${wordCount(`${draft.paragraphOne} ${draft.paragraphTwo}`)} 词`;
}

function getCheckFeedback(checkedCount) {
  if (checkedCount === 0) return "思妍，先从最容易的一项开始吧，完成一格就离漂亮的成稿更近一步。";
  if (checkedCount === 1) return "真棒，思妍已经完成第一项啦，慢慢检查就好。";
  if (checkedCount <= 3) return `思妍做得很好，已经完成 ${checkedCount} 项，小故事正在一点点变完整。`;
  if (checkedCount <= 5) return `越来越好了，${checkedCount} 项已经检查完，读起来会更顺更漂亮。`;
  if (checkedCount <= 7) return `快完成啦！还剩 ${checks.length - checkedCount} 项，再认真看一眼就可以安心交卷。`;
  return "太棒啦，思妍！8 项全部完成，这篇续写已经被你认真打磨过了，可以放心交卷啦。";
}

function updateCheckFeedback() {
  const draft = getDraft();
  const checkedCount = draft.checks.filter(Boolean).length;
  const progress = document.querySelector("[data-check-progress]");
  const feedback = document.querySelector("[data-check-feedback]");
  if (progress) progress.textContent = `${checkedCount} / ${checks.length} 已完成`;
  if (feedback) feedback.textContent = getCheckFeedback(checkedCount);
  document.querySelectorAll(".check-item").forEach((item) => {
    const input = item.querySelector("input[data-check-index]");
    item.classList.toggle("is-checked", Boolean(input?.checked));
  });
}

function syncTimerUI() {
  const display = document.getElementById("timer-display");
  const button = document.querySelector("[data-action='toggle-timer']");
  if (display) display.textContent = `${String(Math.floor(timerSeconds / 60)).padStart(2, "0")}:${String(timerSeconds % 60).padStart(2, "0")}`;
  if (button) button.textContent = timerId ? "暂停计时" : timerSeconds === 0 ? "重新计时" : timerSeconds < 20 * 60 ? "继续计时" : "开始计时";
}

function resetTimer() {
  if (timerId) clearInterval(timerId);
  timerId = null;
  timerSeconds = 20 * 60;
  syncTimerUI();
}

function toggleTimer() {
  if (timerId) { clearInterval(timerId); timerId = null; syncTimerUI(); return; }
  if (timerSeconds === 0) timerSeconds = 20 * 60;
  timerId = setInterval(() => {
    timerSeconds = Math.max(0, timerSeconds - 1);
    if (timerSeconds === 0) { clearInterval(timerId); timerId = null; showToast("20 分钟到，先做一次交卷前检查。 "); }
    syncTimerUI();
  }, 1000);
  syncTimerUI();
}

function saveLocalReviewRecord(exercise, draft, analysis) {
  const words = wordCount(`${draft.paragraphOne} ${draft.paragraphTwo}`);
  const signature = `${exercise.id}|${draft.paragraphOne}|${draft.paragraphTwo}|${draft.checks.join("")}`;
  const record = { exerciseId: exercise.id, title: exercise.title, words, checkedCount: draft.checks.filter(Boolean).length, paragraphOne: draft.paragraphOne, paragraphTwo: draft.paragraphTwo, checks: [...draft.checks], outline: { ...getOutline(exercise.id) }, analysis, savedAt: new Date().toISOString(), signature };
  if (store.records[0]?.signature === signature) {
    store.records[0] = { ...store.records[0], ...record, id: store.records[0].id };
  } else {
    store.records.unshift({ id: `${Date.now()}`, ...record });
  }
  persist();
  return record;
}

function getSubmissionPayload(exercise, draft, analysis) {
  return {
    exerciseId: exercise.id,
    title: exercise.title,
    nickname: draft.nickname || "",
    paragraphOne: draft.paragraphOne,
    paragraphTwo: draft.paragraphTwo,
    score: analysis.score,
    level: analysis.level,
    rubric: analysis.rubric,
    languageErrors: analysis.languageErrors,
    outline: Object.entries(getOutline(exercise.id)).map(([key, value]) => ({ key, value })).filter((item) => String(item.value || "").trim())
  };
}

async function submitCurrentWriting(button) {
  const exercise = getExercise();
  const draft = getDraft();
  if (!draft.paragraphOne.trim() || !draft.paragraphTwo.trim()) { showToast("两段都先写几句，再提交给思妍。"); return; }
  const analysis = buildReviewAnalysis(exercise, draft);
  saveLocalReviewRecord(exercise, draft, analysis);
  button.disabled = true;
  button.dataset.originalLabel = button.textContent;
  button.textContent = "正在提交…";
  try {
    await callCloudWritingApi("submit", { payload: getSubmissionPayload(exercise, draft, analysis) });
    showToast("已经提交给思妍，等着收到你的批改吧。");
  } catch (error) {
    showToast(error.message || "提交失败，但作文已经保存在本机。");
  } finally {
    button.disabled = false;
    button.textContent = button.dataset.originalLabel || "提交给思妍";
  }
}

async function deleteSubmission(button) {
  const id = button.dataset.submissionId;
  if (!id || !ownerCode || !confirm("确定删除这份云端提交吗？删除后无法恢复。")) return;
  button.disabled = true;
  try {
    await callCloudWritingApi("delete", { adminCode: ownerCode, id });
    showToast("这份提交已经删除。");
    const refreshButton = document.querySelector("[data-action='refresh-submissions']");
    if (refreshButton) await loadSubmissions(refreshButton);
  } catch (error) {
    button.disabled = false;
    showToast(error.message || "删除失败，请稍后再试。");
  }
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action], [data-view], [data-filter]");
  if (!target) return;
  if (target.dataset.view) { event.preventDefault(); setView(target.dataset.view); return; }
  if (target.dataset.filter) {
    store.filter = target.dataset.filter;
    if (store.filter !== "all" && getExercise().level !== store.filter) store.selectedId = exercises.find((item) => item.level === store.filter)?.id || store.selectedId;
    persist(); renderAll(); return;
  }
  const action = target.dataset.action;
  if (action === "path-step") {
    if (!pathSteps.some((step) => step.id === target.dataset.pathStep)) return;
    store.pathStep = target.dataset.pathStep;
    persist(); renderOverview();
    document.getElementById("path-playground")?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  if (action === "next-path-step") {
    const currentIndex = pathSteps.findIndex((step) => step.id === store.pathStep);
    if (pathSteps[currentIndex + 1]) {
      store.pathStep = pathSteps[currentIndex + 1].id;
      persist(); renderOverview();
    }
    return;
  }
  if (action === "complete-path-step") {
    const progress = getPathProgress();
    progress[store.pathStep] = true;
    store.pathProgress[store.selectedId] = progress;
    const currentIndex = pathSteps.findIndex((step) => step.id === store.pathStep);
    const nextStep = pathSteps[currentIndex + 1];
    if (nextStep) store.pathStep = nextStep.id;
    persist(); renderOverview();
    showToast(nextStep ? `“${pathSteps[currentIndex].label}”完成啦，下一步看${nextStep.label}。 ` : "五个节点都完成啦，可以带着思路去写作。 ");
    document.getElementById("path-playground")?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  if (action === "jump-outline-node") {
    const field = document.querySelector(`textarea[data-outline-key="${target.dataset.outlineKey}"]`);
    const node = document.getElementById(target.dataset.outlineTarget) || field?.closest(".outline-node");
    if (field && node) {
      const pageTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const headerHeight = document.querySelector(".topbar")?.getBoundingClientRect().height || 0;
      const top = Math.max(0, field.getBoundingClientRect().top + pageTop - headerHeight - 22);
      window.scrollTo({ top, behavior: "smooth" });
      node.classList.add("is-jump-target");
      window.setTimeout(() => {
        node.classList.remove("is-jump-target");
        try { field.focus({ preventScroll: true }); } catch { field.focus(); }
      }, 420);
    }
    return;
  }
  if (action === "select-exercise") { store.selectedId = target.dataset.id; persist(); renderAll(); return; }
  if (action === "start-today") { setView("outline"); return; }
  if (action === "open-outline") { setView("outline"); return; }
  if (action === "open-write") { setView("write"); return; }
  if (action === "open-material-exercise") { store.selectedId = target.dataset.id; store.filter = "all"; persist(); setView("practice"); return; }
  if (action === "save-outline") { persist(); showToast("构思已保存。下一步可以开始写两段英语。 "); return; }
  if (action === "toggle-timer") { toggleTimer(); return; }
  if (action === "submit-writing") { submitCurrentWriting(target); return; }
  if (action === "save-review") {
    const exercise = getExercise(); const draft = getDraft();
    if (!draft.paragraphOne.trim() || !draft.paragraphTwo.trim()) { showToast("两段都先写几句，再保存到复盘。 "); return; }
    const analysis = buildReviewAnalysis(exercise, draft);
    const wasExisting = store.records[0]?.signature === `${exercise.id}|${draft.paragraphOne}|${draft.paragraphTwo}|${draft.checks.join("")}`;
    saveLocalReviewRecord(exercise, draft, analysis);
    renderOverview(); renderPractice(); renderReview();
    showToast(wasExisting ? `当前草稿已在复盘里，评分 ${analysis.score}/25。` : `已生成专业批改报告：${analysis.score}/25。`); return;
  }
  if (action === "load-submissions" || action === "refresh-submissions") { loadSubmissions(target); return; }
  if (action === "delete-submission") { deleteSubmission(target); return; }
  if (action === "clear-writing") {
    if (confirm("确定清空当前题目的两段草稿和检查项吗？")) { store.drafts[store.selectedId] = { paragraphOne: "", paragraphTwo: "", checks: Array(checks.length).fill(false) }; persist(); renderWriting(); showToast("当前草稿已清空。 "); }
    return;
  }
  if (action === "reset-data") {
    if (confirm("确定清除所有本机的构思、草稿和复盘记录吗？")) { store = { ...initialStore, outlines: {}, drafts: {}, records: [] }; persist(); resetTimer(); renderAll(); showToast("本机练习记录已清除。 "); }
  }
});

document.addEventListener("input", (event) => {
  if (event.target.dataset.outlineKey) { getOutline()[event.target.dataset.outlineKey] = event.target.value; persist(); updateWritingOutlinePreview(); }
  if (event.target.dataset.draftPart) { getDraft()[event.target.dataset.draftPart] = event.target.value; persist(); updateWordMeter(); }
  if (event.target.dataset.submissionNickname !== undefined) { getDraft().nickname = event.target.value.slice(0, 40); persist(); }
});

document.addEventListener("change", (event) => {
  if (event.target.dataset.checkIndex) {
    const index = Number(event.target.dataset.checkIndex);
    getDraft().checks[index] = event.target.checked;
    persist();
    updateCheckFeedback();
    if (event.target.checked) showToast(checkEncouragements[index]);
  }
  if (event.target.dataset.action === "choose-writing-exercise") { store.selectedId = event.target.value; persist(); renderAll(); }
  if (event.target.dataset.action === "choose-material-exercise") { store.selectedId = event.target.value; store.pathStep = "problem"; persist(); renderAll(); showToast(`资料库已切换到“${getExercise().title}”。 `); }
});

window.addEventListener("hashchange", () => { const view = location.hash.slice(1); if (view) setView(view); });
const hashView = location.hash.slice(1);
renderAll();
if (hashView && document.getElementById(hashView)) setView(hashView);
