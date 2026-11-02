// 这个行业的分类体系：类别、标签词表、公司（主体）名录，以及防止张冠李戴的身份词典。
// 模型按这里的词表打标签，主题页（topics.json）按标签归类，筛选栏按类别分组。
// 换行业时：类别的 key 会出现在网址里（/all?category=…），上线后就不要再改；标签和名录可以随时增减。

/**
 * 网页上的类别（筛选栏、卡片角标、RSS 分类订阅）。key 是网址和接口里的身份，上线后不要改。
 * section 是日报里的分节标题（几个类别可以共用一节，按这里的顺序排）；guide 告诉结构抽取模型这一类收什么、
 * 和相邻类别的边界在哪（总的归类原则写在 prompts/structure.md 里）。
 * commentary 标出评论类（教程、观点）：日报写过的事又有评论类的后续报道，只占一行快讯（报道它的信源够多时除外）。
 * 没归上类的资料在日报里放进第一个 key 为 industry 的类别所在的节（没有就放最后一节）。
 * tagColor 是飞书推送卡片里跟在标题后面的这一类小标签的颜色（飞书 text_tag 的颜色名）。
 * feedLabel 是分类 RSS 标题里的名字（不写就用 label）。公开接口、RSS 和 MCP 里要把一类并进另一类发布，写在站点设置里（site/site.ts 的 PUBLIC_CATEGORIES）。
 */
export const CATEGORIES = [
  { key: "ai-models", tagColor: "indigo", label: "模型更新", feedLabel: "生图模型更新", section: "生图模型更新", guide: "直接改变生图或图像编辑提示词写法、控制能力、可用性与成本的模型发布和更新；模型名称本身不是分类依据，既有模型的提示词案例归实战。" },
  { key: "ai-products", tagColor: "turquoise", label: "创作工具", feedLabel: "生图创作工具", section: "创作工具与工作流", guide: "帮助编写、管理、测试生图提示词或控制图像生成的工具和功能发布。已有工具的用法、可复用工作流和参数教程归提示词实战。" },
  { key: "industry", tagColor: "orange", label: "规则动态", feedLabel: "生图规则与授权", section: "创作规则与授权", guide: "直接影响生图实践的授权、平台规则、内容政策与服务变化；无关的融资、人事、算力和泛 AI 行业新闻不收。" },
  { key: "paper", tagColor: "violet", label: "生图研究", feedLabel: "生图研究", section: "生图研究", guide: "以实验为核心、能解释提示词遵循、构图、文字渲染、图像编辑与可控生成的研究；使用已有模型的普通效果对比归评测解析。" },
  { key: "tip", tagColor: "green", label: "提示词实战", section: "提示词与创作实践", guide: "可借鉴的生图提示词、参数、参考图用法、角色一致性方法、工作流和创作教程；按实际适用模型与用途打标签，不把教程写成模型发布。", commentary: true },
  { key: "opinion", tagColor: "purple", label: "评测解析", section: "效果对比与经验", guide: "围绕生图任务的模型比较、失败复盘、提示词效果解释与创作经验判断；以步骤和可复用提示词为核心的内容归实战。", commentary: true },
] as const satisfies ReadonlyArray<{ key: string; tagColor: string; label: string; feedLabel?: string; section: string; guide: string; commentary?: true }>;

/**
 * 这个行业最受关注的一类发布（AI 行业是新模型）：日报报头的“N 个新模型”、改分类后修订已出的报告都按它数。
 * category 是类别，tag 是标签，两者都对上才算；unit 接在数字后面。
 * 没有这样一类的行业设成 null，报头就不显示这个数。
 */
export const RELEASE: { category: string; tag: string; unit: string } | null = { category: "ai-models", tag: "模型发布", unit: "个生图模型更新" };

/** 周报月报的总述可以直接写、不必在报道里找到出处的行业通用词（小写）。站名会自动算进去。 */
export const PLAIN_TERMS: readonly string[] = ["ai", "api", "gpu", "prompt", "seed", "cfg", "lora", "controlnet", "comfyui", "dpi", "svg"];

