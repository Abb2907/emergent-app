import { Repo, Resource, LearningPath, Badge } from './types';

export const REPOS: Repo[] = [
  {
    id: "microsoft/generative-ai-for-beginners",
    url: "https://github.com/microsoft/generative-ai-for-beginners",
    name: "Generative AI for Beginners",
    category: "Foundations",
    level: "Beginner",
    description: "12-Lesson course teaching everything you need to know to start building Generative AI applications.",
    stars: "60k+",
    starter: true
  },
  {
    id: "vchandu111/15-ai-projects",
    url: "https://github.com/vchandu111/15-ai-projects",
    name: "15 AI Projects",
    category: "Projects",
    level: "Beginner",
    description: "A collection of 15 hands-on AI projects to build your portfolio.",
    stars: "2k+"
  },
  {
    id: "microsoft/ai-agents-for-beginners",
    url: "https://github.com/microsoft/ai-agents-for-beginners",
    name: "AI Agents for Beginners",
    category: "Agentic AI",
    level: "Intermediate",
    description: "Learn how to build AI Agents with this comprehensive guide from Microsoft.",
    stars: "5k+"
  },
  {
    id: "langgenius/dify",
    url: "https://github.com/langgenius/dify",
    name: "Dify",
    category: "Frameworks",
    level: "Intermediate",
    description: "An open-source LLM app development platform. Orchestrate LLM apps to production.",
    stars: "45k+"
  },
  {
    id: "Shubhamsaboo/awesome-llm-apps",
    url: "https://github.com/Shubhamsaboo/awesome-llm-apps",
    name: "Awesome LLM Apps",
    category: "LLM",
    level: "Beginner",
    description: "A curated collection of awesome LLM applications and resources.",
    stars: "8k+"
  },
  {
    id: "NirDiamant/GenAI_Agents",
    url: "https://github.com/NirDiamant/GenAI_Agents",
    name: "GenAI Agents",
    category: "Agentic AI",
    level: "Advanced",
    description: "Tutorials and implementations for Generative AI Agents.",
    stars: "3k+"
  },
  {
    id: "dair-ai/Prompt-Engineering-Guide",
    url: "https://github.com/dair-ai/Prompt-Engineering-Guide",
    name: "Prompt Engineering Guide",
    category: "Prompt Engineering",
    level: "Beginner",
    description: "Guides, papers, lecture, notebooks and resources for prompt engineering.",
    stars: "48k+"
  },
  {
    id: "kamranahmedse/developer-roadmap",
    url: "https://github.com/kamranahmedse/developer-roadmap",
    name: "Developer Roadmap",
    category: "Career",
    level: "Beginner",
    description: "Interactive roadmaps, guides and other educational content to help developers grow.",
    stars: "275k+"
  },
  {
    id: "openai/spinningup",
    url: "https://github.com/openai/spinningup",
    name: "Spinning Up in Deep RL",
    category: "Reinforcement Learning",
    level: "Advanced",
    description: "An educational resource for learning about deep reinforcement learning.",
    stars: "10k+"
  },
  {
    id: "OpenBMB/ChatDev",
    url: "https://github.com/OpenBMB/ChatDev",
    name: "ChatDev",
    category: "Agentic AI",
    level: "Advanced",
    description: "Create customized software using natural language ideas through multi-agent collaboration.",
    stars: "25k+"
  },
  {
    id: "microsoft/ML-For-Beginners",
    url: "https://github.com/microsoft/ML-For-Beginners",
    name: "ML For Beginners",
    category: "Foundations",
    level: "Beginner",
    description: "12 weeks, 26 lessons, 52 quizzes, classic Machine Learning for all.",
    stars: "65k+"
  },
  {
    id: "mlabonne/llm-course",
    url: "https://github.com/mlabonne/llm-course",
    name: "LLM Course",
    category: "LLM",
    level: "Advanced",
    description: "Course to get into Large Language Models (LLMs) with roadmaps and Colab notebooks.",
    stars: "38k+"
  },
  {
    id: "donnemartin/system-design-primer",
    url: "https://github.com/donnemartin/system-design-primer",
    name: "System Design Primer",
    category: "Systems",
    level: "Intermediate",
    description: "Learn how to design large-scale systems. Prep for the system design interview.",
    stars: "250k+"
  },
  {
    id: "OpenBMB/MiniCPM-o",
    url: "https://github.com/OpenBMB/MiniCPM-o",
    name: "MiniCPM-o",
    category: "Multi-modal",
    level: "Advanced",
    description: "End-to-side GPT-4o level multimodal LLM on your phone.",
    stars: "12k+"
  },
  {
    id: "jlowin/fastmcp",
    url: "https://github.com/jlowin/fastmcp",
    name: "FastMCP",
    category: "Tools",
    level: "Intermediate",
    description: "The fast, Pythonic way to build MCP servers and clients.",
    stars: "1k+"
  },
  {
    id: "firecrawl/open-agent-builder",
    url: "https://github.com/firecrawl/open-agent-builder",
    name: "Open Agent Builder",
    category: "Tools",
    level: "Intermediate",
    description: "Visual workflow builder for AI agents powered by Firecrawl.",
    stars: "2k+"
  },
  {
    id: "graviraja/MLOps-Basics",
    url: "https://github.com/graviraja/MLOps-Basics",
    name: "MLOps Basics",
    category: "MLOps",
    level: "Intermediate",
    description: "A set of practical guides to get started with MLOps.",
    stars: "5k+"
  },
  {
    id: "chiphuyen/dmls-book",
    url: "https://github.com/chiphuyen/dmls-book",
    name: "Designing ML Systems",
    category: "MLOps",
    level: "Advanced",
    description: "Companion repo for the book 'Designing Machine Learning Systems'.",
    stars: "4k+"
  },
  {
    id: "punkpeye/awesome-mcp-servers",
    url: "https://github.com/punkpeye/awesome-mcp-servers",
    name: "Awesome MCP Servers",
    category: "Tools",
    level: "Intermediate",
    description: "A curated list of Model Context Protocol (MCP) servers.",
    stars: "1.5k+"
  },
  {
    id: "CoplayDev/unity-mcp",
    url: "https://github.com/CoplayDev/unity-mcp",
    name: "Unity MCP",
    category: "Game Dev",
    level: "Advanced",
    description: "Interface with game engine APIs for AI-assisted game development.",
    stars: "500+"
  }
];

