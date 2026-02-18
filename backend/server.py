from fastapi import FastAPI, APIRouter, HTTPException, Request, Response
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import uuid
import logging
import httpx
import json
import re
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime, timezone, timedelta
from emergentintegrations.llm.chat import LlmChat, UserMessage

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ============================================================
# SEED DATA
# ============================================================

GITHUB_REPOS = [
    {"github_id": "microsoft/generative-ai-for-beginners", "title": "Generative AI for Beginners", "description": "21-lesson curriculum covering Generative AI fundamentals. Build Gen AI apps with Python and Azure OpenAI.", "category": "Foundations", "level": "Beginner", "stars": 68000, "tags": ["generative-ai", "beginners", "microsoft", "azure"]},
    {"github_id": "microsoft/ai-agents-for-beginners", "title": "AI Agents for Beginners", "description": "18-lesson series on building AI Agents with practical examples and multi-agent frameworks.", "category": "Agentic Architecture", "level": "Beginner", "stars": 14000, "tags": ["agents", "beginners", "microsoft", "multi-agent"]},
    {"github_id": "Microsoft/AI-For-Beginners", "title": "AI For Beginners (Microsoft)", "description": "52-lesson, 24-week AI curriculum covering neural networks, NLP, computer vision, and more.", "category": "Foundations", "level": "Beginner", "stars": 36000, "tags": ["ai", "curriculum", "beginners", "microsoft"]},
    {"github_id": "microsoft/ML-For-Beginners", "title": "ML For Beginners (Microsoft)", "description": "24-week classic Machine Learning curriculum with scikit-learn tutorials and quizzes.", "category": "Foundations", "level": "Beginner", "stars": 70000, "tags": ["machine-learning", "beginners", "scikit-learn"]},
    {"github_id": "dair-ai/Prompt-Engineering-Guide", "title": "Prompt Engineering Guide", "description": "The definitive guide covering prompt engineering techniques, examples, papers, and best practices.", "category": "Foundations", "level": "Beginner", "stars": 53000, "tags": ["prompt-engineering", "llm", "guide", "dair-ai"]},
    {"github_id": "dair-ai/Mathematics-for-ML", "title": "Mathematics for ML", "description": "Essential mathematics for Machine Learning: linear algebra, calculus, and statistics.", "category": "Math", "level": "Beginner", "stars": 7000, "tags": ["mathematics", "linear-algebra", "calculus", "statistics"]},
    {"github_id": "mlabonne/llm-course", "title": "LLM Course", "description": "Comprehensive course on Large Language Models: transformers, fine-tuning, quantization, and RLHF.", "category": "Foundations", "level": "Beginner", "stars": 44000, "tags": ["llm", "transformers", "fine-tuning", "rlhf"]},
    {"github_id": "Asabeneh/30-Days-Of-Python", "title": "30 Days of Python", "description": "30 days of Python programming challenge from beginner to advanced level with examples.", "category": "Foundations", "level": "Beginner", "stars": 43000, "tags": ["python", "beginners", "programming", "challenge"]},
    {"github_id": "Shubhamsaboo/awesome-llm-apps", "title": "Awesome LLM Apps", "description": "A curated collection of awesome LLM applications built with RAG and AI agents.", "category": "Projects", "level": "Beginner", "stars": 12000, "tags": ["llm", "rag", "agents", "projects"]},
    {"github_id": "vchandu111/15-ai-projects", "title": "15 AI Projects", "description": "15 hands-on AI/ML projects with implementations, datasets, and detailed explanations.", "category": "Projects", "level": "Beginner", "stars": 3000, "tags": ["ai-projects", "ml", "python"]},
    {"github_id": "kamranahmedse/developer-roadmap", "title": "Developer Roadmap", "description": "Interactive roadmaps, guides, and educational content for developers at all levels.", "category": "Roadmaps", "level": "Beginner", "stars": 290000, "tags": ["roadmap", "career", "developer", "learning"]},
    {"github_id": "Sumanth077/Hands-On-AI-Engineering", "title": "Hands-On AI Engineering", "description": "Practical AI engineering tutorials covering LLMs, RAG systems, agents, and production deployment.", "category": "Foundations", "level": "Beginner", "stars": 5000, "tags": ["ai-engineering", "llm", "rag", "deployment"]},
    {"github_id": "NirDiamant/GenAI_Agents", "title": "GenAI Agents", "description": "Advanced GenAI agent implementations and patterns with comprehensive tutorials and code.", "category": "Agentic Architecture", "level": "Beginner", "stars": 9000, "tags": ["genai", "agents", "tutorials", "patterns"]},
    {"github_id": "HeyNina101/generative_ai_project", "title": "Generative AI Project Template", "description": "A production-ready template to kickstart your Generative AI projects with structure and scalability.", "category": "Foundations", "level": "Beginner", "stars": 500, "tags": ["template", "generative-ai", "production"]},
    {"github_id": "ishandutta0098/orion", "title": "Orion Agent", "description": "A smart multi-agent system to turn prompts into GitHub PRs automatically.", "category": "Agentic Architecture", "level": "Beginner", "stars": 300, "tags": ["agents", "automation", "github", "pr"]},
    {"github_id": "jlowin/fastmcp", "title": "FastMCP", "description": "The fast, Pythonic way to build MCP servers and clients with minimal boilerplate.", "category": "Infrastructure", "level": "Beginner", "stars": 2000, "tags": ["mcp", "python", "servers", "protocol"]},
    {"github_id": "OpenBMB/ChatDev", "title": "ChatDev", "description": "Dev All through LLM-powered Multi-Agent Collaboration for software development.", "category": "Agentic Architecture", "level": "Beginner", "stars": 26000, "tags": ["multi-agent", "software-dev", "llm", "collaboration"]},
    {"github_id": "ruc-datalab/DeepAnalyze", "title": "DeepAnalyze", "description": "The first agentic LLM for autonomous data science analysis and exploration.", "category": "Agentic Architecture", "level": "Beginner", "stars": 800, "tags": ["data-science", "agents", "autonomous", "analysis"]},
    {"github_id": "HKUDS/RAG-Anything", "title": "RAG-Anything", "description": "All-in-one Multimodal Document Processing RAG system built on LightRAG for any document type.", "category": "Architecture", "level": "Beginner", "stars": 3000, "tags": ["rag", "multimodal", "documents", "lightrag"]},
    {"github_id": "tadata-org/fastapi_mcp", "title": "FastAPI MCP", "description": "Expose secure FastAPI endpoints as MCP tools with minimal setup and authentication.", "category": "Infrastructure", "level": "Beginner", "stars": 1500, "tags": ["fastapi", "mcp", "tools", "authentication"]},
    {"github_id": "instavm/coderunner", "title": "CodeRunner", "description": "Turns LLMs into an instant execution partner that writes and runs code in a preconfigured sandbox.", "category": "Infrastructure", "level": "Beginner", "stars": 400, "tags": ["code-execution", "sandbox", "llm", "automation"]},
    {"github_id": "firecrawl/open-agent-builder", "title": "Open Agent Builder", "description": "Visual workflow builder for AI agents powered by Firecrawl for web-aware automation.", "category": "Agentic Architecture", "level": "Beginner", "stars": 1000, "tags": ["agents", "visual", "workflow", "firecrawl"]},
    {"github_id": "microsoft/agent-lightning", "title": "Agent Lightning", "description": "The absolute trainer to light up AI agents with Microsoft's agent framework.", "category": "Agentic Architecture", "level": "Beginner", "stars": 600, "tags": ["agents", "microsoft", "training", "framework"]},
    {"github_id": "GoogleCloudPlatform/agent-starter-pack", "title": "Agent Starter Pack (Google)", "description": "Ship AI Agents to Google Cloud in minutes with built-in CI/CD and observability.", "category": "Foundations", "level": "Beginner", "stars": 2000, "tags": ["agents", "google-cloud", "deployment", "cicd"]},
    {"github_id": "oraios/serena", "title": "Serena", "description": "Semantic code editing and retrieval for agent-driven coding workflows.", "category": "Infrastructure", "level": "Beginner", "stars": 500, "tags": ["code", "semantic", "agents", "retrieval"]},
    {"github_id": "upstash/context7", "title": "Context7", "description": "Pulls up-to-date, version-specific documentation straight from your code for AI assistants.", "category": "Infrastructure", "level": "Beginner", "stars": 1800, "tags": ["documentation", "context", "ai-assistant", "upstash"]},
    {"github_id": "ollama/ollama", "title": "Ollama", "description": "Run Llama, Mistral, Gemma 3, and other LLMs locally on Mac, Linux, Windows with zero configuration.", "category": "Infrastructure", "level": "Beginner", "stars": 125000, "tags": ["llm", "local", "inference", "deployment"]},
    {"github_id": "langgenius/dify", "title": "Dify", "description": "Open-source LLM app development platform for building AI workflows, chatbots, and autonomous agents.", "category": "Infrastructure", "level": "Beginner", "stars": 73000, "tags": ["llm", "platform", "agents", "chatbot"]},
    {"github_id": "NirDiamant/RAG_Techniques", "title": "RAG Techniques", "description": "Advanced RAG implementation techniques with detailed code examples and benchmarks.", "category": "Architecture", "level": "Beginner", "stars": 22000, "tags": ["rag", "retrieval", "techniques", "advanced"]},
    {"github_id": "donnemartin/system-design-primer", "title": "System Design Primer", "description": "Learn how to design large-scale systems for technical interviews and real-world architecture.", "category": "Engineering", "level": "Beginner", "stars": 280000, "tags": ["system-design", "architecture", "interviews", "scalability"]},
    {"github_id": "chiphuyen/dmls-book", "title": "Designing ML Systems (Book)", "description": "Companion code for the Designing Machine Learning Systems O'Reilly book by Chip Huyen.", "category": "MLOps", "level": "Beginner", "stars": 5000, "tags": ["mlops", "book", "ml-systems", "production"]},
    {"github_id": "GokuMohandas/Made-With-ML", "title": "Made With ML", "description": "Learn ML by creating practical, production-quality machine learning applications step by step.", "category": "MLOps", "level": "Beginner", "stars": 38000, "tags": ["ml", "production", "mlops", "tutorials"]},
    {"github_id": "graviraja/MLOps-Basics", "title": "MLOps Basics", "description": "Learn MLOps basics with hands-on tutorials covering data, model training, CI/CD, and deployment.", "category": "MLOps", "level": "Beginner", "stars": 8000, "tags": ["mlops", "cicd", "deployment", "training"]},
    {"github_id": "openai/spinningup", "title": "Spinning Up (OpenAI)", "description": "OpenAI's educational resource for deep reinforcement learning with clean implementations.", "category": "Education", "level": "Beginner", "stars": 10000, "tags": ["reinforcement-learning", "openai", "education", "deep-rl"]},
    {"github_id": "dennybritz/reinforcement-learning", "title": "Reinforcement Learning Algorithms", "description": "Implementation of Reinforcement Learning algorithms in Python with TensorFlow.", "category": "Education", "level": "Beginner", "stars": 22000, "tags": ["reinforcement-learning", "algorithms", "python", "tensorflow"]},
    {"github_id": "graykode/nlp-tutorial", "title": "NLP Tutorial", "description": "Natural Language Processing tutorial using TensorFlow and PyTorch from basics to BERT.", "category": "Education", "level": "Beginner", "stars": 14000, "tags": ["nlp", "tutorial", "pytorch", "tensorflow", "bert"]},
    {"github_id": "AGI-Edgerunners/LLM-Agents-Papers", "title": "LLM Agents Papers", "description": "Curated collection of must-read papers on LLM-based autonomous agents.", "category": "Foundations", "level": "Beginner", "stars": 4000, "tags": ["llm", "agents", "papers", "research"]},
    {"github_id": "HandsOnLLM/Hands-On-Large-Language-Models", "title": "Hands-On LLMs (O'Reilly Book)", "description": "Code for the Hands-On Large Language Models O'Reilly book with practical examples.", "category": "Education", "level": "Beginner", "stars": 8000, "tags": ["llm", "book", "oreilly", "code"]},
    {"github_id": "going-doer/Paper2Code", "title": "Paper2Code", "description": "Automatically convert research papers into executable, runnable code implementations.", "category": "Projects", "level": "Beginner", "stars": 2000, "tags": ["research", "papers", "code", "automation"]},
    {"github_id": "jamwithai/production-agentic-rag-course", "title": "Production Agentic RAG Course", "description": "Comprehensive course on building production-ready agentic RAG systems with monitoring.", "category": "Education", "level": "Beginner", "stars": 1000, "tags": ["rag", "agents", "production", "course"]},
    {"github_id": "yangshun/tech-interview-handbook", "title": "Tech Interview Handbook", "description": "Curated coding interview guide with best practices, algorithms, and system design prep.", "category": "Engineering", "level": "Beginner", "stars": 120000, "tags": ["interviews", "algorithms", "system-design", "career"]},
    {"github_id": "systemdesign42/system-design-academy", "title": "System Design Academy", "description": "System design learning academy with visual explanations and real-world case studies.", "category": "Engineering", "level": "Beginner", "stars": 3000, "tags": ["system-design", "visual", "academy", "case-studies"]},
    {"github_id": "public-apis/public-apis", "title": "Public APIs List", "description": "A collective list of free APIs for software and web development projects.", "category": "Resources", "level": "Beginner", "stars": 320000, "tags": ["apis", "free", "development", "resources"]},
    {"github_id": "EbookFoundation/free-programming-books", "title": "Free Programming Books", "description": "Free learning resources for programmers in multiple languages and topics.", "category": "Resources", "level": "Beginner", "stars": 340000, "tags": ["books", "free", "programming", "learning"]},
    {"github_id": "x1xhlol/system-prompts-and-models-of-ai-tools", "title": "AI Tools System Prompts", "description": "Collection of system prompts from popular AI tools like Claude, GPT, Gemini, and more.", "category": "Resources", "level": "Beginner", "stars": 5000, "tags": ["system-prompts", "ai-tools", "prompts", "collection"]},
    {"github_id": "bgauryy/open-docs", "title": "Open Docs", "description": "Documentation created to better understand and contribute to open-source AI projects.", "category": "Resources", "level": "Beginner", "stars": 200, "tags": ["documentation", "open-source", "ai"]},
    {"github_id": "cheahjs/free-llm-api-resources", "title": "Free LLM API Resources", "description": "Comprehensive list of free LLM API resources with token limits and usage constraints.", "category": "Resources", "level": "Beginner", "stars": 3000, "tags": ["llm", "api", "free", "resources"]},
    {"github_id": "antfu/nuxt-mcp", "title": "Nuxt MCP", "description": "Nuxt developer tools for route inspection and SSR debugging via MCP protocol.", "category": "Infrastructure", "level": "Beginner", "stars": 800, "tags": ["nuxt", "mcp", "devtools", "ssr"]},
    {"github_id": "CoplayDev/unity-mcp", "title": "Unity MCP", "description": "Interface with Unity game engine APIs for AI-assisted game development.", "category": "Infrastructure", "level": "Beginner", "stars": 600, "tags": ["unity", "mcp", "game-dev", "ai"]},
    {"github_id": "MCPJam/inspector", "title": "MCP Inspector", "description": "Tool for testing and debugging MCP servers by inspecting protocol handshakes and messages.", "category": "Infrastructure", "level": "Beginner", "stars": 1200, "tags": ["mcp", "debugging", "inspector", "protocol"]},
    {"github_id": "czlonkowski/n8n-mcp", "title": "n8n MCP", "description": "Enhances n8n workflow automation by streamlining MCP creation and agent orchestration.", "category": "Infrastructure", "level": "Beginner", "stars": 700, "tags": ["n8n", "mcp", "automation", "workflow"]},
    {"github_id": "Marktechpost/AI-Tutorial-Codes-Included", "title": "MarkTechPost AI Tutorials", "description": "Codes and Notebooks for AI Projects from MarkTechPost tutorials and articles.", "category": "Projects", "level": "Beginner", "stars": 1500, "tags": ["tutorials", "notebooks", "ai", "projects"]},
    {"github_id": "langchain-ai/langchain", "title": "LangChain", "description": "Build context-aware reasoning applications using LangChain's composable AI framework.", "category": "Infrastructure", "level": "Beginner", "stars": 96000, "tags": ["langchain", "llm", "chains", "agents"]},
    {"github_id": "Significant-Gravitas/Auto-GPT", "title": "Auto-GPT", "description": "Experimental open-source autonomous AI agent powered by GPT-4 for task automation.", "category": "Agents", "level": "Beginner", "stars": 167000, "tags": ["auto-gpt", "autonomous", "gpt-4", "agent"]},
    {"github_id": "AUTOMATIC1111/stable-diffusion-webui", "title": "Stable Diffusion WebUI", "description": "Feature-rich web interface for Stable Diffusion image generation with hundreds of extensions.", "category": "Models", "level": "Beginner", "stars": 145000, "tags": ["stable-diffusion", "image-generation", "webui"]},
    {"github_id": "OpenBMB/MiniCPM-o", "title": "MiniCPM-o", "description": "State-of-the-art multimodal LLM series designed for edge and mobile deployment.", "category": "Models", "level": "Beginner", "stars": 3000, "tags": ["multimodal", "llm", "edge", "mobile"]},
    {"github_id": "pydantic/monty", "title": "Pydantic Monty", "description": "Pydantic-powered AI agent library for building structured, validated AI workflows.", "category": "Agents", "level": "Beginner", "stars": 2000, "tags": ["pydantic", "agents", "validation", "structured"]},
    {"github_id": "GetStream/Vision-Agents", "title": "Vision Agents", "description": "Computer vision AI agents using streaming frameworks for real-time visual analysis.", "category": "Agents", "level": "Beginner", "stars": 1500, "tags": ["computer-vision", "agents", "streaming", "real-time"]},
    {"github_id": "hsliuping/TradingAgents-CN", "title": "Trading Agents", "description": "AI trading agents for automated market analysis and trading strategy execution.", "category": "Agents", "level": "Beginner", "stars": 800, "tags": ["trading", "agents", "finance", "automation"]},
    {"github_id": "Jeffallan/claude-skills", "title": "Claude Skills", "description": "Skills and capabilities showcase for Claude AI assistant with practical examples.", "category": "Agents", "level": "Beginner", "stars": 400, "tags": ["claude", "skills", "anthropic", "examples"]},
    {"github_id": "baserow/baserow", "title": "Baserow", "description": "Open-source no-code database and low-code platform with AI integrations and automation.", "category": "Infrastructure", "level": "Beginner", "stars": 8000, "tags": ["no-code", "database", "open-source", "ai"]},
    {"github_id": "punkpeye/awesome-mcp-servers", "title": "Awesome MCP Servers", "description": "A curated collection of Model Context Protocol servers for AI applications.", "category": "Infrastructure", "level": "Beginner", "stars": 15000, "tags": ["mcp", "servers", "awesome-list", "protocol"]},
    {"github_id": "gregorojstersek/resources-to-become-a-great-engineering-leader", "title": "Engineering Leadership Resources", "description": "Curated resources, books, and guides for growing into a great engineering leader.", "category": "Engineering", "level": "Beginner", "stars": 5000, "tags": ["leadership", "engineering", "career", "management"]},
    {"github_id": "github/gh-aw", "title": "GitHub AW", "description": "GitHub's collection of AI workflow tools and automation utilities.", "category": "Engineering", "level": "Beginner", "stars": 200, "tags": ["github", "ai", "workflow", "automation"]},
]