/**
 * 内容理解一步给每篇资料判的“内容类型”（写在 prompts/content-understanding.md 里，改了类型要同步改那份提示词）。
 * 评分提示词（prompts/selection-score.md）按类型给五个维度不同的权重。
 */
export const ITEM_TYPES = ["model_release", "product_launch", "tool_or_prompt", "research_paper", "industry_event", "opinion_analysis", "tutorial_explainer"] as const;

// ── 标签词表 ────────────────────────────────────────────────────────────────────────────

/** 每篇资料的第一个标签必须是这些“分类标签”之一。 */
export const CATEGORY_TAGS = [
  "产品更新", "模型发布", "论文/研究", "开源/仓库", "教程/实践", "现象/趋势", "经验/观点", "评测/基准", "安全/对齐", "行业动态", "政策/监管",
  "提示词/模板", "其他",
] as const;

/** 可选的主题标签。 */
export const TOPIC_TAGS = [
  "Midjourney", "GPT Image", "Gemini 图像", "Imagen", "FLUX", "Stable Diffusion", "Seedream", "Qwen-Image", "通义万相", "其他模型", "跨模型",
  "人像写真", "商品摄影", "海报排版", "插画动漫", "空间场景", "角色一致性", "图像编辑", "风格探索",
  "参考图", "负面提示词", "参数调优", "局部重绘", "工作流", "LoRA", "ControlNet", "图像生成", "多模态", "开源生态",
] as const;

/** 可选的实体标签（公司、机构、平台）。 */
export const ENTITY_TAGS = ["OpenAI", "Google", "Midjourney", "Black Forest Labs", "Stability AI", "阿里通义", "字节跳动", "Adobe", "Ideogram", "Recraft", "xAI", "Hugging Face", "ComfyUI"] as const;

/** 模型常写的近义词，统一成词表里的写法。 */
export const TAG_SYNONYMS: Readonly<Record<string, string>> = {
  "教程/玩法": "教程/实践", "技巧/最佳实践": "教程/实践", 教程: "教程/实践", 指南: "教程/实践", 技巧: "教程/实践",
  提示词: "提示词/模板", prompt: "提示词/模板", prompts: "提示词/模板", 模板: "提示词/模板",
  评测: "评测/基准", 对比: "评测/基准", 观点: "经验/观点", "大佬观点": "经验/观点",
  "open-source": "开源/仓库", 开源: "开源/仓库", 仓库: "开源/仓库", repo: "开源/仓库",
  论文: "论文/研究", 研究: "论文/研究", paper: "论文/研究", papers: "论文/研究",
  产品: "产品更新", 更新: "产品更新", 发布: "模型发布", 模型: "模型发布",
  政策: "政策/监管", 监管: "政策/监管", 授权: "政策/监管", 版权: "政策/监管", 安全: "安全/对齐",
  "合作/生态": "行业动态", "融资/收购": "行业动态", "公司动态": "行业动态", 合作: "行业动态", 趋势: "现象/趋势",
  MJ: "Midjourney", midjourney: "Midjourney", flux: "FLUX", SDXL: "Stable Diffusion", SD: "Stable Diffusion",
  "GPT-Image": "GPT Image", "Nano Banana": "Gemini 图像", 即梦: "Seedream", "Qwen Image": "Qwen-Image", Wan: "通义万相",
  人像: "人像写真", 电商: "商品摄影", 海报: "海报排版", 插画: "插画动漫", 室内: "空间场景", 修图: "图像编辑",
  "negative prompt": "负面提示词", seed: "参数调优", CFG: "参数调优", lora: "LoRA", controlnet: "ControlNet",
};

// ── 公司与主体 ──────────────────────────────────────────────────────────────────────────

/**
 * 公司主题：id → 显示名、卡片上显示的标签（null 表示只用 entity:<id> 归类）、别名。
 * aliases 给结构抽取模型看；orgNames 是这家公司发消息时开头用的组织名（公司、实验室、团队），
 * 在它自己的主题页上读者知道说的是谁，可以省去；otherNames 是公司的其他称呼（官方账号名、子品牌）。
 * 所有这些名字都用来认出说的是哪家公司，比如把事实的主体对到发布方。
 */
