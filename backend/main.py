from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import time
import os
import google.generativeai as genai
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    # Using gemini-3-flash-preview as gemini-1.5-flash was not found in this environment
    gemini_model = genai.GenerativeModel(
        model_name='gemini-3-flash-preview',
        system_instruction="You are a helpful AI tutor for a learning platform called CognifyAI. Keep your answers concise, encouraging, and easy to understand for beginners."
    )
else:
    gemini_model = None

class ChatRequest(BaseModel):
    message: str

app = FastAPI(title="CognifyAI API", description="FastAPI Backend for Roadmaps")

# Configure CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.getenv("CLIENT_URL"),
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health_check():
    return {
        "status": "ok",
        "service": "CognifyAI FastAPI Backend",
        "timestamp": time.time()
    }

@app.get("/api/roadmaps")
async def get_roadmaps():
    return [
        { 
            "id": 1, 
            "title": "Fullstack Web Development", 
            "level": "Beginner", 
            "description": "Master both frontend and backend development. This comprehensive path takes you from 'Hello World' to deploying production-ready applications.",
            "estimated_time": "6-9 Months",
            "prerequisites": ["No prior coding experience required", "A laptop and internet connection"],
            "tags": ["React", "Python", "PostgreSQL", "Tailwind"],
            "steps": [
                {
                    "title": "1. Web Foundations (HTML & CSS)", 
                    "description": "The visual structure of the web. You'll learn how to create layouts that look great on any device.", 
                    "topics": ["Semantic HTML5", "CSS Box Model", "Flexbox & Grid Layouts", "Responsive Design (Mobile First)", "CSS Variables"],
                    "resources": ["MDN Web Docs - HTML/CSS", "Kevin Powell on YouTube", "freeCodeCamp Responsive Web Design"],
                    "time": "4 Weeks"
                },
                {
                    "title": "2. JavaScript Fundamentals", 
                    "description": "The logic of the web. Learn how to make your websites interactive and handle data.", 
                    "topics": ["Variables & Data Types", "Functions & Scope", "DOM Manipulation", "ES6+ Features (Arrow functions, Destructuring)", "Asynchronous JS (Fetch API, Async/Await)"],
                    "resources": ["JavaScript.info", "Wes Bos JavaScript 30", "Eloquent JavaScript (Book)"],
                    "time": "6 Weeks"
                },
                {
                    "title": "3. Frontend Mastery with React", 
                    "description": "Build modern, fast, and scalable user interfaces using the most popular frontend library.", 
                    "topics": ["JSX & Components", "Props & State Management", "React Hooks (useState, useEffect)", "React Router for Navigation", "State Management (Context API or Redux)"],
                    "resources": ["Official React Docs (beta.reactjs.org)", "Scrimba React Course", "FreeCodeCamp React Tutorial"],
                    "time": "8 Weeks"
                },
                {
                    "title": "4. Backend with Python & FastAPI", 
                    "description": "Learn to build the 'brains' of your application. Create APIs, handle authentication, and process data.", 
                    "topics": ["Python Basics", "FastAPI Framework", "RESTful API Design", "Authentication (JWT)", "Environment Variables & Security"],
                    "resources": ["FastAPI Official Documentation", "Corey Schafer Python Series", "TestDriven.io FastAPI Guide"],
                    "time": "6 Weeks"
                },
                {
                    "title": "5. Databases & Deployment", 
                    "description": "Store user data permanently and share your application with the world.", 
                    "topics": ["PostgreSQL Basics", "SQL Queries (CRUD)", "Object-Relational Mapping (SQLAlchemy)", "Hosting on Vercel/Render", "CI/CD Basics"],
                    "resources": ["SQLZoo", "PostgreSQL Tutorial", "Railway/Render Deployment Docs"],
                    "time": "4 Weeks"
                }
            ]
        },
        { 
            "id": 2, 
            "title": "Artificial Intelligence & ML", 
            "level": "Intermediate", 
            "description": "Go beyond the hype and understand how AI actually works, from basic statistics to Large Language Models (LLMs).",
            "estimated_time": "12-15 Months",
            "prerequisites": ["High School Mathematics", "Basic Python Knowledge"],
            "tags": ["Python", "PyTorch", "Scikit-learn", "Pandas"],
            "steps": [
                {
                    "title": "1. Mathematical Foundations", 
                    "description": "Understand the engine under the hood. You don't need a PhD, but you need to know how numbers move.", 
                    "topics": ["Linear Algebra (Matrices & Vectors)", "Calculus (Derivatives & Gradients)", "Probability & Statistics", "Optimization Algorithms"],
                    "resources": ["3Blue1Brown - Essence of Linear Algebra", "Khan Academy Multivariable Calculus", "Mathematics for Machine Learning (Book)"],
                    "time": "8 Weeks"
                },
                {
                    "title": "2. Data Analysis with Python", 
                    "description": "Learn to clean, manipulate, and visualize data – the first step in any AI project.", 
                    "topics": ["NumPy for Numerical Computing", "Pandas for DataFrames", "Matplotlib & Seaborn for Visualization", "Data Cleaning Techniques"],
                    "resources": ["Kaggle Learn - Pandas", "Pandas Documentation", "Corey Schafer Pandas Series"],
                    "time": "6 Weeks"
                },
                {
                    "title": "3. Classical Machine Learning", 
                    "description": "Learn the algorithms that power recommendations and predictions without 'Deep Learning'.", 
                    "topics": ["Linear & Logistic Regression", "Decision Trees & Random Forests", "K-Nearest Neighbors", "Support Vector Machines", "Scikit-learn Framework"],
                    "resources": ["Andrew Ng's Machine Learning Specialization (Coursera)", "StatQuest with Josh Starmer"],
                    "time": "10 Weeks"
                },
                {
                    "title": "4. Deep Learning & Neural Networks", 
                    "description": "Build systems inspired by the human brain to recognize images and understand patterns.", 
                    "topics": ["Neural Network Architecture", "Backpropagation", "Convolutional Neural Networks (CNNs)", "PyTorch or TensorFlow Frameworks"],
                    "resources": ["Fast.ai - Practical Deep Learning for Coders", "PyTorch Tutorials", "DeepLearning.ai"],
                    "time": "12 Weeks"
                },
                {
                    "title": "5. Generative AI & Transformers", 
                    "description": "The cutting edge. Learn how GPT and other modern AI models are built and used.", 
                    "topics": ["Attention Mechanism", "Transformer Architecture", "Hugging Face Ecosystem", "Fine-tuning LLMs", "Prompt Engineering"],
                    "resources": ["Hugging Face NLP Course", "Andrej Karpathy's 'Zero to Hero' Series", "LangChain Documentation"],
                    "time": "8 Weeks"
                }
            ]
        },
        { 
            "id": 4, 
            "title": "Data Structures & Algorithms", 
            "level": "Beginner", 
            "description": "Master the core of Computer Science. This roadmap is essential for technical interviews and writing efficient code.",
            "estimated_time": "4-6 Months",
            "prerequisites": ["Basic proficiency in at least one programming language (Python, Java, or C++)"],
            "tags": ["Coding Interviews", "Problem Solving", "Computer Science"],
            "steps": [
                {
                    "title": "1. Complexity Analysis (Big O)", 
                    "description": "Learn how to measure the performance of your code before you even run it.", 
                    "topics": ["Time Complexity", "Space Complexity", "Best/Average/Worst Case Scenarios", "Asymptotic Notation"],
                    "resources": ["Big O Cheat Sheet", "HackerRank - Big O Notation Video"],
                    "time": "1 Week"
                },
                {
                    "title": "2. Basic Data Structures", 
                    "description": "Organize your data efficiently using fundamental building blocks.", 
                    "topics": ["Arrays & Strings", "Linked Lists (Singly & Doubly)", "Stacks & Queues", "Hash Tables (Dictionaries)"],
                    "resources": ["GeeksforGeeks Data Structures", "NeetCode Roadmap", "Cracking the Coding Interview"],
                    "time": "6 Weeks"
                },
                {
                    "title": "3. Recursion & Sorting", 
                    "description": "Solve complex problems by breaking them down and master efficient sorting algorithms.", 
                    "topics": ["Base Cases & Recursive Calls", "Binary Search", "Merge Sort & Quick Sort", "Bubble & Insertion Sort (Theory)"],
                    "resources": ["Visualgo.net", "Harvard CS50 Algorithms"],
                    "time": "4 Weeks"
                },
                {
                    "title": "4. Non-Linear Structures", 
                    "description": "Understand hierarchical and networked data models.", 
                    "topics": ["Binary Search Trees", "Heaps & Priority Queues", "Graph Representations (Adjacency Matrix/List)", "BFS & DFS Traversal"],
                    "resources": ["William Fiset's Graph Theory Series", "LeetCode Explore Cards"],
                    "time": "6 Weeks"
                },
                {
                    "title": "5. Advanced Algorithms & DP", 
                    "description": "Learn the most powerful techniques used in top-tier tech companies.", 
                    "topics": ["Dynamic Programming (Memoization & Tabulation)", "Greedy Algorithms", "Backtracking", "Tries & Segment Trees"],
                    "resources": ["NeetCode DP Playlist", "Aditya Verma DP Series", "LeetCode Hard Problems"],
                    "time": "8 Weeks"
                }
            ]
        },
        { 
            "id": 10, 
            "title": "UI/UX Design", 
            "level": "Beginner", 
            "description": "Learn to design beautiful, user-centric interfaces and understand the psychology of user experience.",
            "estimated_time": "3-5 Months",
            "prerequisites": ["No design experience needed", "Curiosity about how people use apps"],
            "tags": ["Figma", "User Research", "Prototyping", "Visual Design"],
            "steps": [
                {
                    "title": "1. Design Principles", 
                    "description": "The fundamentals of visual communication. Learn why some things look 'right' and others don't.", 
                    "topics": ["Color Theory", "Typography & Font Pairing", "Hierarchy & Layout", "Grid Systems", "Contrast & Accessibility"],
                    "resources": ["Interaction Design Foundation", "Design Better by InVision", "YouTube: Flux Academy"],
                    "time": "3 Weeks"
                },
                {
                    "title": "2. Mastering Figma", 
                    "description": "Learn the industry-standard tool for modern interface design.", 
                    "topics": ["Auto Layout", "Components & Variants", "Prototyping Transitions", "Design Systems Basics", "Collaboration & Handoff"],
                    "resources": ["Figma's Official YouTube Channel", "Figma Community Files", "DesignCourse (YouTube)"],
                    "time": "4 Weeks"
                },
                {
                    "title": "3. User Experience (UX) Research", 
                    "description": "Understand your users before you design for them. Focus on empathy and data.", 
                    "topics": ["User Personas", "User Journey Mapping", "Wireframing (Low-Fi)", "Usability Testing", "Information Architecture"],
                    "resources": ["Nielsen Norman Group Blog", "Google UX Design Professional Certificate", "Laws of UX"],
                    "time": "6 Weeks"
                },
                {
                    "title": "4. Advanced UI & Interaction", 
                    "description": "Bring your designs to life with motion and high-fidelity details.", 
                    "topics": ["Micro-interactions", "Design for Mobile vs Web", "Animation in UI", "Style Guides", "Portfolio Building"],
                    "resources": ["Dribbble for Inspiration", "Behance Case Studies", "Awwwards"],
                    "time": "4 Weeks"
                }
            ]
        },
        { 
            "id": 7, 
            "title": "Mobile App Development", 
            "level": "Beginner", 
            "description": "Build apps that live on your phone. Focus on cross-platform development with Flutter.",
            "estimated_time": "6-8 Months",
            "prerequisites": ["Basic understanding of logic", "Mac or PC with 8GB+ RAM"],
            "tags": ["Flutter", "Dart", "Firebase", "State Management"],
            "steps": [
                {
                    "title": "1. Dart Language Foundations", 
                    "description": "Master the programming language behind Flutter.", 
                    "topics": ["Variables & Control Flow", "Object Oriented Programming", "Asynchronous Programming (Futures)", "Streams", "Null Safety"],
                    "resources": ["Dart.dev Documentation", "CodeWithAndrea Dart Course", "Flutterly (YouTube)"],
                    "time": "4 Weeks"
                },
                {
                    "title": "2. Flutter UI Basics", 
                    "description": "Start building screens using widgets – the core building blocks of Flutter.", 
                    "topics": ["Stateless vs Stateful Widgets", "Layout Widgets (Row, Column, Stack)", "Material & Cupertino Design", "Navigation & Routing", "Assets & Fonts"],
                    "resources": ["Flutter Codelabs", "The Net Ninja Flutter Series", "Reso Coder Tutorials"],
                    "time": "6 Weeks"
                },
                {
                    "title": "3. State Management & API Integration", 
                    "description": "Make your app dynamic by connecting it to the internet and managing complex data.", 
                    "topics": ["Provider or Riverpod", "REST API Integration (http/dio)", "JSON Serialization", "Shared Preferences", "Error Handling"],
                    "resources": ["Official Flutter Docs on State Management", "FilledStacks Tutorials", "Flutter Gems"],
                    "time": "8 Weeks"
                },
                {
                    "title": "4. Backend with Firebase", 
                    "description": "Add user authentication, real-time databases, and cloud storage to your apps.", 
                    "topics": ["Firebase Auth", "Cloud Firestore", "Cloud Storage", "Push Notifications", "Firebase Analytics"],
                    "resources": ["Firebase for Flutter Documentation", "FlutterFire Tutorials"],
                    "time": "4 Weeks"
                }
            ]
        }
    ]