OTHER_RESOURCES = [
    {"type": "newsletter", "title": "AI Engineering Newsletter", "url": "https://aiengineering.beehiiv.com/", "description": "AI engineering updates, tooling, and agent ecosystem news for practitioners.", "category": "Industry / Trends", "level": "Beginner", "tags": ["newsletter", "ai-engineering", "tools"]},
    {"type": "youtube", "title": "Learn LLMs in 2026", "url": "https://youtu.be/U07MHi4Suj8", "description": "Structured roadmap for mastering LLM systems from basics to frontier research.", "category": "LLM Foundations", "level": "Beginner", "tags": ["llm", "roadmap", "2026"]},
    {"type": "youtube", "title": "Gemini 3 + NotebookLM Workflow", "url": "https://www.youtube.com/watch?v=ia6zWjcXgc4", "description": "Using Gemini and NotebookLM for visual AI workflows and research.", "category": "Tools & Frameworks", "level": "Beginner", "tags": ["gemini", "notebooklm", "workflow"]},
    {"type": "guide", "title": "Building Agents from Scratch", "url": "https://www.philschmid.de/building-agents", "description": "End-to-end practical guide for building AI agents from first principles.", "category": "Agentic AI", "level": "Beginner", "tags": ["agents", "guide", "practical"]},
    {"type": "docs", "title": "LangChain DeepAgents CLI", "url": "https://docs.langchain.com/oss/python/deepagents/cli/overview", "description": "LangChain's DeepAgents CLI for structured agent design in Python.", "category": "Agentic AI", "level": "Beginner", "tags": ["langchain", "deepagents", "cli"]},
    {"type": "youtube", "title": "8 Hour AI Agents Course", "url": "https://www.youtube.com/watch?v=ftBWgcwvEk4", "description": "Comprehensive 8-hour overview of AI agent architectures and implementations.", "category": "Agentic AI", "level": "Beginner", "tags": ["agents", "course", "architecture"]},
    {"type": "youtube", "title": "Intro to Large Language Models (Karpathy)", "url": "https://www.youtube.com/watch?v=zjkBMFhNj_g", "description": "High-level introduction to LLM concepts, training, and inference by Andrej Karpathy.", "category": "LLM Foundations", "level": "Beginner", "tags": ["llm", "intro", "karpathy"]},
    {"type": "youtube", "title": "Stanford CS229 Machine Learning", "url": "https://www.youtube.com/watch?v=9vM4p9NN0Ts", "description": "Core ML algorithms, theory, and implementations from Stanford's famous CS229 course.", "category": "Machine Learning", "level": "Beginner", "tags": ["stanford", "cs229", "ml", "algorithms"]},
    {"type": "youtube", "title": "Agentic AI: Stanford Webinar", "url": "https://www.youtube.com/watch?v=kJLiOGle3Lw", "description": "Progression of language model usage into autonomous agentic AI systems.", "category": "Agentic AI", "level": "Beginner", "tags": ["agents", "stanford", "language-models"]},
    {"type": "youtube", "title": "Building and Evaluating AI Agents", "url": "https://www.youtube.com/watch?v=d5EltXhbcfA", "description": "Critical evaluation frameworks for assessing agent reliability and performance.", "category": "Agentic AI", "level": "Beginner", "tags": ["agents", "evaluation", "reliability"]},
    {"type": "article", "title": "Building Effective Agents (Anthropic Blog)", "url": "https://www.anthropic.com/engineering/building-effective-agents", "description": "Best practices for robust, reliable multi-step agent systems from Anthropic engineering.", "category": "Agentic AI", "level": "Beginner", "tags": ["anthropic", "agents", "best-practices"]},
    {"type": "paper", "title": "ReAct: Reasoning + Acting in LLMs", "url": "https://arxiv.org/abs/2210.03629", "description": "Combines reasoning traces and task-specific actions in language models for better problem solving.", "category": "Agentic AI", "level": "Beginner", "tags": ["react", "reasoning", "acting", "arxiv"]},
    {"type": "paper", "title": "Generative Agents: Interactive Simulacra", "url": "https://arxiv.org/abs/2304.03442", "description": "Simulated human-like agents with memory, planning, and social interaction capabilities.", "category": "Agentic AI", "level": "Beginner", "tags": ["generative-agents", "memory", "planning"]},
    {"type": "paper", "title": "Toolformer: LLMs That Can Use Tools", "url": "https://proceedings.neurips.cc/paper_files/paper/2023/file/d842425e4bf79ba039352da0f658a906-Paper-Conference.pdf", "description": "Teaching LLMs to use external tools autonomously via self-supervised learning.", "category": "Agentic AI", "level": "Beginner", "tags": ["toolformer", "tools", "self-supervised"]},
    {"type": "paper", "title": "Chain of Thought Prompting", "url": "https://arxiv.org/pdf/2201.11903", "description": "Improves LLM reasoning via intermediate step-by-step reasoning chains.", "category": "Prompt Engineering", "level": "Beginner", "tags": ["chain-of-thought", "reasoning", "prompting"]},
    {"type": "paper", "title": "Tree of Thoughts (ToT)", "url": "https://arxiv.org/pdf/2305.10601", "description": "Multi-branch tree search reasoning strategy for complex LLM problem solving.", "category": "Prompt Engineering", "level": "Beginner", "tags": ["tree-of-thoughts", "reasoning", "search"]},
    {"type": "paper", "title": "Reflexion: Language Agents with Verbal Reinforcement", "url": "https://proceedings.neurips.cc/paper_files/paper/2023/file/1b44b878bb782e6954cd888628510e90-Paper-Conference.pdf", "description": "Self-reflective agent learning with verbal reinforcement feedback.", "category": "Agentic AI", "level": "Beginner", "tags": ["reflexion", "self-reflection", "learning"]},
    {"type": "paper", "title": "RAG: Retrieval-Augmented Generation Survey", "url": "https://arxiv.org/pdf/2312.10997", "description": "Comprehensive survey of retrieval-augmented generation methods, techniques, and benchmarks.", "category": "RAG", "level": "Beginner", "tags": ["rag", "survey", "retrieval"]},
    {"type": "course", "title": "HuggingFace LLM Course", "url": "https://huggingface.co/learn/llm-course/chapter1/1", "description": "From transformers to production LLM deployment — HuggingFace's free comprehensive course.", "category": "LLM Foundations", "level": "Beginner", "tags": ["huggingface", "llm", "transformers", "free"]},
    {"type": "course", "title": "HuggingFace Agents Course", "url": "https://huggingface.co/learn/agents-course/unit0/introduction", "description": "Production-grade AI agent development with HuggingFace tools and frameworks.", "category": "Agentic AI", "level": "Beginner", "tags": ["huggingface", "agents", "production"]},
    {"type": "course", "title": "HuggingFace Deep RL Course", "url": "https://huggingface.co/learn/deep-rl-course/unit0/introduction", "description": "Train agents through deep reinforcement learning with Stable Baselines3.", "category": "RL", "level": "Beginner", "tags": ["deep-rl", "huggingface", "reinforcement-learning"]},
    {"type": "course", "title": "FastAI Practical Deep Learning", "url": "https://course.fast.ai/", "description": "Hands-on PyTorch-based deep learning course using a top-down practical approach.", "category": "Deep Learning", "level": "Beginner", "tags": ["fastai", "pytorch", "deep-learning", "practical"]},
    {"type": "course", "title": "Karpathy Zero to Hero", "url": "https://karpathy.ai/zero-to-hero.html", "description": "Build GPT models from absolute scratch — Andrej Karpathy's legendary neural network series.", "category": "Deep Learning", "level": "Beginner", "tags": ["karpathy", "gpt", "neural-networks", "scratch"]},
    {"type": "book", "title": "Probabilistic ML Foundations (Murphy)", "url": "https://probml.github.io/pml-book/book1.html", "description": "Comprehensive mathematical foundation of ML with a probabilistic framework.", "category": "Machine Learning", "level": "Beginner", "tags": ["probability", "ml", "textbook", "math"]},
    {"type": "book", "title": "Fairness and Machine Learning", "url": "https://fairmlbook.org/", "description": "Bias detection, fairness metrics, and responsible AI design principles.", "category": "Responsible AI", "level": "Beginner", "tags": ["fairness", "bias", "responsible-ai"]},
    {"type": "course", "title": "MLOps Short Course (DeepLearning.ai)", "url": "https://www.deeplearning.ai/short-courses/llmops/", "description": "Deployment and monitoring of LLM systems in production environments.", "category": "MLOps", "level": "Beginner", "tags": ["mlops", "deployment", "monitoring", "llm"]},
    {"type": "youtube", "title": "Production ML Deployment (FastAPI + Docker + AWS)", "url": "https://www.youtube.com/watch?v=-dJPoLm_gtE", "description": "Deploy ML models into production with FastAPI, Docker, and AWS.", "category": "Deployment", "level": "Beginner", "tags": ["fastapi", "docker", "aws", "deployment"]},
    {"type": "youtube", "title": "How We Build Effective Agents — Anthropic", "url": "https://www.youtube.com/watch?v=D7_ipDqhtwk", "description": "Anthropic engineer Barry Zhang on designing effective multi-step agent systems.", "category": "Agentic AI", "level": "Beginner", "tags": ["anthropic", "agents", "multi-step"]},
    {"type": "youtube", "title": "Building Agents with MCP — Full Workshop", "url": "https://www.youtube.com/watch?v=kQmXtrmQ5Zg", "description": "Full MCP workshop (Mahesh Murag, Anthropic) on model-context protocol for agents.", "category": "MCP / Agentic AI", "level": "Beginner", "tags": ["mcp", "workshop", "anthropic"]},
    {"type": "youtube", "title": "Lets Build An Agent from Scratch", "url": "https://www.youtube.com/watch?v=xzXdLRUyjUg", "description": "Hands-on tutorial building an AI agent from first principles with minimal libraries.", "category": "Agentic AI", "level": "Beginner", "tags": ["agents", "tutorial", "scratch"]},
    {"type": "youtube", "title": "Voice Call AI Agent with n8n", "url": "https://www.youtube.com/watch?v=JinTKY1TJZY", "description": "Build voice-call automations and follow-ups using n8n and AI agents.", "category": "Automation", "level": "Beginner", "tags": ["n8n", "voice", "automation", "agents"]},
    {"type": "youtube", "title": "How I Use LLMs — Andrej Karpathy", "url": "https://www.youtube.com/watch?v=hmtuvNfytjM", "description": "Karpathy's practical workflow, tips and mental models for working with LLMs.", "category": "LLM Foundations", "level": "Beginner", "tags": ["karpathy", "llm", "workflow", "tips"]},
    {"type": "youtube", "title": "How GPT-4 Really Works", "url": "https://www.youtube.com/watch?v=vw-KWfKwvTQ", "description": "Deep dive into GPT-4 internals, training process, and capabilities.", "category": "LLM Foundations", "level": "Beginner", "tags": ["gpt-4", "internals", "training"]},
    {"type": "youtube", "title": "All ML Concepts Explained in 22 Minutes", "url": "https://www.youtube.com/watch?v=Fa_V9fP2tpU", "description": "Fast, structured overview of all major machine learning concept families.", "category": "Learning", "level": "Beginner", "tags": ["ml", "overview", "concepts"]},
    {"type": "youtube", "title": "Built a Social Media Team With 1 AI Agent", "url": "https://www.youtube.com/watch?v=r2bxV2CHu5U", "description": "Case study automating an entire social media team using a single AI agent.", "category": "Agentic AI", "level": "Beginner", "tags": ["agents", "automation", "social-media"]},
    {"type": "youtube", "title": "Agentic AI Explained", "url": "https://www.youtube.com/watch?v=Jj1-zb38Yfw", "description": "Introductory explainer on agentic AI concepts, design, and practical applications.", "category": "Agentic AI", "level": "Beginner", "tags": ["agents", "explained", "intro"]},
    {"type": "youtube", "title": "Production-Grade ML Project Tutorial", "url": "https://www.youtube.com/watch?v=2BvLAJwvfgo", "description": "Guidance on building maintainable, production-quality ML systems.", "category": "ML Engineering", "level": "Beginner", "tags": ["production", "ml", "systems"]},
    {"type": "youtube", "title": "Stanford CS229 — ML Additional Lectures", "url": "https://www.youtube.com/watch?v=jGwO_UgTS7I", "description": "Additional CS229 lecture content with deep dives into ML algorithms.", "category": "Machine Learning", "level": "Beginner", "tags": ["stanford", "ml", "lectures"]},
    {"type": "course", "title": "CS50: Intro to AI with Python (Harvard)", "url": "https://pll.harvard.edu/course/cs50s-introduction-artificial-intelligence-python/2023-05", "description": "Harvard CS50-style AI course: search, inference, learning, and neural networks in Python.", "category": "AI", "level": "Beginner", "tags": ["harvard", "cs50", "python", "ai"]},
    {"type": "course", "title": "Generative AI Fundamentals — Harvard HKS", "url": "https://generative-ai-course.hks.harvard.edu/1-how-genai-works/class-1", "description": "How generative AI works — foundations, capabilities, and limitations from Harvard.", "category": "Generative AI", "level": "Beginner", "tags": ["harvard", "genai", "fundamentals"]},
    {"type": "course", "title": "Prompt Engineering — Harvard HKS", "url": "https://generative-ai-course.hks.harvard.edu/2-using-genai/class-4", "description": "Practical prompting techniques and prompt engineering principles from Harvard.", "category": "Prompt Engineering", "level": "Beginner", "tags": ["harvard", "prompt-engineering"]},
    {"type": "course", "title": "System Prompts & RAG — Harvard HKS", "url": "https://generative-ai-course.hks.harvard.edu/2-using-genai/class-5", "description": "System prompts, retrieval-augmented workflows, and use-cases from Harvard.", "category": "RAG / Prompt Engineering", "level": "Beginner", "tags": ["harvard", "rag", "system-prompts"]},
    {"type": "course", "title": "Prompt Engineering in Vertex AI — Google", "url": "https://www.skills.google/paths/118/course_templates/976", "description": "Write better prompts for Vertex AI and Gemini models from Google's official skills path.", "category": "Prompt Engineering", "level": "Beginner", "tags": ["google", "vertex-ai", "gemini", "prompts"]},
    {"type": "course", "title": "NVIDIA — Generative AI Explained", "url": "https://learn.nvidia.com/courses/course-detail?course_id=course-v1:DLI+S-FX-07+V1", "description": "Beginner-friendly course on generative AI concepts from NVIDIA Deep Learning Institute.", "category": "Foundations", "level": "Beginner", "tags": ["nvidia", "genai", "explained"]},
    {"type": "course", "title": "MCP with Anthropic (DeepLearning.ai)", "url": "https://www.deeplearning.ai/short-courses/mcp-build-rich-context-ai-apps-with-anthropic/", "description": "Short course on using MCP to build rich-context AI applications.", "category": "MCP / Agentic AI", "level": "Beginner", "tags": ["mcp", "anthropic", "context"]},
    {"type": "course", "title": "Vector Databases with Pinecone", "url": "https://www.deeplearning.ai/short-courses/building-applications-vector-databases/", "description": "Using Pinecone and vector databases to power retrieval applications.", "category": "Vector DBs", "level": "Beginner", "tags": ["vector-db", "pinecone", "retrieval"]},
    {"type": "course", "title": "Building & Evaluating Advanced RAG", "url": "https://www.deeplearning.ai/short-courses/building-evaluating-advanced-rag/", "description": "Advanced retrieval-augmented generation system design and evaluation techniques.", "category": "RAG", "level": "Beginner", "tags": ["rag", "advanced", "evaluation"]},
    {"type": "course", "title": "Multi-AI Agents with CrewAI", "url": "https://www.deeplearning.ai/short-courses/multi-ai-agent-systems-with-crewai/", "description": "Architecting and training systems of cooperating AI agents with CrewAI.", "category": "Multi-Agent", "level": "Beginner", "tags": ["crewai", "multi-agent", "orchestration"]},
    {"type": "course", "title": "ChatGPT Prompt Engineering for Developers", "url": "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/", "description": "Practical prompt engineering techniques for developers using the OpenAI API.", "category": "Prompt Engineering", "level": "Beginner", "tags": ["prompt-engineering", "chatgpt", "openai"]},
    {"type": "course", "title": "AI Agentic Design Patterns (Autogen)", "url": "https://www.deeplearning.ai/short-courses/ai-agentic-design-patterns-with-autogen/", "description": "Design patterns for agent orchestration using Microsoft Autogen framework.", "category": "Agent Design", "level": "Beginner", "tags": ["autogen", "design-patterns", "orchestration"]},
    {"type": "course", "title": "Claude Code — Agentic Coding Assistant", "url": "https://www.deeplearning.ai/short-courses/claude-code-a-highly-agentic-coding-assistant/", "description": "Course on using Claude Code as a highly agentic coding assistant.", "category": "Agentic AI", "level": "Beginner", "tags": ["claude", "coding", "agentic"]},
    {"type": "course", "title": "Evaluating AI Agents (DeepLearning.ai)", "url": "https://www.deeplearning.ai/short-courses/evaluating-ai-agents/", "description": "Methods and metrics for testing and validating AI agent systems in production.", "category": "Evaluation", "level": "Beginner", "tags": ["evaluation", "testing", "agents"]},
    {"type": "book", "title": "Understanding Deep Learning (UDL Book)", "url": "https://udlbook.github.io/udlbook/", "description": "Open-access book explaining deep learning concepts and practice with clarity.", "category": "Deep Learning", "level": "Beginner", "tags": ["deep-learning", "open-access", "textbook"]},
    {"type": "book", "title": "Deep Learning (Goodfellow et al.)", "url": "https://www.deeplearningbook.org/", "description": "The canonical deep learning textbook by Goodfellow, Bengio, and Courville.", "category": "Deep Learning", "level": "Beginner", "tags": ["deep-learning", "goodfellow", "canonical"]},
    {"type": "book", "title": "Reinforcement Learning — Sutton & Barto", "url": "https://www.andrew.cmu.edu/course/10-703/textbook/BartoSutton.pdf", "description": "Classic RL textbook covering foundational algorithms and mathematical theory.", "category": "Reinforcement Learning", "level": "Beginner", "tags": ["reinforcement-learning", "sutton", "barto", "classic"]},
    {"type": "book", "title": "Multi-Agent Reinforcement Learning", "url": "https://marl-book.com/", "description": "Concepts, algorithms, and frameworks for multi-agent reinforcement learning systems.", "category": "Multi-Agent / RL", "level": "Beginner", "tags": ["multi-agent", "rl", "algorithms"]},
    {"type": "whitepaper", "title": "Google's Agent Whitepaper (Kaggle)", "url": "https://www.kaggle.com/whitepaper-agents", "description": "Google's comprehensive agent whitepaper with research and resources.", "category": "Agentic AI", "level": "Beginner", "tags": ["google", "agents", "whitepaper"]},
    {"type": "guide", "title": "A Practical Guide to Building Agents — OpenAI", "url": "https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf", "description": "OpenAI's official practical guide and patterns for production agent systems.", "category": "Agentic AI", "level": "Beginner", "tags": ["openai", "agents", "production"]},
    {"type": "docs", "title": "Claude Code Documentation", "url": "https://code.claude.com/docs", "description": "Best practices and docs for agentic coding with Claude Code.", "category": "Tools & Frameworks", "level": "Beginner", "tags": ["claude", "code", "docs"]},
    {"type": "article", "title": "How AI Models Work — Cursor", "url": "https://cursor.com/learn/how-ai-models-work", "description": "Clear explanation of AI model internals, training and inference by Cursor.", "category": "LLM Foundations", "level": "Beginner", "tags": ["cursor", "models", "training", "inference"]},
    {"type": "article", "title": "The Prompt Lifecycle — NeoSage", "url": "https://blog.neosage.io/p/the-prompt-lifecycle-every-ai-engineer", "description": "Lifecycle approach to prompt design for production AI engineer systems.", "category": "Prompt Engineering", "level": "Beginner", "tags": ["prompts", "lifecycle", "production"]},
    {"type": "course", "title": "LLMs as Operating Systems — Agent Memory", "url": "https://www.deeplearning.ai/short-courses/llms-as-operating-systems-agent-memory/", "description": "Design patterns for memory in agent systems — LLMs as Operating Systems.", "category": "Agent Memory", "level": "Beginner", "tags": ["memory", "agents", "os-patterns"]},
    {"type": "course", "title": "Building AI Browser Agents", "url": "https://www.deeplearning.ai/short-courses/building-ai-browser-agents/", "description": "Create browser-based agents that perform complex web tasks autonomously.", "category": "Agentic AI", "level": "Beginner", "tags": ["browser", "agents", "web"]},
    {"type": "course", "title": "Vibe Coding 101 with Replit (DeepLearning.ai)", "url": "https://www.deeplearning.ai/short-courses/vibe-coding-101-with-replit/", "description": "Coding with AI assistance using Replit — the new era of software development.", "category": "Productivity / Tools", "level": "Beginner", "tags": ["replit", "vibe-coding", "ai-assisted"]},
    {"type": "youtube", "title": "Perplexity Comet Agents to Automate Work", "url": "https://www.youtube.com/watch?v=lqAHw6TwLsk", "description": "Using Perplexity Comet agents to automate common work tasks.", "category": "Tools & Frameworks", "level": "Beginner", "tags": ["perplexity", "agents", "automation"]},
    {"type": "youtube", "title": "Voice Agent to Attend Calls", "url": "https://youtu.be/HGBMr1RQliY", "description": "Demo: building a voice agent that can attend and summarize phone calls.", "category": "Voice Agents", "level": "Beginner", "tags": ["voice", "agents", "calls"]},
    {"type": "article", "title": "Self-Healing Data Pipeline Tutorial", "url": "https://towardsdatascience.com/building-a-self-healing-data-pipeline-that-fixes-its-own-python-errors/", "description": "Pattern for pipelines that automatically detect and fix runtime errors.", "category": "MLOps", "level": "Beginner", "tags": ["pipelines", "mlops", "self-healing"]},
    {"type": "guide", "title": "424-Page Agentic Design Patterns Book", "url": "https://docs.google.com/document/d/1rsaK53T3Lg5KoGwvf8ukOUvbELRtH-V0LnOIFDxBryE/preview", "description": "Comprehensive 424-page guide to agentic design patterns and frameworks.", "category": "Agent Design", "level": "Beginner", "tags": ["design-patterns", "agents", "comprehensive"]},
]