export const ENTITIES: Record<string, { name: string; displayTag: string | null; aliases: string[]; orgNames?: string[]; otherNames?: string[] }> = {
  midjourney: { name: "Midjourney", displayTag: "Midjourney", aliases: ["Midjourney", "Niji Journey"], orgNames: ["Midjourney"], otherNames: ["niji"] },
  "black-forest-labs": { name: "Black Forest Labs", displayTag: "Black Forest Labs", aliases: ["Black Forest Labs", "BFL", "FLUX"], orgNames: ["Black Forest Labs"], otherNames: ["FLUX"] },
  "stability-ai": { name: "Stability AI", displayTag: "Stability AI", aliases: ["Stability AI", "Stable Diffusion", "SDXL"], orgNames: ["Stability AI"], otherNames: ["Stable Diffusion"] },
  bytedance: { name: "字节跳动", displayTag: "字节跳动", aliases: ["字节跳动", "ByteDance", "Seedream", "即梦", "Jimeng", "豆包", "Doubao"], orgNames: ["字节跳动", "ByteDance"], otherNames: ["Seedream", "即梦", "豆包"] },
  adobe: { name: "Adobe", displayTag: "Adobe", aliases: ["Adobe", "Firefly"], orgNames: ["Adobe"], otherNames: ["Firefly"] },
  ideogram: { name: "Ideogram", displayTag: "Ideogram", aliases: ["Ideogram"], orgNames: ["Ideogram"] },
  recraft: { name: "Recraft", displayTag: "Recraft", aliases: ["Recraft"], orgNames: ["Recraft"] },
  fal: { name: "fal", displayTag: null, aliases: ["fal.ai", "fal"], orgNames: ["fal"] },
  comfy: { name: "ComfyUI", displayTag: "ComfyUI", aliases: ["ComfyUI", "Comfy"], orgNames: ["Comfy", "Comfy Org"], otherNames: ["ComfyUI"] },
  "world-labs": { name: "World Labs", displayTag: null, aliases: ["World Labs"] },
  "thinking-machines": { name: "Thinking Machines Lab", displayTag: null, aliases: ["Thinking Machines"] },
  amd: { name: "AMD", displayTag: null, aliases: ["AMD", "Advanced Micro Devices"] },
  openai: { name: "OpenAI", displayTag: "OpenAI", aliases: ["OpenAI", "ChatGPT", "GPT Image", "DALL-E", "Sora", "Codex", "GPT"], orgNames: ["OpenAI"], otherNames: ["OpenAI Developers"] },
  anthropic: { name: "Anthropic", displayTag: "Anthropic", aliases: ["Anthropic", "Claude"], orgNames: ["Anthropic"], otherNames: ["Claude Code"] },
  google: { name: "Google", displayTag: "Google", aliases: ["Google", "DeepMind", "Gemini", "Imagen", "Nano Banana", "谷歌"], orgNames: ["Google DeepMind", "Google Research", "Google", "DeepMind", "谷歌"], otherNames: ["Google AI", "Google Labs", "Google Cloud"] },
  deepseek: { name: "DeepSeek", displayTag: "DeepSeek", aliases: ["DeepSeek", "深度求索"], orgNames: ["DeepSeek", "深度求索"] },
  qwen: { name: "阿里通义", displayTag: "阿里通义", aliases: ["Qwen", "Qwen-Image", "通义", "通义万相", "Wan", "阿里"], orgNames: ["通义千问", "通义实验室", "阿里巴巴", "阿里云", "阿里", "Qwen Team", "Qwen", "Alibaba"], otherNames: ["千问", "千问APP", "Alibaba Cloud"] },
  kimi: { name: "月之暗面 / Kimi", displayTag: null, aliases: ["Kimi", "月之暗面", "Moonshot", "Kimi / 月之暗面"], orgNames: ["Moonshot AI", "月之暗面", "Kimi"] },
  minimax: { name: "MiniMax", displayTag: null, aliases: ["MiniMax", "海螺"], orgNames: ["MiniMax", "稀宇科技"] },
  zhipu: { name: "智谱 GLM", displayTag: null, aliases: ["智谱", "GLM", "Z.ai"], orgNames: ["智谱AI", "智谱", "Zhipu AI", "Z.ai"], otherNames: ["Zhipu"] },
  xai: { name: "xAI", displayTag: "xAI", aliases: ["xAI", "Grok"], orgNames: ["SpaceX Super Intelligence", "SpaceXAI", "SpaceXSI", "xAI"], otherNames: ["Grok Bot"] },
  meta: { name: "Meta", displayTag: "Meta", aliases: ["Meta", "Llama"], orgNames: ["Meta Superintelligence Labs", "Meta AI", "Meta"], otherNames: ["AI at Meta", "Muse"] },
  microsoft: { name: "Microsoft", displayTag: "Microsoft", aliases: ["Microsoft", "微软", "Copilot"], orgNames: ["Microsoft Research", "Microsoft AI", "Microsoft", "微软"] },
  nvidia: { name: "NVIDIA", displayTag: null, aliases: ["NVIDIA", "英伟达"], orgNames: ["NVIDIA", "英伟达"] },
  "hugging-face": { name: "Hugging Face", displayTag: "Hugging Face", aliases: ["Hugging Face"], orgNames: ["Hugging Face", "HuggingFace"] },
  cursor: { name: "Cursor", displayTag: null, aliases: ["Cursor", "Anysphere"], orgNames: ["Cursor"] },
  openrouter: { name: "OpenRouter", displayTag: null, aliases: ["OpenRouter"], orgNames: ["OpenRouter"] },
};

