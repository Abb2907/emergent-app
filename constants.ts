import { Repo, Resource, LearningPath, Badge } from './types';

export const REPOS: Repo[] = [
    {
      id: "Avik-Jain/100-Days-Of-ML-Code",
      url: "https://github.com/Avik-Jain/100-Days-Of-ML-Code",
      name: "100 Days Of ML Code",
      category: "Machine Learning",
      level: "Beginner",
      description: "A comprehensive 100-day plan to learn machine learning from scratch.",
      starter: false
    },
    {
      id: "owainlewis/awesome-artificial-intelligence",
      url: "https://github.com/owainlewis/awesome-artificial-intelligence",
      name: "Awesome Artificial Intelligence",
      category: "Resources",
      level: "Beginner",
      description: "A curated list of awesome Artificial Intelligence (AI) courses, books, video lectures and papers.",
      starter: false
    },
    {
      id: "ashishps1/learn-ai-engineering",
      url: "https://github.com/ashishps1/learn-ai-engineering",
      name: "Learn AI Engineering",
      category: "Engineering",
      level: "Intermediate",
      description: "Resources and roadmaps for learning AI engineering.",
      starter: false
    },
    {
      id: "promptslab/Awesome-Prompt-Engineering",
      url: "https://github.com/promptslab/Awesome-Prompt-Engineering",
      name: "Awesome Prompt Engineering",
      category: "Prompt Engineering",
      level: "Beginner",
      description: "A curated list of awesome prompt engineering resources, tools, and papers.",
      starter: false
    },
    {
      id: "snwfdhmp/awesome-gpt-prompt-engineering",
      url: "https://github.com/snwfdhmp/awesome-gpt-prompt-engineering",
      name: "Awesome GPT Prompt Engineering",
      category: "Prompt Engineering",
      level: "Beginner",
      description: "A curated list of awesome resources for GPT prompt engineering.",
      starter: false
    },
    {
      id: "NirDiamant/Prompt_Engineering",
      url: "https://github.com/NirDiamant/Prompt_Engineering",
      name: "Prompt Engineering",
      category: "Prompt Engineering",
      level: "Intermediate",
      description: "Prompt engineering resources and guides.",
      starter: false
    },
    {
      id: "brexhq/prompt-engineering",
      url: "https://github.com/brexhq/prompt-engineering",
      name: "Prompt Engineering (Brex)",
      category: "Prompt Engineering",
      level: "Intermediate",
      description: "Prompt engineering resources and best practices from Brex.",
      starter: false
    },
    {
      id: "anthropics/prompt-eng-interactive-tutorial",
      url: "https://github.com/anthropics/prompt-eng-interactive-tutorial",
      name: "Prompt Engineering Interactive Tutorial",
      category: "Prompt Engineering",
      level: "Beginner",
      description: "Interactive tutorial for learning prompt engineering.",
      starter: false
    },
    {
      id: "f/prompts.chat",
      url: "https://github.com/f/prompts.chat",
      name: "Prompts Chat",
      category: "Prompt Engineering",
      level: "Beginner",
      description: "A collection of prompts for chatbots and LLMs.",
      starter: false
    },
    {
      id: "openai/openai-cookbook",
      url: "https://github.com/openai/openai-cookbook",
      name: "OpenAI Cookbook",
      category: "LLM Foundations",
      level: "Beginner",
      description: "Example code and guides for accomplishing common tasks with the OpenAI API.",
      starter: false
    },
    {
      id: "jamiepine/voicebox",
      url: "https://github.com/jamiepine/voicebox",
      name: "Voicebox",
      category: "Voice Agents",
      level: "Intermediate",
      description: "Voicebox: open-source voice AI tools and demos.",
      starter: false
    },
    {
      id: "sickn33/antigravity-awesome-skills",
      url: "https://github.com/sickn33/antigravity-awesome-skills",
      name: "Antigravity Awesome Skills",
      category: "Resources",
      level: "Beginner",
      description: "A curated list of awesome skills for AI and beyond.",
      starter: false
    },
    {
      id: "roadmap.sh/prompt-engineering",
      url: "https://roadmap.sh/prompt-engineering",
      name: "Prompt Engineering Roadmap",
      category: "Prompt Engineering",
      level: "Beginner",
      description: "Structured roadmap for learning prompt engineering.",
      starter: false
    },
  {
    id: "microsoft/generative-ai-for-beginners",
    url: "https://github.com/microsoft/generative-ai-for-beginners",
    name: "Generative AI for Beginners",
    category: "Foundations",
    level: "Beginner",
    description: "12-Lesson course teaching everything you need to know to start building Generative AI applications.",
    starter: true
  },
  {
    id: "microsoft/ai-agents-for-beginners",
    url: "https://github.com/microsoft/ai-agents-for-beginners",
    name: "AI Agents for Beginners",
    category: "Agentic Architecture",
    level: "Beginner",
    description: "Learn how to build AI Agents with this comprehensive guide from Microsoft.",
    starter: true
  },
  {
    id: "Microsoft/AI-For-Beginners",
    url: "https://github.com/Microsoft/AI-For-Beginners",
    name: "AI For Beginners",
    category: "Foundations",
    level: "Beginner",
    description: "AI for Beginners Curriculum.",
    starter: true
  },
  {
    id: "microsoft/ML-For-Beginners",
    url: "https://github.com/microsoft/ML-For-Beginners",
    name: "ML For Beginners",
    category: "Foundations",
    level: "Beginner",
    description: "12 weeks, 26 lessons, 52 quizzes, classic Machine Learning for all.",
    starter: true
  },
  {
    id: "dair-ai/Prompt-Engineering-Guide",
    url: "https://github.com/dair-ai/Prompt-Engineering-Guide",
    name: "Prompt Engineering Guide",
    category: "Foundations",
    level: "Beginner",
    description: "Guides, papers, lecture, notebooks and resources for prompt engineering.",
    starter: true
  },
  {
    id: "dair-ai/Mathematics-for-ML",
    url: "https://github.com/dair-ai/Mathematics-for-ML",
    name: "Mathematics for ML",
    category: "Math",
    level: "Beginner",
    description: "Mathematics for Machine Learning companion page.",
    starter: true
  },
  {
    id: "mlabonne/llm-course",
    url: "https://github.com/mlabonne/llm-course",
    name: "LLM Course",
    category: "Foundations",
    level: "Intermediate",
    description: "Course to get into Large Language Models (LLMs) with roadmaps and Colab notebooks.",
    starter: true
  },
  {
    id: "Asabeneh/30-Days-Of-Python",
    url: "https://github.com/Asabeneh/30-Days-Of-Python",
    name: "30 Days Of Python",
    category: "Foundations",
    level: "Beginner",
    description: "30 days of Python programming challenge. Step-by-step guide.",
    starter: true
  },
  {
    id: "Shubhamsaboo/awesome-llm-apps",
    url: "https://github.com/Shubhamsaboo/awesome-llm-apps",
    name: "Awesome LLM Apps",
    category: "Projects",
    level: "Intermediate",
    description: "A curated collection of awesome LLM applications and resources.",
    starter: true
  },
  {
    id: "vchandu111/15-ai-projects",
    url: "https://github.com/vchandu111/15-ai-projects",
    name: "15 AI Projects",
    category: "Projects",
    level: "Intermediate",
    description: "A collection of 15 hands-on AI projects to build your portfolio.",
    starter: true
  },
  {
    id: "kamranahmedse/developer-roadmap",
    url: "https://github.com/kamranahmedse/developer-roadmap",
    name: "Developer Roadmap",
    category: "Roadmaps",
    level: "Beginner",
    description: "Interactive roadmaps, guides and other educational content to help developers grow.",
    starter: true
  },
  {
    id: "Sumanth077/Hands-On-AI-Engineering",
    url: "https://github.com/Sumanth077/Hands-On-AI-Engineering",
    name: "Hands On AI Engineering",
    category: "Foundations",
    level: "Intermediate",
    description: "Hands-on guide to AI Engineering.",
    starter: true
  },
  {
    id: "NirDiamant/GenAI_Agents",
    url: "https://github.com/NirDiamant/GenAI_Agents",
    name: "GenAI Agents",
    category: "Agentic Architecture",
    level: "Intermediate",
    description: "Tutorials and implementations for Generative AI Agents.",
    starter: true
  },
  {
    id: "HeyNina101/generative_ai_project",
    url: "https://github.com/HeyNina101/generative_ai_project",
    name: "Generative AI Project",
    category: "Foundations",
    level: "Intermediate",
    description: "A production-ready template to kickstart your Generative AI projects with structure and scalability in mind.",
    starter: false
  },
  {
    id: "ishandutta0098/orion",
    url: "https://github.com/ishandutta0098/orion",
    name: "Orion",
    category: "Agentic Architecture",
    level: "Intermediate",
    description: "A smart multi-agent system to turn prompts into GitHub PRs.",
    starter: false
  },
  {
    id: "jlowin/fastmcp",
    url: "https://github.com/jlowin/fastmcp",
    name: "FastMCP",
    category: "Infrastructure",
    level: "Intermediate",
    description: "The fast, Pythonic way to build MCP servers and clients.",
    starter: false
  },
  {
    id: "OpenBMB/ChatDev",
    url: "https://github.com/OpenBMB/ChatDev",
    name: "ChatDev",
    category: "Agentic Architecture",
    level: "Advanced",
    description: "Dev All through LLM-powered Multi-Agent Collaboration.",
    starter: false
  },
  {
    id: "ruc-datalab/DeepAnalyze",
    url: "https://github.com/ruc-datalab/DeepAnalyze",
    name: "DeepAnalyze",
    category: "Agentic Architecture",
    level: "Advanced",
    description: "The first agentic LLM for autonomous data science.",
    starter: false
  },
  {
    id: "HKUDS/RAG-Anything",
    url: "https://github.com/HKUDS/RAG-Anything",
    name: "RAG Anything",
    category: "Architecture",
    level: "Advanced",
    description: "All-in-one Multimodal Document Processing RAG system built on LightRAG.",
    starter: false
  },
  {
    id: "tadata-org/fastapi_mcp",
    url: "https://github.com/tadata-org/fastapi_mcp",
    name: "FastAPI MCP",
    category: "Infrastructure",
    level: "Intermediate",
    description: "Expose secure FastAPI endpoints as MCP tools with minimal setup and authentication.",
    starter: false
  },
  {
    id: "instavm/coderunner",
    url: "https://github.com/instavm/coderunner",
    name: "Coderunner",
    category: "Infrastructure",
    level: "Intermediate",
    description: "Turns LLMs into an instant execution partner that writes and runs code in a preconfigured sandbox.",
    starter: false
  },
  {
    id: "firecrawl/open-agent-builder",
    url: "https://github.com/firecrawl/open-agent-builder",
    name: "Open Agent Builder",
    category: "Agentic Architecture",
    level: "Intermediate",
    description: "Visual workflow builder for AI agents powered by Firecrawl.",
    starter: false
  },
  {
    id: "microsoft/agent-lightning",
    url: "https://github.com/microsoft/agent-lightning",
    name: "Agent Lightning",
    category: "Agentic Architecture",
    level: "Advanced",
    description: "The absolute trainer to light up AI agents.",
    starter: false
  },
  {
    id: "GoogleCloudPlatform/agent-starter-pack",
    url: "https://github.com/GoogleCloudPlatform/agent-starter-pack",
    name: "Agent Starter Pack",
    category: "Foundations",
    level: "Advanced",
    description: "Ship AI Agents to Google Cloud in minutes with built-in CI/CD and observability.",
    starter: false
  },
  {
    id: "oraios/serena",
    url: "https://github.com/oraios/serena",
    name: "Serena",
    category: "Infrastructure",
    level: "Intermediate",
    description: "Semantic code editing and retrieval for agent-driven coding.",
    starter: false
  },
  {
    id: "steipete/Peekaboo",
    url: "https://github.com/steipete/Peekaboo",
    name: "Peekaboo",
    category: "Infrastructure",
    level: "Intermediate",
    description: "Swift code analysis that turns screen content into actionable AI context.",
    starter: false
  },
  {
    id: "upstash/context7",
    url: "https://github.com/upstash/context7",
    name: "Context7",
    category: "Infrastructure",
    level: "Intermediate",
    description: "Pulls up-to-date, version-specific documentation straight from your code.",
    starter: false
  },
  {
    id: "ollama/ollama",
    url: "https://github.com/ollama/ollama",
    name: "Ollama",
    category: "Infrastructure",
    level: "Intermediate",
    description: "Get up and running with Llama 3, Mistral, Gemma, and other large language models.",
    starter: false
  },
  {
    id: "langgenius/dify",
    url: "https://github.com/langgenius/dify",
    name: "Dify",
    category: "Infrastructure",
    level: "Intermediate",
    description: "An open-source LLM app development platform. Orchestrate LLM apps to production.",
    starter: false
  },
  {
    id: "NirDiamant/RAG_Techniques",
    url: "https://github.com/NirDiamant/RAG_Techniques",
    name: "RAG Techniques",
    category: "Architecture",
    level: "Advanced",
    description: "Advanced RAG Techniques and implementations.",
    starter: false
  },
  {
    id: "donnemartin/system-design-primer",
    url: "https://github.com/donnemartin/system-design-primer",
    name: "System Design Primer",
    category: "Engineering",
    level: "Intermediate",
    description: "Learn how to design large-scale systems. Prep for the system design interview.",
    starter: false
  },
  {
    id: "chiphuyen/dmls-book",
    url: "https://github.com/chiphuyen/dmls-book",
    name: "Designing ML Systems",
    category: "MLOps",
    level: "Advanced",
    description: "Companion repo for the book 'Designing Machine Learning Systems'.",
    starter: false
  },
  {
    id: "GokuMohandas/Made-With-ML",
    url: "https://github.com/GokuMohandas/Made-With-ML",
    name: "Made With ML",
    category: "MLOps",
    level: "Advanced",
    description: "Learn how to responsibly deliver value with ML.",
    starter: false
  },
  {
    id: "graviraja/MLOps-Basics",
    url: "https://github.com/graviraja/MLOps-Basics",
    name: "MLOps Basics",
    category: "MLOps",
    level: "Intermediate",
    description: "A set of practical guides to get started with MLOps.",
    starter: false
  },
  {
    id: "openai/spinningup",
    url: "https://github.com/openai/spinningup",
    name: "Spinning Up in Deep RL",
    category: "Education",
    level: "Advanced",
    description: "An educational resource for learning about deep reinforcement learning.",
    starter: false
  },
  {
    id: "dennybritz/reinforcement-learning",
    url: "https://github.com/dennybritz/reinforcement-learning",
    name: "Reinforcement Learning",
    category: "Education",
    level: "Advanced",
    description: "Implementation of Reinforcement Learning algorithms in Python.",
    starter: false
  },
  {
    id: "graykode/nlp-tutorial",
    url: "https://github.com/graykode/nlp-tutorial",
    name: "NLP Tutorial",
    category: "Education",
    level: "Advanced",
    description: "Natural Language Processing Tutorial for Deep Learning Researchers.",
    starter: false
  },
  {
    id: "AGI-Edgerunners/LLM-Agents-Papers",
    url: "https://github.com/AGI-Edgerunners/LLM-Agents-Papers",
    name: "LLM Agents Papers",
    category: "Foundations",
    level: "Frontier",
    description: "Must-read papers on LLM Agents.",
    starter: false
  },
  {
    id: "HandsOnLLM/Hands-On-Large-Language-Models",
    url: "https://github.com/HandsOnLLM/Hands-On-Large-Language-Models",
    name: "Hands On LLMs",
    category: "Education",
    level: "Intermediate",
    description: "Hands-on Large Language Models book companion.",
    starter: false
  },
  {
    id: "going-doer/Paper2Code",
    url: "https://github.com/going-doer/Paper2Code",
    name: "Paper2Code",
    category: "Projects",
    level: "Intermediate",
    description: "Implementation of papers in code.",
    starter: false
  },
  {
    id: "jamwithai/production-agentic-rag-course",
    url: "https://github.com/jamwithai/production-agentic-rag-course",
    name: "Production Agentic RAG",
    category: "Education",
    level: "Advanced",
    description: "Course for building Production Agentic RAG systems.",
    starter: false
  },
  {
    id: "yangshun/tech-interview-handbook",
    url: "https://github.com/yangshun/tech-interview-handbook",
    name: "Tech Interview Handbook",
    category: "Engineering",
    level: "Intermediate",
    description: "Curated interview preparation materials for busy engineers.",
    starter: false
  },
  {
    id: "systemdesign42/system-design-academy",
    url: "https://github.com/systemdesign42/system-design-academy",
    name: "System Design Academy",
    category: "Engineering",
    level: "Intermediate",
    description: "Learn System Design concepts.",
    starter: false
  },
  {
    id: "public-apis/public-apis",
    url: "https://github.com/public-apis/public-apis",
    name: "Public APIs",
    category: "Resources",
    level: "Beginner",
    description: "A collective list of free APIs.",
    starter: false
  },
  {
    id: "EbookFoundation/free-programming-books",
    url: "https://github.com/EbookFoundation/free-programming-books",
    name: "Free Programming Books",
    category: "Resources",
    level: "Beginner",
    description: "Freely available programming books in various languages.",
    starter: false
  },
  {
    id: "x1xhlol/system-prompts-and-models-of-ai-tools",
    url: "https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools",
    name: "System Prompts AI Tools",
    category: "Resources",
    level: "Intermediate",
    description: "Collection of system prompts and models of AI tools.",
    starter: false
  },
  {
    id: "bgauryy/open-docs",
    url: "https://github.com/bgauryy/open-docs",
    name: "Open Docs",
    category: "Resources",
    level: "Intermediate",
    description: "Documentation created to better understand open projects.",
    starter: false
  },
  {
    id: "cheahjs/free-llm-api-resources",
    url: "https://github.com/cheahjs/free-llm-api-resources",
    name: "Free LLM API Resources",
    category: "Resources",
    level: "Intermediate",
    description: "List of free LLM API resources.",
    starter: false
  },
  {
    id: "github/gh-aw",
    url: "https://github.com/github/gh-aw",
    name: "GH AW",
    category: "Engineering",
    level: "Intermediate",
    description: "GitHub Awesome lists and resources.",
    starter: false
  },
  {
    id: "antfu/nuxt-mcp",
    url: "https://github.com/antfu/nuxt-mcp",
    name: "Nuxt MCP",
    category: "Infrastructure",
    level: "Intermediate",
    description: "Nuxt developer tools for route inspection and SSR debugging.",
    starter: false
  },
  {
    id: "CoplayDev/unity-mcp",
    url: "https://github.com/CoplayDev/unity-mcp",
    name: "Unity MCP",
    category: "Infrastructure",
    level: "Intermediate",
    description: "Interface with game engine APIs for AI-assisted game development.",
    starter: false
  },
  {
    id: "MCPJam/inspector",
    url: "https://github.com/MCPJam/inspector",
    name: "MCP Inspector",
    category: "Infrastructure",
    level: "Intermediate",
    description: "Tool for testing and debugging MCP servers by inspecting protocol handshakes.",
    starter: false
  },
  {
    id: "czlonkowski/n8n-mcp",
    url: "https://github.com/czlonkowski/n8n-mcp",
    name: "n8n MCP",
    category: "Infrastructure",
    level: "Intermediate",
    description: "Enhances n8n’s workflow automation by streamlining creation and orchestration.",
    starter: false
  },
  {
    id: "Marktechpost/AI-Tutorial-Codes-Included",
    url: "https://github.com/Marktechpost/AI-Tutorial-Codes-Included",
    name: "AI Tutorial Codes",
    category: "Projects",
    level: "Intermediate",
    description: "Codes and Notebooks for AI Projects.",
    starter: false
  },
  {
    id: "langchain-ai/langchain",
    url: "https://github.com/langchain-ai/langchain",
    name: "LangChain",
    category: "Infrastructure",
    level: "Intermediate",
    description: "Building applications with LLMs through composability.",
    starter: false
  },
  {
    id: "Significant-Gravitas/Auto-GPT",
    url: "https://github.com/Significant-Gravitas/Auto-GPT",
    name: "Auto GPT",
    category: "Agents",
    level: "Intermediate",
    description: "An experimental open-source attempt to make GPT-4 fully autonomous.",
    starter: false
  },
  {
    id: "AUTOMATIC1111/stable-diffusion-webui",
    url: "https://github.com/AUTOMATIC1111/stable-diffusion-webui",
    name: "Stable Diffusion WebUI",
    category: "Models",
    level: "Intermediate",
    description: "Stable Diffusion web UI.",
    starter: false
  },
  {
    id: "OpenBMB/MiniCPM-o",
    url: "https://github.com/OpenBMB/MiniCPM-o",
    name: "MiniCPM-o",
    category: "Models",
    level: "Intermediate",
    description: "End-to-side GPT-4o level multimodal LLM on your phone.",
    starter: false
  },
  {
    id: "pydantic/monty",
    url: "https://github.com/pydantic/monty",
    name: "Monty",
    category: "Agents",
    level: "Intermediate",
    description: "Pydantic based agents.",
    starter: false
  },
  {
    id: "GetStream/Vision-Agents",
    url: "https://github.com/GetStream/Vision-Agents",
    name: "Vision Agents",
    category: "Agents",
    level: "Intermediate",
    description: "Build vision agents.",
    starter: false
  },
  {
    id: "hsliuping/TradingAgents-CN",
    url: "https://github.com/hsliuping/TradingAgents-CN",
    name: "TradingAgents CN",
    category: "Agents",
    level: "Intermediate",
    description: "Trading Agents in Chinese.",
    starter: false
  },
  {
    id: "Jeffallan/claude-skills",
    url: "https://github.com/Jeffallan/claude-skills",
    name: "Claude Skills",
    category: "Agents",
    level: "Intermediate",
    description: "Skills and tools for Claude.",
    starter: false
  },
  {
    id: "baserow/baserow",
    url: "https://github.com/baserow/baserow",
    name: "Baserow",
    category: "Infrastructure",
    level: "Intermediate",
    description: "Open source no-code database.",
    starter: false
  },
  {
    id: "KeygraphHQ/shannon",
    url: "https://github.com/KeygraphHQ/shannon",
    name: "Shannon",
    category: "Infrastructure",
    level: "Intermediate",
    description: "Shannon AI infrastructure.",
    starter: false
  },
  {
    id: "iOfficeAI/AionUi",
    url: "https://github.com/iOfficeAI/AionUi",
    name: "AionUi",
    category: "Infrastructure",
    level: "Intermediate",
    description: "AionUi for AI interactions.",
    starter: false
  },
  {
    id: "punkpeye/awesome-mcp-servers",
    url: "https://github.com/punkpeye/awesome-mcp-servers",
    name: "Awesome MCP Servers",
    category: "Infrastructure",
    level: "Intermediate",
    description: "A curated list of Model Context Protocol (MCP) servers.",
    starter: false
  },
  {
    id: "gregorojstersek/resources-to-become-a-great-engineering-leader",
    url: "https://github.com/gregorojstersek/resources-to-become-a-great-engineering-leader",
    name: "Engineering Leader Resources",
    category: "Engineering",
    level: "Intermediate",
    description: "Resources to become a great engineering leader.",
    starter: false
  },
  {
    id: "harvard-edge/cs249r_book",
    url: "https://github.com/harvard-edge/cs249r_book",
    name: "CS249r Book",
    category: "Education",
    level: "Advanced",
    description: "TinyML and Efficient Deep Learning Computing.",
    starter: false
  }
];

