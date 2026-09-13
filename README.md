# 🚀 Developer Portfolio Template
A free, modern, and responsive developer portfolio template built with React and Vite. Easily customize your name, projects, skills, experience, social links, colors, and personal information to create your own professional portfolio website.
<div align="center">

  <img src="src/assets/main.png" alt="Portfolio Logo" width="100" height="auto" />

  <p align="center">
    A modern, responsive developer portfolio template built with React and Vite.
  </p>

  <p align="center">
    <a href="#-features">Features</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-customization">Customization</a> •
    <a href="#-deployment">Deployment</a>
  </p>

</div>

---

## 📖 About
>[portfolio-template.owsam22.com](portfolio-template.owsam22.com)

This is a **free, customizable developer portfolio template** built with React and Vite.

It is designed for developers, students, freelancers, designers, and other professionals who want a modern portfolio without having to build everything from scratch.

The template focuses on:

* ⚡ Fast performance
* 📱 Responsive design
* 🎨 Modern UI
* ✨ Smooth animations
* 🧩 Reusable React components
* 📝 Easy content management
* 🔧 Simple customization
* 🚀 Easy deployment

You can use this project as a starting point for your own personal portfolio and modify the design, content, colors, sections, and functionality to fit your needs.

---

## ✨ Features

* **⚛️ React + Vite** — Fast development and optimized production builds.
* **📱 Fully Responsive** — Designed for mobile, tablet, laptop, and large screens.
* **🎨 Modern UI** — Clean visual design with polished interactions.
* **✨ Scroll Animations** — Reveal and transition effects using the Intersection Observer API.
* **📂 Dynamic Projects** — Manage portfolio projects from a centralized data file instead of editing components individually.
* **🧩 Reusable Components** — Sections are organized into maintainable React components.
* **🔍 SEO Friendly** — Structured HTML and metadata can be customized for your personal brand.
* **⚡ Performance Focused** — Built with a lightweight frontend architecture.
* **🔗 Social Links** — Easily connect GitHub, LinkedIn, email, and other profiles.
* **🚀 Deployment Ready** — Can be deployed to GitHub Pages, Vercel, Netlify, or other static hosting platforms.

---

## 🛠️ Tech Stack