/**
 * 身份词典：摘要和标题里出现的公司，必须在原文里也出现过，否则退回原标题、丢掉摘要（防止模型张冠李戴）。
 * 行业没有这个问题时可以留空数组。
 */
export const IDENTITY_LEXICON: ReadonlyArray<{ id: string; name: string; patterns: RegExp[] }> = [
  { id: "openai", name: "OpenAI", patterns: [/openai|chatgpt|\bgpt[ -]?image\b|\bdall[ -]?e\b|\bgpt-?[o\d]|\bsora\b|\bcodex\b/i] },
  { id: "anthropic", name: "Anthropic", patterns: [/anthropic|\bclaude\b/i, /\b(?:opus|sonnet|haiku)\s*\d+(?:[.\-]\d+)*\b/i, /\bfable\s*\d+(?:[.\-]\d+)*\b|\bmythos\b/i] },
  { id: "google", name: "Google / Gemini", patterns: [/google|deepmind|\bgemini\b|\bimagen\b|\bnano banana\b|notebooklm|\bveo\s?\d|\bAlphaFold\b|\bAMIE\b/i] },
  { id: "deepseek", name: "DeepSeek", patterns: [/deepseek|深度求索/i] },
  { id: "xai", name: "xAI / Grok", patterns: [/\bxai\b|\bgrok\b/i] },
  { id: "meta", name: "Meta / Llama", patterns: [/\bMeta\b/, /\bmeta\s?ai\b|\bllama\b/i] },
  { id: "microsoft", name: "Microsoft / Copilot", patterns: [/microsoft|copilot|微软/i] },
  { id: "nvidia", name: "NVIDIA", patterns: [/nvidia|英伟达|\bnemotron\b|\bnemo\b|\bblackwell\b|\brubin(?:\s+ultra)?\b|\bcuda\b/i] },
  { id: "qwen", name: "千问 Qwen", patterns: [/\bqwen|通义|千问/i] },
  { id: "hugging-face", name: "Hugging Face", patterns: [/hugging\s?face/i] },
  { id: "cursor", name: "Cursor", patterns: [/\bCursor\b/] },
  { id: "kimi", name: "月之暗面 / Kimi", patterns: [/\bkimi\b|月之暗面|\bmoonshot\s?ai\b/i] },
  { id: "openrouter", name: "OpenRouter", patterns: [/openrouter/i] },
  { id: "minimax", name: "MiniMax", patterns: [/minimax/i] },
  { id: "zhipu", name: "智谱 GLM", patterns: [/智谱|\bglm-?[4-9]/i] },
  { id: "hunyuan", name: "腾讯混元", patterns: [/混元|hunyuan/i] },
  { id: "bytedance", name: "字节跳动", patterns: [/豆包|doubao|字节跳动|bytedance|seedream|即梦|jimeng/i] },
  { id: "mistral", name: "Mistral", patterns: [/mistral/i] },
  { id: "perplexity", name: "Perplexity", patterns: [/\bPerplexity\b/] },
  { id: "runway", name: "Runway", patterns: [/\brunway\b/i] },
  { id: "suno", name: "Suno", patterns: [/\bsuno\b/i] },
  { id: "black-forest-labs", name: "Black Forest Labs", patterns: [/black forest labs|\bbfl\b|\bflux\b/i] },
  { id: "adobe", name: "Adobe", patterns: [/adobe|\bfirefly\b/i] },
  { id: "ideogram", name: "Ideogram", patterns: [/\bideogram\b/i] },
  { id: "recraft", name: "Recraft", patterns: [/\brecraft\b/i] },
  { id: "midjourney", name: "Midjourney", patterns: [/midjourney|\bniji\b/i] },
  { id: "stability-ai", name: "Stability AI", patterns: [/stability\s?ai|stable diffusion|\bsdxl\b/i] },
  { id: "elevenlabs", name: "ElevenLabs", patterns: [/eleven\s?labs/i] },
  { id: "vllm", name: "vLLM", patterns: [/\bvllm\b/i] },
  { id: "ollama", name: "Ollama", patterns: [/\bollama\b/i] },
  { id: "windsurf", name: "Windsurf", patterns: [/windsurf/i] },
  { id: "devin", name: "Devin", patterns: [/\bdevin\b/i] },
  { id: "manus", name: "Manus", patterns: [/\bmanus\b/i] },
  { id: "apple", name: "Apple AI", patterns: [/\bapple\s?(intelligence|silicon|ai)\b|苹果(智能|\s?AI)/i] },
  { id: "amazon", name: "Amazon / AWS", patterns: [/amazon|\baws\b|亚马逊/i] },
  { id: "baidu", name: "百度文心", patterns: [/百度|baidu|文心|\bernie\s?bot\b/i] },
];