export const RESOURCES: Resource[] = [
    {
      "title": "100 Days Of ML Code (GitHub)",
      "url": "https://github.com/Avik-Jain/100-Days-Of-ML-Code",
      "type": "GitHub",
      "category": "Machine Learning",
      "desc": "A comprehensive 100-day plan to learn machine learning from scratch.",
      "level": "Beginner"
    },
    {
      "title": "Awesome Artificial Intelligence (GitHub)",
      "url": "https://github.com/owainlewis/awesome-artificial-intelligence",
      "type": "GitHub",
      "category": "Resources",
      "desc": "A curated list of awesome Artificial Intelligence (AI) courses, books, video lectures and papers.",
      "level": "Beginner"
    },
    {
      "title": "Learn AI Engineering (GitHub)",
      "url": "https://github.com/ashishps1/learn-ai-engineering",
      "type": "GitHub",
      "category": "Engineering",
      "desc": "Resources and roadmaps for learning AI engineering.",
      "level": "Intermediate"
    },
    {
      "title": "Awesome Prompt Engineering (GitHub)",
      "url": "https://github.com/promptslab/Awesome-Prompt-Engineering",
      "type": "GitHub",
      "category": "Prompt Engineering",
      "desc": "A curated list of awesome prompt engineering resources, tools, and papers.",
      "level": "Beginner"
    },
    {
      "title": "Awesome GPT Prompt Engineering (GitHub)",
      "url": "https://github.com/snwfdhmp/awesome-gpt-prompt-engineering",
      "type": "GitHub",
      "category": "Prompt Engineering",
      "desc": "A curated list of awesome resources for GPT prompt engineering.",
      "level": "Beginner"
    },
    {
      "title": "Prompt Engineering (GitHub)",
      "url": "https://github.com/NirDiamant/Prompt_Engineering",
      "type": "GitHub",
      "category": "Prompt Engineering",
      "desc": "Prompt engineering resources and guides.",
      "level": "Intermediate"
    },
    {
      "title": "Prompt Engineering (Brex, GitHub)",
      "url": "https://github.com/brexhq/prompt-engineering",
      "type": "GitHub",
      "category": "Prompt Engineering",
      "desc": "Prompt engineering resources and best practices from Brex.",
      "level": "Intermediate"
    },
    {
      "title": "Prompt Engineering Interactive Tutorial (GitHub)",
      "url": "https://github.com/anthropics/prompt-eng-interactive-tutorial",
      "type": "GitHub",
      "category": "Prompt Engineering",
      "desc": "Interactive tutorial for learning prompt engineering.",
      "level": "Beginner"
    },
    {
      "title": "Prompts Chat (GitHub)",
      "url": "https://github.com/f/prompts.chat",
      "type": "GitHub",
      "category": "Prompt Engineering",
      "desc": "A collection of prompts for chatbots and LLMs.",
      "level": "Beginner"
    },
    {
      "title": "OpenAI Cookbook (GitHub)",
      "url": "https://github.com/openai/openai-cookbook",
      "type": "GitHub",
      "category": "LLM Foundations",
      "desc": "Example code and guides for accomplishing common tasks with the OpenAI API.",
      "level": "Beginner"
    },
    {
      "title": "Voicebox (GitHub)",
      "url": "https://github.com/jamiepine/voicebox",
      "type": "GitHub",
      "category": "Voice Agents",
      "desc": "Voicebox: open-source voice AI tools and demos.",
      "level": "Intermediate"
    },
    {
      "title": "Antigravity Awesome Skills (GitHub)",
      "url": "https://github.com/sickn33/antigravity-awesome-skills",
      "type": "GitHub",
      "category": "Resources",
      "desc": "A curated list of awesome skills for AI and beyond.",
      "level": "Beginner"
    },
    {
      "title": "Prompt Engineering Roadmap (Structured Roadmap)",
      "url": "https://roadmap.sh/prompt-engineering",
      "type": "Roadmap",
      "category": "Prompt Engineering",
      "desc": "Structured roadmap for learning prompt engineering.",
      "level": "Beginner"
    },
    {
      "title": "Introduction to filters and convolution | Computer vision from scratch series [Lecture 2]",
      "url": "https://www.youtube.com/watch?v=NGeHyQm-0m8",
      "type": "YouTube",
      "category": "Computer Vision",
      "desc": "Intro to filters and convolution in computer vision.",
      "level": "Beginner"
    },
    {
      "title": "UNet: the 2015 model with 118k+ citations that changed segmentation - And how GenAI brought it back",
      "url": "https://www.youtube.com/watch?v=9KvngtchNww",
      "type": "YouTube",
      "category": "Computer Vision",
      "desc": "UNet model and its impact on segmentation.",
      "level": "Intermediate"
    },
    {
      "title": "Object Detection using R-CNN, Fast R-CNN, and Faster R-CNN | Computer Vision Hands-on Bootcamp",
      "url": "https://www.youtube.com/watch?v=MKfyEe1ITeg",
      "type": "YouTube",
      "category": "Computer Vision",
      "desc": "Object detection using R-CNN variants.",
      "level": "Intermediate"
    },
    {
      "title": "Coding a Vision Transformer from scratch using PyTorch",
      "url": "https://www.youtube.com/watch?v=DdsVwTodycw",
      "type": "YouTube",
      "category": "Computer Vision",
      "desc": "Vision Transformer implementation in PyTorch.",
      "level": "Intermediate"
    },
    {
      "title": "Introduction to Vision Transformer (ViT) | An image is worth 16x16 words | Computer Vision Series",
      "url": "https://www.youtube.com/watch?v=aIi5FsdURUA",
      "type": "YouTube",
      "category": "Computer Vision",
      "desc": "Intro to Vision Transformer (ViT) architecture.",
      "level": "Intermediate"
    },
    {
      "title": "A Historical Journey through CNNs and Modern Computer Vision 2010–2025 | Computer Vision Series",
      "url": "https://www.youtube.com/watch?v=SOC_rrcNeY4",
      "type": "YouTube",
      "category": "Computer Vision",
      "desc": "History and evolution of CNNs and computer vision.",
      "level": "Beginner"
    },
    {
      "title": "ResNet Explained - Vanishing Gradients, Skip Connections, and Code Implementation | Computer Vision",
      "url": "https://www.youtube.com/watch?v=OE3XNTBy0hA",
      "type": "YouTube",
      "category": "Computer Vision",
      "desc": "ResNet architecture and implementation details.",
      "level": "Intermediate"
    },
    {
      "title": "Neural network for image classification | Computer Vision from Scratch series [Lecture 4]",
      "url": "https://www.youtube.com/watch?v=uLLjjjiBMcc",
      "type": "YouTube",
      "category": "Computer Vision",
      "desc": "Building neural networks for image classification.",
      "level": "Beginner"
    },
    {
      "title": "A beginners introduction to YOLO | You Only Look Once | Computer Vision",
      "url": "https://www.youtube.com/watch?v=lcArnTfpPBM",
      "type": "YouTube",
      "category": "Computer Vision",
      "desc": "YOLO object detection explained for beginners.",
      "level": "Beginner"
    },
    {
      "title": "Build and deploy Computer Vision Model for fall detection | Roboflow + Streamlit | Physical Safety",
      "url": "https://www.youtube.com/watch?v=XPiMpURCh1M",
      "type": "YouTube",
      "category": "Computer Vision",
      "desc": "Build and deploy a fall detection model using Roboflow and Streamlit.",
      "level": "Intermediate"
    },
  {
    "title": "Document Analysis using LLMs with Python",
    "url": "https://amanxai.com/2024/10/21/document-analysis-using-llms-with-python/",
    "type": "Article",
    "category": "Projects",
    "desc": "Learn how to analyze documents using Large Language Models and Python.",
    "level": "Intermediate"
  },
  {
    "title": "Build a Production Ready LLM API",
    "url": "https://amanxai.com/2026/02/11/build-a-production-ready-llm-api/",
    "type": "Article",
    "category": "Deployment",
    "desc": "Guide to building scalable and production-ready APIs for LLMs.",
    "level": "Advanced"
  },
  {
    "title": "Build Your First RAG System From Scratch",
    "url": "https://amanxai.com/2025/10/21/build-your-first-rag-system-from-scratch/",
    "type": "Article",
    "category": "RAG",
    "desc": "Step-by-step tutorial on creating a Retrieval-Augmented Generation system.",
    "level": "Beginner"
  },
  {
    "title": "Build an AI Resume Screener with Python & Llama 3",
    "url": "https://amanxai.com/2025/12/16/build-an-ai-resume-screener-with-python-llama-3/",
    "type": "Article",
    "category": "Projects",
    "desc": "Automate resume screening using the power of Llama 3.",
    "level": "Intermediate"
  },
  {
    "title": "Add Reasoning Skills to Your LLM Apps",
    "url": "https://amanxai.com/2026/01/20/add-reasoning-skills-to-your-llm-apps/",
    "type": "Article",
    "category": "Prompt Engineering",
    "desc": "Enhance your LLM applications with advanced reasoning capabilities.",
    "level": "Advanced"
  },
  {
    "title": "Building a Multi-Document RAG System",
    "url": "https://amanxai.com/2026/01/06/building-a-multi-document-rag-system/",
    "type": "Article",
    "category": "RAG",
    "desc": "Scale your RAG system to handle and retrieve from multiple documents.",
    "level": "Intermediate"
  },
  {
    "title": "Build a GraphRAG Pipeline for Smart Retrieval",
    "url": "https://amanxai.com/2026/01/27/build-a-graphrag-pipeline-for-smart-retrieval/",
    "type": "Article",
    "category": "RAG",
    "desc": "Implement GraphRAG for more intelligent and context-aware retrieval.",
    "level": "Advanced"
  },
  {
    "title": "Build an AI System to Summarize YouTube Videos",
    "url": "https://amanxai.com/2026/02/04/build-an-ai-system-to-summarize-youtube-videos-into-notes/",
    "type": "Article",
    "category": "Projects",
    "desc": "Create a tool that converts YouTube videos into concise notes.",
    "level": "Intermediate"
  },
  {
    "title": "Build a Real-Time AI Assistant using RAG & LangChain",
    "url": "https://amanxai.com/2025/11/18/build-a-real-time-ai-assistant-using-rag-langchain/",
    "type": "Article",
    "category": "Projects",
    "desc": "Develop a real-time assistant with up-to-date knowledge using RAG.",
    "level": "Intermediate"
  },
  {
    "title": "Build Your First Text-to-SQL App",
    "url": "https://amanxai.com/2026/02/08/build-your-first-text-to-sql-app/",
    "type": "Article",
    "category": "Projects",
    "desc": "Learn to query databases using natural language.",
    "level": "Intermediate"
  },
  {
    "title": "Building an Agentic RAG Pipeline",
    "url": "https://amanxai.com/2025/12/30/building-an-agentic-rag-pipeline/",
    "type": "Article",
    "category": "Agentic AI",
    "desc": "Combine Agents and RAG for powerful autonomous pipelines.",
    "level": "Advanced"
  },
  {
    "title": "Build a Multi-Agent System with LangGraph",
    "url": "https://amanxai.com/2025/12/09/build-a-multi-agent-system-with-langgraph/",
    "type": "Article",
    "category": "Agentic AI",
    "desc": "Orchestrate multiple agents using LangGraph.",
    "level": "Advanced"
  },
  {
    "title": "Build a Real-Time Voice AI Assistant",
    "url": "https://amanxai.com/2025/12/02/build-a-real-time-voice-ai-assistant/",
    "type": "Article",
    "category": "Voice Agents",
    "desc": "Create voice-enabled AI assistants for real-time interaction.",
    "level": "Intermediate"
  },
  {
    "title": "Build Your Personal AI Data Analyst",
    "url": "https://amanxai.com/2025/11/25/build-your-personal-ai-data-analyst/",
    "type": "Article",
    "category": "Projects",
    "desc": "Automate data analysis tasks with your own AI agent.",
    "level": "Intermediate"
  },
  {
    "title": "Build an AI Agent to Automate Your Research",
    "url": "https://amanxai.com/2025/11/11/build-an-ai-agent-to-automate-your-research/",
    "type": "Article",
    "category": "Agentic AI",
    "desc": "Accelerate your research process with autonomous agents.",
    "level": "Intermediate"
  },
  {
    "title": "Build a Visual Question Answering App",
    "url": "https://amanxai.com/2025/11/04/build-a-visual-question-answering-app/",
    "type": "Article",
    "category": "Multi-modal",
    "desc": "Create apps that can see and answer questions about images.",
    "level": "Intermediate"
  },
  {
    "title": "Connect Your First AI Agent to the Internet",
    "url": "https://amanxai.com/2026/02/01/connect-your-first-ai-agent-to-the-internet/",
    "type": "Article",
    "category": "Agentic AI",
    "desc": "Give your agents access to real-time web data.",
    "level": "Beginner"
  },
  {
    "title": "Building a Multi-Agent System using Gemini API",
    "url": "https://amanxai.com/2025/09/16/building-a-multi-agent-system-using-gemini-api/",
    "type": "Article",
    "category": "Agentic AI",
    "desc": "Leverage Google's Gemini API for multi-agent architectures.",
    "level": "Advanced"
  },
  {
    "title": "AI Image Generation using Diffusion Models",
    "url": "https://amanxai.com/2025/08/19/ai-image-generation-using-diffusion-models/",
    "type": "Article",
    "category": "Generative AI",
    "desc": "Deep dive into generating images with diffusion models.",
    "level": "Intermediate"
  },
  {
    "title": "Building AI Agents with CrewAI using Python",
    "url": "https://amanxai.com/2025/07/01/building-ai-agents-with-crewai-using-python/",
    "type": "Article",
    "category": "Agentic AI",
    "desc": "Hands-on guide to building agent crews with CrewAI.",
    "level": "Intermediate"
  },
  {
    "title": "OpenAI Cookbook",
    "url": "https://developers.openai.com/cookbook",
    "type": "Documentation",
    "category": "LLM Foundations",
    "desc": "Example code and guides for accomplishing common tasks with the OpenAI API.",
    "level": "Beginner"
  },
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
    "title": "AI Version of Myself with NotebookLM",
    "url": "https://www.xda-developers.com/built-ai-version-of-myself-with-notebooklm/",
    "type": "Article",
    "category": "Agentic AI",
    "desc": "Creating personal AI replicas using NotebookLM.",
    "level": "Beginner"
  },
  {
    "title": "Gemini 3 + NotebookLM Workflow",
    "url": "https://www.youtube.com/watch?v=ia6zWjcXgc4",
    "type": "YouTube",
    "category": "Tools & Frameworks",
    "desc": "Using Gemini and NotebookLM for visual workflows.",
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
    "title": "Deep Agents CLI (LangChain)",
    "url": "https://docs.langchain.com/oss/python/deepagents/cli/overview",
    "type": "Documentation",
    "category": "Agentic AI",
    "desc": "LangChain’s DeepAgents CLI for structured agent design.",
    "level": "Beginner"
  },
  {
    "title": "8 Hour AI Agents Course",
    "url": "https://www.youtube.com/watch?v=ftBWgcwvEk4",
    "type": "YouTube",
    "category": "Agentic AI",
    "desc": "Condensed overview of AI agent architectures.",
    "level": "Beginner"
  },
  {
    "title": "Intro to Large Language Models",
    "url": "https://www.youtube.com/watch?v=zjkBMFhNj_g",
    "type": "YouTube",
    "category": "LLM Foundations",
    "desc": "High-level introduction to LLM concepts.",
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
    "title": "Agentic AI: Stanford Webinar",
    "url": "https://www.youtube.com/watch?v=kJLiOGle3Lw",
    "type": "Webinar",
    "category": "Agentic AI",
    "desc": "Progression of language model usage into agents.",
    "level": "Beginner"
  },
  {
    "title": "Building and Evaluating AI Agents",
    "url": "https://www.youtube.com/watch?v=d5EltXhbcfA",
    "type": "Talk",
    "category": "Agentic AI",
    "desc": "Critical evaluation of agent reliability.",
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
    "title": "Toolformer",
    "url": "https://proceedings.neurips.cc/paper_files/paper/2023/file/d842425e4bf79ba039352da0f658a906-Paper-Conference.pdf",
    "type": "Research Paper",
    "category": "Agentic AI",
    "desc": "Teaching LLMs to use tools autonomously.",
    "level": "Beginner"
  },
  {
    "title": "Chain of Thought Prompting",
    "url": "https://arxiv.org/pdf/2201.11903",
    "type": "Research Paper",
    "category": "Prompt Engineering",
    "desc": "Improves reasoning via intermediate steps.",
    "level": "Beginner"
  },
  {
    "title": "Tree of Thoughts",
    "url": "https://arxiv.org/pdf/2305.10601",
    "type": "Research Paper",
    "category": "Prompt Engineering",
    "desc": "Multi-branch reasoning strategy.",
    "level": "Beginner"
  },
  {
    "title": "Reflexion",
    "url": "https://proceedings.neurips.cc/paper_files/paper/2023/file/1b44b878bb782e6954cd888628510e90-Paper-Conference.pdf",
    "type": "Research Paper",
    "category": "Agentic AI",
    "desc": "Self-reflective agent learning.",
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
    "title": "HuggingFace LLM Course",
    "url": "https://huggingface.co/learn/llm-course/chapter1/1",
    "type": "Course",
    "category": "LLM Foundations",
    "desc": "From transformers to production LLM deployment.",
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
    "title": "Deep RL Course",
    "url": "https://huggingface.co/learn/deep-rl-course/unit0/introduction",
    "type": "Course",
    "category": "RL",
    "desc": "Train agents through reinforcement learning.",
    "level": "Beginner"
  },
  {
    "title": "FastAI Practical Deep Learning",
    "url": "https://course.fast.ai/",
    "type": "Course",
    "category": "Deep Learning",
    "desc": "Hands-on PyTorch-based deep learning.",
    "level": "Beginner"
  },
  {
    "title": "Karpathy Zero to Hero",
    "url": "https://karpathy.ai/zero-to-hero.html",
    "type": "Course",
    "category": "Deep Learning",
    "desc": "Build GPT models from scratch.",
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
    "title": "Fairness in ML",
    "url": "https://fairmlbook.org/",
    "type": "Book",
    "category": "Responsible AI",
    "desc": "Bias detection and responsible AI design.",
    "level": "Beginner"
  },
  {
    "title": "MLOps Short Course",
    "url": "https://www.deeplearning.ai/short-courses/llmops/",
    "type": "Course",
    "category": "MLOps",
    "desc": "Deployment and monitoring of LLM systems.",
    "level": "Beginner"
  },
  {
    "title": "Production ML Deployment (FastAPI + Docker + AWS)",
    "url": "https://www.youtube.com/watch?v=-dJPoLm_gtE",
    "type": "YouTube",
    "category": "Deployment",
    "desc": "Deploy ML models into production environments.",
    "level": "Beginner"
  },
  {
    "title": "How We Build Effective Agents — Barry Zhang (Anthropic)",
    "url": "https://www.youtube.com/watch?v=D7_ipDqhtwk",
    "type": "YouTube",
    "category": "Agentic AI",
    "desc": "Anthropic engineer Barry Zhang on designing effective multi-step agents.",
    "level": "Beginner"
  },
  {
    "title": "Building Agents with Model Context Protocol (MCP) — Full Workshop",
    "url": "https://www.youtube.com/watch?v=kQmXtrmQ5Zg",
    "type": "YouTube",
    "category": "MCP / Agentic AI",
    "desc": "Full MCP workshop (Mahesh Murag, Anthropic) on model-context for agents.",
    "level": "Beginner"
  },
  {
    "title": "Lets Build An Agent from Scratch",
    "url": "https://www.youtube.com/watch?si=j75FuDXsIrgVS0RV&v=xzXdLRUyjUg&feature=youtu.be",
    "type": "YouTube",
    "category": "Agentic AI",
    "desc": "Hands-on tutorial building an agent from first principles.",
    "level": "Beginner"
  },
  {
    "title": "DeepAgents (LangChain JS)",
    "url": "https://docs.langchain.com/oss/javascript/deepagents/overview",
    "type": "Documentation",
    "category": "Agentic AI",
    "desc": "LangChain DeepAgents overview for JavaScript.",
    "level": "Beginner"
  },
  {
    "title": "Voice agent building to attend calls",
    "url": "https://youtu.be/HGBMr1RQliY?si=CWPPm2xTOO6onWiV",
    "type": "YouTube",
    "category": "Voice Agents",
    "desc": "Demo: a voice agent that can attend and summarize calls.",
    "level": "Beginner"
  },
  {
    "title": "Built a Social Media Team With Just 1 AI Agent",
    "url": "https://www.youtube.com/watch?v=r2bxV2CHu5U",
    "type": "YouTube",
    "category": "Agentic AI",
    "desc": "Case study automating social media using a single agent.",
    "level": "Beginner"
  },
  {
    "title": "Perplexity Comet Agents to Automate Your Work",
    "url": "https://www.youtube.com/watch?v=lqAHw6TwLsk",
    "type": "YouTube",
    "category": "Tools & Frameworks",
    "desc": "Using Perplexity Comet agents to automate common tasks.",
    "level": "Beginner"
  },
  {
    "title": "Stunning VFX Ads for FREE | VEO 3 JSON Prompt",
    "url": "https://www.youtube.com/watch?v=t_RtsLDbfvI",
    "type": "YouTube",
    "category": "Creativity / Tools",
    "desc": "Create VFX-style ads using VEO 3 JSON prompts.",
    "level": "Beginner"
  },
  {
    "title": "Voice Call AI Agent with n8n | Automate Calls & Follow‑Ups",
    "url": "https://www.youtube.com/watch?v=JinTKY1TJZY",
    "type": "YouTube",
    "category": "Automation",
    "desc": "Build voice-call automations and follow-ups using n8n and AI.",
    "level": "Beginner"
  },
  {
    "title": "How AI Models Work — Cursor",
    "url": "https://cursor.com/learn/how-ai-models-work",
    "type": "Article",
    "category": "LLM Foundations",
    "desc": "Clear explanation of model internals, training and inference.",
    "level": "Beginner"
  },
  {
    "title": "Perplexity Pro features you can't miss (Short)",
    "url": "https://www.youtube.com/shorts/cXv2KCN7gFI",
    "type": "YouTube",
    "category": "Tools & Tips",
    "desc": "Short overview of Perplexity Pro features.",
    "level": "Beginner"
  },
  {
    "title": "AI Agents Full Course — Simplilearn (Live)",
    "url": "https://www.youtube.com/live/uXVLyJJLEKA",
    "type": "YouTube Live",
    "category": "Course",
    "desc": "Full course on AI agents (Simplilearn live session).",
    "level": "Beginner"
  },
  {
    "title": "Build an Agentic Voice AI Assistant (MarkTechPost)",
    "url": "https://www.marktechpost.com/2025/11/08/how-to-build-an-agentic-voice-ai-assistant-that-understands-reasons-plans-and-responds-through-autonomous-multi-step-intelligence/",
    "type": "Article",
    "category": "Voice Agents",
    "desc": "Guide to building voice AI assistants that reason, plan and act.",
    "level": "Beginner"
  },
  {
    "title": "Agentic AI Explained — Build & Understand AI Agents",
    "url": "https://www.youtube.com/watch?v=Jj1-zb38Yfw",
    "type": "YouTube",
    "category": "Agentic AI",
    "desc": "Introductory explainer on agentic AI concepts and design.",
    "level": "Beginner"
  },
  {
    "title": "How I Use LLMs — Andrej Karpathy",
    "url": "https://www.youtube.com/watch?v=hmtuvNfytjM",
    "type": "YouTube",
    "category": "LLM Foundations",
    "desc": "Karpathy’s practical workflow and tips for LLMs.",
    "level": "Beginner"
  },
  {
    "title": "Building a Self‑Healing Data Pipeline That Fixes Its Own Python Errors",
    "url": "https://towardsdatascience.com/building-a-self-healing-data-pipeline-that-fixes-its-own-python-errors/",
    "type": "Article",
    "category": "MLOps",
    "desc": "Pattern for pipelines that detect and auto-fix runtime errors.",
    "level": "Beginner"
  },
  {
    "title": "Generative AI Fundamentals — Harvard HKS (Class 1)",
    "url": "https://generative-ai-course.hks.harvard.edu/1-how-genai-works/class-1",
    "type": "Course",
    "category": "Generative AI",
    "desc": "How generative AI works — foundations and limitations.",
    "level": "Beginner"
  },
  {
    "title": "Prompt Engineering — Harvard HKS (Class 4)",
    "url": "https://generative-ai-course.hks.harvard.edu/2-using-genai/class-4",
    "type": "Course",
    "category": "Prompt Engineering",
    "desc": "Practical prompting techniques and prompt engineering principles.",
    "level": "Beginner"
  },
  {
    "title": "System Prompts & RAG — Harvard HKS (Class 5)",
    "url": "https://generative-ai-course.hks.harvard.edu/2-using-genai/class-5",
    "type": "Course",
    "category": "RAG / Prompt Engineering",
    "desc": "System prompts, retrieval-augmented workflows, and use-cases.",
    "level": "Beginner"
  },
  {
    "title": "CS50x 2025 — Artificial Intelligence",
    "url": "https://cs50.harvard.edu/x/weeks/ai/",
    "type": "Course",
    "category": "Education",
    "desc": "CS50-style AI material: neural nets, LLMs, and projects.",
    "level": "Beginner"
  },
  {
    "title": "CS50 Extension — AI & Prompt Engineering (Week 10)",
    "url": "https://cs50.harvard.edu/extension/2025/spring/weeks/10/",
    "type": "Course",
    "category": "Prompt Engineering",
    "desc": "Prompt design and evaluation from CS50 extension materials.",
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
    "title": "LLMs and the End of 'Traditional' Programming",
    "url": "https://www.youtube.com/watch?v=JhCl-GeT4jw",
    "type": "YouTube",
    "category": "Programming / Prompting",
    "desc": "How prompting changes the software development interface.",
    "level": "Beginner"
  },
  {
    "title": "Generative AI & Education (Playlist)",
    "url": "https://www.youtube.com/playlist?list=PL_kRkvxqHjkqjnhAdSdejAkyQf1TnPkNM",
    "type": "Playlist",
    "category": "Education",
    "desc": "Collection exploring how AI reshapes teaching and learning.",
    "level": "Beginner"
  },
  {
    "title": "Teaching with AI — Harvard (HBSP)",
    "url": "https://www.hbsp.harvard.edu/educator-training/teaching-with-ai",
    "type": "Guide",
    "category": "Education",
    "desc": "Practical resources for educators using AI in classrooms.",
    "level": "Beginner"
  },
  {
    "title": "The Basics of Generative AI — HKSSlate",
    "url": "https://sites.google.com/g.harvard.edu/hksslate-genai/the-basics-of-generative-ai",
    "type": "Guide",
    "category": "Generative AI",
    "desc": "A concise, low-jargon introduction to generative AI.",
    "level": "Beginner"
  },
  {
    "title": "Prompt Engineering in Vertex AI — Google Skills",
    "url": "https://www.skills.google/paths/118/course_templates/976",
    "type": "Course",
    "category": "Prompt Engineering",
    "desc": "Write better prompts for Vertex AI and Gemini models.",
    "level": "Beginner"
  },
  {
    "title": "Google Cloud Computing Foundations: Data, ML, and AI",
    "url": "https://www.skills.google/course_templates/156",
    "type": "Course",
    "category": "Cloud / ML",
    "desc": "Cloud fundamentals for data, ML and AI workloads.",
    "level": "Beginner"
  },
  {
    "title": "Prealgebra (Playlist)",
    "url": "https://www.youtube.com/playlist?list=PL4C9296DF81B9EF13",
    "type": "Playlist",
    "category": "Education / Math",
    "desc": "Foundational prealgebra lessons for beginners.",
    "level": "Beginner"
  },
  {
    "title": "Algebra (Playlist)",
    "url": "https://www.youtube.com/playlist?list=PLGbL7EvScmU7ZqJW4HumYdDYv12Wt3yOk",
    "type": "Playlist",
    "category": "Education / Math",
    "desc": "Core algebra concepts and worked examples.",
    "level": "Beginner"
  },
  {
    "title": "Precalculus (Playlist)",
    "url": "https://www.youtube.com/playlist?list=PLGbL7EvScmU7IhqclQ-nvHtMA2RZjDxbs",
    "type": "Playlist",
    "category": "Education / Math",
    "desc": "Precalculus topics bridging algebra and calculus.",
    "level": "Beginner"
  },
  {
    "title": "Calculus (Playlist)",
    "url": "https://www.youtube.com/playlist?list=PLGbL7EvScmU6rozMmQmlDhteEg7WA35z4",
    "type": "Playlist",
    "category": "Education / Math",
    "desc": "Differential and integral calculus explained with examples.",
    "level": "Beginner"
  },
  {
    "title": "Linear Algebra (Playlist)",
    "url": "https://www.youtube.com/playlist?list=PLE7DDD91010BC51F8",
    "type": "Playlist",
    "category": "Education / Math",
    "desc": "Vectors, matrices and linear transforms — AI foundations.",
    "level": "Beginner"
  },
  {
    "title": "Geometry (Playlist)",
    "url": "https://www.youtube.com/playlist?list=PL668AB35C6885A036",
    "type": "Playlist",
    "category": "Education / Math",
    "desc": "Visual and proof-based geometry lessons.",
    "level": "Beginner"
  },
  {
    "title": "Trigonometry (Playlist)",
    "url": "https://www.youtube.com/playlist?list=PL085526F86A268B57",
    "type": "Playlist",
    "category": "Education / Math",
    "desc": "Angles, identities and trig applications.",
    "level": "Beginner"
  },
  {
    "title": "Statistics (Playlist)",
    "url": "https://www.youtube.com/playlist?list=PL5102DFDC6790F3D0",
    "type": "Playlist",
    "category": "Education / Math",
    "desc": "Probability, descriptive stats and inference basics.",
    "level": "Beginner"
  },
  {
    "title": "Probability & Statistics (Playlist)",
    "url": "https://www.youtube.com/playlist?list=PLl8XY7QVSa4aUyZAtL2Hlf_mx3LaSix9B",
    "type": "Playlist",
    "category": "Education / Math",
    "desc": "Probability theory and statistical reasoning.",
    "level": "Beginner"
  },
  {
    "title": "Limits (Playlist)",
    "url": "https://www.youtube.com/playlist?list=PLDAA5D23D46B21257",
    "type": "Playlist",
    "category": "Education / Math",
    "desc": "Limit concepts that underpin calculus.",
    "level": "Beginner"
  },
  {
    "title": "Derivatives (Playlist)",
    "url": "https://www.youtube.com/playlist?list=PLDE077A2EC488104D",
    "type": "Playlist",
    "category": "Education / Math",
    "desc": "Rate-of-change and differentiation techniques.",
    "level": "Beginner"
  },
  {
    "title": "Integrals (Playlist)",
    "url": "https://www.youtube.com/playlist?list=PLECD6CD1B292B9015",
    "type": "Playlist",
    "category": "Education / Math",
    "desc": "Area-under-curve, accumulation and applications.",
    "level": "Beginner"
  },
  {
    "title": "High-Dimensional Data Analysis — Harvard (pll)",
    "url": "https://pll.harvard.edu/course/data-analysis-life-sciences-4-high-dimensional-data-analysis",
    "type": "Course",
    "category": "Statistics / Data Analysis",
    "desc": "Dimension reduction, factor analysis, and scaling techniques.",
    "level": "Beginner"
  },
  {
    "title": "Statistics and R — Harvard (pll)",
    "url": "https://pll.harvard.edu/course/statistics-and-r",
    "type": "Course",
    "category": "Statistics",
    "desc": "Practical statistics with R for data analysis.",
    "level": "Beginner"
  },
  {
    "title": "Data Science: Machine Learning — Harvard (pll)",
    "url": "https://pll.harvard.edu/course/data-science-building-machine-learning-models",
    "type": "Course",
    "category": "Data Science",
    "desc": "Model training, validation, and real-world ML pipelines.",
    "level": "Beginner"
  },
  {
    "title": "CS50: Introduction to Computer Science — Harvard (pll)",
    "url": "https://pll.harvard.edu/course/cs50-introduction-computer-science",
    "type": "Course",
    "category": "Computer Science",
    "desc": "Foundations of programming, algorithms and problem solving.",
    "level": "Beginner"
  },
  {
    "title": "CS50: Introduction to Programming with Scratch — Harvard (pll)",
    "url": "https://pll.harvard.edu/course/cs50s-introduction-programming-scratch",
    "type": "Course",
    "category": "Education",
    "desc": "Beginner-friendly introduction to programming concepts.",
    "level": "Beginner"
  },
  {
    "title": "CS50: Computer Science for Business Professionals — Harvard (pll)",
    "url": "https://pll.harvard.edu/course/cs50s-computer-science-business-professionals",
    "type": "Course",
    "category": "Business / Tech",
    "desc": "CS fundamentals tailored for business professionals.",
    "level": "Beginner"
  },
  {
    "title": "CS50s: Understanding Technology — Harvard (pll)",
    "url": "https://pll.harvard.edu/course/cs50s-understanding-technology",
    "type": "Course",
    "category": "Foundations",
    "desc": "Overview of internet, cybersecurity and multimedia.",
    "level": "Beginner"
  },
  {
    "title": "CS50s: Introduction to AI with Python — Harvard (pll)",
    "url": "https://pll.harvard.edu/course/cs50s-introduction-artificial-intelligence-python/2023-05",
    "type": "Course",
    "category": "AI",
    "desc": "Intro to AI algorithms and Python implementations.",
    "level": "Beginner"
  },
  {
    "title": "CS50s: Introduction to Programming in Python — Harvard (pll)",
    "url": "https://pll.harvard.edu/course/cs50s-introduction-programming-python/2023-05",
    "type": "Course",
    "category": "Programming",
    "desc": "Core Python programming concepts and exercises.",
    "level": "Beginner"
  },
  {
    "title": "CS50s: Web Programming — Harvard (pll)",
    "url": "https://pll.harvard.edu/course/cs50s-web-programming-python-and-javascript/2023-05",
    "type": "Course",
    "category": "Web Development",
    "desc": "Build full-stack projects with Python, JS and SQL.",
    "level": "Beginner"
  },
  {
    "title": "Philo Agents (Playlist)",
    "url": "https://www.youtube.com/playlist?list=PLacQJwuclt_sV-tfZmpT1Ov6jldHl30NR",
    "type": "Playlist",
    "category": "Agentic AI",
    "desc": "Playlist covering philosophical and technical agent topics.",
    "level": "Beginner"
  },
  {
    "title": "Understanding Deep Learning (UDL Book)",
    "url": "https://udlbook.github.io/udlbook/",
    "type": "Book",
    "category": "Deep Learning",
    "desc": "Open-access book explaining deep learning concepts and practice.",
    "level": "Beginner"
  },
  {
    "title": "Google's Agent Whitepaper (Kaggle)",
    "url": "https://www.kaggle.com/whitepaper-agents",
    "type": "Whitepaper",
    "category": "Agentic AI",
    "desc": "Google’s agent whitepaper resources hosted on Kaggle.",
    "level": "Beginner"
  },
  {
    "title": "Agent Companion Whitepaper (Kaggle)",
    "url": "https://www.kaggle.com/whitepaper-agent-companion",
    "type": "Whitepaper",
    "category": "Agentic AI",
    "desc": "Companion materials and dataset references for agent research.",
    "level": "Beginner"
  },
  {
    "title": "Claude Code — Documentation",
    "url": "https://code.claude.com/docs",
    "type": "Documentation",
    "category": "Tools & Frameworks",
    "desc": "Best practices and docs for agentic coding with Claude Code.",
    "level": "Beginner"
  },
  {
    "title": "A Practical Guide to Building Agents — OpenAI (PDF)",
    "url": "https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf",
    "type": "Guide",
    "category": "Agentic AI",
    "desc": "OpenAI’s practical guide and patterns for building agents.",
    "level": "Beginner"
  },
  {
    "title": "MCP with Anthropic — deeplearning.ai short course",
    "url": "https://www.deeplearning.ai/short-courses/mcp-build-rich-context-ai-apps-with-anthropic/",
    "type": "Course",
    "category": "MCP / Agentic AI",
    "desc": "Short course on using MCP to build rich-context AI apps.",
    "level": "Beginner"
  },
  {
    "title": "Building Applications: Vector Databases with Pinecone (deeplearning.ai)",
    "url": "https://www.deeplearning.ai/short-courses/building-applications-vector-databases/",
    "type": "Course",
    "category": "Vector DBs",
    "desc": "Using Pinecone and vector DBs to power retrieval apps.",
    "level": "Beginner"
  },
  {
    "title": "Vector Databases — Embeddings to Apps (deeplearning.ai)",
    "url": "https://www.deeplearning.ai/short-courses/vector-databases-embeddings-applications/",
    "type": "Course",
    "category": "Vector DBs",
    "desc": "From embeddings to production vector-database applications.",
    "level": "Beginner"
  },
  {
    "title": "LLMs as Operating Systems — Agent Memory (deeplearning.ai)",
    "url": "https://www.deeplearning.ai/short-courses/llms-as-operating-systems-agent-memory/",
    "type": "Course",
    "category": "Agent Memory",
    "desc": "Design patterns for memory in agent systems.",
    "level": "Beginner"
  },
  {
    "title": "Building & Evaluating Advanced RAG (deeplearning.ai)",
    "url": "https://www.deeplearning.ai/short-courses/building-evaluating-advanced-rag/",
    "type": "Course",
    "category": "RAG",
    "desc": "Advanced retrieval-augmented generation system design.",
    "level": "Beginner"
  },
  {
    "title": "Building AI Browser Agents (deeplearning.ai)",
    "url": "https://www.deeplearning.ai/short-courses/building-ai-browser-agents/",
    "type": "Course",
    "category": "Agentic AI",
    "desc": "Create browser-based agents that perform web tasks.",
    "level": "Beginner"
  },
  {
    "title": "Evaluating AI Agents (deeplearning.ai)",
    "url": "https://www.deeplearning.ai/short-courses/evaluating-ai-agents/",
    "type": "Course",
    "category": "Evaluation",
    "desc": "Methods and metrics for testing and validating agents.",
    "level": "Beginner"
  },
  {
    "title": "Computer Use with Anthropic — deeplearning.ai short course",
    "url": "https://www.deeplearning.ai/short-courses/building-towards-computer-use-with-anthropic/",
    "type": "Course",
    "category": "Agentic AI",
    "desc": "Enabling AI systems to perform structured computer tasks.",
    "level": "Beginner"
  },
  {
    "title": "Practical Multi-AI Agents & Advanced Use Cases (CrewAI)",
    "url": "https://www.deeplearning.ai/short-courses/practical-multi-ai-agents-and-advanced-use-cases-with-crewai/",
    "type": "Course",
    "category": "Multi-Agent",
    "desc": "Designing and coordinating multiple AI agents in production.",
    "level": "Beginner"
  },
  {
    "title": "Improving Accuracy of LLM Applications (deeplearning.ai)",
    "url": "https://www.deeplearning.ai/short-courses/improving-accuracy-of-llm-applications/",
    "type": "Course",
    "category": "LLM Ops",
    "desc": "Practical techniques to increase LLM reliability and accuracy.",
    "level": "Beginner"
  },
  {
    "title": "AI Agentic Design Patterns with Autogen (deeplearning.ai)",
    "url": "https://www.deeplearning.ai/short-courses/ai-agentic-design-patterns-with-autogen/",
    "type": "Course",
    "category": "Agent Design",
    "desc": "Design patterns for agent orchestration using Autogen.",
    "level": "Beginner"
  },
  {
    "title": "Multi-AI Agent Systems with Crewai (deeplearning.ai)",
    "url": "https://www.deeplearning.ai/short-courses/multi-ai-agent-systems-with-crewai/",
    "type": "Course",
    "category": "Multi-Agent",
    "desc": "Architecting and training systems of cooperating agents.",
    "level": "Beginner"
  },
  {
    "title": "ChatGPT — Prompt Engineering for Developers (deeplearning.ai)",
    "url": "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/",
    "type": "Course",
    "category": "Prompt Engineering",
    "desc": "Practical prompt engineering techniques for developers.",
    "level": "Beginner"
  },
  {
    "title": "Vibe Coding 101 — Code with AI Assistance (deeplearning.ai)",
    "url": "https://www.deeplearning.ai/short-courses/vibe-coding-101-with-replit/",
    "type": "Course",
    "category": "Productivity / Tools",
    "desc": "Coding with AI assistance using Replit.",
    "level": "Beginner"
  },
  {
    "title": "Claude Code — In Action (Skilljar)",
    "url": "https://anthropic.skilljar.com/claude-code-in-action",
    "type": "Course",
    "category": "Tools & Frameworks",
    "desc": "Hands-on examples of using Claude Code for agentic coding.",
    "level": "Beginner"
  },
  {
    "title": "Claude Code — Highly Agentic Coding Assistant (deeplearning.ai)",
    "url": "https://www.deeplearning.ai/short-courses/claude-code-a-highly-agentic-coding-assistant/",
    "type": "Course",
    "category": "Agentic AI",
    "desc": "Course on using Claude Code as an agentic coding assistant.",
    "level": "Beginner"
  },
  {
    "title": "Collaborative Writing & Coding with OpenAI Canvas (deeplearning.ai)",
    "url": "https://www.deeplearning.ai/short-courses/collaborative-writing-and-coding-with-openai-canvas/",
    "type": "Course",
    "category": "Productivity",
    "desc": "Workflows for collaborative AI-assisted writing and coding.",
    "level": "Beginner"
  },
  {
    "title": "AI Agentic Design Patterns — OpenAI / Related Resources",
    "url": "https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf",
    "type": "Guide",
    "category": "Agentic AI",
    "desc": "Practical patterns and examples for building agents.",
    "level": "Beginner"
  },
  {
    "title": "Jam with AI — Substack",
    "url": "https://jamwithai.substack.com/p/the-mother-of-ai-project",
    "type": "Newsletter",
    "category": "Projects",
    "desc": "Project notes and tutorials from the Jam with AI team.",
    "level": "Beginner"
  },
  {
    "title": "NeoSage — The Prompt Lifecycle",
    "url": "https://blog.neosage.io/p/the-prompt-lifecycle-every-ai-engineer",
    "type": "Article",
    "category": "Prompt Engineering",
    "desc": "Operational lifecycle approach to prompt development.",
    "level": "Beginner"
  },
  {
    "title": "RL Continual Learning (blog)",
    "url": "https://cameronrwolfe.substack.com/p/rl-continual-learning",
    "type": "Article",
    "category": "Reinforcement Learning",
    "desc": "Continual RL experiments and practical notes.",
    "level": "Beginner"
  },
  {
    "title": "Cloud Google — ML & AI Learning Path",
    "url": "https://cloud.google.com/learn/training/machinelearning-ai",
    "type": "Training",
    "category": "Cloud / ML",
    "desc": "Google Cloud training for machine learning practitioners.",
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
  { id: '1', name: 'ML Initiate', description: 'Completed 5 Beginner Resources', icon: '🌱', unlocked: false },
  { id: '2', name: 'Deep Learning Smith', description: 'Mastered the basics of Neural Networks', icon: '⚒️', unlocked: false },
  { id: '3', name: 'LLM Architect', description: 'Built your first RAG application', icon: '🏛️', unlocked: false },
  { id: '4', name: 'Agent Commander', description: 'Deployed a multi-agent system', icon: '🤖', unlocked: false },
];