# ============================================================
# MODELS
# ============================================================

class SessionRequest(BaseModel):
    session_id: str

class BookmarkRequest(BaseModel):
    resource_id: str

# ============================================================
# STARTUP SEED
# ============================================================

@app.on_event("startup")
async def startup():
    count = await db.resources.count_documents({})
    if count == 0:
        docs = []
        for repo in GITHUB_REPOS:
            docs.append({
                "resource_id": f"res_{uuid.uuid4().hex[:12]}",
                "type": "github",
                "url": f"https://github.com/{repo['github_id']}",
                **repo,
                "created_at": datetime.now(timezone.utc).isoformat()
            })
        for res in OTHER_RESOURCES:
            docs.append({
                "resource_id": f"res_{uuid.uuid4().hex[:12]}",
                **res,
                "created_at": datetime.now(timezone.utc).isoformat()
            })
        if docs:
            await db.resources.insert_many(docs)
        try:
            await db.resources.create_index([
                ("title", "text"), ("description", "text"),
                ("category", "text"), ("tags", "text")
            ])
        except Exception as e:
            logger.warning(f"Index creation: {e}")
        logger.info(f"Seeded {len(docs)} resources")

# ============================================================
# AUTH HELPERS
# ============================================================

async def get_current_user(request: Request):
    token = request.cookies.get("session_token")
    if not token:
        auth = request.headers.get("Authorization", "")
        if auth.startswith("Bearer "):
            token = auth[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    session = await db.user_sessions.find_one({"session_token": token}, {"_id": 0})
    if not session:
        raise HTTPException(status_code=401, detail="Invalid session")
    expires_at = session["expires_at"]
    if isinstance(expires_at, str):
        expires_at = datetime.fromisoformat(expires_at)
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    if expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=401, detail="Session expired")
    user = await db.users.find_one({"user_id": session["user_id"]}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user

async def get_optional_user(request: Request):
    try:
        return await get_current_user(request)
    except HTTPException:
        return None

# ============================================================
# AUTH ENDPOINTS
# ============================================================

@api_router.post("/auth/session")
async def auth_session(req: SessionRequest, response: Response):
    # REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
    async with httpx.AsyncClient() as hc:
        resp = await hc.get(
            "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data",
            headers={"X-Session-ID": req.session_id}
        )
        if resp.status_code != 200:
            raise HTTPException(status_code=401, detail="Invalid session")
        data = resp.json()

    email = data["email"]
    session_token = data["session_token"]

    user = await db.users.find_one({"email": email}, {"_id": 0})
    if not user:
        user_id = f"user_{uuid.uuid4().hex[:12]}"
        user = {
            "user_id": user_id, "email": email, "name": data["name"],
            "picture": data.get("picture", ""), "bookmarks": [],
            "completed": [], "badges": [],
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        await db.users.insert_one({**user})
    else:
        user_id = user["user_id"]

    expires_at = datetime.now(timezone.utc) + timedelta(days=7)
    await db.user_sessions.insert_one({
        "user_id": user_id, "session_token": session_token,
        "expires_at": expires_at.isoformat(),
        "created_at": datetime.now(timezone.utc).isoformat()
    })

    response.set_cookie(
        "session_token", session_token, max_age=7*24*3600,
        httponly=True, secure=True, samesite="none", path="/"
    )
    return {"user": {k: v for k, v in user.items() if k != "_id"}}

@api_router.get("/auth/me")
async def get_me(request: Request):
    user = await get_current_user(request)
    return {k: v for k, v in user.items() if k != "_id"}

@api_router.post("/auth/logout")
async def logout(request: Request, response: Response):
    token = request.cookies.get("session_token")
    if token:
        await db.user_sessions.delete_one({"session_token": token})
    response.delete_cookie("session_token", path="/", samesite="none", secure=True)
    return {"message": "Logged out"}

# ============================================================
# RESOURCES ENDPOINTS
# ============================================================

@api_router.get("/resources")
async def get_resources(
    type: Optional[str] = None,
    category: Optional[str] = None,
    level: Optional[str] = None,
    limit: int = 50,
    skip: int = 0
):
    query = {}
    if type and type != "all":
        query["type"] = type
    if category:
        query["category"] = {"$regex": category, "$options": "i"}
    if level:
        query["level"] = level
    resources = await db.resources.find(query, {"_id": 0}).skip(skip).limit(limit).to_list(limit)
    total = await db.resources.count_documents(query)
    return {"resources": resources, "total": total}

@api_router.get("/resources/categories")
async def get_categories():
    pipeline = [
        {"$group": {"_id": "$category", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]
    cats = await db.resources.aggregate(pipeline).to_list(100)
    return {"categories": [c["_id"] for c in cats if c["_id"]]}

@api_router.get("/resources/stats")
async def get_stats():
    total = await db.resources.count_documents({})
    github_count = await db.resources.count_documents({"type": "github"})
    course_count = await db.resources.count_documents({"type": "course"})
    paper_count = await db.resources.count_documents({"type": "paper"})
    return {"total": total, "github": github_count, "courses": course_count, "papers": paper_count}

@api_router.get("/search")
async def search_resources(q: str = "", limit: int = 50):
    if not q.strip():
        return {"resources": [], "total": 0, "query": q}

    keywords = [q]
    try:
        llm_key = os.environ.get("EMERGENT_LLM_KEY")
        if llm_key and len(q.strip()) > 3:
            chat = LlmChat(
                api_key=llm_key,
                session_id=f"search_{uuid.uuid4().hex[:8]}",
                system_message="""You are an AI search query enhancer for an AI learning platform.
Extract the most relevant search keywords from the user's query.
Return ONLY valid JSON: {"keywords": ["keyword1", "keyword2", "keyword3"]}
Keep keywords concise and directly relevant to AI/ML topics. Max 5 keywords."""
            ).with_model("gemini", "gemini-3-flash-preview")
            msg = UserMessage(text=f"Query: {q}")
            ai_resp = await chat.send_message(msg)
            match = re.search(r'\{.*?\}', ai_resp, re.DOTALL)
            if match:
                parsed = json.loads(match.group())
                kws = parsed.get("keywords", [])
                if kws:
                    keywords = list(set([q] + kws))
    except Exception as e:
        logger.warning(f"AI search enhancement failed: {e}")

    regex_patterns = [{"$regex": kw, "$options": "i"} for kw in keywords]
    mongo_query = {"$or": [
        {"title": {"$in": regex_patterns}},
        {"description": {"$in": regex_patterns}},
        {"category": {"$in": regex_patterns}},
        {"tags": {"$elemMatch": {"$in": regex_patterns}}}
    ]}
    resources = await db.resources.find(mongo_query, {"_id": 0}).limit(limit).to_list(limit)
    return {"resources": resources, "total": len(resources), "query": q, "keywords": keywords}

# ============================================================
# BOOKMARKS ENDPOINTS
# ============================================================

@api_router.get("/bookmarks")
async def get_bookmarks(request: Request):
    user = await get_current_user(request)
    bms = user.get("bookmarks", [])
    if not bms:
        return {"resources": []}
    resources = await db.resources.find({"resource_id": {"$in": bms}}, {"_id": 0}).to_list(200)
    return {"resources": resources}

@api_router.post("/bookmarks/{resource_id}")
async def add_bookmark(resource_id: str, request: Request):
    user = await get_current_user(request)
    await db.users.update_one({"user_id": user["user_id"]}, {"$addToSet": {"bookmarks": resource_id}})
    return {"message": "Bookmarked"}

@api_router.delete("/bookmarks/{resource_id}")
async def remove_bookmark(resource_id: str, request: Request):
    user = await get_current_user(request)
    await db.users.update_one({"user_id": user["user_id"]}, {"$pull": {"bookmarks": resource_id}})
    return {"message": "Removed"}

# ============================================================
# PROGRESS ENDPOINTS
# ============================================================

@api_router.post("/progress/{resource_id}")
async def mark_complete(resource_id: str, request: Request):
    user = await get_current_user(request)
    await db.users.update_one({"user_id": user["user_id"]}, {"$addToSet": {"completed": resource_id}})
    updated = await db.users.find_one({"user_id": user["user_id"]}, {"_id": 0})
    count = len(updated.get("completed", []))
    badges = updated.get("badges", [])
    new_badges = []
    badge_thresholds = [(1, "ML Initiate"), (5, "Knowledge Seeker"), (15, "Deep Learning Smith"), (30, "LLM Architect"), (50, "Frontier Explorer")]
    for threshold, badge in badge_thresholds:
        if count >= threshold and badge not in badges:
            new_badges.append(badge)
    if new_badges:
        await db.users.update_one({"user_id": user["user_id"]}, {"$push": {"badges": {"$each": new_badges}}})
    return {"message": "Marked complete", "new_badges": new_badges, "total_completed": count}

@api_router.delete("/progress/{resource_id}")
async def unmark_complete(resource_id: str, request: Request):
    user = await get_current_user(request)
    await db.users.update_one({"user_id": user["user_id"]}, {"$pull": {"completed": resource_id}})
    return {"message": "Unmarked"}

# ============================================================
# APP SETUP
# ============================================================

app.include_router(api_router)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