// Merging the provided resources JSON into a typed array
export const RESOURCES: Resource[] = [
  {
    "title": "AI Engineering Newsletter",
    "url": "https://aiengineering.beehiiv.com/",
    "type": "Newsletter",
    "category": "Industry / Trends",
    "desc": "AI engineering updates, tooling, and agent ecosystem news.",
    "level": "Beginner"
  },
  {
    "title": "Learn LLMs in 2026",
    "url": "https://youtu.be/U07MHi4Suj8",
    "type": "YouTube",
    "category": "LLM Foundations",
    "desc": "Structured roadmap for mastering LLM systems.",
    "level": "Beginner"
  },
  {
    "title": "Stanford CS229 Machine Learning",
    "url": "https://www.youtube.com/watch?v=9vM4p9NN0Ts",
    "type": "University Lecture",
    "category": "Machine Learning",
    "desc": "Core ML algorithms and theory.",
    "level": "Beginner"
  },
  {
    "title": "Building Agents from Scratch",
    "url": "https://www.philschmid.de/building-agents",
    "type": "Guide",
    "category": "Agentic AI",
    "desc": "End-to-end guide for building AI agents.",
    "level": "Beginner"
  },
  {
    "title": "ReAct Paper",
    "url": "https://arxiv.org/abs/2210.03629",
    "type": "Research Paper",
    "category": "Agentic AI",
    "desc": "Combining reasoning and acting in LLM agents.",
    "level": "Beginner"
  },
  {
    "title": "Generative Agents",
    "url": "https://arxiv.org/abs/2304.03442",
    "type": "Research Paper",
    "category": "Agentic AI",
    "desc": "Simulated human-like agents with memory and planning.",
    "level": "Beginner"
  },
  {
    "title": "Attention Is All You Need",
    "url": "https://arxiv.org/abs/1706.03762",
    "type": "Research Paper",
    "category": "Deep Learning",
    "desc": "The foundational paper for Transformer architecture.",
    "level": "Intermediate"
  },
  {
    "title": "Karpathy Zero to Hero",
    "url": "https://karpathy.ai/zero-to-hero.html",
    "type": "Course",
    "category": "Deep Learning",
    "desc": "Build GPT models from scratch with Andrej Karpathy.",
    "level": "Intermediate"
  },
  {
    "title": "Deep Learning (Goodfellow et al.)",
    "url": "https://www.deeplearningbook.org/",
    "type": "Book",
    "category": "Deep Learning",
    "desc": "The canonical deep learning textbook.",
    "level": "Beginner"
  },
  {
    "title": "Probabilistic ML Foundations",
    "url": "https://probml.github.io/pml-book/book1.html",
    "type": "Book",
    "category": "Machine Learning",
    "desc": "Mathematical foundation of ML.",
    "level": "Beginner"
  },
  {
    "title": "HuggingFace Agents Course",
    "url": "https://huggingface.co/learn/agents-course/unit0/introduction",
    "type": "Course",
    "category": "Agentic AI",
    "desc": "Production-grade AI agent development.",
    "level": "Beginner"
  },
  {
    "title": "Building Effective Agents (Anthropic)",
    "url": "https://www.anthropic.com/engineering/building-effective-agents",
    "type": "Engineering Blog",
    "category": "Agentic AI",
    "desc": "Best practices for robust agent systems.",
    "level": "Beginner"
  },
  {
    "title": "CS50: AI with Python",
    "url": "https://pll.harvard.edu/course/cs50s-introduction-artificial-intelligence-python/2023-05",
    "type": "Course",
    "category": "AI",
    "desc": "Intro to AI algorithms and Python implementations.",
    "level": "Beginner"
  },
  {
    "title": "Understanding Deep Learning (UDL)",
    "url": "https://udlbook.github.io/udlbook/",
    "type": "Book",
    "category": "Deep Learning",
    "desc": "Open-access book explaining deep learning concepts.",
    "level": "Beginner"
  },
  {
    "title": "Algorithms for ML",
    "url": "https://algorithmsbook.com/",
    "type": "Book",
    "category": "Algorithms",
    "desc": "Practical algorithmic explanations for ML tasks.",
    "level": "Beginner"
  },
  {
    "title": "How GPT-4 Really Works",
    "url": "https://www.youtube.com/watch?v=vw-KWfKwvTQ",
    "type": "YouTube",
    "category": "LLM Foundations",
    "desc": "Deep dive into GPT-4 internals and capabilities.",
    "level": "Beginner"
  },
  {
    "title": "RAG Survey",
    "url": "https://arxiv.org/pdf/2312.10997",
    "type": "Research Paper",
    "category": "RAG",
    "desc": "Comprehensive overview of retrieval-augmented generation.",
    "level": "Beginner"
  },
  {
    "title": "Anthropic — Claude Code In Action",
    "url": "https://anthropic.skilljar.com/claude-code-in-action",
    "type": "Course",
    "category": "Agentic AI",
    "desc": "Practical examples of using Claude Code for agents.",
    "level": "Beginner"
  }
];

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'beginner',
    title: 'Beginner: The Initiate',
    level: 'Beginner',
    description: 'Establish your foundation in Python, Mathematics, and Core ML concepts.',
    color: 'from-green-400 to-emerald-600',
    modules: [
      { title: 'Python for Data Science', topics: ['Syntax', 'Pandas', 'NumPy'], resources: 5 },
      { title: 'Mathematics for ML', topics: ['Linear Algebra', 'Calculus', 'Probability'], resources: 8 },
      { title: 'Classic Machine Learning', topics: ['Regression', 'Classification', 'Trees'], resources: 6 },
    ]
  },
  {
    id: 'intermediate',
    title: 'Intermediate: The Architect',
    level: 'Intermediate',
    description: 'Master Deep Learning, Transformers, Computer Vision, and NLP.',
    color: 'from-blue-400 to-indigo-600',
    modules: [
      { title: 'Deep Learning Foundations', topics: ['Neural Nets', 'Backprop', 'PyTorch'], resources: 7 },
      { title: 'Natural Language Processing', topics: ['RNNs', 'Transformers', 'Tokenization'], resources: 6 },
      { title: 'Computer Vision', topics: ['CNNs', 'Object Detection', 'Segmentation'], resources: 5 },
    ]
  },
  {
    id: 'advanced',
    title: 'Advanced: The Magus',
    level: 'Advanced',
    description: 'Build LLMs, RAG systems, and Autonomous Agents.',
    color: 'from-violet-400 to-purple-600',
    modules: [
      { title: 'Large Language Models', topics: ['Pre-training', 'Fine-tuning', 'PEFT/LoRA'], resources: 9 },
      { title: 'RAG Systems', topics: ['Vector DBs', 'Retrieval', 'Ranking'], resources: 6 },
      { title: 'Agentic Workflows', topics: ['ReAct', 'Tool Use', 'Multi-Agent'], resources: 8 },
    ]
  },
  {
    id: 'frontier',
    title: 'Frontier: The Oracle',
    level: 'Frontier',
    description: 'Explore research papers, scaling laws, and next-gen system design.',
    color: 'from-amber-400 to-orange-600',
    modules: [
      { title: 'Latest Research', topics: ['ArXiv Trends', 'Reasoning Models', 'Interpretability'], resources: 12 },
      { title: 'Systems Design', topics: ['Distributed Training', 'Inference Optimization'], resources: 4 },
      { title: 'AGI Alignment', topics: ['Safety', 'Governance', 'Philosophy'], resources: 5 },
    ]
  }
];

export const BADGES: Badge[] = [
  { id: '1', name: 'ML Initiate', description: 'Completed 5 Beginner Resources', icon: '🌱', unlocked: true },
  { id: '2', name: 'Deep Learning Smith', description: 'Mastered the basics of Neural Networks', icon: '⚒️', unlocked: false },
  { id: '3', name: 'LLM Architect', description: 'Built your first RAG application', icon: '🏛️', unlocked: false },
  { id: '4', name: 'Agent Commander', description: 'Deployed a multi-agent system', icon: '🤖', unlocked: false },
];