@app.get("/api/courses")
async def get_courses():
    return [
        {
            "id": 1,
            "title": "React & Next.js Masterclass",
            "instructor": "Dr. Sarah Chen",
            "duration": "12 hours",
            "rating": 4.9,
            "students": 1250,
            "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
        },
        {
            "id": 2,
            "title": "Python for Data Science",
            "instructor": "Michael Scott",
            "duration": "18 hours",
            "rating": 4.8,
            "students": 2100,
            "image": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60"
        },
        {
            "id": 3,
            "title": "UI/UX Design Essentials",
            "instructor": "Emma Wilson",
            "duration": "10 hours",
            "rating": 5.0,
            "students": 850,
            "image": "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?w=800&auto=format&fit=crop&q=60"
        }
    ]

@app.post("/api/chat")
async def chat(request: ChatRequest):
    if not gemini_model:
        return {"response": "Gemini API key not configured. Please set GEMINI_API_KEY in the backend .env file."}
    
    if not request.message.strip():
        return {"response": "Please ask a question!"}

    try:
        response = gemini_model.generate_content(request.message)
        
        # Check if the response was blocked or is empty
        if response.candidates and len(response.candidates) > 0:
            try:
                return {"response": response.text}
            except ValueError:
                # This happens if the response was blocked by safety filters
                return {"response": "I'm sorry, I cannot answer that question as it was flagged by my safety filters."}
        
        return {"response": "I'm sorry, I couldn't generate a response. Please try rephrasing your question."}
        
    except Exception as e:
        print(f"Gemini Error: {e}")
        # Return a cleaner error message to the frontend instead of raising 500
        return {"response": f"I'm having trouble connecting to my brain right now. Error: {str(e)}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
