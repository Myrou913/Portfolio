import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import './overrides.css';
import { supabase } from './supabase';

const projects = [
  { id: 'sonede', number: '01', title: 'SCOC', type: 'Complaint management', description: 'A full-stack complaint-management platform for reporting and tracking water-service issues.', tools: ['SQL', 'JavaScript', 'HTML', 'CSS'], features: ['Complaint reporting', 'Case tracking', 'Clear self-service flow'], github: 'https://github.com/Myrou913/sonede-complaints.git', color: 'blue', image: '/assets/SonedeScreenshot.png', demo: '/assets/demoSonede.mp4' },
  { id: 'urgentflow', number: '02', title: 'UrgentFlow', type: 'Healthcare platform', description: 'A healthcare interface designed to help people find hospitals and emergency services faster.', tools: ['JavaScript', 'HTML', 'CSS'], features: ['Hospital discovery', 'Emergency navigation', 'Responsive experience'], github: 'https://github.com/Myrou913/UrgentFlow.git', color: 'pink', image: '/assets/UrgentFlowScreenshot.jpeg', demo: '/assets/demoUrgentFlow.mp4' },
  { id: 'shopflow', number: '03', title: 'ShopFlow', type: 'E-commerce experience', description: 'A modern marketplace with product discovery, a shopping cart, and JWT authentication.', tools: ['React', 'JavaScript', 'Spring Boot', 'JWT'], features: ['Product browsing', 'Cart management', 'Secure sign-in'], github: 'https://github.com/Myrou913/shopflow.git', color: 'lime', image: '/assets/ShopFlowScreenshot.png', demo: '/assets/demoShopFlow.mp4' },
  { id: 'pomodoro', number: '04', title: 'Pomodoro Timer', type: 'Focus companion', description: 'A warm productivity timer created for intentional focus and restorative breaks.', tools: ['JavaScript', 'HTML', 'CSS'], features: ['Focus and break modes', 'Start, stop, reset', 'Minimal interface'], github: 'https://github.com/Myrou913/PomodoroTimer.git', color: 'orange', image: '/assets/PomodoroTimerScreenshot.jpeg', demo: '/demos/demoPomodoro.mp4' }
];

const certificates = [
  { title: 'Mobile Development with Flutter', issuer: 'Orange Digital Center', date: 'August 2026', src: '/assets/flutter-certificate.jpeg' },
  { title: 'Meta Front-End Developer', issuer: 'Meta / Coursera', date: 'June 2026', src: '/assets/meta-front-end-certificate.png' },
  { title: 'NDG Linux Unhatched - Français', issuer: 'Cisco Networking Academy', date: 'October 2024', src: '/assets/LinuxUnhatchedCertif.png' }
];

const stack = [
  ['JavaScript', '/assets/JavaScript.jpg', 'javascript-original'], ['HTML', '/assets/HTML.jpg', 'html5-original'], ['CSS', '/assets/CSS.jpg', 'css3-original'], ['Spring Boot', '/assets/SpringBoot.jpg', 'spring-original'], ['Django', '/assets/Gjango.jpg', 'django-plain'], ['Java', '/assets/java.svg', 'java-original'], ['React', '/assets/react.jpg', 'react-original'], ['SQL', '/assets/sql.jpg', 'mysql-original'], ['Git', '/assets/Git.jpg', 'git-original'], ['GitHub', '/assets/Github.jpg?v=filled', 'github-original'], ['VS Code', '/assets/vsCode.jpg', 'vscode-original'], ['IntelliJ', '/assets/intellij.jpg', 'intellij-original'], ['Android Studio', '/assets/androidStudio.jpg', 'androidstudio-original'], ['MySQL', '/assets/mysql.jpg', 'mysql-original'], ['XAMPP', '/assets/XAMPP.jpg', 'xampp-original']
];

function Portrait() { return <figure className="portrait-visual"><div className="portrait-glow" /><img src="/assets/maryem-portrait.jpeg" alt="Mariem Sebai" /><figcaption>mariem sebai / full-stack developer</figcaption></figure>; }
function AboutVisual() { return <figure className="about-visual"><img src="/assets/about-presentation.jpeg" alt="Mariem Sebai giving a presentation" /></figure>; }