| Technology                                       | Purpose                    |
| ------------------------------------------------ | -------------------------- |
| [React](https://react.dev/)                      | Frontend framework         |
| [Vite](https://vite.dev/)                        | Development and build tool |
| JavaScript                                       | Application logic          |
| CSS                                              | Styling and animations     |
| [Boxicons](https://boxicons.com/)                | Icons                      |
| [Inter](https://fonts.google.com/specimen/Inter) | Typography                 |
| Intersection Observer API                        | Scroll reveal animations   |

---

# 🚀 Getting Started

## Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/) — LTS version recommended
* npm — included with Node.js
* Git

You can check your versions with:

```bash
node -v
npm -v
git --version
```

---

## 1. Clone the Repository

```bash
git clone https://github.com/owsam22/portfolio.git
```

Navigate into the project:

```bash
cd portfolio
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Start the Development Server

```bash
npm run dev
```

Open the local URL shown in your terminal, usually:

```text
http://localhost:5173
```

---

# 🎨 Customization

The template is designed so that most personal information can be changed without modifying the core components.

Before deploying the portfolio, make sure you replace the original author's information with your own.

## 1. Update Personal Information

Look for the configuration/data files inside:

```text
src/
```

Depending on the version of the template, personal information may be stored in files such as:

```text
src/config/
src/data/
src/constants/
```

Update information such as:

* Name
* Professional title
* Bio
* Email
* Location
* GitHub
* LinkedIn
* Other social links

### Example

```js
const personalInfo = {
  name: "Your Name",
  role: "Full Stack Developer",
  email: "you@example.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
};
```

> **Tip:** Search the project for the original author's name, username, email, and social links before deploying. This helps prevent accidentally leaving someone else's information on your portfolio.

---

# 📂 2. Update Your Projects

Projects should be managed from the project's centralized data file.

For example:

```text
src/data/projects.json
```

or:

```text
public/projects.json
```

Add your own projects using the existing structure.

Example:

```json
[
  {
    "title": "My Project",
    "description": "A short description of the project.",
    "technologies": [
      "React",
      "Node.js",
      "MongoDB"
    ],
    "github": "https://github.com/yourusername/project",
    "live": "https://your-project.com"
  }
]
```

### Recommended project information

For each project, include:

* Project name
* Short description
* Technologies used
* GitHub repository
* Live demo
* Project image, if supported by the template

Keep descriptions concise. Your portfolio is not the place for a 500-word project essay.

---

# 🖼️ 3. Replace Images and Assets

Replace the existing images inside:

```text
src/assets/
```

or the relevant public asset directory.

Common assets include:

```text
Profile photo
Logo
Favicon
Project screenshots
Project thumbnails
Icons
Background images
```

### Important

Keep the same file paths if you don't want to modify component imports.

For example, if a component currently uses:

```js
import profileImage from "../assets/profile.webp";
```

you can simply replace the image while keeping the same filename.

If you change the filename or location, update the corresponding import.

---

# 👤 4. Replace the Logo / Profile Image

If the template contains an author logo or profile image, replace it with your own.

For best results:

* Use WebP or AVIF where possible
* Compress large images
* Avoid unnecessarily huge dimensions
* Use square images for profile pictures and favicons
* Use descriptive filenames

For example:

```text
profile.webp
logo.webp
project-1.webp
project-2.webp
```

---

# 🎨 5. Change Colors and Styling

Global styling is generally located inside:

```text
src/styles/
```

or the project's CSS files.

Search for:

```css
color:
background:
--primary:
--accent:
```

and modify the values to match your personal brand.

If CSS variables are used, changing a few variables may be enough to change the appearance of the entire website.

Example:

```css
:root {
  --primary-color: #000000;
  --accent-color: #ff6b35;
  --background-color: #ffffff;
}
```

---

# ✍️ 6. Update Website Text

Search the project for the original portfolio content and replace:

* Hero heading
* About section
* Skills
* Experience
* Services
* Project descriptions
* Contact information
* Footer text

Do not just replace visible text.

Also check:

```text
index.html
```

for:

* Page title
* Meta description
* Open Graph information
* Favicon
* Other metadata

Example:

```html
<title>Your Name | Full Stack Developer</title>

<meta
  name="description"
  content="Portfolio of Your Name, a Full Stack Developer building modern web applications."
/>
```

---

# 🔗 7. Update Social Links

Search for the existing social URLs and replace them with your own.

Common links include:

```text
GitHub
LinkedIn
Twitter / X
Email
Instagram
Website
```

Make sure you remove links that you don't actually use.

A broken or fake social link looks worse than having no link at all.

---

# 📧 8. Update Contact Information

Replace the template's contact information with your own.

For example:

```text
Email: you@example.com
GitHub: github.com/yourusername
LinkedIn: linkedin.com/in/yourusername
```

If the project includes a contact form, check whether it requires an external service or backend before deploying it.

A frontend-only contact form does **not** magically send emails.

---

# 🔍 SEO Customization

Before deploying, update the SEO information for your own website.

At minimum, change:

```html
<title>Your Name | Developer</title>
<meta name="description" content="Your portfolio description">
```

Also check:

* Canonical URL
* Open Graph title
* Open Graph description
* Open Graph image
* Favicon
* Robots configuration
* Sitemap
* Social preview metadata

Your domain should also be used wherever the template contains the original demo URL.

---

# 🌐 Environment Variables

If you add APIs, analytics, email services, or other environment-dependent functionality, create a local environment file.

Example:

```text
.env
```

Never commit secrets to GitHub.

Instead, create:

```text
.env.example
```

Example:

```env
VITE_API_URL=
VITE_ANALYTICS_ID=
```

Then create your own `.env` locally:

```env
VITE_API_URL=https://api.example.com
VITE_ANALYTICS_ID=your-id
```

Make sure `.env` is included in `.gitignore`.

---

# 🏗️ Production Build

Before deploying, create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Open the URL provided by Vite.

Test the production version before publishing it.

---

# 🚀 Deployment

This project can be deployed to most modern static hosting platforms.

### Vercel

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Vercel should automatically detect Vite.
4. Deploy.

Typical settings:

```text
Build Command: npm run build
Output Directory: dist
```

### Netlify

Connect your GitHub repository and use:

```text
Build command: npm run build
Publish directory: dist
```

### GitHub Pages

GitHub Pages can also be used, but Vite projects may require additional configuration depending on your repository name and deployment setup.

Follow the Vite documentation for the current GitHub Pages deployment configuration.

---

# 📂 Project Structure

The structure may vary slightly between versions, but the project generally follows this pattern:

```text
├── public/
│   └── static assets
│
├── src/
│   ├── assets/          # Images, logos and other assets
│   ├── components/      # Reusable React components
│   ├── hooks/           # Custom React hooks
│   ├── data/            # Projects and other portfolio data
│   ├── styles/          # Global and component styles
│   ├── App.jsx          # Root application component
│   └── main.jsx         # Application entry point
│
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

# 🧹 Before You Deploy

Use this checklist before publishing your portfolio:

### Personal Information

* [ ] Replace name
* [ ] Replace profile image
* [ ] Replace bio
* [ ] Replace email
* [ ] Replace location
* [ ] Replace social links

### Projects

* [ ] Remove demo projects
* [ ] Add your own projects
* [ ] Add GitHub links
* [ ] Add live links
* [ ] Replace project images

### Branding

* [ ] Replace logo
* [ ] Replace favicon
* [ ] Update colors
* [ ] Update typography if needed

### SEO

* [ ] Update page title
* [ ] Update meta description
* [ ] Update canonical URL
* [ ] Update Open Graph metadata
* [ ] Replace social preview image

### Technical

* [ ] Remove unused dependencies
* [ ] Remove unused assets
* [ ] Check console for errors
* [ ] Test mobile responsiveness
* [ ] Test navigation
* [ ] Test all external links
* [ ] Run `npm run build`
* [ ] Test the production build

### Security

* [ ] Remove `.env`
* [ ] Remove API keys
* [ ] Remove private credentials
* [ ] Check `.gitignore`
* [ ] Search the repository for accidentally exposed secrets

---

# 🤝 Contributing

Found a bug or have an improvement?

Contributions are welcome.

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature/your-feature
```

3. Make your changes
4. Test the project
5. Commit your changes

```bash
git commit -m "feat: improve portfolio section"
```

6. Push your branch

```bash
git push origin feature/your-feature
```

7. Open a Pull Request

---

# ⭐ Support

If you find this template useful, consider giving the repository a ⭐ on GitHub.

It helps the project get discovered by more developers.

---

# 📄 License

This project is open source and available under the [MIT License](LICENSE).

You are free to:

* Use it for personal projects
* Modify it
* Customize the design
* Use it for commercial projects
* Publish your own portfolio based on it

Please check the `LICENSE` file for the complete terms.

---

<div align="center">

### Built with React + Vite

If this template helped you build your portfolio, consider ⭐ starring the repository.

</div>