/** 这些域名上的文章，发布方就是对应的公司（托管平台如 GitHub、arXiv 不算）。 */
export const PUBLISHER_DOMAINS: ReadonlyArray<{ entityId: string; domains: readonly string[] }> = [
  { entityId: "midjourney", domains: ["midjourney.com"] },
  { entityId: "black-forest-labs", domains: ["bfl.ai", "blackforestlabs.ai"] },
  { entityId: "stability-ai", domains: ["stability.ai"] },
  { entityId: "bytedance", domains: ["seed.bytedance.com", "jimeng.jianying.com"] },
  { entityId: "adobe", domains: ["adobe.com"] },
  { entityId: "ideogram", domains: ["ideogram.ai"] },
  { entityId: "recraft", domains: ["recraft.ai"] },
  { entityId: "comfy", domains: ["comfy.org"] },
  { entityId: "openai", domains: ["openai.com"] },
  { entityId: "anthropic", domains: ["anthropic.com", "claude.com"] },
  { entityId: "google", domains: ["deepmind.google", "ai.google", "blog.google"] },
  { entityId: "deepseek", domains: ["deepseek.com"] },
  { entityId: "xai", domains: ["x.ai"] },
  { entityId: "meta", domains: ["ai.meta.com"] },
  { entityId: "microsoft", domains: ["microsoft.com"] },
  { entityId: "nvidia", domains: ["nvidia.com"] },
  { entityId: "qwen", domains: ["qwen.ai"] },
  { entityId: "cursor", domains: ["cursor.com"] },
  { entityId: "openrouter", domains: ["openrouter.ai"] },
];

/** 原文里的这些写法也算提到了对应公司。 */
export const IDENTITY_CONTEXT_ALIASES: ReadonlyArray<{ entityId: string; pattern: RegExp }> = [
  { entityId: "meta", pattern: /@AIatMeta\b/i },
  { entityId: "zhipu", pattern: /\bZhipu(?:\s+AI\b|['’]s\b)/i },
];