function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [comments, setComments] = useState([]);
  const [commentForm, setCommentForm] = useState({ name: '', text: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    // load latest 5 comments from Supabase
    supabase
      .from('comments')
      .select('id, name, text, created_at')
      .order('created_at', { ascending: false })
      .limit(5)
      .then(({ data }) => { if (data) setComments(data); });
  }, []);
  useEffect(() => { document.body.style.overflow = activeProject || certificate ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [activeProject, certificate]);
  useEffect(() => { const sections = [...document.querySelectorAll('section[id]')]; const observer = new IntersectionObserver(entries => { const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0]; if (visible) setActiveSection(visible.target.id); }, { rootMargin: '-12% 0px -55% 0px', threshold: [0.1, .3, .6] }); sections.forEach(section => observer.observe(section)); return () => observer.disconnect(); }, []);
  const scroll = (id) => { const target = document.getElementById(id); if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY, behavior: 'smooth' }); setMenuOpen(false); };
  const submitComment = async (e) => {
    e.preventDefault();
    if (!commentForm.name.trim() || !commentForm.text.trim()) return;
    const { data, error } = await supabase
      .from('comments')
      .insert([{ name: commentForm.name.trim(), text: commentForm.text.trim() }])
      .select('id, name, text, created_at')
      .single();
    if (!error && data) {
      setComments(prev => [data, ...prev].slice(0, 5));
      setCommentForm({ name: '', text: '' });
    }
  };
  const submitMessage = async (e) => { e.preventDefault(); const form = e.currentTarget; const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT; if (!endpoint) { setSent('Add VITE_FORMSPREE_ENDPOINT to send this message privately.'); return; } try { await fetch(endpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) }); form.reset(); setSent('Thanks — your message is on its way.'); } catch { setSent('Message could not be sent. Please email Mariem directly.'); } };
  return <>
    <header className="nav"><a className="brand" href="#top" onClick={() => scroll('top')}>MS<span>.</span></a><button className="menu-button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>☰</button><nav className={menuOpen ? 'open' : ''}>{[['about','About'],['work','Work'],['certificates','Certificates'],['contact','Contact']].map(([id,label]) => <button className={activeSection === id ? 'active' : ''} key={id} onClick={() => scroll(id)}>{label}</button>)}<a className="nav-cta" href="mailto:mariemsebai913@gmail.com">Let’s talk ↗</a></nav></header>
    <main id="top">
      <section className="hero section"><div className="eyebrow">✦ Computer Science Student / Developer</div><div className="hero-grid"><div><h1>Designing<br/><em>meaningful</em><br/>digital worlds.</h1><p className="lead">Hi, I’m Mariem Sebai. I turn thoughtful ideas into elegant, human-centred web experiences.</p><div className="hero-actions"><button className="button pink" onClick={() => scroll('work')}>Explore my work <b>↘</b></button><a className="text-link" href="mailto:mariemsebai913@gmail.com">Get in touch <span>↗</span></a></div></div><Portrait /></div><div className="scroll-hint">SCROLL TO DISCOVER <span>↓</span></div></section>
      <section id="about" className="about section"><div className="about-grid"><div><div className="section-label">01 / ABOUT ME</div><h2>Building with<br/><em>curiosity</em> &amp; care.</h2><p>I’m a developer who enjoys shaping useful, expressive digital experiences—from the first user flow to the last thoughtful detail.</p><p className="muted">My work sits at the intersection of web development, problem-solving, and a love for interfaces that feel good to use.</p><a className="button outline" href="mailto:mariemsebai913@gmail.com">Let’s collaborate <b>↗</b></a></div><AboutVisual /></div></section>
      <section id="work" className="work section"><div className="section-head"><div><div className="section-label">02 / SELECTED WORK</div><h2>Made to be<br/><em>remembered.</em></h2><p>Four projects, each made with intent—solving real needs through approachable, considered interfaces.</p></div></div><div className="project-grid">{projects.map((project) => <article key={project.id} className={'project-card ' + project.color}><div className="project-art"><span className="project-number">{project.number}</span><img src={project.image} alt={`${project.title} interface`} /></div><div className="project-info"><span>{project.type}</span><h3>{project.title}</h3><button onClick={() => setActiveProject(project)}>View project <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display:'inline-block',verticalAlign:'middle',marginLeft:'6px'}}><path d="M3 13L13 3M13 3H6M13 3V10" stroke="#ff4da1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></button></div></article>)}</div></section>
      <section id="certificates" className="certificates section"><div className="section-label">03 / CERTIFICATES</div><div className="certificate-copy"><h2>Proof of<br/><em>the process.</em></h2><p>Certificates earned through consistent learning, practical work, and curiosity.</p></div><div className="certificate-grid">{certificates.map(cert => <button className={`certificate-card${cert.title === 'Meta Front-End Developer' ? ' meta-certificate' : ''}`} key={cert.title} onClick={() => setCertificate(cert)}><img src={cert.src} alt={cert.title}/><span>{cert.date}</span><h3>{cert.title}</h3><p>{cert.issuer}</p></button>)}</div><div className="stack"><div className="section-label">TECH STACK</div><div className="stack-icons">{stack.map(([name, local, remote]) => <div className="stack-icon" title={name} key={name}>{local ? <img src={local} alt={name}/> : <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${remote}/${remote}.svg`} alt={name}/>}<span>{name}</span></div>)}</div></div></section>
      <section id="contact" className="contact section"><div className="contact-intro"><div className="section-label">04 / CONTACT</div><h2>Let’s make<br/>something <em>good.</em></h2><p>Have an idea, an opportunity, or just want to connect? I’d love to hear from you.</p><a href="mailto:mariemsebai913@gmail.com">mariemsebai913@gmail.com <span>↗</span></a></div><div className="contact-forms"><form className="message-form" onSubmit={submitMessage}><label>Your name<input required name="name" placeholder="How should I call you?" /></label><label>Your email<input required type="email" name="email" placeholder="you@example.com" /></label><label>Tell me more<textarea required name="message" placeholder="What’s on your mind?" /></label><button className="button pink" type="submit">Send a private message <b>↗</b></button>{sent && <p className="form-note">{sent}</p>}</form><aside className="comments"><div><span>✦ PUBLIC NOTES</span><p>Leave a little hello</p></div><form onSubmit={submitComment}><input aria-label="Your name" value={commentForm.name} onChange={e => setCommentForm({ ...commentForm, name: e.target.value })} placeholder="Your name" maxLength="45" required/><textarea aria-label="Your comment" value={commentForm.text} onChange={e => setCommentForm({ ...commentForm, text: e.target.value })} placeholder="Write a comment" maxLength="280" required/><button type="submit">Post comment ↗</button></form><div className="comment-list">{comments.length ? comments.map(c => <div className="comment" key={c.id}><b>{c.name}</b><p>{c.text}</p></div>) : <p className="empty-comment">Be the first to leave a note.</p>}</div></aside></div></section>
    </main>
    <footer><a className="footer-name" href="#top" onClick={() => scroll('top')}>Mariem<br/><em>Sebai</em></a><p>© {new Date().getFullYear()} / Made with care</p><div className="socials"><a href="https://github.com/Myrou913" target="_blank" rel="noreferrer" aria-label="GitHub"><img src="/assets/github2.png" alt="GitHub"/></a><a href="https://www.linkedin.com/in/mariem-sebai-009260342/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><img src="/assets/Linkedin.png" alt=""/></a><a href="https://www.instagram.com/m_yrou_/" target="_blank" rel="noreferrer" aria-label="Instagram"><img src="/assets/Instagram.png" alt=""/></a><a href="mailto:mariemsebai913@gmail.com" aria-label="Email"><img src="/assets/email.png" alt=""/></a></div></footer>
    <button type="button" className="back-to-top" onClick={() => scroll('top')} aria-label="Back to top">↑</button>
    {activeProject && <div className="modal-backdrop" onMouseDown={() => setActiveProject(null)}><section className="modal project-modal" role="dialog" aria-modal="true" aria-label={`${activeProject.title} details`} onMouseDown={e => e.stopPropagation()}><button className="close" onClick={() => setActiveProject(null)} aria-label="Close project details">×</button><div className={'modal-visual ' + activeProject.color}>{activeProject.demo ? <video controls preload="metadata" poster={activeProject.image}><source src={activeProject.demo} type="video/mp4"/></video> : <img src={activeProject.image} alt={`${activeProject.title} preview`}/>}</div><div className="modal-content"><span className="section-label">PROJECT / {activeProject.type}</span><h2>{activeProject.title}</h2><p>{activeProject.description}</p><h4>Tools &amp; languages</h4><div className="tags">{activeProject.tools.map(t => <span key={t}>{t}</span>)}</div><h4>Key features</h4><ul>{activeProject.features.map(f => <li key={f}>{f}</li>)}</ul><a className="button pink" href={activeProject.github} target="_blank" rel="noreferrer">View on GitHub <b>↗</b></a></div></section></div>}
    {certificate && <div className="modal-backdrop" onMouseDown={() => setCertificate(null)}><section className="modal certificate-modal" role="dialog" aria-modal="true" onMouseDown={e => e.stopPropagation()}><button className="close" onClick={() => setCertificate(null)}>×</button><img src={certificate.src} alt={certificate.title} /></section></div>}
  </>;
}
createRoot(document.getElementById('root')).render(<App />);
